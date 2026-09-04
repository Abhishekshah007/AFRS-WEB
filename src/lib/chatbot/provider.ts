import { CHATBOT_KNOWLEDGE } from '@/lib/chatbot/knowledge'

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export function buildSystemPrompt(liveKnowledge = ''): string {
  return `You are the AFRS website assistant for Applied Forensic Research Sciences (India).
Answer questions about forensic education, AFSL laboratory services, events, courses, internships, and registrations.
Use the knowledge below. When LIVE DATA FROM CMS lists specific events or programmes, cite those exact titles, dates, and links.
Keep replies under 120 words unless listing steps.

${CHATBOT_KNOWLEDGE}

${liveKnowledge}`.trim()
}

type Provider = 'groq' | 'gemini'

function resolveProvider(): Provider | null {
  if (process.env.GROQ_API_KEY) return 'groq'
  if (process.env.GEMINI_API_KEY) return 'gemini'
  return null
}

async function chatWithGroq(messages: ChatMessage[], liveKnowledge: string): Promise<string> {
  const model = process.env.GROQ_CHAT_MODEL || 'llama-3.3-70b-versatile'
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      max_tokens: 512,
      messages: [{ role: 'system', content: buildSystemPrompt(liveKnowledge) }, ...messages],
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Groq error ${res.status}`)
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  return data.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not generate a reply.'
}

async function chatWithGemini(messages: ChatMessage[], liveKnowledge: string): Promise<string> {
  const model = process.env.GEMINI_CHAT_MODEL || 'gemini-2.0-flash'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`

  const contents = [
    { role: 'user', parts: [{ text: buildSystemPrompt(liveKnowledge) }] },
    { role: 'model', parts: [{ text: 'Understood. I will assist AFRS website visitors professionally.' }] },
    ...messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    })),
  ]

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.3, maxOutputTokens: 512 },
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Gemini error ${res.status}`)
  }

  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
    'Sorry, I could not generate a reply.'
  )
}

/** Detect when we should offer human handoff. */
export function suggestsHumanHelp(reply: string, userMessage: string): boolean {
  const combined = `${reply}\n${userMessage}`.toLowerCase()
  return (
    /speak to (a )?human|talk to (a )?human|real person|call me back|email me|human agent/.test(
      combined,
    ) ||
    /contact (us|our team)|visit \[contact|\/contact\)|cannot provide|not sure|unable to help|i don't have/i.test(
      reply.toLowerCase(),
    )
  )
}

/** Rule-based fallback when no LLM API key is configured. */
export function fallbackReply(latestUserMessage: string, liveKnowledge: string): string {
  const q = latestUserMessage.toLowerCase()

  if (/event|workshop|webinar|conference|award/.test(q) && liveKnowledge.includes('UPCOMING')) {
    const eventBlock = liveKnowledge.split('EDUCATION PROGRAMMES')[0]
    return `Here are our current events from CMS:\n${eventBlock.slice(0, 600)}\n\nOpen [Events](/events) to register.`
  }

  if (/course|training|internship|programme/.test(q) && liveKnowledge.includes('EDUCATION PROGRAMMES')) {
    return 'Browse live programmes on [Courses](/courses) or register at [Course registration](/courses/register). Use **Talk to our team** below if you need personal help.'
  }

  if (/contact|phone|email|call|reach|talk/.test(q)) {
    return 'You can reach AFRS at **+91-9926692487** or **afrsciences@gmail.com**, or use the [contact form](/contact).'
  }
  if (/service|afsl|lab|forensic exam|fingerprint|dna|document/.test(q)) {
    return 'AFSL forensic services are listed on [Forensic Services](/services). For lab inquiries, use the inquiry form on that page or [contact us](/contact).'
  }
  if (/legal|medico|court|consultancy|advocate/.test(q)) {
    return 'For medico-legal and forensic consultancy, visit [Legal Consultancy](/services/forensic-legal-consultancy) and submit the consultancy request form.'
  }

  return 'I can help with AFRS **courses**, **events**, and **services**. If you need personal assistance, use **Talk to our team** below and we will email you back.'
}

export async function generateChatReply(
  messages: ChatMessage[],
  liveKnowledge = '',
): Promise<{
  reply: string
  provider: Provider | 'fallback'
}> {
  const provider = resolveProvider()
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')

  if (!provider || !lastUser) {
    return {
      reply: fallbackReply(lastUser?.content || '', liveKnowledge),
      provider: 'fallback',
    }
  }

  try {
    const reply =
      provider === 'groq'
        ? await chatWithGroq(messages, liveKnowledge)
        : await chatWithGemini(messages, liveKnowledge)
    return { reply, provider }
  } catch (error) {
    console.error('[chatbot]', error)
    return {
      reply: fallbackReply(lastUser.content, liveKnowledge),
      provider: 'fallback',
    }
  }
}
