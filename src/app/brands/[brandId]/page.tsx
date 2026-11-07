import { getDataStore, getBrandsWithListings } from '@/lib/data'
import { formatListingTags, listingTags } from '@/lib/labels'
import { LogoImage } from '@/components/ui/LogoImage'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface BrandPageProps {
  params: Promise<{ brandId: string }>
}

export async function generateStaticParams() {
  const store = await getDataStore()
  return store.brands.map((brand) => ({ brandId: brand.id }))
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { brandId } = await params
  const store = await getDataStore()
  const brand = (await getBrandsWithListings(store)).find((item) => item.sourceIds.includes(brandId))
  if (!brand) return { title: 'מותג לא נמצא' }
  return {
    title: `${brand.name} | יש יותר מועדונים`,
    description: `באילו מועדונים ${brand.name} זמין.`,
  }
}

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function BrandDetailPage({ params }: BrandPageProps) {
  const { brandId } = await params
  const store = await getDataStore()
  const brand = (await getBrandsWithListings(store)).find((item) => item.sourceIds.includes(brandId))
  if (!brand) notFound()
  if (brand.id !== brandId) redirect(`/brands/${brand.id}`)

  const missing = store.clubs.filter(
    (club) => !brand.listings.some((listing) => listing.clubId === club.id),
  )

  return (
    <div className="max-w-3xl mx-auto px-4 pt-4 pb-8">
      <Link href="/" className="text-sm text-[var(--muted)]">מותגים</Link>
      <div className="mt-4 flex items-center gap-3">
        <LogoImage logoUrl={brand.logoUrl} brandName={brand.name} size="lg" />
        <h1 className="text-xl font-semibold">{brand.name}</h1>
      </div>

      <ul className="mt-6">
        {brand.listings.map((listing) => (
          <li key={listing.clubId} className="border-b border-[var(--line)]">
            <a
              href={listing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 min-h-14"
            >
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5" style={{ backgroundColor: listing.club.color }} />
                <span>{listing.club.name}</span>
              </span>
              <span className="text-sm text-[var(--muted)]">
                {formatListingTags(listingTags(listing)) || 'זמין'}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {missing.length > 0 && (
        <p className="mt-4 text-sm text-[var(--muted)]">
          חסר ב{missing.map((club) => club.name).join(' · ')}
        </p>
      )}
    </div>
  )
}
