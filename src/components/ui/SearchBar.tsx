'use client'

import { useEffect, useRef, useState } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'חפשו מותג (לדוגמה: Converse, Careline, שילב)...',
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setLocalValue(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onChange(val)
    }, 200)
  }

  const handleClear = () => {
    setLocalValue('')
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* 2030 Gradient Aura Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/15 via-violet-500/15 to-purple-500/15 blur-lg pointer-events-none opacity-80" />

      {/* Floating Glass Search Input */}
      <div className="relative flex items-center bg-white/95 backdrop-blur-xl rounded-2xl border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/15 transition-all duration-300">
        {/* Right Search Icon (RTL) */}
        <div className="flex items-center pr-5 pl-3 pointer-events-none text-zinc-400">
          <svg
            className="w-5 h-5 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          dir="rtl"
          className="w-full py-4.5 pr-1 pl-14 text-base font-semibold text-zinc-950 placeholder:text-zinc-400 bg-transparent focus:outline-none"
          aria-label="חיפוש מותגים והנחות"
        />

        {/* Clear Button or Modern Pill on the Left */}
        <div className="absolute left-4 flex items-center">
          {localValue ? (
            <button
              onClick={handleClear}
              className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-all cursor-pointer"
              aria-label="נקה חיפוש"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold text-zinc-400 bg-zinc-100 border border-zinc-200">
              חיפוש מהיר
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
