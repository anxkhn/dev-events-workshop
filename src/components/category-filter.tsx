'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { EventCategory } from '@/types'

const categories: { value: EventCategory | ''; label: string }[] = [
  { value: '', label: 'All Categories' },
  { value: 'hackathon', label: 'Hackathons' },
  { value: 'meetup', label: 'Meetups' },
  { value: 'conference', label: 'Conferences' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'webinar', label: 'Webinars' },
  { value: 'bootcamp', label: 'Bootcamps' },
]

function CategoryFilterInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') || ''

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    router.push(`/events?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(cat => (
        <button
          key={cat.value}
          onClick={() => handleCategoryChange(cat.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentCategory === cat.value
              ? 'bg-[var(--primary)] text-white'
              : 'bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export function CategoryFilter() {
  return (
    <Suspense fallback={<div className="h-10" />}>
      <CategoryFilterInner />
    </Suspense>
  )
}