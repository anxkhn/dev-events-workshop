'use client'

import { useState } from 'react'
import { upvoteEvent } from '@/actions/events'

interface UpvoteButtonProps {
  eventId: string
}

export function UpvoteButton({ eventId }: UpvoteButtonProps) {
  const [isPending, setIsPending] = useState(false)

  async function handleUpvote() {
    setIsPending(true)
    await upvoteEvent(eventId)
    setIsPending(false)
  }

  return (
    <button
      onClick={handleUpvote}
      disabled={isPending}
      className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      aria-label="Upvote this event"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
      {isPending ? 'Upvoting...' : 'Upvote'}
    </button>
  )
}