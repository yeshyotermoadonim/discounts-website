import Link from 'next/link'
import { BrandWithListings } from '@/types'
import { formatListingTags, listingTags } from '@/lib/labels'
import { LogoImage } from './LogoImage'

interface BrandCardProps {
  brand: BrandWithListings
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/brands/${brand.id}`} className="brand-row flex items-center gap-3 min-h-[52px] py-2 border-b border-[var(--line)]">
      <LogoImage logoUrl={brand.logoUrl} brandName={brand.name} size="sm" />
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] leading-5 truncate">{brand.name}</span>
        <span className="block text-[12px] leading-4 truncate">
          {brand.listings.map((listing, index) => {
            const tags = formatListingTags(listingTags(listing))
            return (
              <span key={listing.clubId} style={{ color: listing.club.color }}>
                {index > 0 && <span className="text-[var(--muted)]"> · </span>}
                {listing.club.name}
                {tags && <span className="text-[var(--muted)]"> {tags}</span>}
              </span>
            )
          })}
        </span>
      </span>
    </Link>
  )
}
