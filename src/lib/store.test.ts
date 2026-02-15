import { describe, it, expect } from 'vitest'
import { eventStore } from './store'
import type { EventFormData, Event } from '@/types'

describe('EventStore', () => {
  describe('getAll', () => {
    it('should return all events', async () => {
      const events = await eventStore.getAll()
      expect(events.length).toBeGreaterThan(0)
    })
  })

  describe('getById', () => {
    it('should return event by id', async () => {
      const event = await eventStore.getById('event_1')
      expect(event).not.toBeNull()
      expect(event?.title).toBe('Global Hackathon 2025')
    })

    it('should return null for non-existent event', async () => {
      const event = await eventStore.getById('non_existent')
      expect(event).toBeNull()
    })
  })

  describe('create', () => {
    it('should create a new event', async () => {
      const data: EventFormData = {
        title: 'Test Event',
        description: 'A test event description',
        date: '2025-06-01T10:00:00Z',
        location: 'Test Location',
        isOnline: false,
        category: 'meetup',
        organizer: 'Test Organizer',
        tags: ['test', 'event'],
      }

      const event = await eventStore.create(data)
      
      expect(event.id).toBeDefined()
      expect(event.title).toBe(data.title)
      expect(event.status).toBe('upcoming')
      expect(event.upvotes).toBe(0)
      expect(event.currentAttendees).toBe(0)
    })
  })

  describe('update', () => {
    it('should update an existing event', async () => {
      const updated = await eventStore.update('event_1', {
        title: 'Updated Hackathon',
      })
      
      expect(updated).not.toBeNull()
      expect(updated?.title).toBe('Updated Hackathon')
    })

    it('should return null for non-existent event', async () => {
      const updated = await eventStore.update('non_existent', {
        title: 'Test',
      })
      
      expect(updated).toBeNull()
    })
  })

  describe('delete', () => {
    it('should delete an existing event', async () => {
      const data: EventFormData = {
        title: 'Event to Delete',
        description: 'Will be deleted',
        date: '2025-07-01T10:00:00Z',
        location: 'Somewhere',
        isOnline: true,
        category: 'workshop',
        organizer: 'Someone',
        tags: ['delete'],
      }
      
      const event = await eventStore.create(data)
      const deleted = await eventStore.delete(event.id)
      
      expect(deleted).toBe(true)
      
      const found = await eventStore.getById(event.id)
      expect(found).toBeNull()
    })

    it('should return false for non-existent event', async () => {
      const deleted = await eventStore.delete('non_existent')
      expect(deleted).toBe(false)
    })
  })

  describe('upvote', () => {
    it('should increment upvotes', async () => {
      const result = await eventStore.upvote('event_2', 'user1')
      expect(result).not.toBeNull()
      expect(result?.upvoted).toBe(true)
    })

    it('should allow toggling upvote', async () => {
      await eventStore.upvote('event_2', 'user2')
      const result = await eventStore.upvote('event_2', 'user2')
      expect(result?.upvoted).toBe(false)
    })
  })

  describe('getFiltered', () => {
    it('should filter by category', async () => {
      const events = await eventStore.getFiltered({ category: 'hackathon' })
      expect(events.every((e: Event) => e.category === 'hackathon')).toBe(true)
    })

    it('should filter by online status', async () => {
      const events = await eventStore.getFiltered({ isOnline: true })
      expect(events.every((e: Event) => e.isOnline === true)).toBe(true)
    })

    it('should search by title', async () => {
      const events = await eventStore.getFiltered({ search: 'Hackathon' })
      expect(events.length).toBeGreaterThan(0)
      expect(events.some((e: Event) => e.title.includes('Hackathon'))).toBe(true)
    })
  })

  describe('calculateStatus', () => {
    it('should return upcoming for future dates', () => {
      const futureDate = new Date(Date.now() + 86400000).toISOString()
      const status = eventStore.calculateStatus(futureDate)
      expect(status).toBe('upcoming')
    })

    it('should return completed for past dates', () => {
      const pastDate = new Date(Date.now() - 86400000 * 2).toISOString()
      const pastEndDate = new Date(Date.now() - 86400000).toISOString()
      const status = eventStore.calculateStatus(pastDate, pastEndDate)
      expect(status).toBe('completed')
    })
  })
})