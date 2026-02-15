import { describe, it, expect } from 'vitest'
import { createEventSchema, eventCategorySchema, eventStatusSchema } from './validations'

describe('Validations', () => {
  describe('eventCategorySchema', () => {
    it('should accept valid categories', () => {
      const result = eventCategorySchema.safeParse('hackathon')
      expect(result.success).toBe(true)
    })

    it('should reject invalid categories', () => {
      const result = eventCategorySchema.safeParse('invalid')
      expect(result.success).toBe(false)
    })
  })

  describe('eventStatusSchema', () => {
    it('should accept valid statuses', () => {
      const statuses = ['upcoming', 'ongoing', 'completed', 'cancelled']
      statuses.forEach(status => {
        const result = eventStatusSchema.safeParse(status)
        expect(result.success).toBe(true)
      })
    })
  })

  describe('createEventSchema', () => {
    it('should validate a valid event', () => {
      const data = {
        title: 'Test Event',
        description: 'A valid test event description',
        date: '2025-06-01T10:00:00Z',
        location: 'Test Location',
        isOnline: false,
        category: 'meetup',
        organizer: 'Test Organizer',
        tags: 'test, event',
        imageUrl: '',
        onlineUrl: '',
        organizerUrl: '',
      }

      const result = createEventSchema.safeParse(data)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.tags).toEqual(['test', 'event'])
      }
    })

    it('should reject short title', () => {
      const data = {
        title: 'AB',
        description: 'A valid description',
        date: '2025-06-01T10:00:00Z',
        location: 'Location',
        isOnline: false,
        category: 'meetup',
        organizer: 'Organizer',
        tags: 'tag',
      }

      const result = createEventSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('should reject empty tags', () => {
      const data = {
        title: 'Test Event',
        description: 'A valid description',
        date: '2025-06-01T10:00:00Z',
        location: 'Location',
        isOnline: false,
        category: 'meetup',
        organizer: 'Organizer',
        tags: '',
      }

      const result = createEventSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('should reject invalid date format', () => {
      const data = {
        title: 'Test Event',
        description: 'A valid description',
        date: 'invalid-date',
        location: 'Location',
        isOnline: false,
        category: 'meetup',
        organizer: 'Organizer',
        tags: 'tag',
      }

      const result = createEventSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('should validate maxAttendees transformation', () => {
      const data = {
        title: 'Test Event',
        description: 'A valid description',
        date: '2025-06-01T10:00:00Z',
        location: 'Location',
        isOnline: false,
        category: 'meetup',
        organizer: 'Organizer',
        tags: 'tag',
        maxAttendees: '100',
      }

      const result = createEventSchema.safeParse(data)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.maxAttendees).toBe(100)
      }
    })
  })
})