<script setup lang="ts">
import PostCard from './PostCard.vue'
import type { Post } from '@/types'

const SKELETON_COUNT = 3

defineProps<{
  posts: Post[]
  isFetching?: boolean
}>()
</script>

<template>
  <ul class="space-y-3">
    <template v-if="posts.length">
      <li v-for="post in posts" :key="post.id">
        <PostCard :post class="cursor-pointer" />
      </li>
    </template>
    <template v-else-if="isFetching">
      <USkeleton v-for="count in SKELETON_COUNT" class="w-full h-20 rounded-xl" />
    </template>

    <p v-else class="text-2xl dark:text-old-neutral-50 text-old-neutral-950 font-bold">
      No posts :(
    </p>
  </ul>
</template>
