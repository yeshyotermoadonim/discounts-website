import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'יש יותר מועדונים | השוואת הנחות מועדוני צרכנות',
  description:
    'אגרגטור הנחות ומבצעים ממועדוני צרכנות ישראלים: חבר שלי, ביימי, בהצדעה ועוד. מצאו היכן תקבלו את ההנחה הטובה ביותר.',
  keywords: 'מועדוני צרכנות, הנחות, חבר שלי, בהצדעה, ביימי, קופונים, השוואת מחירים',
  openGraph: {
    title: 'יש יותר מועדונים | השוואת הנחות מועדוני צרכנות',
    description: 'השוואת הנחות ומבצעים ממועדוני צרכנות ישראלים',
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
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
