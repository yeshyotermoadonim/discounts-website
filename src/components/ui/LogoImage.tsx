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
  sm: { px: 40, containerClass: 'w-10 h-10 rounded-xl', textClass: 'text-sm font-bold' },
  md: { px: 64, containerClass: 'w-14 h-14 rounded-2xl', textClass: 'text-lg font-bold' },
  lg: { px: 96, containerClass: 'w-20 h-20 rounded-2xl', textClass: 'text-2xl font-black' },
}

export function LogoImage({ logoUrl, brandName, size = 'md' }: LogoImageProps) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { px, containerClass, textClass } = sizeConfig[size]

  const firstChar = brandName.charAt(0).toUpperCase()

  if (!logoUrl || error) {
    return (
      <div
        className={`${containerClass} bg-gradient-to-tr from-indigo-50 to-violet-100/80 border border-indigo-100 flex items-center justify-center flex-shrink-0 shadow-xs`}
        aria-label={brandName}
      >
        <span className={`${textClass} bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent select-none`}>
          {firstChar}
        </span>
      </div>
    )
  }

  return (
    <div
      className={`${containerClass} relative bg-white border border-zinc-100 p-1 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-xs`}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-zinc-100 animate-pulse rounded-2xl" />
      )}
      <Image
        src={logoUrl}
        alt={`לוגו ${brandName}`}
        width={px}
        height={px}
        className={`object-contain max-h-full max-w-full rounded-xl transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        unoptimized
      />
    </div>
  )
}
