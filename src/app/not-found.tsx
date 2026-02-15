export default function NotFound() {
  return (
    <div className="text-center py-16">
      <svg
        className="w-24 h-24 mx-auto text-[var(--muted)] mb-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
      <p className="text-[var(--muted)] mb-8">
        The event you are looking for does not exist or has been removed.
      </p>
      <a
        href="/events"
        className="inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Browse All Events
      </a>
    </div>
  )
}