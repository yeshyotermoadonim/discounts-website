import { getDataStore, getBrandsWithListings } from '@/lib/data'
import { BrandGrid } from '@/components/BrandGrid'

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function HomePage() {
  const store = await getDataStore()
  const brands = await getBrandsWithListings(store)

  return (
    <div className="max-w-3xl mx-auto px-4 pt-4 pb-8">
      <h1 className="sr-only">מותגים</h1>
      <BrandGrid brands={brands} clubs={store.clubs} />
    </div>
  )
}
