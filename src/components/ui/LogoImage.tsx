'use client'

import Image from 'next/image'
import { useState } from 'react'

type LogoSize = 'sm' | 'md' | 'lg'

interface LogoImageProps {
  logoUrl: string | null
  brandName: string
  size?: LogoSize
}

const sizeConfig: Record<LogoSize, { px: number; containerClass: string; textClass: string }> = {
  sm: { px: 36, containerClass: 'w-9 h-9', textClass: 'text-sm font-medium' },
  md: { px: 56, containerClass: 'w-14 h-14', textClass: 'text-lg font-medium' },
  lg: { px: 72, containerClass: 'w-16 h-16', textClass: 'text-xl font-medium' },
}

export function LogoImage({ logoUrl, brandName, size = 'md' }: LogoImageProps) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { px, containerClass, textClass } = sizeConfig[size]

  const firstChar = brandName.charAt(0).toUpperCase()

  if (!logoUrl || error) {
    return (
      <div
        className={`${containerClass} bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center flex-shrink-0`}
        aria-label={brandName}
      >
        <span className={`${textClass} text-[var(--ink)] select-none`}>
          {firstChar}
        </span>
      </div>
    )
  }

  return (
    <div
      className={`${containerClass} relative bg-[var(--paper)] border border-[var(--line)] p-0.5 flex items-center justify-center flex-shrink-0 overflow-hidden`}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-zinc-100 animate-pulse rounded-2xl" />
      )}
      <Image
        src={logoUrl}
        alt={`לוגו ${brandName}`}
        width={px}
        height={px}
        className={`object-contain max-h-full max-w-full transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        unoptimized
      />
    </div>
  )
}
