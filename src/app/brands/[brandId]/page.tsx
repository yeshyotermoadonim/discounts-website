import { getDataStore, getBrandsWithDiscounts } from '@/lib/data'
import { LogoImage } from '@/components/ui/LogoImage'
import { DiscountBadge } from '@/components/ui/DiscountBadge'
import { ClubBadge } from '@/components/ui/ClubBadge'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface BrandPageProps {
  params: Promise<{ brandId: string }>
}

export async function generateStaticParams() {
  const store = await getDataStore()
  return store.brands.map((brand) => ({
    brandId: brand.id,
  }))
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { brandId } = await params
  const store = await getDataStore()
  const brand = store.brands.find((b) => b.id === brandId)

  if (!brand) {
    return { title: 'מותג לא נמצא' }
  }

  return {
    title: `הנחות ומבצעים ב-${brand.name} | יש יותר מועדונים`,
    description: `השוואת הנחות והטבות עבור ${brand.name} בכל מועדוני הצרכנות בישראל.`,
  }
}

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function BrandDetailPage({ params }: BrandPageProps) {
  const { brandId } = await params
  const store = await getDataStore()
  const brandsWithDiscounts = await getBrandsWithDiscounts(store)
  const brand = brandsWithDiscounts.find((b) => b.id === brandId)

  if (!brand) {
    notFound()
  }

  const categoryNames = brand.categories
    .map((catId) => store.categories.find((c) => c.id === catId)?.name)
    .filter((n): n is string => Boolean(n))

  const maxDiscount = brand.bestDiscount

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600 transition-colors">בית</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{brand.name}</span>
      </nav>

      {/* Brand Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-right">
          <LogoImage logoUrl={brand.logoUrl} brandName={brand.name} size="lg" />
          <div className="flex-1">
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 mb-2">
              {brand.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
              {categoryNames.map((name) => (
                <span
                  key={name}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {name}
                </span>
              ))}
            </div>
            {brand.bestDiscount !== null && (
              <p className="text-sm text-gray-600">
                הנחה מרבית זמינה:{' '}
                <span className="font-extrabold text-green-600 text-lg">
                  {brand.bestDiscount}%
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Club Discounts Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          הנחות זמינות לפי מועדון ({brand.discounts.length})
        </h2>

        {brand.discounts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            כרגע אין הנחות זמינות עבור מותג זה
          </p>
        ) : (
          <div className="space-y-4">
            {brand.discounts.map((discount) => {
              const isBest =
                discount.discountPercentage !== null &&
                discount.discountPercentage === maxDiscount

              return (
                <div
                  key={discount.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isBest
                      ? 'border-green-200 bg-green-50/60 shadow-xs'
                      : 'border-gray-100 bg-gray-50/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <ClubBadge club={discount.club} size="md" />
                      {isBest && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-600 text-white">
                          <span>🏆</span>
                          <span>ההנחה הגבוהה ביותר</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <DiscountBadge discount={discount} highlight={isBest} size="lg" />
                    </div>
                  </div>

                  {/* Additional offer details */}
                  <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">מימוש אונליין:</span>
                      <span>
                        {discount.onlineRedemption === true
                          ? '✅ זמין'
                          : discount.onlineRedemption === false
                          ? '❌ לא זמין'
                          : '❓ לא צוין'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">מימוש במובייל:</span>
                      <span>
                        {discount.mobileRedemption === true
                          ? '✅ זמין'
                          : discount.mobileRedemption === false
                          ? '❌ לא זמין'
                          : '❓ לא צוין'}
                      </span>
                    </div>
                  </div>

                  {discount.redemptionUrl && (
                    <div className="mt-3">
                      <a
                        href={discount.redemptionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        <span>למעבר למימוש ההטבה</span>
                        <span aria-hidden="true">&larr;</span>
                      </a>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Back button */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm transition-colors"
        >
          <span aria-hidden="true">&rarr;</span>
          <span>חזרה לכל המותגים</span>
        </Link>
      </div>
    </div>
  )
}
