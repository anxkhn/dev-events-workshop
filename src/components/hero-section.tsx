export function HeroSection() {
  return (
    <section className="text-center py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Discover Developer Events
      </h1>
      <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-8">
        Find hackathons, meetups, conferences, and workshops happening near you or online. 
        Upvote events you are interested in and help others discover great opportunities.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a 
          href="/events" 
          className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Browse Events
        </a>
        <a 
          href="/submit" 
          className="border border-[var(--border)] px-6 py-3 rounded-lg font-semibold hover:border-[var(--primary)] transition-colors"
        >
          Submit Event
        </a>
      </div>
    </section>
  )
}