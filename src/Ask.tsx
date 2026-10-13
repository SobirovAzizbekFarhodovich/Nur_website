import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { type Dict, type Lang, TELEGRAM_URL } from './i18n'
import { Star, TelegramIcon } from './icons'
import { StatusBar } from './Phone'

/* ---------- The site's live AI: one question, a grounded answer, shown on the phone ---------- */

export type AskError = 'daily_limit' | 'too_fast' | 'unavailable' | 'question_length'
export type AskState =
  | { status: 'idle' }
  | { status: 'loading'; question: string }
  | { status: 'done'; question: string; answer: string; sources: string[]; remaining: number | null }
  | { status: 'error'; question: string; error: AskError; retry?: number }

const MAX_CHARS = 300

function sourceTitle(s: unknown): string | null {
  if (!s || typeof s !== 'object') return typeof s === 'string' ? s : null
  const o = s as Record<string, unknown>
  const meta = (o.metadata ?? {}) as Record<string, unknown>
  const t = meta.title ?? meta.source ?? o.title ?? o.source
  return typeof t === 'string' && t.trim() ? t.trim() : null
}

export function useAsk(lang: Lang) {
  const [state, setState] = useState<AskState>({ status: 'idle' })
  const ask = async (raw: string) => {
    const question = raw.replace(/\s+/g, ' ').trim()
    if (!question || state.status === 'loading') return
    if (question.length > MAX_CHARS) {
      setState({ status: 'error', question, error: 'question_length' })
      return
    }
    setState({ status: 'loading', question })
    try {
      const res = await fetch('/api/v1/public/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, language: lang }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && typeof data.answer === 'string' && data.answer.trim()) {
        const titles = (Array.isArray(data.sources) ? data.sources : []).map(sourceTitle).filter(Boolean) as string[]
        setState({
          status: 'done',
          question,
          answer: data.answer,
          sources: [...new Set(titles)].slice(0, 3),
          remaining: typeof data.remaining === 'number' ? data.remaining : null,
        })
      } else if (res.status === 429) {
        setState({ status: 'error', question, error: data.error === 'daily_limit' ? 'daily_limit' : 'too_fast', retry: data.retry_after })
      } else if (data.error === 'question_length') {
        setState({ status: 'error', question, error: 'question_length' })
      } else {
        setState({ status: 'error', question, error: 'unavailable' })
      }
    } catch {
      setState({ status: 'error', question, error: 'unavailable' })
    }
  }
  return { state, ask }
}

/** The question box in the 13:00 scene: suggested questions and a one-line field. */
export function AskBox({ dict, state, ask }: { dict: Dict; state: AskState; ask: (q: string) => void }) {
  const [text, setText] = useState('')
  const busy = state.status === 'loading'
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (text.trim()) ask(text)
  }
  return (
    <div className="ask">
      <div className="ask-chips">
        {dict.ask.chips.map((c) => (
          <button key={c} type="button" className="chip" disabled={busy} onClick={() => ask(c)}>
            {c}
          </button>
        ))}
      </div>
      <form className="ask-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="ask-q">
          {dict.ask.placeholder}
        </label>
        <input
          id="ask-q"
          type="text"
          value={text}
          maxLength={MAX_CHARS}
          placeholder={dict.ask.placeholder}
          onChange={(e) => setText(e.target.value)}
          autoComplete="off"
          enterKeyHint="send"
        />
        <button type="submit" className="ask-send" disabled={busy || !text.trim()} aria-label={dict.ask.send}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z" fill="currentColor" />
          </svg>
        </button>
      </form>
      <p className="ask-note">{dict.ask.note}</p>
    </div>
  )
}

/* A small, safe renderer for the answer's light Markdown: paragraphs, bullets, *italic*,
   **bold**, and "— source" lines. No HTML from the server is ever injected. */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|_([^_]+)_/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1]) out.push(<strong key={k++}>{m[1]}</strong>)
    else out.push(<em key={k++}>{m[2] ?? m[3]}</em>)
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function Answer({ text }: { text: string }) {
  const blocks = text.replace(/\r/g, '').split(/\n{2,}/)
  return (
    <>
      {blocks.map((b, i) => {
        const lines = b.split('\n').map((l) => l.trim()).filter(Boolean)
        if (lines.length && lines.every((l) => /^[-•*]\s+/.test(l))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^[-•*]\s+/, ''))}</li>
              ))}
            </ul>
          )
        }
        if (lines.length === 1 && /^[—–-]\s/.test(lines[0])) {
          return (
            <p key={i} className="cite">
              {inline(lines[0])}
            </p>
          )
        }
        const quote = lines.every((l) => /^>\s?/.test(l))
        return quote ? (
          <blockquote key={i}>{inline(lines.map((l) => l.replace(/^>\s?/, '')).join(' '))}</blockquote>
        ) : (
          <p key={i}>
            {lines.map((l, j) => (
              <span key={j}>
                {j > 0 && <br />}
                {inline(l)}
              </span>
            ))}
          </p>
        )
      })}
    </>
  )
}

/** The phone's AI screen while a visitor is asking: drawn in the app's own components. */
export function LiveChat({ dict, state, time }: { dict: Dict; state: Exclude<AskState, { status: 'idle' }>; time: string }) {
  const body = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    body.current?.scrollTo({ top: 0 })
  }, [state.status])
  const error = state.status === 'error' ? state.error : null
  return (
    <div className="livechat">
      <StatusBar time={time} />
      <div className="lc-band">
        <p className="lc-title">{dict.ask.screenTitle}</p>
        <p className="lc-sub">{dict.ask.screenSub}</p>
      </div>
      <div className="lc-body" ref={body} aria-live="polite">
        <p className="lc-q">{state.question}</p>
        {state.status === 'loading' && (
          <div className="lc-card lc-wait">
            <p className="lc-name">
              <Star className="lc-star" />
              Noorain
            </p>
            <p className="lc-typing">
              {dict.ask.thinking}
              <span className="dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </p>
          </div>
        )}
        {state.status === 'done' && (
          <div className="lc-card">
            <p className="lc-name">
              <Star className="lc-star" />
              Noorain
            </p>
            <div className="lc-answer">
              <Answer text={state.answer} />
            </div>
            {state.sources.length > 0 && (
              <div className="lc-sources">
                <p className="lc-sources-h">{dict.ask.sources}</p>
                <ul>
                  {state.sources.map((s) => (
                    <li key={s}>
                      <Star className="lc-bullet" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="lc-foot">
              {dict.ask.notFatwa}
              {state.remaining !== null && ` · ${dict.ask.remaining.replace('{n}', String(state.remaining))}`}
            </p>
          </div>
        )}
        {error && (
          <div className="lc-card lc-error">
            <p>
              {error === 'too_fast'
                ? dict.ask.errors.too_fast.replace('{n}', String(state.status === 'error' && state.retry ? state.retry : 15))
                : dict.ask.errors[error]}
            </p>
            {error === 'daily_limit' && (
              <a className="lc-tg" href={TELEGRAM_URL} target="_blank" rel="noopener">
                <TelegramIcon className="ic" />
                @noorain_uz
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
