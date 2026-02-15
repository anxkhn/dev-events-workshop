'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createEvent } from '@/actions/events'
import type { EventCategory } from '@/types'

const categories: { value: EventCategory; label: string }[] = [
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'meetup', label: 'Meetup' },
  { value: 'conference', label: 'Conference' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'webinar', label: 'Webinar' },
  { value: 'bootcamp', label: 'Bootcamp' },
]

export function EventForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [isOnline, setIsOnline] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setErrors({})

    const result = await createEvent(formData)

    if (!result.success) {
      setIsSubmitting(false)
      if (result.errors) {
        setErrors(result.errors)
      } else if (result.error) {
        setErrors({ form: [result.error] })
      }
      return
    }

    router.push(`/events/${result.data?.id}`)
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {errors.form && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.form.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Event Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="e.g., Global Hackathon 2025"
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <div id="title-error" className="form-error">
            {errors.title.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          placeholder="Describe your event in detail..."
          aria-describedby={errors.description ? 'description-error' : undefined}
        />
        {errors.description && (
          <div id="description-error" className="form-error">
            {errors.description.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Start Date
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            required
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && (
            <div id="date-error" className="form-error">
              {errors.date.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="endDate" className="form-label">
            End Date (Optional)
          </label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            aria-describedby={errors.endDate ? 'endDate-error' : undefined}
          />
          {errors.endDate && (
            <div id="endDate-error" className="form-error">
              {errors.endDate.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          aria-describedby={errors.category ? 'category-error' : undefined}
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <div id="category-error" className="form-error">
            {errors.category.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="location" className="form-label">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          required
          placeholder="e.g., San Francisco, CA or Virtual"
          aria-describedby={errors.location ? 'location-error' : undefined}
        />
        {errors.location && (
          <div id="location-error" className="form-error">
            {errors.location.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isOnline"
            checked={isOnline}
            onChange={(e) => setIsOnline(e.target.checked)}
            className="w-4 h-4"
          />
          <span>This is an online event</span>
        </label>
        <input type="hidden" name="isOnline" value={isOnline ? 'true' : 'false'} />
      </div>

      {isOnline && (
        <div className="form-group">
          <label htmlFor="onlineUrl" className="form-label">
            Event URL
          </label>
          <input
            type="url"
            id="onlineUrl"
            name="onlineUrl"
            placeholder="https://..."
            aria-describedby={errors.onlineUrl ? 'onlineUrl-error' : undefined}
          />
          {errors.onlineUrl && (
            <div id="onlineUrl-error" className="form-error">
              {errors.onlineUrl.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="organizer" className="form-label">
          Organizer
        </label>
        <input
          type="text"
          id="organizer"
          name="organizer"
          required
          placeholder="Organization or individual name"
          aria-describedby={errors.organizer ? 'organizer-error' : undefined}
        />
        {errors.organizer && (
          <div id="organizer-error" className="form-error">
            {errors.organizer.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="organizerUrl" className="form-label">
          Organizer URL (Optional)
        </label>
        <input
          type="url"
          id="organizerUrl"
          name="organizerUrl"
          placeholder="https://..."
          aria-describedby={errors.organizerUrl ? 'organizerUrl-error' : undefined}
        />
        {errors.organizerUrl && (
          <div id="organizerUrl-error" className="form-error">
            {errors.organizerUrl.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl" className="form-label">
          Event Image URL (Optional)
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          placeholder="https://..."
          aria-describedby={errors.imageUrl ? 'imageUrl-error' : undefined}
        />
        {errors.imageUrl && (
          <div id="imageUrl-error" className="form-error">
            {errors.imageUrl.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}
        <p className="form-hint">
          Provide a URL to an image for your event banner.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="tags" className="form-label">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          required
          placeholder="javascript, react, hackathon"
          aria-describedby={errors.tags ? 'tags-error' : 'tags-hint'}
        />
        <p id="tags-hint" className="form-hint">
          Separate tags with commas (max 10 tags).
        </p>
        {errors.tags && (
          <div id="tags-error" className="form-error">
            {errors.tags.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="maxAttendees" className="form-label">
          Maximum Attendees (Optional)
        </label>
        <input
          type="number"
          id="maxAttendees"
          name="maxAttendees"
          min="1"
          placeholder="Leave empty for unlimited"
          aria-describedby={errors.maxAttendees ? 'maxAttendees-error' : undefined}
        />
        {errors.maxAttendees && (
          <div id="maxAttendees-error" className="form-error">
            {errors.maxAttendees.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Event'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-[var(--secondary)] text-[var(--foreground)]"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}