<script setup lang="ts">
import { onMounted } from 'vue'
import PostsList from './PostsList.vue'
import { usePosts } from '@/composables/usePosts'

const { fetchPosts, posts, isFetching } = usePosts()

onMounted(async () => {
  await fetchPosts()
})
</script>

<template>
  <div>
    <UContainer>
      <PostsList :posts :is-fetching />
    </UContainer>
  </div>
</template>
