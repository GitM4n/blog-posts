import { POSTS_API_URL } from '@/lib/constants'
import type { Post } from '@/types'

export async function updatePost(post: Post): Promise<Post | undefined> {
  try {
    const url = new URL(post.id, POSTS_API_URL)

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
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
