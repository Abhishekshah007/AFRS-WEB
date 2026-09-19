import type { PaginatedDocs } from 'payload'

/** Empty Payload list shape for safe fallbacks when CMS is unavailable. */
export function emptyPaginatedDocs<T>(): PaginatedDocs<T> {
  return {
    docs: [],
    totalDocs: 0,
    limit: 0,
    totalPages: 0,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  }
}
