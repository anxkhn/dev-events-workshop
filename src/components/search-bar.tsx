'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function SearchBarInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    router.push(`/events?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="search"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-64"
        aria-label="Search events"
      />
      <button type="submit" className="px-4 py-2">
        Search
      </button>
    </form>
  )
}

export function SearchBar() {
  return (
    <Suspense fallback={<div className="h-10" />}>
      <SearchBarInner />
    </Suspense>
  )
}