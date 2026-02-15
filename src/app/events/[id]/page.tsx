import { eventStore } from '@/lib/store'
import { notFound } from 'next/navigation'
import { formatEventDateRange, formatDateTime, getRelativeTime, getTimeUntilEvent } from '@/lib/date-utils'
import { UpvoteButton } from '@/components/upvote-button'
import { RegisterButton } from '@/components/register-button'
import type { Metadata } from 'next'

interface EventDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const event = await eventStore.getById(id)
  
  if (!event) {
    return { title: 'Event Not Found' }
  }

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      type: 'article',
    },
  }
}

const statusLabels: Record<string, string> = {
  upcoming: 'Upcoming',
  ongoing: 'Live Now',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

const statusColors: Record<string, string> = {
  upcoming: 'bg-blue-500',
  ongoing: 'bg-green-500',
  completed: 'bg-gray-500',
  cancelled: 'bg-red-500',
}

const categoryColors: Record<string, string> = {
  hackathon: 'bg-purple-500',
  meetup: 'bg-blue-500',
  conference: 'bg-orange-500',
  workshop: 'bg-green-500',
  webinar: 'bg-teal-500',
  bootcamp: 'bg-red-500',
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params
  const event = await eventStore.getById(id)

  if (!event) {
    notFound()
  }

  const timeUntil = getTimeUntilEvent(event.date)

  return (
    <article className="max-w-4xl mx-auto">
      {event.imageUrl && (
        <div className="relative h-64 md:h-96 -mx-4 sm:-mx-8 mb-8 sm:rounded-lg overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`badge ${categoryColors[event.category]} text-white`}>
              {event.category}
            </span>
            <span className={`badge ${statusColors[event.status]} text-white`}>
              {statusLabels[event.status]}
            </span>
          </div>
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatEventDateRange(event.date, event.endDate)}</span>
            <span className="text-xs">({timeUntil})</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.isOnline ? 'Online' : event.location}</span>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">About this event</h2>
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap">{event.description}</p>
            </div>
          </section>

          {event.onlineUrl && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Event Link</h2>
              <a 
                href={event.onlineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline break-all"
              >
                {event.onlineUrl}
              </a>
            </section>
          )}

          <section>
            <h2 className="text-xl font-semibold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {event.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1 rounded-full bg-[var(--secondary)] text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="card">
            <h3 className="font-semibold mb-4">Event Details</h3>
            
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-[var(--muted)]">Start</dt>
                <dd>{formatDateTime(event.date)}</dd>
              </div>
              
              {event.endDate && (
                <div>
                  <dt className="text-[var(--muted)]">End</dt>
                  <dd>{formatDateTime(event.endDate)}</dd>
                </div>
              )}
              
              <div>
                <dt className="text-[var(--muted)]">Location</dt>
                <dd>{event.isOnline ? 'Online' : event.location}</dd>
              </div>
              
              <div>
                <dt className="text-[var(--muted)]">Organizer</dt>
                <dd>
                  {event.organizerUrl ? (
                    <a 
                      href={event.organizerUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] hover:underline"
                    >
                      {event.organizer}
                    </a>
                  ) : (
                    event.organizer
                  )}
                </dd>
              </div>
              
              <div>
                <dt className="text-[var(--muted)]">Attendees</dt>
                <dd>
                  {event.currentAttendees}
                  {event.maxAttendees && ` / ${event.maxAttendees} max`}
                </dd>
              </div>
            </dl>
          </div>

          <div className="card space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--muted)]">Upvotes</span>
              <span className="text-2xl font-bold">{event.upvotes}</span>
            </div>
            <UpvoteButton eventId={event.id} />
            
            {event.status !== 'completed' && event.status !== 'cancelled' && (
              <RegisterButton 
                eventId={event.id} 
                maxAttendees={event.maxAttendees}
                currentAttendees={event.currentAttendees}
              />
            )}
          </div>

          <div className="card text-sm text-[var(--muted)]">
            <p>Posted {getRelativeTime(event.createdAt)}</p>
            {event.updatedAt !== event.createdAt && (
              <p>Updated {getRelativeTime(event.updatedAt)}</p>
            )}
          </div>
        </aside>
      </div>
    </article>
  )
}