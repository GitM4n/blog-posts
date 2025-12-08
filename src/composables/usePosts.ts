import type { Post } from '@/types'
import { ref } from 'vue'
import { getPosts } from '@/api'

const posts = ref<Post[]>([])

export function usePosts() {
  const isFetching = ref(false)
  const toast = useToast()

  async function fetchPosts(parameters?: { searchQuery?: string; page?: number; limit?: number }) {
    isFetching.value = true
    const data = await getPosts(parameters)

    if (Array.isArray(data)) posts.value = data
    else
      toast.add({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      })

    isFetching.value = false
  }

  return {
    fetchPosts,
    isFetching,
    posts,
  }
}
