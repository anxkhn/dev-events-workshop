import { NextRequest, NextResponse } from 'next/server'
import { eventStore } from '@/lib/store'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const eventId = formData.get('eventId') as string
  
  if (!eventId) {
    return NextResponse.json({ error: 'Event ID is required' }, { status: 400 })
  }

  const userId = 'anonymous-user'
  const result = await eventStore.upvote(eventId, userId)
  
  if (!result) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }

  const headers = new Headers()
  const referer = request.headers.get('referer') || '/'
  headers.set('Location', referer)

  return new NextResponse(null, {
    status: 303,
    headers
  })
}