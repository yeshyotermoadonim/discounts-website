import Link from 'next/link'
import { BrandWithListings, Category } from '@/types'
import { LogoImage } from './LogoImage'

interface BrandCardProps {
  brand: BrandWithListings
  categories: Category[]
}

export function BrandCard({ brand, categories }: BrandCardProps) {
  const catNames = brand.categories
    .map((id) => categories.find((category) => category.id === id)?.name)
    .filter((name): name is string => Boolean(name) && name !== 'אחר')

  return (
    <Link href={`/brands/${brand.id}`} className="group block h-full focus:outline-none">
      <article className="h-full overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-[0_12px_32px_rgba(18,21,28,0.05)] transition-transform duration-200 group-hover:-translate-y-0.5">
        <div className="h-1.5 flex">
          {brand.listings.map((listing) => (
            <span key={listing.clubId} className="flex-1" style={{ backgroundColor: listing.club.color }} />
          ))}
        </div>
        <div className="p-5 flex flex-col h-[calc(100%-6px)]">
          <div className="flex items-center gap-3 mb-5">
            <LogoImage logoUrl={brand.logoUrl} brandName={brand.name} size="md" />
            <div className="min-w-0">
              <h3 className="text-base font-semibold truncate">{brand.name}</h3>
              {catNames.length > 0 && (
                <p className="text-xs text-[var(--muted)] truncate mt-0.5">{catNames.join(' · ')}</p>
              )}
            </div>
          </div>

          <ul className="mt-auto space-y-2">
            {brand.listings.map((listing) => (
              <li
                key={`${listing.clubId}-${listing.brandId}`}
                className="flex items-center justify-between gap-3 rounded-2xl px-3 py-2"
                style={{ backgroundColor: `${listing.club.color}14` }}
              >
                <span className="flex items-center gap-2 min-w-0 text-sm font-medium">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: listing.club.color }}
                  />
                  <span className="truncate">{listing.club.name}</span>
                </span>
                {listing.online ? (
                  <span className="flex-shrink-0 rounded-full bg-[#12151c] px-2.5 py-1 text-[11px] font-medium text-white">
                    אונליין
                  </span>
                ) : (
                  <span className="flex-shrink-0 text-[11px] font-medium text-[var(--muted)]">זמין</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Link>
  )
}
