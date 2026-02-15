import { eventStore } from '@/lib/store'
import { EventCard } from '@/components/event-card'
import { CategoryFilter } from '@/components/category-filter'
import { SearchBar } from '@/components/search-bar'

interface EventsPageProps {
  searchParams: Promise<{
    category?: string
    search?: string
    online?: string
  }>
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams
  const events = await eventStore.getFiltered({
    category: params.category,
    search: params.search,
    isOnline: params.online === 'true' ? true : params.online === 'false' ? false : undefined,
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-[var(--muted)]">
            {events.length} event{events.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <SearchBar />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <CategoryFilter />
        <div className="flex gap-2">
          <a
            href="/events"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !params.online
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--secondary)] text-[var(--foreground)]'
            }`}
          >
            All
          </a>
          <a
            href="/events?online=true"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              params.online === 'true'
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--secondary)] text-[var(--foreground)]'
            }`}
          >
            Online
          </a>
          <a
            href="/events?online=false"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              params.online === 'false'
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--secondary)] text-[var(--foreground)]'
            }`}
          >
            In-Person
          </a>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-16">
          <svg
            className="w-16 h-16 mx-auto text-[var(--muted)] mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h2 className="text-xl font-semibold mb-2">No events found</h2>
          <p className="text-[var(--muted)] mb-4">
            Try adjusting your filters or search terms
          </p>
          <a
            href="/submit"
            className="inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Submit an Event
          </a>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}