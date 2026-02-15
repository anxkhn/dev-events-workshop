export function EventStats({ events }: { events: { length: number; upvotes: number; attendees: number } }) {
  const totalEvents = events.length
  const totalUpvotes = events.upvotes
  const totalAttendees = events.attendees

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="card text-center">
        <div className="text-3xl font-bold text-[var(--primary)]">{totalEvents}</div>
        <div className="text-sm text-[var(--muted)]">Total Events</div>
      </div>
      <div className="card text-center">
        <div className="text-3xl font-bold text-[var(--accent)]">{totalUpvotes}</div>
        <div className="text-sm text-[var(--muted)]">Total Upvotes</div>
      </div>
      <div className="card text-center">
        <div className="text-3xl font-bold text-[var(--success)]">{totalAttendees}</div>
        <div className="text-sm text-[var(--muted)]">Registered Attendees</div>
      </div>
    </div>
  )
}