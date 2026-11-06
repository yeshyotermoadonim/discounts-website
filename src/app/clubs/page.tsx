import { getDataStore, getBrandsWithDiscounts } from '@/lib/data'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מועדוני צרכנות | יש יותר מועדונים',
  description: 'רשימת מועדוני הצרכנות המובילים בישראל: חבר שלי, בהצדעה, ביימי ועוד.',
}

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function ClubsPage() {
  const store = await getDataStore()
  const brandsWithDiscounts = await getBrandsWithDiscounts(store)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200/90 shadow-2xs text-xs font-bold text-zinc-800 mb-5">
          <span>🏷️</span>
          <span>מועדוני צרכנות בישראל</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-zinc-950 tracking-tight mb-4">
          כל המועדונים <span className="bg-gradient-to-l from-indigo-600 to-violet-600 bg-clip-text text-transparent">במקום אחד</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
          בדקו אילו מותגים והטבות מוצעים בכל אחד ממועדוני הצרכנות המובילים בישראל.
        </p>
      </div>

      {/* Clubs Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {store.clubs.map((club) => {
          const clubDiscounts = store.discounts.filter((d) => d.clubId === club.id)
          const brandCount = new Set(clubDiscounts.map((d) => d.brandId)).size

          return (
            <Link
              key={club.id}
              href={`/clubs/${club.id}`}
              className="group block bg-white/95 backdrop-blur-xl rounded-3xl border border-zinc-200/90 p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_35px_-8px_rgba(99,102,241,0.12)] hover:border-indigo-400/70 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Club color accent line */}
              <div
                className="absolute top-0 right-0 left-0 h-1.5"
                style={{ backgroundColor: club.color }}
              />

              <div className="flex items-center gap-4.5 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: club.color }}
                >
                  {club.name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-black text-zinc-950 group-hover:text-indigo-600 transition-colors">
                    {club.name}
                  </h2>
                  <p className="text-xs font-semibold text-zinc-400 tracking-wider mt-0.5">{club.nameEn}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-sm">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  מותגים פעילים:
                </span>
                <span className="font-black text-zinc-950 bg-zinc-100/90 px-3.5 py-1 rounded-full text-xs">
                  {brandCount > 0 ? `${brandCount} מותגים` : 'בקרוב'}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-black text-indigo-600 group-hover:gap-3 transition-all">
                <span>צפייה בכל ההטבות של {club.name}</span>
                <span aria-hidden="true">&larr;</span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Compare Clubs Promo Banner */}
      <div className="relative rounded-3xl bg-gradient-to-tr from-zinc-950 via-zinc-900 to-indigo-950 p-8 sm:p-12 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold mb-4 backdrop-blur-md border border-white/10">
            <span>⚡</span>
            <span>השוואה מהירה</span>
          </span>
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
            מתלבטים בין שני מועדונים?
          </h3>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-8 font-normal">
            כלי ההשוואה מאפשר לכם להעמיד שני מועדונים ראש בראש ולראות בדיוק מי מציע אחוזי הנחה גבוהים יותר בכל מותג.
          </p>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-extrabold text-zinc-950 bg-white hover:bg-zinc-100 transition-all shadow-lg hover:scale-105"
          >
            <span>מעבר להשוואת מועדונים</span>
            <span>&larr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
