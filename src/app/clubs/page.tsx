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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
          מועדוני הצרכנות
        </h1>
        <p className="text-gray-600">
          כל המועדונים הנתמכים באתר. לחצו על מועדון לצפייה בכל ההטבות שלו.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {store.clubs.map((club) => {
          const clubDiscounts = store.discounts.filter((d) => d.clubId === club.id)
          const brandCount = new Set(clubDiscounts.map((d) => d.brandId)).size

          return (
            <Link
              key={club.id}
              href={`/clubs/${club.id}`}
              className="group block bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-sm"
                  style={{ backgroundColor: club.color }}
                >
                  {club.name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {club.name}
                  </h2>
                  <p className="text-xs text-gray-500">{club.nameEn}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
                <span className="text-gray-500">מותגים זמינים:</span>
                <span className="font-bold text-gray-900">
                  {brandCount > 0 ? `${brandCount} מותגים` : 'בקרוב'}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                <span>צפייה בכל ההטבות</span>
                <span aria-hidden="true">&larr;</span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-12 text-center bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-blue-900 mb-2">רוצים להשוות בין שני מועדונים?</h3>
        <p className="text-sm text-blue-700 mb-4">
          כלי ההשוואה מאפשר לכם לבדוק בדיוק איזה מועדון מציע הנחות גבוהות יותר
        </p>
        <Link
          href="/compare"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <span>מעבר להשוואת מועדונים</span>
          <span aria-hidden="true">&larr;</span>
        </Link>
      </div>
    </div>
  )
}
