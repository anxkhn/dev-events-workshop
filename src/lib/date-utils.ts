import { format, formatDistanceToNow, isAfter, isBefore, isValid, parseISO } from 'date-fns'

export function formatDate(date: string | Date, formatStr: string = 'PPP'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (!isValid(dateObj)) {
    return 'Invalid date'
  }
  
  return format(dateObj, formatStr)
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, 'PPp')
}

export function getRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (!isValid(dateObj)) {
    return 'Invalid date'
  }
  
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

export function isEventUpcoming(date: string): boolean {
  const eventDate = parseISO(date)
  const now = new Date()
  return isAfter(eventDate, now)
}

export function isEventPast(endDate: string): boolean {
  const eventEndDate = parseISO(endDate)
  const now = new Date()
  return isBefore(eventEndDate, now)
}

export function isEventOngoing(startDate: string, endDate?: string): boolean {
  const start = parseISO(startDate)
  const end = endDate ? parseISO(endDate) : new Date(start.getTime() + 24 * 60 * 60 * 1000)
  const now = new Date()
  
  return !isBefore(now, start) && !isAfter(now, end)
}

export function getEventDuration(startDate: string, endDate?: string): string {
  const start = parseISO(startDate)
  const end = endDate ? parseISO(endDate) : new Date(start.getTime() + 24 * 60 * 60 * 1000)
  
  if (!isValid(start) || !isValid(end)) {
    return 'Invalid duration'
  }
  
  const diffMs = end.getTime() - start.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''}`
  }
  
  return `${diffHours} hour${diffHours > 1 ? 's' : ''}`
}

export function getTimeUntilEvent(date: string): string {
  const eventDate = parseISO(date)
  const now = new Date()
  
  if (!isValid(eventDate)) {
    return 'Invalid date'
  }
  
  if (isBefore(eventDate, now)) {
    return 'Event has passed'
  }
  
  const diffMs = eventDate.getTime() - now.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  if (diffDays > 0) {
    return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`
  }
  
  if (diffHours > 0) {
    return `in ${diffHours} hour${diffHours > 1 ? 's' : ''}`
  }
  
  const diffMins = Math.floor(diffMs / (1000 * 60))
  return `in ${diffMins} minute${diffMins > 1 ? 's' : ''}`
}

export function isValidDateString(date: string): boolean {
  const parsed = parseISO(date)
  return isValid(parsed)
}

export function formatEventDateRange(startDate: string, endDate?: string): string {
  const start = parseISO(startDate)
  
  if (!isValid(start)) {
    return 'Invalid date'
  }
  
  if (!endDate) {
    return format(start, 'PPP')
  }
  
  const end = parseISO(endDate)
  
  if (!isValid(end)) {
    return format(start, 'PPP')
  }
  
  if (format(start, 'yyyy-MM-dd') === format(end, 'yyyy-MM-dd')) {
    return format(start, 'PPP')
  }
  
  return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`
}