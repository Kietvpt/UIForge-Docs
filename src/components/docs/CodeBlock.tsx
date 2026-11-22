import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useI18n } from '@/i18n/LanguageContext'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export function CodeBlock({ code, language = 'tsx', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { ui } = useI18n()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // ignore clipboard errors
    }
  }

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-slate-200 bg-[#0b0f17] text-slate-100 shadow-sm dark:border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/70 px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-400/80" />
          <span className="font-mono font-medium text-slate-300">{title || language}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-700/80 bg-slate-800/80 px-2.5 py-1 text-[11px] font-medium text-slate-200 transition hover:border-indigo-400/60 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? ui.componentDoc.copied : ui.componentDoc.copy}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-slate-200">
        <code className="font-mono">{code.trim()}</code>
      </pre>
    </div>
  )
}
