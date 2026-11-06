'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'מותגים' },
  { href: '/gaps', label: 'פערים' },
  { href: '/clubs', label: 'מועדונים' },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#12151c] text-white">
      <div className="h-1 flex">
        <span className="flex-1 bg-[#0057B7]" />
        <span className="flex-1 bg-[#E63946]" />
        <span className="flex-1 bg-[#1F8A7B]" />
      </div>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            יש יותר מועדונים
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="ניווט ראשי">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    isActive ? 'bg-white text-[#12151c]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <button
            className="md:hidden text-sm border border-white/20 rounded-full px-3 py-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="תפריט"
            aria-expanded={menuOpen}
          >
            {menuOpen ? 'סגור' : 'תפריט'}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
