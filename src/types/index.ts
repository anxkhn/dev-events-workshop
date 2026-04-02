/**
 * Represents the lifecycle status of an event.
 * - `upcoming`: Event is scheduled but has not started yet
 * - `ongoing`: Event is currently happening
 * - `completed`: Event has finished
 * - `cancelled`: Event was cancelled
 */
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'

/**
 * Categories of developer events supported by the platform.
 * - `hackathon`: Competitive coding events
 * - `meetup`: Casual community gatherings
 * - `conference`: Large-scale professional events
 * - `workshop`: Hands-on learning sessions
 * - `webinar`: Online seminars
 * - `bootcamp`: Intensive training programs
 */
export type EventCategory = 
  | 'hackathon'
  | 'meetup'
  | 'conference'
  | 'workshop'
  | 'webinar'
  | 'bootcamp'

/**
 * Main event data structure representing a developer event.
 */
export interface Event {
  /** Unique identifier for the event */
  id: string
  /** Event title */
  title: string
  /** Detailed description of the event */
  description: string
  /** Event start date in ISO 8601 format */
  date: string
  /** Optional end date for multi-day events */
  endDate?: string
  /** Physical location or venue name */
  location: string
  /** Whether the event is held online */
  isOnline: boolean
  /** URL for online events (required if isOnline is true) */
  onlineUrl?: string
  /** Category classification of the event */
  category: EventCategory
  /** Current lifecycle status */
  status: EventStatus
  /** Optional promotional image URL */
  imageUrl?: string
  /** Name of the event organizer */
  organizer: string
  /** Optional URL to organizer's website or profile */
  organizerUrl?: string
  /** List of tags for event discovery */
  tags: string[]
  /** Number of upvotes from the community */
  upvotes: number
  /** Optional maximum number of attendees allowed */
  maxAttendees?: number
  /** Current number of registered attendees */
  currentAttendees: number
  /** Timestamp when the event was created */
  createdAt: string
  /** Timestamp when the event was last updated */
  updatedAt: string
}

/**
 * Form data structure for creating or updating an event.
 * Excludes auto-generated fields like id, status, upvotes, and timestamps.
 */
export interface EventFormData {
  /** Event title */
  title: string
  /** Detailed description of the event */
  description: string
  /** Event start date in ISO 8601 format */
  date: string
  /** Optional end date for multi-day events */
  endDate?: string
  /** Physical location or venue name */
  location: string
  /** Whether the event is held online */
  isOnline: boolean
  /** URL for online events */
  onlineUrl?: string
  /** Category classification of the event */
  category: EventCategory
  /** Optional promotional image URL */
  imageUrl?: string
  /** Name of the event organizer */
  organizer: string
  /** Optional URL to organizer's website or profile */
  organizerUrl?: string
  /** List of tags for event discovery */
  tags: string[]
  /** Optional maximum number of attendees allowed */
  maxAttendees?: number
}

/**
 * Standard API error response structure.
 */
export interface ApiError {
  /** Human-readable error message */
  message: string
  /** Machine-readable error code for programmatic handling */
  code: string
  /** Optional field-specific validation errors */
  details?: Record<string, string[]>
}

/**
 * Generic paginated response wrapper for list endpoints.
 * @template T - The type of items in the response
 */
export interface PaginatedResponse<T> {
  /** Array of items for the current page */
  data: T[]
  /** Total number of items across all pages */
  total: number
  /** Current page number (1-indexed) */
  page: number
  /** Number of items per page */
  pageSize: number
  /** Total number of pages available */
  totalPages: number
}

/**
 * Filter options for querying events.
 * All fields are optional and can be combined.
 */
export interface EventFilters {
  /** Filter by event category */
  category?: EventCategory
  /** Filter by event status */
  status?: EventStatus
  /** Filter by location (supports partial match) */
  location?: string
  /** Filter by online/offline events */
  isOnline?: boolean
  /** Full-text search across title and description */
  search?: string
  /** Filter by tags (must match all specified tags) */
  tags?: string[]
}

/**
 * Sorting configuration for event queries.
 */
export interface SortOptions {
  /** Field to sort by */
  field: 'date' | 'upvotes' | 'createdAt'
  /** Sort direction: ascending or descending */
  direction: 'asc' | 'desc'
}