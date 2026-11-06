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

  const clubBrands = allBrandsWithDiscounts.filter((b) =>
    b.discounts.some((d) => d.clubId === clubId)
  )

  const exclusiveCount = clubBrands.filter((b) => b.discounts.length === 1).length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-bold text-zinc-400 mb-6">
        <Link href="/" className="hover:text-zinc-950 transition-colors">בית</Link>
        <span>/</span>
        <Link href="/clubs" className="hover:text-zinc-950 transition-colors">מועדונים</Link>
        <span>/</span>
        <span className="text-zinc-950">{club.name}</span>
      </nav>

      {/* Club Hero Banner */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] mb-10 overflow-hidden">
        <div
          className="absolute top-0 right-0 left-0 h-1.5"
          style={{ backgroundColor: club.color }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-lg flex-shrink-0"
              style={{ backgroundColor: club.color }}
            >
              {club.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-4xl font-black text-zinc-950">
                  {club.name}
                </h1>
                <span className="text-xs px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-bold">
                  {club.nameEn}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1.5 font-medium">
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
                className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors"
              >
                <span>לאתר המועדון</span>
                <span aria-hidden="true">&nearr;</span>
              </a>
            )}
            <Link
              href={`/compare?club1=${club.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-black px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-indigo-600 text-white transition-all shadow-md shadow-zinc-950/10"
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
