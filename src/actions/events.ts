'use server'

import { eventStore } from '@/lib/store'
import { createEventSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'
import type { Event } from '@/types'

export type ActionResult<T = void> = {
  success: boolean
  data?: T
  error?: string
  errors?: Record<string, string[]>
}

export async function createEvent(formData: FormData): Promise<ActionResult<Event>> {
  const rawData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    date: formData.get('date') as string,
    endDate: formData.get('endDate') as string || undefined,
    location: formData.get('location') as string,
    isOnline: formData.get('isOnline') === 'true',
    onlineUrl: formData.get('onlineUrl') as string || undefined,
    category: formData.get('category') as string,
    imageUrl: formData.get('imageUrl') as string || undefined,
    organizer: formData.get('organizer') as string,
    organizerUrl: formData.get('organizerUrl') as string || undefined,
    tags: formData.get('tags') as string,
    maxAttendees: formData.get('maxAttendees') as string || undefined,
  }

  const validated = createEventSchema.safeParse(rawData)
  
  if (!validated.success) {
    const errors: Record<string, string[]> = {}
    for (const issue of validated.error.issues) {
      const path = issue.path.join('.')
      if (!errors[path]) {
        errors[path] = []
      }
      errors[path].push(issue.message)
    }
    return { success: false, error: 'Validation failed', errors }
  }

  if (validated.data.endDate && validated.data.date) {
    const startDate = new Date(validated.data.date)
    const endDate = new Date(validated.data.endDate)
    if (endDate < startDate) {
      return { 
        success: false, 
        error: 'End date must be after start date',
        errors: { endDate: ['End date must be after start date'] }
      }
    }
  }

  try {
    const event = await eventStore.create(validated.data)
    revalidatePath('/')
    revalidatePath('/events')
    return { success: true, data: event }
  } catch {
    return { success: false, error: 'Failed to create event' }
  }
}

export async function updateEvent(eventId: string, formData: FormData): Promise<ActionResult<Event>> {
  const rawData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    date: formData.get('date') as string,
    endDate: formData.get('endDate') as string || undefined,
    location: formData.get('location') as string,
    isOnline: formData.get('isOnline') === 'true',
    onlineUrl: formData.get('onlineUrl') as string || undefined,
    category: formData.get('category') as string,
    imageUrl: formData.get('imageUrl') as string || undefined,
    organizer: formData.get('organizer') as string,
    organizerUrl: formData.get('organizerUrl') as string || undefined,
    tags: formData.get('tags') as string,
    maxAttendees: formData.get('maxAttendees') as string || undefined,
  }

  const validated = createEventSchema.safeParse(rawData)
  
  if (!validated.success) {
    const errors: Record<string, string[]> = {}
    for (const issue of validated.error.issues) {
      const path = issue.path.join('.')
      if (!errors[path]) {
        errors[path] = []
      }
      errors[path].push(issue.message)
    }
    return { success: false, error: 'Validation failed', errors }
  }

  try {
    const event = await eventStore.update(eventId, validated.data)
    if (!event) {
      return { success: false, error: 'Event not found' }
    }
    revalidatePath('/')
    revalidatePath('/events')
    revalidatePath(`/events/${eventId}`)
    return { success: true, data: event }
  } catch {
    return { success: false, error: 'Failed to update event' }
  }
}

export async function deleteEvent(eventId: string): Promise<ActionResult> {
  try {
    const deleted = await eventStore.delete(eventId)
    if (!deleted) {
      return { success: false, error: 'Event not found' }
    }
    revalidatePath('/')
    revalidatePath('/events')
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to delete event' }
  }
}

export async function upvoteEvent(eventId: string): Promise<ActionResult<{ upvotes: number; upvoted: boolean }>> {
  const userId = 'anonymous-user'
  
  try {
    const result = await eventStore.upvote(eventId, userId)
    if (!result) {
      return { success: false, error: 'Event not found' }
    }
    revalidatePath('/')
    revalidatePath('/events')
    return { success: true, data: result }
  } catch {
    return { success: false, error: 'Failed to upvote event' }
  }
}

export async function getEvents(filters?: {
  category?: string
  status?: string
  search?: string
  isOnline?: boolean
}): Promise<ActionResult<Event[]>> {
  try {
    const events = filters 
      ? await eventStore.getFiltered(filters)
      : await eventStore.getAll()
    return { success: true, data: events }
  } catch {
    return { success: false, error: 'Failed to fetch events' }
  }
}

export async function getEventById(eventId: string): Promise<ActionResult<Event>> {
  try {
    const event = await eventStore.getById(eventId)
    if (!event) {
      return { success: false, error: 'Event not found' }
    }
    return { success: true, data: event }
  } catch {
    return { success: false, error: 'Failed to fetch event' }
  }
}

export async function getUpcomingEvents(): Promise<ActionResult<Event[]>> {
  try {
    const events = await eventStore.getUpcoming()
    return { success: true, data: events }
  } catch {
    return { success: false, error: 'Failed to fetch upcoming events' }
  }
}

export async function getPopularEvents(): Promise<ActionResult<Event[]>> {
  try {
    const events = await eventStore.getPopular()
    return { success: true, data: events }
  } catch {
    return { success: false, error: 'Failed to fetch popular events' }
  }
}

export async function registerForEvent(eventId: string): Promise<ActionResult> {
  try {
    const success = await eventStore.incrementAttendees(eventId)
    if (!success) {
      return { success: false, error: 'Unable to register. Event may be full.' }
    }
    revalidatePath(`/events/${eventId}`)
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to register for event' }
  }
}

export async function unregisterFromEvent(eventId: string): Promise<ActionResult> {
  try {
    const success = await eventStore.decrementAttendees(eventId)
    if (!success) {
      return { success: false, error: 'Unable to unregister' }
    }
    revalidatePath(`/events/${eventId}`)
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to unregister from event' }
  }
}