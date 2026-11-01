import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200/70 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-xs">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-lg font-black text-zinc-950">
                יש יותר <span className="text-indigo-600">מועדונים</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-md">
              פלטפורמת השוואת ההנחות וההטבות של מועדוני הצרכנות המובילים בישראל.
              חוסכים חכם, מוצאים את המועדון המשתלם ביותר, ונהנים מכל הטבה.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>נתוני השוואה בזמן אמת</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wider mb-4">
              ניווט מהיר
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600">
              <li>
                <Link href="/" className="hover:text-indigo-600 transition-colors">
                  כל המותגים וההנחות
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="hover:text-indigo-600 transition-colors">
                  מועדוני צרכנות
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-indigo-600 transition-colors">
                  השוואה ראש בראש
                </Link>
              </li>
            </ul>
          </div>

          {/* Clubs list */}
          <div>
            <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wider mb-4">
              מועדונים נתמכים
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600">
              <li>
                <Link href="/clubs/hever-sheli" className="hover:text-indigo-600 transition-colors">
                  חבר שלי (Hever Sheli)
                </Link>
              </li>
              <li>
                <Link href="/clubs/behatsdaa" className="hover:text-indigo-600 transition-colors">
                  בהצדעה (Behatsdaa)
                </Link>
              </li>
              <li>
                <Link href="/clubs/buyme" className="hover:text-indigo-600 transition-colors">
                  ביימי (BuyMe)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} יש יותר מועדונים. כל הזכויות שמורות.</p>
          <p className="text-center sm:text-left max-w-lg leading-relaxed">
            כל ההסכמים עם המותגים הם בין המותגים למועדוני הצרכנות בלבד. האתר מציג מידע לצורכי השוואה.
          </p>
        </div>
      </div>
    </footer>
  )
}
