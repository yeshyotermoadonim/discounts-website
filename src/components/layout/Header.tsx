'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'כל ההנחות' },
  { href: '/clubs', label: 'מועדונים' },
  { href: '/compare', label: 'השוואה חכמה' },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/75 border-b border-zinc-200/60 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Futuristic Brand Logo & Typography */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none"
            aria-label="יש יותר מועדונים - דף הבית"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 p-[2px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-zinc-950/90 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs">
                <svg
                  className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              {/* Live status dot */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-white"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950">
                  יש יותר
                </span>
                <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-l from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  מועדונים
                </span>
              </div>
              <div className="flex items-center gap-1.5 -mt-1">
                <span className="text-[11px] font-semibold text-zinc-500 tracking-wide">
                  השוואת מועדוני צרכנות
                </span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100/60">
                  2030
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav - Futuristic Pill Bar */}
          <nav className="hidden md:flex items-center gap-1.5 bg-zinc-100/80 p-1.5 rounded-full border border-zinc-200/70 shadow-inner backdrop-blur-md" aria-label="ניווט ראשי">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white text-zinc-950 shadow-sm shadow-zinc-900/5 ring-1 ring-zinc-900/5 scale-102'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/60'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/compare"
              className="relative group hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-extrabold text-white bg-zinc-950 hover:bg-indigo-600 shadow-md shadow-zinc-950/15 hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>השוואת מועדונים</span>
                <span className="text-indigo-400 group-hover:text-white group-hover:-translate-x-1 transition-all">
                  &larr;
                </span>
              </span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className="md:hidden p-2.5 rounded-2xl text-zinc-800 bg-zinc-100/80 hover:bg-zinc-200 border border-zinc-200/80 focus:outline-none transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="תפריט ניווט"
              aria-expanded={menuOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-200/70 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                      : 'text-zinc-700 hover:bg-zinc-100/80'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <span className="text-zinc-400">&larr;</span>
                </Link>
              )
            })}
            <div className="pt-2">
              <Link
                href="/compare"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-extrabold text-white bg-zinc-950 hover:bg-zinc-800 shadow-md"
                onClick={() => setMenuOpen(false)}
              >
                <span>השוואת מועדונים ראש בראש</span>
                <span>&larr;</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
