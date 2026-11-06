import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white/90 backdrop-blur-xl border-t border-zinc-200/80 mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-black text-zinc-950">
                יש יותר <span className="bg-gradient-to-l from-indigo-600 to-violet-600 bg-clip-text text-transparent">מועדונים</span>
              </span>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed max-w-md font-normal">
              פלטפורמת השוואת ההנחות וההטבות של מועדוני הצרכנות המובילים בישראל.
              מנוע השוואה מתקדם המציג בזמן אמת היכן משתלם לקנות.
            </p>
            <div className="flex items-center gap-2.5 text-xs text-zinc-500 font-semibold">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>נתוני השוואה מעודכנים בזמן אמת לשנת 2030</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-black text-zinc-950 uppercase tracking-wider mb-4">
              ניווט מהיר
            </h4>
            <ul className="space-y-3 text-sm font-semibold text-zinc-600">
              <li>
                <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  <span>כל המותגים וההנחות</span>
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  <span>מועדוני צרכנות</span>
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  <span>השוואה ראש בראש</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Supported Clubs List */}
          <div>
            <h4 className="text-xs font-black text-zinc-950 uppercase tracking-wider mb-4">
              מועדונים נתמכים
            </h4>
            <ul className="space-y-3 text-sm font-semibold text-zinc-600">
              <li>
                <Link href="/clubs/hever-sheli" className="hover:text-indigo-600 transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>חבר שלי</span>
                </Link>
              </li>
              <li>
                <Link href="/clubs/behatsdaa" className="hover:text-indigo-600 transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>בהצדעה</span>
                </Link>
              </li>
              <li>
                <Link href="/clubs/buyme" className="hover:text-indigo-600 transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span>ביימי (BuyMe)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-zinc-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p className="font-semibold">© {new Date().getFullYear()} יש יותר מועדונים. פותח בעיצוב הדור הבא.</p>
          <p className="text-center sm:text-left max-w-lg leading-relaxed">
            כל הסימנים המסחריים שייכים לבעליהם. הנתונים מוצגים לצורכי השוואת מחירים וצרכנות נבונה.
          </p>
        </div>
      </div>
    </footer>
  )
}
