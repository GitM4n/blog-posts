import { POSTS_API_URL } from '@/lib/constants'
import type { Post } from '@/types'

export async function getPosts(parameters?: {
  searchQuery?: string
  page?: number
  limit?: number
}): Promise<Post[] | undefined> {
  try {
    const url = new URL(POSTS_API_URL)
    Object.entries({
      search: parameters?.searchQuery,
      page: parameters?.page,
      limit: parameters?.limit,
    }).forEach(([key, value]) => value && url.searchParams.set(key, String(value)))

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status}, ${response.statusText}`)
    }

    const data = await response.json()
    return data as Post[]
  } catch (error) {
    console.error(error)
  }
}
