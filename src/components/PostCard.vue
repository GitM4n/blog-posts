<script setup lang="ts">
import { formatDate } from '@/utils'
import type { Post } from '@/types'
import { useRouter } from 'vue-router'
import type { ContextMenuItem } from '@nuxt/ui'

const router = useRouter()

const props = defineProps<{ post: Post }>()
const emit = defineEmits<{
  openPost: []
  editPost: [post: Post]
  deletePost: [id: string]
}>()

function openPost() {
  emit('openPost')
  router.push({ name: 'post', params: { id: props.post.id } })
}

const actions: ContextMenuItem[] = [
  {
    label: 'Edit',
    icon: 'heroicons:pencil',
    onSelect: () => emit('editPost', props.post),
  },
  {
    label: 'Delete',
    icon: 'heroicons:trash',
    color: 'error' as const,
    onSelect: () => emit('deletePost', props.post.id),
  },
]
</script>

<template>
  <UContextMenu :items="actions">
    <UCard
      as="a"
      class="block hover:ring-primary-400"
      :ui="{ header: 'flex items-center gap-3' }"
      @click="openPost"
    >
      <template #header>
        <UTooltip :text="post.name">
          <UAvatar :src="post.avatar" :alt="post.name" size="2xl" />
        </UTooltip>
        <div class="flex flex-col gap-1">
          <time class="text-sm font-mono dark:text-old-neutral-200 text-old-neutral-500">{{
            formatDate(post.createdAt)
          }}</time>
          <h3 class="text-primary text-xl">{{ post.title }}</h3>
        </div>
      </template>

      <p class="line-clamp-2">{{ post.text }}</p>
    </UCard>
  </UContextMenu>
</template>
