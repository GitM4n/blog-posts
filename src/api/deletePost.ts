import { POSTS_API_URL } from '@/lib/constants'
import type { Post } from '@/types'

export async function deletePost(id: string): Promise<Post | undefined> {
  try {
    const url = new URL(id, POSTS_API_URL)

    const response = await fetch(url, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status}, ${response.statusText}`)
    }

    const data = await response.json()
    return data as Post
  } catch (error) {
    console.error(error)
  }
}
