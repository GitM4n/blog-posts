import { POSTS_API_URL } from '@/lib/constants'
import type { Post, PostParameters } from '@/types'

export async function getPosts(parameters?: PostParameters): Promise<Post[] | undefined> {
  try {
    const url = new URL(POSTS_API_URL)
    Object.entries({
      search: parameters?.searchQuery,
      page: parameters?.page,
      limit: parameters?.limit,
      sortBy: parameters?.sortBy,
      order: parameters?.order,
    }).forEach(([key, value]) => value && url.searchParams.set(key, String(value)))

    console.log(parameters)

    const response = await fetch(url)

    if(response.status === 404) return []
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status}, ${response.statusText}`)
    }

    const data = await response.json()
    return data as Post[]
  } catch (error) {
    console.error(error)
  }
}
