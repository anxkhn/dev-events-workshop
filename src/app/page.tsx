import { eventStore } from '@/lib/store'
import { EventCard } from '@/components/event-card'
import { HeroSection } from '@/components/hero-section'
import { CategoryFilter } from '@/components/category-filter'

export default async function HomePage() {
  const allEvents = await eventStore.getAll()
  const upcomingEvents = await eventStore.getUpcoming()
  const popularEvents = await eventStore.getPopular()

  return (
    <div className="space-y-12">
      <HeroSection />
      
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Events</h2>
          <a href="/events" className="text-[var(--primary)] hover:underline">
            View all
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularEvents.slice(0, 3).map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
        </div>
        <CategoryFilter />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {upcomingEvents.slice(0, 6).map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        {upcomingEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--muted)]">No upcoming events. Check back soon!</p>
          </div>
        )}
      </section>

      <section className="bg-[var(--secondary)] rounded-lg p-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Know of an event?</h2>
          <p className="text-[var(--muted)] mb-6">
            Help grow our community by submitting local hackathons, meetups, and conferences.
          </p>
          <a 
            href="/submit" 
            className="inline-block bg-[var(--accent)] text-[var(--accent-foreground)] px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Submit an Event
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">All Events</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allEvents.slice(0, 9).map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  )
}