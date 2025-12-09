import type { Post, PostParameters } from '@/types'
import { ref } from 'vue'
import {
  getPosts,
  addPost as addUserPost,
  updatePost as updateUserPost,
  deletePost as deleteUserPost,
} from '@/api'

const posts = ref<Post[]>([])

export function usePosts({ limit = 10 }: { limit?: number } = {}) {
  const isFetching = ref(false)
  const toast = useToast()
  const page = ref(1)
  const currentFilters = ref<Partial<PostParameters>>()

  async function fetchPosts(parameters?: PostParameters) {
    isFetching.value = true
    if(parameters) currentFilters.value = parameters

    try {
      const data = await getPosts({ ...parameters, limit, page: page.value })

      if (Array.isArray(data)) posts.value = data
      else
        toast.add({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        })
    } catch (error) {
      console.error(error)
    } finally {
      isFetching.value = false
    }
  }

  async function loadMore() {
    isFetching.value = true

    try {
      const data = await getPosts({ page: posts.value.length / limit + 1, limit })

      if (Array.isArray(data)) posts.value.push(...data)
      else
        toast.add({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        })
    } catch (error) {
      console.error(error)
    } finally {
      isFetching.value = false
    }
  }

  async function deletePost(id: string) {
    try {
      const data = await deleteUserPost(id)

      if (data) posts.value = posts.value.filter((p) => p.id !== id)
      else
        toast.add({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        })
    } catch (error) {
      console.error(error)
    }
  }

  async function addPost(post: Post) {
    try {
      const data = await addUserPost(post)

      if (data) {
        posts.value = []
        page.value = 1
        await fetchPosts()
      } else
        toast.add({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        })
    } catch (error) {
      console.error(error)
    }
  }

  async function editPost(post: Post) {
    try {
      const data = await updateUserPost(post)

      if (data) posts.value = posts.value.map((p) => (p.id === post.id ? data : p))
      else
        toast.add({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    fetchPosts,
    loadMore,
    isFetching,
    posts,
    deletePost,
    addPost,
    editPost,
  }
}
