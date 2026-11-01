import { getDataStore, getBrandsWithDiscounts } from '@/lib/data'
import { BrandGrid } from '@/components/BrandGrid'

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function HomePage() {
  const store = await getDataStore()
  const brandsWithDiscounts = await getBrandsWithDiscounts(store)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero section */}
      <section className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4 border border-blue-100">
          <span>🎯</span>
          <span>כל ההנחות במקום אחד</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mb-3">
          יש יותר מועדונים
        </h1>
        <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
          השוו הנחות מכל מועדוני הצרכנות הישראלים — חבר שלי, ביימי, בהצדעה ועוד. גלו היכן ההטבה המשתלמת ביותר!
        </p>
      </section>

      {/* Main interactive grid */}
      <BrandGrid
        brands={brandsWithDiscounts}
        clubs={store.clubs}
        categories={store.categories}
      />
    </div>
  )
}
