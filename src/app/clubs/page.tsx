import { getDataStore } from '@/lib/data'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מועדונים | יש יותר מועדונים',
  description: 'חבר שלי, בהצדעה וביימי אול.',
}

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function ClubsPage() {
  const store = await getDataStore()

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">מועדונים</h1>
        <Link href="/gaps" className="rounded-full bg-[#12151c] px-4 py-2 text-sm text-white">
          פערים בין מועדונים
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {store.clubs.map((club) => {
          const count = new Set(
            store.listings.filter((listing) => listing.clubId === club.id).map((listing) => listing.brandId),
          ).size
          return (
            <Link
              key={club.id}
              href={`/clubs/${club.id}`}
              className="rounded-3xl border border-[var(--line)] bg-white overflow-hidden shadow-[0_12px_32px_rgba(18,21,28,0.05)]"
            >
              <span className="block h-2" style={{ backgroundColor: club.color }} />
              <div className="p-6">
                <h2 className="text-xl font-semibold">{club.name}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{club.nameEn}</p>
                <p className="mt-8 text-3xl font-semibold">{count}</p>
                <p className="text-xs text-[var(--muted)]">מותגים</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
