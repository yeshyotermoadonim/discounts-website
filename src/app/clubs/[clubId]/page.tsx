import { getDataStore, getBrandsWithListings } from '@/lib/data'
import { BrandGrid } from '@/components/BrandGrid'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface ClubPageProps {
  params: Promise<{ clubId: string }>
}

export async function generateStaticParams() {
  const store = await getDataStore()
  return store.clubs.map((club) => ({ clubId: club.id }))
}

export async function generateMetadata({ params }: ClubPageProps): Promise<Metadata> {
  const { clubId } = await params
  const store = await getDataStore()
  const club = store.clubs.find((item) => item.id === clubId)
  if (!club) return { title: 'מועדון לא נמצא' }
  return {
    title: `${club.name} | יש יותר מועדונים`,
    description: `מותגים זמינים ב${club.name}.`,
  }
}

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function ClubDetailPage({ params }: ClubPageProps) {
  const { clubId } = await params
  const store = await getDataStore()
  const club = store.clubs.find((item) => item.id === clubId)
  if (!club) notFound()

  const clubBrands = (await getBrandsWithListings(store)).filter((brand) =>
    brand.listings.some((listing) => listing.clubId === clubId),
  )

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
      <Link href="/clubs" className="text-sm text-[var(--muted)] hover:text-[var(--ink)]">
        מועדונים
      </Link>
      <div className="mt-6 mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="block h-1.5 w-10 rounded-full mb-4" style={{ backgroundColor: club.color }} />
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{club.name}</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">{clubBrands.length} מותגים</p>
        </div>
        <a href={club.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-sm">
          אתר המועדון
        </a>
      </div>
      <BrandGrid
        brands={clubBrands}
        clubs={store.clubs}
        categories={store.categories}
        initialClubId={clubId}
      />
    </div>
  )
}
