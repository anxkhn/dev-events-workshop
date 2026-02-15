import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatDateTime,
  getRelativeTime,
  isEventUpcoming,
  isEventPast,
  isEventOngoing,
  getEventDuration,
  getTimeUntilEvent,
  isValidDateString,
  formatEventDateRange,
} from './date-utils'

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = '2025-03-15T09:00:00Z'
      const formatted = formatDate(date, 'yyyy-MM-dd')
      expect(formatted).toBe('2025-03-15')
    })

    it('should handle invalid date', () => {
      const formatted = formatDate('invalid')
      expect(formatted).toBe('Invalid date')
    })
  })

  describe('formatDateTime', () => {
    it('should format datetime correctly', () => {
      const date = new Date('2025-03-15T09:00:00Z')
      const formatted = formatDateTime(date)
      expect(formatted).toContain('Mar')
      expect(formatted).toContain('15')
      expect(formatted).toContain('2025')
    })
  })

  describe('getRelativeTime', () => {
    it('should return relative time for past date', () => {
      const pastDate = new Date(Date.now() - 3600000).toISOString()
      const relative = getRelativeTime(pastDate)
      expect(relative).toContain('ago')
    })

    it('should return relative time for future date', () => {
      const futureDate = new Date(Date.now() + 86400000).toISOString()
      const relative = getRelativeTime(futureDate)
      expect(relative).toContain('in')
    })
  })

  describe('isEventUpcoming', () => {
    it('should return true for future dates', () => {
      const futureDate = new Date(Date.now() + 86400000).toISOString()
      expect(isEventUpcoming(futureDate)).toBe(true)
    })

    it('should return false for past dates', () => {
      const pastDate = new Date(Date.now() - 86400000).toISOString()
      expect(isEventUpcoming(pastDate)).toBe(false)
    })
  })

  describe('isEventPast', () => {
    it('should return true for past dates', () => {
      const pastDate = new Date(Date.now() - 86400000).toISOString()
      expect(isEventPast(pastDate)).toBe(true)
    })

    it('should return false for future dates', () => {
      const futureDate = new Date(Date.now() + 86400000).toISOString()
      expect(isEventPast(futureDate)).toBe(false)
    })
  })

  describe('isEventOngoing', () => {
    it('should return true for ongoing event', () => {
      const startDate = new Date(Date.now() - 3600000).toISOString()
      const endDate = new Date(Date.now() + 3600000).toISOString()
      expect(isEventOngoing(startDate, endDate)).toBe(true)
    })

    it('should return false for future event', () => {
      const startDate = new Date(Date.now() + 86400000).toISOString()
      expect(isEventOngoing(startDate)).toBe(false)
    })
  })

  describe('getEventDuration', () => {
    it('should calculate multi-day duration', () => {
      const start = '2025-03-15T09:00:00Z'
      const end = '2025-03-17T09:00:00Z'
      const duration = getEventDuration(start, end)
      expect(duration).toBe('2 days')
    })

    it('should calculate hour duration', () => {
      const start = '2025-03-15T09:00:00Z'
      const end = '2025-03-15T14:00:00Z'
      const duration = getEventDuration(start, end)
      expect(duration).toBe('5 hours')
    })
  })

  describe('getTimeUntilEvent', () => {
    it('should return time until future event', () => {
      const futureDate = new Date(Date.now() + 172800000).toISOString()
      const timeUntil = getTimeUntilEvent(futureDate)
      expect(timeUntil).toContain('in')
      expect(timeUntil).toContain('day')
    })

    it('should return passed for past event', () => {
      const pastDate = new Date(Date.now() - 86400000).toISOString()
      expect(getTimeUntilEvent(pastDate)).toBe('Event has passed')
    })
  })

  describe('isValidDateString', () => {
    it('should return true for valid ISO date', () => {
      expect(isValidDateString('2025-03-15T09:00:00Z')).toBe(true)
    })

    it('should return false for invalid date', () => {
      expect(isValidDateString('not-a-date')).toBe(false)
    })
  })

  describe('formatEventDateRange', () => {
    it('should format single day event', () => {
      const start = '2025-03-15T09:00:00Z'
      const end = '2025-03-15T18:00:00Z'
      const range = formatEventDateRange(start, end)
      expect(range).toBe('Mar 15, 2025')
    })

    it('should format multi-day event', () => {
      const start = '2025-03-15T09:00:00Z'
      const end = '2025-03-17T18:00:00Z'
      const range = formatEventDateRange(start, end)
      expect(range).toContain('Mar 15')
      expect(range).toContain('Mar 17')
    })
  })
})