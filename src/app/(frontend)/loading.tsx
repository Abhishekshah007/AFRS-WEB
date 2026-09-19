export default function FrontendLoading() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-[1280px] items-center justify-center px-6 py-24">
      <div className="text-center" role="status" aria-live="polite" aria-label="Loading page">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
        <p className="mt-4 text-sm font-semibold text-slate-600">Loading…</p>
      </div>
    </div>
  )
}
