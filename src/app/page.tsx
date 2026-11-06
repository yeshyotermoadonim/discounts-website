import { getDataStore, getBrandsWithDiscounts } from '@/lib/data'
import { BrandGrid } from '@/components/BrandGrid'

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function HomePage() {
  const store = await getDataStore()
  const brandsWithDiscounts = await getBrandsWithDiscounts(store)

  return (
    <div className="relative overflow-hidden">
      {/* 2030 Ambient Neon Glow Backdrops */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 -z-10 w-[900px] h-[480px] bg-gradient-to-b from-indigo-200/50 via-purple-100/30 to-transparent blur-3xl opacity-80 pointer-events-none" />
      <div className="absolute top-20 right-10 -z-10 w-[350px] h-[350px] bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-10 -z-10 w-[300px] h-[300px] bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Futuristic Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          {/* Live Indicator Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-zinc-200/90 shadow-sm text-xs font-bold text-zinc-800 mb-6 backdrop-blur-xl">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>מנוע השוואה חי</span>
            <span className="text-zinc-300">•</span>
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent font-extrabold">
              חבר שלי · בהצדעה · ביימי
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-zinc-950 tracking-tight leading-[1.1] mb-6">
            למה לשלם מלא, <br />
            כשאתם <span className="bg-gradient-to-l from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent underline decoration-indigo-200 underline-offset-8">במועדון?</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
            כל ההנחות וההטבות של מועדוני הצרכנות המובילים מרוכזות במקום אחד.
            השוו תוך שניות, גלו איפה הכי משתלם וחסכו בכל קנייה.
          </p>

          {/* Futuristic Feature Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-200/80 p-3.5 shadow-xs text-center transition-all hover:border-indigo-300 hover:shadow-md">
              <div className="text-lg sm:text-2xl font-black text-zinc-950">
                {brandsWithDiscounts.length}+
              </div>
              <div className="text-[11px] font-bold text-zinc-500 mt-0.5">
                מותגים מובילים
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-200/80 p-3.5 shadow-xs text-center transition-all hover:border-indigo-300 hover:shadow-md">
              <div className="text-lg sm:text-2xl font-black text-emerald-600">
                עד 20%
              </div>
              <div className="text-[11px] font-bold text-zinc-500 mt-0.5">
                הנחה ברשתות
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-200/80 p-3.5 shadow-xs text-center transition-all hover:border-indigo-300 hover:shadow-md">
              <div className="text-lg sm:text-2xl font-black text-indigo-600">
                3
              </div>
              <div className="text-[11px] font-bold text-zinc-500 mt-0.5">
                מועדונים בהשוואה
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-200/80 p-3.5 shadow-xs text-center transition-all hover:border-indigo-300 hover:shadow-md">
              <div className="text-lg sm:text-2xl font-black text-zinc-950">
                100%
              </div>
              <div className="text-[11px] font-bold text-zinc-500 mt-0.5">
                חינם וללא הרשמה
              </div>
            </div>
          </div>
        </section>

        {/* Main Interactive Grid & Filter Deck */}
        <BrandGrid
          brands={brandsWithDiscounts}
          clubs={store.clubs}
          categories={store.categories}
        />
      </div>
    </div>
  )
}
