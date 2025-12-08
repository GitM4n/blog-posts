import { POSTS_API_URL } from '@/lib/constants'
import type { Post } from '@/types'

export async function getPost(id: string): Promise<Post | undefined> {
  try {
    const url = new URL(id, POSTS_API_URL)

    console.log(url)

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status}, ${response.statusText}`)
    }

    const data = await response.json()
    return data as Post
  } catch (error) {
    console.error(error)
  }
}
