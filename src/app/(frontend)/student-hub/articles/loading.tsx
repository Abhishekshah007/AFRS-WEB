export default function ArticlesLoading() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6 py-20">
      <div className="w-full max-w-md text-center" role="status" aria-live="polite">
        <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
        <p className="mt-4 font-semibold text-slate-800">Loading articles…</p>
        <p className="mt-1 text-sm text-slate-500">
          We are fetching the latest articles for you. This may take a few seconds depending on your
          connection.
        </p>
        <span className="sr-only">Loading article content</span>
      </div>
    </div>
  )
}
