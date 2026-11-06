import Link from 'next/link'
import { getDataStore, getBrandsWithListings } from '@/lib/data'
import { BrandGrid } from '@/components/BrandGrid'

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function HomePage() {
  const store = await getDataStore()
  const brands = await getBrandsWithListings(store)

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">מותגים</h1>
        <Link
          href="/gaps"
          className="rounded-full bg-[#12151c] px-4 py-2 text-sm text-white"
        >
          פערים בין מועדונים
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {store.clubs.map((club) => {
          const count = brands.filter((brand) =>
            brand.listings.some((listing) => listing.clubId === club.id),
          ).length
          return (
            <Link
              key={club.id}
              href={`/clubs/${club.id}`}
              className="rounded-2xl bg-white border border-[var(--line)] px-4 py-4 shadow-[0_8px_24px_rgba(18,21,28,0.04)]"
            >
              <span className="block h-1 w-8 rounded-full mb-3" style={{ backgroundColor: club.color }} />
              <p className="text-xl sm:text-2xl font-semibold">{count}</p>
              <p className="text-xs text-[var(--muted)] mt-1">{club.name}</p>
            </Link>
          )
        })}
      </div>

      <BrandGrid brands={brands} clubs={store.clubs} categories={store.categories} />
    </div>
  )
}
