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
  placeholder = 'חיפוש מותג',
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value
    setLocalValue(next)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => onChange(next), 200)
  }

  return (
    <div className="relative">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7b8494]"
      >
        <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 16.5 20 20.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        dir="rtl"
        aria-label="חיפוש מותג"
        className="w-full rounded-2xl border border-[var(--line)] bg-white py-4 pr-12 pl-4 text-base text-[var(--ink)] shadow-[0_10px_30px_rgba(18,21,28,0.06)] placeholder:text-[#8b93a1] focus:outline-none focus:border-[#12151c]"
      />
    </div>
  )
}
