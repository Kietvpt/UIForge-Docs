import React from 'react'
import { AlertTriangle, Info, Lightbulb } from 'lucide-react'

interface CalloutProps {
  type?: 'info' | 'tip' | 'warning'
  title?: string
  children: React.ReactNode
}

const styles = {
  info: {
    wrap: 'border-indigo-500/30 bg-indigo-500/8 text-slate-800 dark:text-slate-200',
    icon: <Info className="h-4 w-4 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />,
    title: 'text-indigo-700 dark:text-indigo-300',
  },
  tip: {
    wrap: 'border-emerald-500/30 bg-emerald-500/8 text-slate-800 dark:text-slate-200',
    icon: <Lightbulb className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />,
    title: 'text-emerald-700 dark:text-emerald-300',
  },
  warning: {
    wrap: 'border-amber-500/35 bg-amber-500/10 text-slate-800 dark:text-slate-200',
    icon: <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />,
    title: 'text-amber-700 dark:text-amber-300',
  },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const s = styles[type]
  return (
    <div className={`my-4 flex gap-3 rounded-xl border p-4 text-sm leading-relaxed ${s.wrap}`}>
      {s.icon}
      <div className="min-w-0 flex-1">
        {title && <div className={`mb-1 font-semibold ${s.title}`}>{title}</div>}
        <div className="opacity-95">{children}</div>
      </div>
    </div>
  )
}
