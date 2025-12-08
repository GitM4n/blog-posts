<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getPost } from '@/api'
import type { Post } from '@/types'
import { formatDate } from '@/utils'

const props = defineProps<{ id: string }>()

const post = ref<Post | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  const data = await getPost(props.id)
  if (data) post.value = data
  isLoading.value = false
})
</script>

<template>
  <UContainer>
    <template v-if="isLoading">
      <USkeleton class="w-full h-20 rounded-xl" />
    </template>

    <template v-else-if="post">
      <div class="space-y-5">
        <div class="flex items-center gap-4">
          <UAvatar :src="post.avatar" size="3xl" />
          <time class="text-xl dark:text-old-neutral-200 text-old-neutral-500 font-mono">{{
            formatDate(post.createdAt)
          }}</time>
        </div>
        <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
        <p class="text-lg">{{ post.text }}</p>
      </div>
    </template>

    <p v-else>Post not found :(</p>
  </UContainer>
</template>
