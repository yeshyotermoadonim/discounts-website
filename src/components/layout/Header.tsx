// Site header with RTL layout: logo on right, nav links on left
// Sticky, white background with shadow
'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'בית' },
  { href: '/clubs', label: 'מועדונים' },
  { href: '/compare', label: 'השוואה' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16">
          {/* Logo / brand name - on the right in RTL */}
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 hover:text-blue-600 transition-colors">
            <span className="text-2xl" role="img" aria-label="כוכב הנחה">🏷️</span>
            <span className="text-lg leading-tight">
              יש יותר<br className="hidden sm:block" />
              <span className="text-blue-600"> מועדונים</span>
            </span>
          </Link>

          {/* Desktop nav - on the left in RTL (pushed via mr-auto) */}
          <nav className="hidden sm:flex items-center gap-6 mr-auto" aria-label="ניווט ראשי">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger - on the left */}
          <button
            className="sm:hidden mr-auto p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="תפריט"
            aria-expanded={menuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {menuOpen && (
          <nav className="sm:hidden pb-4 border-t border-gray-100 pt-3 space-y-1" aria-label="ניווט נייד">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-2 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
