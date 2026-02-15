'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="text-center py-16">
      <svg
        className="w-24 h-24 mx-auto text-red-500 mb-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-[var(--muted)] mb-8">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
        <a
          href="/"
          className="border border-[var(--border)] px-6 py-3 rounded-lg font-semibold hover:border-[var(--primary)] transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}