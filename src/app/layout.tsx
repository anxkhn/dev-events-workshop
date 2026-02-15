import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dev Events - Community Event Board',
  description: 'Discover and share hackathons, meetups, conferences, and workshops for developers.',
  keywords: ['hackathon', 'meetup', 'conference', 'developer events', 'programming'],
  authors: [{ name: 'Dev Events Team' }],
  openGraph: {
    title: 'Dev Events - Community Event Board',
    description: 'Discover and share hackathons, meetups, conferences, and workshops for developers.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-[var(--border)] bg-[var(--card)]">
          <nav className="container flex items-center justify-between h-16">
            <a href="/" className="text-xl font-bold text-[var(--foreground)]">
              Dev Events
            </a>
            <div className="flex items-center gap-6">
              <a href="/events" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                Events
              </a>
              <a href="/submit" className="text-[var(--foreground)] hover:underline">
                Submit Event
              </a>
            </div>
          </nav>
        </header>
        <main className="container py-8">
          {children}
        </main>
        <footer className="border-t border-[var(--border)] mt-auto py-8">
          <div className="container text-center text-[var(--muted)]">
            <p>Dev Events Workshop - An educational repository for practicing open source contributions</p>
          </div>
        </footer>
      </body>
    </html>
  )
}