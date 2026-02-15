import { NextRequest, NextResponse } from 'next/server'
import { eventStore } from '@/lib/store'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category') || undefined
  const status = searchParams.get('status') || undefined
  const search = searchParams.get('search') || undefined
  const online = searchParams.get('online')

  const events = await eventStore.getFiltered({
    category,
    status,
    search,
    isOnline: online === 'true' ? true : online === 'false' ? false : undefined,
  })

  return NextResponse.json({ data: events, total: events.length })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const event = await eventStore.create(body)
    return NextResponse.json({ data: event }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 400 }
    )
  }
}