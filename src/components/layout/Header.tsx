'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'כל ההנחות' },
  { href: '/clubs', label: 'מועדונים' },
  { href: '/compare', label: 'השוואת מועדונים' },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200/60 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="יש יותר מועדונים - דף הבית"
          >
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/30 group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-white/10 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              {/* Subtle active ping dot */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-white"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-zinc-950">
                  יש יותר
                </span>
                <span className="text-xl font-black tracking-tight bg-gradient-to-l from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  מועדונים
                </span>
              </div>
              <span className="text-[10px] font-medium text-zinc-600 -mt-0.5 tracking-wider">
                השוואת הטבות צרכנות
              </span>
            </div>
          </Link>

          {/* Desktop Nav - Centered Pills */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-100/80 p-1.5 rounded-full border border-zinc-200/50 shadow-inner" aria-label="ניווט ראשי">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-zinc-950 shadow-sm shadow-zinc-950/5'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Left CTA & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/compare"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 shadow-md shadow-zinc-950/10 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>השוו מועדונים</span>
              <span className="text-zinc-400 group-hover:translate-x-0.5 transition-transform">
                &larr;
              </span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              className="md:hidden p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="תפריט"
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-100 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-zinc-700 hover:bg-zinc-50'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-2">
              <Link
                href="/compare"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-zinc-950 hover:bg-zinc-800"
                onClick={() => setMenuOpen(false)}
              >
                <span>השוו בין מועדונים</span>
                <span>&larr;</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
