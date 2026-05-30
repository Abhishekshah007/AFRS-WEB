import { redirect } from 'next/navigation'

/** Legacy /articles URL → student hub articles listing. */
export default function ArticlesRedirect() {
  redirect('/student-hub/articles')
}
