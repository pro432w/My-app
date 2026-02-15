import './globals.css'

export const metadata = {
  title: 'My News Portal',
  description: 'Breaking news and vlogs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <nav className="bg-white shadow p-4 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <a href="/" className="text-xl font-bold text-blue-600">NewsPortal</a>
            <div className="space-x-4 text-sm font-medium">
              <a href="/" className="hover:text-blue-600">Home</a>
              <a href="/admin" className="hover:text-blue-600">Admin</a>
            </div>
          </div>
        </nav>
        <main className="flex-1 max-w-4xl mx-auto w-full p-4">
          {children}
        </main>
        <footer className="bg-gray-100 border-t p-6 text-center text-gray-500 text-sm">
          &copy; 2024 News Portal. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
