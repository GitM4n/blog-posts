<script setup lang="ts">
import PostCard from './PostCard.vue'
import IntersectionObserver from './IntersectionObserver.vue'
import PostFilters from './PostFilters.vue'
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue'
import { usePosts, useScrollMemory } from '@/composables'
import type { Post, PostParameters } from '@/types'

const SKELETON_COUNT = 6

const PostFormModal = defineAsyncComponent(() => import('./PostFormModal.vue'))

const { fetchPosts, posts, isFetching, loadMore, deletePost, editPost, addPost } = usePosts()
const { save, restore } = useScrollMemory('posts')

const postFormModalState = reactive<{
  isModalOpened: boolean
  actionType: 'add' | 'edit'
  post?: Post
}>({
  isModalOpened: false,
  actionType: 'add',
  post: undefined,
})

function addNewPost() {
  postFormModalState.isModalOpened = true
  postFormModalState.actionType = 'add'
}

function editExistingPost(post: Post) {
  postFormModalState.isModalOpened = true
  postFormModalState.actionType = 'edit'
  postFormModalState.post = post
}

function postFormSubmit(data: Post) {
  if (postFormModalState.actionType === 'add') addPost(data)
  else editPost(data)

  postFormModalState.isModalOpened = false
  postFormModalState.post = undefined
}

const isDrawerOpened = ref(false)

async function fetchWithFilters(parameters?: Partial<PostParameters>) {
  isDrawerOpened.value = false
  await fetchPosts(parameters)
}

onMounted(async () => {
  restore()
  if (posts.value.length) return
  await fetchPosts()
})
</script>

<template>
  <div class="relative lg:grid grid-cols-[150px_1fr_200px] items-start gap-5">
    <UButton
      class="rounded-xl px-5 py-4 lg:text-xl text-2xl lg:sticky lg:top-30 max-lg:fixed max-lg:bottom-5 max-lg:left-1/2 max-lg:-translate-x-1/2"
      leading-icon="heroicons:plus-circle"
      :ui="{
        leadingIcon: 'size-5',
      }"
      @click="addNewPost"
    >
      Add Post
    </UButton>

    <div>
      <ul class="space-y-3" v-if="posts.length">
        <li v-for="post in posts" :key="post.id">
          <p class="font-serif font-bold text-xl">№ {{ post.id }}</p>
          <PostCard
            :post
            class="cursor-pointer"
            @open-post="save"
            @delete-post="deletePost"
            @edit-post="editExistingPost"
          />
        </li>
        <IntersectionObserver @intersect="loadMore" />

        <template v-if="isFetching">
          <USkeleton
            v-for="count in SKELETON_COUNT / 3"
            :key="count"
            class="w-full h-50 rounded-xl"
          />
        </template>
      </ul>
      <template v-else-if="isFetching">
        <USkeleton
          v-for="count in SKELETON_COUNT"
          :key="count"
          class="w-full h-50 rounded-xl mb-3"
        />
      </template>

      <p v-else class="text-2xl dark:text-old-neutral-50 text-old-neutral-950 font-bold">
        No posts :(
      </p>
    </div>

    <PostFilters @fetch-with-filters="fetchWithFilters" class="sticky top-30 max-lg:hidden" />

    <UDrawer v-model:open="isDrawerOpened" class="lg:hidden fixed bottom-5 right-5" >
      <UButton leading-icon="heroicons:bars-3-bottom-right-20-solid" size="xl" />

      <template #body>
        <PostFilters @fetch-with-filters="fetchWithFilters" class="w-full" />
      </template>
    </UDrawer>

    <PostFormModal
      v-if="postFormModalState.isModalOpened"
      v-model="postFormModalState.isModalOpened"
      :post="postFormModalState.post"
      :action-type="postFormModalState.actionType"
      @submit="postFormSubmit"
    />
  </div>
</template>
