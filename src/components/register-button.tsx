'use client'

import { useState } from 'react'
import { registerForEvent, unregisterFromEvent } from '@/actions/events'

interface RegisterButtonProps {
  eventId: string
  maxAttendees?: number
  currentAttendees: number
}

export function RegisterButton({ eventId, maxAttendees, currentAttendees }: RegisterButtonProps) {
  const [isRegistered, setIsRegistered] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const isFull = maxAttendees ? currentAttendees >= maxAttendees : false

  async function handleRegister() {
    setIsPending(true)
    const result = await registerForEvent(eventId)
    if (result.success) {
      setIsRegistered(true)
    }
    setIsPending(false)
  }

  async function handleUnregister() {
    setIsPending(true)
    const result = await unregisterFromEvent(eventId)
    if (result.success) {
      setIsRegistered(false)
    }
    setIsPending(false)
  }

  if (isRegistered) {
    return (
      <button
        onClick={handleUnregister}
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 border border-[var(--border)] py-2 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors disabled:opacity-50"
        aria-label="Unregister from this event"
      >
        {isPending ? 'Processing...' : 'Unregister'}
      </button>
    )
  }

  return (
    <button
      onClick={handleRegister}
      disabled={isPending || isFull}
      className="w-full flex items-center justify-center gap-2 bg-[var(--success)] text-white py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      aria-label="Register for this event"
    >
      {isFull ? 'Event Full' : isPending ? 'Registering...' : 'Register'}
    </button>
  )
}