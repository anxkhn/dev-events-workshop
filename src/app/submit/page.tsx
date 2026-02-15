import { EventForm } from '@/components/event-form'

export default function SubmitEventPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit an Event</h1>
        <p className="text-[var(--muted)]">
          Share a hackathon, meetup, conference, or workshop with the community.
        </p>
      </div>

      <EventForm />
    </div>
  )
}