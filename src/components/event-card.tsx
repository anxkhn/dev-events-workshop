import type { Event } from '@/types'
import { formatDate, getRelativeTime, getTimeUntilEvent } from '@/lib/date-utils'

interface EventCardProps {
  event: Event
}

const categoryColors: Record<string, string> = {
  hackathon: 'bg-purple-500',
  meetup: 'bg-blue-500',
  conference: 'bg-orange-500',
  workshop: 'bg-green-500',
  webinar: 'bg-teal-500',
  bootcamp: 'bg-red-500',
}

const statusLabels: Record<string, string> = {
  upcoming: 'Upcoming',
  ongoing: 'Live Now',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export function EventCard({ event }: EventCardProps) {
  const statusColor = event.status === 'cancelled' 
    ? 'bg-gray-500' 
    : event.status === 'ongoing' 
      ? 'bg-green-500' 
      : 'bg-blue-500'

  const timeUntil = getTimeUntilEvent(event.date)

  return (
    <article className="card">
      {event.imageUrl && (
        <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <span className={`badge ${categoryColors[event.category]} text-white`}>
              {event.category}
            </span>
            <span className={`badge ${statusColor} text-white`}>
              {statusLabels[event.status]}
            </span>
          </div>
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-2 line-clamp-2">
        <a href={`/events/${event.id}`} className="hover:text-[var(--primary)]">
          {event.title}
        </a>
      </h3>
      
      <p className="text-[var(--muted)] text-sm mb-4 line-clamp-2">
        {event.description}
      </p>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(event.date, 'MMM d, yyyy')}</span>
          <span className="text-[var(--muted)]">({timeUntil})</span>
        </div>
        
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">
            {event.isOnline ? 'Online' : event.location}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.currentAttendees} attending</span>
          {event.maxAttendees && (
            <span className="text-[var(--muted)]">
              (max {event.maxAttendees})
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-2">
          <form action="/api/events/upvote" method="POST">
            <input type="hidden" name="eventId" value={event.id} />
            <button
              type="submit"
              className="flex items-center gap-1 text-sm px-3 py-1.5 rounded bg-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              aria-label={`Upvote ${event.title}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              {event.upvotes}
            </button>
          </form>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {event.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded bg-[var(--secondary)] text-[var(--muted)]">
              {tag}
            </span>
          ))}
          {event.tags.length > 2 && (
            <span className="text-xs px-2 py-0.5 rounded bg-[var(--secondary)] text-[var(--muted)]">
              +{event.tags.length - 2}
            </span>
          )}
        </div>
      </div>
      
      <p className="text-xs text-[var(--muted)] mt-3">
        Posted {getRelativeTime(event.createdAt)}
      </p>
    </article>
  )
}