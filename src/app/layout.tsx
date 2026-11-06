import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'יש יותר מועדונים | מנוע השוואת הנחות מועדוני צרכנות 2030',
  description:
    'מנוע AI מתקדם להשוואת הנחות ומבצעים מכל מועדוני הצרכנות בישראל: חבר שלי, בהצדעה, ביימי ועוד. השוו מחירים והנחות בזמן אמת וחסכו בכל קנייה.',
  keywords: 'מועדוני צרכנות, השוואת הנחות, חבר שלי, בהצדעה, ביימי, קופונים, חיסכון, מבצעים, יש יותר מועדונים',
  openGraph: {
    title: 'יש יותר מועדונים | השוואת הטבות מועדונים בזמן אמת',
    description: 'גלו היכן נמצאת ההנחה המשתלמת ביותר עבור המותגים המובילים בישראל',
    locale: 'he_IL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-full bg-[#fafbfe] text-zinc-900 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white bg-mesh-canvas">
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
