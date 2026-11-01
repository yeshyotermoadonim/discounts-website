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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
          השוואת מועדונים
        </h1>
        <p className="text-gray-600">
          בחרו שני מועדונים והשוו את ההנחות שלהם ראש בראש
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
