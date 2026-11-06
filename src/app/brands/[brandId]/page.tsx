import { getDataStore, getBrandsWithListings } from '@/lib/data'
import { LogoImage } from '@/components/ui/LogoImage'
import { notFound } from 'next/navigation'
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
  const brand = store.brands.find((item) => item.id === brandId)
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
  const brand = (await getBrandsWithListings(store)).find((item) => item.id === brandId)
  if (!brand) notFound()

  const categoryNames = brand.categories
    .map((catId) => store.categories.find((category) => category.id === catId)?.name)
    .filter((name): name is string => Boolean(name) && name !== 'אחר')

  const missing = store.clubs.filter(
    (club) => !brand.listings.some((listing) => listing.clubId === club.id),
  )

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
      <Link href="/" className="text-sm text-[var(--muted)] hover:text-[var(--ink)]">
        מותגים
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <LogoImage logoUrl={brand.logoUrl} brandName={brand.name} size="lg" />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{brand.name}</h1>
          {categoryNames.length > 0 && (
            <p className="mt-1 text-sm text-[var(--muted)]">{categoryNames.join(' · ')}</p>
          )}
        </div>
      </div>

      <ul className="mt-8 space-y-3">
        {brand.listings.map((listing) => (
          <li
            key={listing.clubId}
            className="rounded-3xl bg-white border border-[var(--line)] overflow-hidden shadow-[0_10px_28px_rgba(18,21,28,0.05)]"
          >
            <div className="h-1.5" style={{ backgroundColor: listing.club.color }} />
            <div className="px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{listing.club.name}</p>
                {listing.online ? (
                  <span className="mt-2 inline-block rounded-full bg-[#12151c] px-2.5 py-1 text-[11px] text-white">
                    אונליין
                  </span>
                ) : (
                  <p className="mt-1 text-sm text-[var(--muted)]">זמין</p>
                )}
              </div>
              <a
                href={listing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm"
              >
                לאתר
              </a>
            </div>
          </li>
        ))}
      </ul>

      {missing.length > 0 && (
        <p className="mt-6 text-sm text-[var(--muted)]">
          לא נמצא ב{missing.map((club) => club.name).join(' · ')}
        </p>
      )}
    </div>
  )
}
