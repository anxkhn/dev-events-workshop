export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'

export type EventCategory = 
  | 'hackathon'
  | 'meetup'
  | 'conference'
  | 'workshop'
  | 'webinar'
  | 'bootcamp'

export interface Event {
  id: string
  title: string
  description: string
  date: string
  endDate?: string
  location: string
  isOnline: boolean
  onlineUrl?: string
  category: EventCategory
  status: EventStatus
  imageUrl?: string
  organizer: string
  organizerUrl?: string
  tags: string[]
  upvotes: number
  maxAttendees?: number
  currentAttendees: number
  createdAt: string
  updatedAt: string
}

export interface EventFormData {
  title: string
  description: string
  date: string
  endDate?: string
  location: string
  isOnline: boolean
  onlineUrl?: string
  category: EventCategory
  imageUrl?: string
  organizer: string
  organizerUrl?: string
  tags: string[]
  maxAttendees?: number
}

export interface ApiError {
  message: string
  code: string
  details?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface EventFilters {
  category?: EventCategory
  status?: EventStatus
  location?: string
  isOnline?: boolean
  search?: string
  tags?: string[]
}

export interface SortOptions {
  field: 'date' | 'upvotes' | 'createdAt'
  direction: 'asc' | 'desc'
}