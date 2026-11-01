'use client'

// Smart image component with text fallback for brand logos
import Image from 'next/image'
import { useState } from 'react'

type LogoSize = 'sm' | 'md' | 'lg'

interface LogoImageProps {
  logoUrl: string | null
  brandName: string
  size?: LogoSize
}

const sizeConfig: Record<LogoSize, { px: number; textClass: string; containerClass: string }> = {
  sm: { px: 40, textClass: 'text-base font-bold', containerClass: 'w-10 h-10' },
  md: { px: 64, textClass: 'text-xl font-bold', containerClass: 'w-16 h-16' },
  lg: { px: 96, textClass: 'text-3xl font-bold', containerClass: 'w-24 h-24' },
}

export function LogoImage({ logoUrl, brandName, size = 'md' }: LogoImageProps) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { px, textClass, containerClass } = sizeConfig[size]

  const firstChar = brandName.charAt(0).toUpperCase()

  if (!logoUrl || error) {
    // Text fallback with brand initial
    return (
      <div
        className={`${containerClass} rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0`}
        aria-label={brandName}
      >
        <span className={`${textClass} text-blue-700 select-none`}>{firstChar}</span>
      </div>
    )
  }

  return (
    <div className={`${containerClass} relative rounded-xl overflow-hidden flex-shrink-0`}>
      {/* Skeleton loader */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl" />
      )}
      <Image
        src={logoUrl}
        alt={`לוגו ${brandName}`}
        width={px}
        height={px}
        className={`object-contain w-full h-full transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        unoptimized
      />
    </div>
  )
}
