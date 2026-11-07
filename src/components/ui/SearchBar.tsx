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
    <input
      type="search"
      value={localValue}
      onChange={handleChange}
      placeholder={placeholder}
      dir="rtl"
      aria-label="חיפוש מותג"
      className="min-w-0 flex-1 h-11 border border-[var(--line)] bg-[var(--paper)] px-3 text-[15px] text-[var(--ink)] placeholder:text-[#a39e94] focus:outline-none focus:border-[var(--ink)]"
    />
  )
}
