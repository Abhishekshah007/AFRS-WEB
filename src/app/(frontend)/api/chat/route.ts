import { getLiveChatKnowledge } from '@/lib/chatbot/liveKnowledge'
import { generateChatReply, suggestsHumanHelp, type ChatMessage } from '@/lib/chatbot/provider'

const MAX_MESSAGES = 20
const MAX_MESSAGE_LENGTH = 1200

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] }
    const messages = (body.messages || []).filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0,
    )

    if (messages.length === 0) {
      return Response.json({ error: 'No messages provided.' }, { status: 400 })
    }

    const trimmed = messages.slice(-MAX_MESSAGES).map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }))

    if (trimmed[trimmed.length - 1]?.role !== 'user') {
      return Response.json({ error: 'Last message must be from the user.' }, { status: 400 })
    }

    const liveKnowledge = await getLiveChatKnowledge()
    const { reply, provider } = await generateChatReply(trimmed, liveKnowledge)
    const lastUser = trimmed[trimmed.length - 1]?.content || ''

    return Response.json({
      message: { role: 'assistant' as const, content: reply },
      provider,
      suggestsHuman: suggestsHumanHelp(reply, lastUser),
    })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Chat unavailable.' },
      { status: 500 },
    )
  }
}
