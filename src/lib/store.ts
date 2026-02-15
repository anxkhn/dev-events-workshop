import type { Event, EventFormData } from '@/types'
import { nanoid } from 'nanoid'

class EventStore {
  private events: Map<string, Event> = new Map()
  private upvoteRecords: Map<string, Set<string>> = new Map()

  constructor() {
    this.seedInitialData()
  }

  private seedInitialData(): void {
    const now = new Date().toISOString()
    const initialEvents: Event[] = [
      {
        id: 'event_1',
        title: 'Global Hackathon 2025',
        description: 'Join developers worldwide for a 48-hour coding marathon. Build innovative solutions and compete for prizes.',
        date: '2025-03-15T09:00:00Z',
        endDate: '2025-03-17T09:00:00Z',
        location: 'Virtual',
        isOnline: true,
        onlineUrl: 'https://globalhackathon.dev',
        category: 'hackathon',
        status: 'upcoming',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc5e6a?w=800',
        organizer: 'DevCommunity',
        organizerUrl: 'https://devcommunity.io',
        tags: ['hackathon', 'coding', 'competition'],
        upvotes: 42,
        maxAttendees: 500,
        currentAttendees: 127,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'event_2',
        title: 'React Conference 2025',
        description: 'The biggest React event of the year. Learn from core team members and industry experts.',
        date: '2025-04-20T10:00:00Z',
        endDate: '2025-04-22T18:00:00Z',
        location: 'San Francisco, CA',
        isOnline: false,
        category: 'conference',
        status: 'upcoming',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        organizer: 'React Foundation',
        tags: ['react', 'javascript', 'frontend'],
        upvotes: 89,
        maxAttendees: 2000,
        currentAttendees: 1456,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'event_3',
        title: 'TypeScript Workshop',
        description: 'Master TypeScript from basics to advanced patterns. Perfect for JavaScript developers looking to level up.',
        date: '2025-02-10T14:00:00Z',
        location: 'Online',
        isOnline: true,
        onlineUrl: 'https://typescript.workshop.dev',
        category: 'workshop',
        status: 'completed',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
        organizer: 'TypeScript Academy',
        tags: ['typescript', 'javascript', 'learning'],
        upvotes: 23,
        currentAttendees: 87,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'event_4',
        title: 'AI/ML Bootcamp',
        description: 'Intensive 2-week bootcamp covering machine learning fundamentals and practical AI applications.',
        date: '2025-05-01T09:00:00Z',
        endDate: '2025-05-15T17:00:00Z',
        location: 'New York, NY',
        isOnline: false,
        category: 'bootcamp',
        status: 'upcoming',
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-42b2ca2a8c2d?w=800',
        organizer: 'AI Learning Hub',
        tags: ['ai', 'machine-learning', 'python'],
        upvotes: 56,
        maxAttendees: 100,
        currentAttendees: 45,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'event_5',
        title: 'DevOps Meetup',
        description: 'Monthly meetup for DevOps practitioners. This month: Kubernetes best practices.',
        date: '2025-02-20T18:00:00Z',
        location: 'Seattle, WA',
        isOnline: false,
        category: 'meetup',
        status: 'upcoming',
        organizer: 'Seattle DevOps',
        tags: ['devops', 'kubernetes', 'networking'],
        upvotes: 15,
        currentAttendees: 34,
        createdAt: now,
        updatedAt: now,
      },
    ]

    initialEvents.forEach(event => {
      this.events.set(event.id, event)
      this.upvoteRecords.set(event.id, new Set())
    })
  }

  async getAll(): Promise<Event[]> {
    return Array.from(this.events.values())
  }

  async getById(id: string): Promise<Event | null> {
    return this.events.get(id) || null
  }

  async create(data: EventFormData): Promise<Event> {
    const now = new Date().toISOString()
    const id = nanoid(10)
    
    const event: Event = {
      id,
      ...data,
      status: this.calculateStatus(data.date, data.endDate),
      upvotes: 0,
      currentAttendees: 0,
      createdAt: now,
      updatedAt: now,
    }

    this.events.set(id, event)
    this.upvoteRecords.set(id, new Set())
    return event
  }

  async update(id: string, data: Partial<EventFormData>): Promise<Event | null> {
    const existing = this.events.get(id)
    if (!existing) return null

    const updated: Event = {
      ...existing,
      ...data,
      status: data.date ? this.calculateStatus(data.date, data.endDate) : existing.status,
      updatedAt: new Date().toISOString(),
    }

    this.events.set(id, updated)
    return updated
  }

  async delete(id: string): Promise<boolean> {
    if (!this.events.has(id)) return false
    this.events.delete(id)
    this.upvoteRecords.delete(id)
    return true
  }

  async upvote(eventId: string, userId: string): Promise<{ upvotes: number; upvoted: boolean } | null> {
    const event = this.events.get(eventId)
    if (!event) return null

    const upvoteSet = this.upvoteRecords.get(eventId)
    if (!upvoteSet) return null

    const hasUpvoted = upvoteSet.has(userId)
    
    if (hasUpvoted) {
      upvoteSet.delete(userId)
      event.upvotes = Math.max(0, event.upvotes - 1)
    } else {
      upvoteSet.add(userId)
      event.upvotes += 1
    }

    event.updatedAt = new Date().toISOString()
    return { upvotes: event.upvotes, upvoted: !hasUpvoted }
  }

  async hasUserUpvoted(eventId: string, userId: string): Promise<boolean> {
    const upvoteSet = this.upvoteRecords.get(eventId)
    return upvoteSet?.has(userId) || false
  }

  calculateStatus(date: string, endDate?: string): Event['status'] {
    const now = new Date()
    const startDate = new Date(date)
    const end = endDate ? new Date(endDate) : new Date(startDate.getTime() + 24 * 60 * 60 * 1000)

    if (startDate > now) return 'upcoming'
    if (end < now) return 'completed'
    return 'ongoing'
  }

  async getFiltered(filters: {
    category?: string
    status?: string
    search?: string
    isOnline?: boolean
  }): Promise<Event[]> {
    let events = Array.from(this.events.values())

    if (filters.category) {
      events = events.filter(e => e.category === filters.category)
    }

    if (filters.status) {
      events = events.filter(e => e.status === filters.status)
    }

    if (filters.isOnline !== undefined) {
      events = events.filter(e => e.isOnline === filters.isOnline)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      events = events.filter(e => 
        e.title.toLowerCase().includes(searchLower) ||
        e.description.toLowerCase().includes(searchLower) ||
        e.location.toLowerCase().includes(searchLower) ||
        e.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  async getUpcoming(): Promise<Event[]> {
    const now = new Date()
    return Array.from(this.events.values())
      .filter(e => new Date(e.date) > now && e.status !== 'cancelled')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  async getPopular(): Promise<Event[]> {
    return Array.from(this.events.values())
      .filter(e => e.status !== 'cancelled')
      .sort((a, b) => b.upvotes - a.upvotes)
      .slice(0, 10)
  }

  async incrementAttendees(eventId: string): Promise<boolean> {
    const event = this.events.get(eventId)
    if (!event) return false
    
    if (event.maxAttendees && event.currentAttendees >= event.maxAttendees) {
      return false
    }

    event.currentAttendees += 1
    event.updatedAt = new Date().toISOString()
    return true
  }

  async decrementAttendees(eventId: string): Promise<boolean> {
    const event = this.events.get(eventId)
    if (!event || event.currentAttendees <= 0) return false

    event.currentAttendees -= 1
    event.updatedAt = new Date().toISOString()
    return true
  }
}

export const eventStore = new EventStore()