// Site footer with copyright and disclaimer in Hebrew
export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-center">
          <p className="font-semibold text-gray-200">יש יותר מועדונים</p>
          <p className="text-xs leading-relaxed max-w-lg">
            כל ההסכמים עם המותגים הם בין המותגים למועדוני הצרכנות. אתר זה מציג מידע בלבד ואינו מהווה
            המלצה. ייתכן שהמידע אינו עדכני — בדקו ישירות מול המועדון.
          </p>
          <p className="text-xs text-gray-500">© 2024</p>
        </div>
      </div>
    </footer>
  )
}
