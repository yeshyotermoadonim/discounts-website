import { getDataStore, getBrandsWithDiscounts } from '@/lib/data'
import { BrandGrid } from '@/components/BrandGrid'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface ClubPageProps {
  params: Promise<{ clubId: string }>
}

export async function generateStaticParams() {
  const store = await getDataStore()
  return store.clubs.map((club) => ({
    clubId: club.id,
  }))
}

export async function generateMetadata({ params }: ClubPageProps): Promise<Metadata> {
  const { clubId } = await params
  const store = await getDataStore()
  const club = store.clubs.find((c) => c.id === clubId)

  if (!club) {
    return { title: 'מועדון לא נמצא' }
  }

  return {
    title: `הנחות ומבצעים ב${club.name} | יש יותר מועדונים`,
    description: `כל ההנחות וההטבות של מועדון ${club.name} (${club.nameEn}). חיפוש, סינון והשוואה.`,
  }
}

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function ClubDetailPage({ params }: ClubPageProps) {
  const { clubId } = await params
  const store = await getDataStore()
  const club = store.clubs.find((c) => c.id === clubId)

  if (!club) {
    notFound()
  }

  const allBrandsWithDiscounts = await getBrandsWithDiscounts(store)

  // Filter to brands that have discounts in this club
  const clubBrands = allBrandsWithDiscounts.filter((b) =>
    b.discounts.some((d) => d.clubId === clubId)
  )

  // Find exclusive brands
  const exclusiveCount = clubBrands.filter((b) => b.discounts.length === 1).length

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600 transition-colors">בית</Link>
        <span>/</span>
        <Link href="/clubs" className="hover:text-blue-600 transition-colors">מועדונים</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{club.name}</span>
      </nav>

      {/* Club Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-sm flex-shrink-0"
              style={{ backgroundColor: club.color }}
            >
              {club.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                  {club.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                  {club.nameEn}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                נמצאו {clubBrands.length} הטבות פעילות
                {exclusiveCount > 0 && ` • ${exclusiveCount} בלעדיים למועדון זה`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {club.url && (
              <a
                href={club.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <span>לאתר המועדון</span>
                <span aria-hidden="true">&nearr;</span>
              </a>
            )}
            <Link
              href={`/compare?club1=${club.id}`}
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors border border-blue-100"
            >
              <span>השוואת מועדון</span>
              <span aria-hidden="true">&larr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Brand Grid pre-filtered by this club */}
      <BrandGrid
        brands={clubBrands}
        clubs={store.clubs}
        categories={store.categories}
        initialClubId={clubId}
      />
    </div>
  )
}
