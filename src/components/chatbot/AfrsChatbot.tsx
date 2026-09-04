'use client'

import { Headphones, MessageCircle, Send, X } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CHATBOT_SUGGESTIONS } from '@/lib/chatbot/knowledge'
import type { ChatMessage } from '@/lib/chatbot/provider'

type AfrsChatbotProps = {
  phone?: string
  email?: string
}

const STORAGE_KEY = 'afrs-chat-session-v1'

const WELCOME: ChatMessage = {
  role: 'assistant',
  content:
    'Hello! I am the **AFRS assistant**. Ask me about courses, events, AFSL forensic services, registrations, or how to contact our team.',
}

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const [, label, href] = linkMatch
      const internal = href.startsWith('/')
      if (internal) {
        return (
          <Link key={index} href={href} className="font-semibold text-brand-600 underline">
            {label}
          </Link>
        )
      }
      return (
        <a key={index} href={href} className="font-semibold text-brand-600 underline" target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      )
    }
    return <span key={index}>{part}</span>
  })
}

export function AfrsChatbot({ phone = '+91-9926692487', email = 'afrsciences@gmail.com' }: AfrsChatbotProps) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [showEscalate, setShowEscalate] = useState(false)
  const [escalateEmail, setEscalateEmail] = useState('')
  const [escalateName, setEscalateName] = useState('')
  const [escalatePhone, setEscalatePhone] = useState('')
  const [escalateLoading, setEscalateLoading] = useState(false)
  const [escalateDone, setEscalateDone] = useState(false)
  const [suggestsHuman, setSuggestsHuman] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as ChatMessage[]
      if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)))
    } catch {
      /* ignore */
    }
  }, [messages])

  useEffect(() => {
    if (!open) return
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    inputRef.current?.focus()
  }, [open, messages, loading])

  const sendMessage = useCallback(
    async (text: string) => {
      const content = text.trim()
      if (!content || loading) return

      const nextMessages: ChatMessage[] = [...messages, { role: 'user', content }]
      setMessages(nextMessages)
      setInput('')
      setLoading(true)

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: nextMessages }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Unable to get a reply')

        setMessages((prev) => [...prev, data.message as ChatMessage])
        if (data.suggestsHuman) setSuggestsHuman(true)
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `I am having trouble connecting right now. Please [contact our team](/contact) at ${phone} or ${email}.`,
          },
        ])
      } finally {
        setLoading(false)
      }
    },
    [email, loading, messages, phone],
  )

  const submitEscalation = useCallback(async () => {
    if (escalateLoading || !escalateEmail.trim()) return
    setEscalateLoading(true)
    try {
      const res = await fetch('/api/chat/escalate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: escalateEmail.trim(),
          userName: escalateName.trim() || undefined,
          userPhone: escalatePhone.trim() || undefined,
          messages,
          reason: suggestsHuman ? 'Bot suggested human help' : 'Visitor requested human help',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to send')

      setEscalateDone(true)
      setShowEscalate(false)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.message as string,
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `We could not send email right now. Please [contact us](/contact) at ${phone} or ${email}.`,
        },
      ])
    } finally {
      setEscalateLoading(false)
    }
  }, [escalateEmail, escalateLoading, escalateName, escalatePhone, email, messages, phone, suggestsHuman])

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg transition hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          aria-label="Open AFRS chat assistant"
        >
          <MessageCircle className="h-6 w-6" aria-hidden />
        </button>
      ) : null}

      {open ? (
        <div
          className="fixed bottom-5 right-5 z-[60] flex h-[min(560px,calc(100vh-2rem))] w-[min(400px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          role="dialog"
          aria-label="AFRS chat assistant"
        >
          <header className="flex items-center justify-between bg-brand-700 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-bold">AFRS Assistant</p>
              <p className="text-[11px] text-white/75">Courses · Events · AFSL Services</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 hover:bg-white/15"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'ml-auto bg-brand-700 text-white'
                    : 'mr-auto border border-slate-200 bg-white text-slate-700'
                }`}
              >
                {message.role === 'assistant'
                  ? renderInlineMarkdown(message.content.replace(/\*\*/g, ''))
                  : message.content}
              </div>
            ))}
            {loading ? (
              <div className="mr-auto rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-500">
                Typing…
              </div>
            ) : null}
          </div>

          {messages.length <= 2 ? (
            <div className="flex flex-wrap gap-2 border-t border-slate-100 bg-white px-3 py-2">
              {CHATBOT_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          {!showEscalate && !escalateDone ? (
            <div className="border-t border-slate-100 bg-white px-3 py-2">
              {suggestsHuman ? (
                <p className="mb-2 text-[11px] text-amber-700">
                  Need more help? Our team can follow up by email.
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => setShowEscalate(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-800 hover:bg-brand-100"
              >
                <Headphones className="h-3.5 w-3.5" aria-hidden />
                Talk to our team
              </button>
            </div>
          ) : null}

          {showEscalate ? (
            <div className="space-y-2 border-t border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold text-slate-700">Email our team</p>
              <input
                type="text"
                value={escalateName}
                onChange={(e) => setEscalateName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
              />
              <input
                type="email"
                required
                value={escalateEmail}
                onChange={(e) => setEscalateEmail(e.target.value)}
                placeholder="Your email *"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
              />
              <input
                type="tel"
                value={escalatePhone}
                onChange={(e) => setEscalatePhone(e.target.value)}
                placeholder="Phone (optional)"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowEscalate(false)}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={escalateLoading || !escalateEmail.trim()}
                  onClick={() => void submitEscalation()}
                  className="flex-1 rounded-lg bg-brand-700 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                >
                  {escalateLoading ? 'Sending…' : 'Send & get reply'}
                </button>
              </div>
            </div>
          ) : null}

          <form
            className="flex items-end gap-2 border-t border-slate-200 bg-white p-3"
            onSubmit={(e) => {
              e.preventDefault()
              void sendMessage(input)
            }}
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  void sendMessage(input)
                }
              }}
              placeholder="Ask about courses, events, services…"
              className="max-h-24 min-h-[44px] flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  )
}
