import { getDataStore, getBrandsWithDiscounts } from '@/lib/data'
import { ComparisonTable } from '@/components/comparison/ComparisonTable'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'השוואת מועדוני צרכנות | יש יותר מועדונים',
  description: 'השוו הנחות ומבצעים בין שני מועדוני צרכנות ובדקו איזה מועדון משתלם יותר עבורכם.',
}

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function ComparePage() {
  const store = await getDataStore()
  const brands = await getBrandsWithDiscounts(store)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200/90 shadow-2xs text-zinc-800 text-xs font-bold mb-4">
          <span>⚡</span>
          <span>השוואה ראש בראש</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-zinc-950 tracking-tight mb-4">
          השוואת מועדונים <span className="bg-gradient-to-l from-indigo-600 to-violet-600 bg-clip-text text-transparent">חכמה</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
          בחרו שני מועדונים והשוו את אחוזי ההנחה שלהם בכל מותג כדי לדעת בדיוק איפה משתלם לקנות.
        </p>
      </div>

      <ComparisonTable
        clubs={store.clubs}
        brands={brands}
        categories={store.categories}
        defaultClub1Id="hever-sheli"
        defaultClub2Id="behatsdaa"
      />
    </div>
  )
}
