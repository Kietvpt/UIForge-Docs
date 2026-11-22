import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { SearchModal } from './SearchModal'

interface DocsLayoutProps {
  children: React.ReactNode
  fullWidth?: boolean
}

export function DocsLayout({ children, fullWidth = false }: DocsLayoutProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)}
      />

      {fullWidth ? (
        <main>{children}</main>
      ) : (
        <div className="mx-auto flex max-w-[1440px]">
          {/* Desktop Sidebar */}
          <div className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-72 shrink-0 border-r border-slate-200/80 dark:border-slate-800/80 lg:block">
            <Sidebar />
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className="h-full w-72 bg-white shadow-xl dark:bg-[#0d1117]"
                onClick={(e) => e.stopPropagation()}
              >
                <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
              </div>
            </div>
          )}

          {/* Main Docs Article */}
          <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-4xl">{children}</div>
          </main>
        </div>
      )}

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
