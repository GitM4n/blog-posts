<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import type { Post } from '@/types'
import { reactive, useId, computed } from 'vue'

type Schema = typeof state

const props = defineProps<{ post?: Post; actionType?: 'edit' | 'add' }>()

const emit = defineEmits<{
  submit: [data: Post]
}>()

const state = reactive<Pick<Post, 'title' | 'text'>>({
  title: props.post?.title ?? '',
  text: props.post?.text ?? '',
})

const isOpened = defineModel({ default: false })

function validate(state: Partial<Schema>): FormError[] {
  const errors = []
  if (!state.title || state.title.length > 100)
    errors.push({ name: 'title', message: 'Required, Max length 100' })
  if (!state.text || state.text.length > 500)
    errors.push({ name: 'text', message: 'Required, Max length 500' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const data: Post = {
    ...event.data,
    id: props.post?.id ?? useId() + Date.now(),
    createdAt: props.post?.createdAt ?? new Date().toISOString(),
    name: props.post?.name ?? 'John Doe',
    avatar: props.post?.avatar ?? 'https://ui-avatars.com/api/?name=John+Doe',
  }

  emit('submit', data)
  isOpened.value = false
}

const title = computed(() =>
  props.actionType === 'add' ? 'Add Post' : 'Edit Post ' + props.post?.id,
)
</script>

<template>
  <UModal v-model:open="isOpened" :title>
    <template #body>
      <UForm :state :validate @submit="onSubmit" class="space-y-4" :validate-on="[]">
        <UFormField label="Title" name="title" v-model="state.title">
          <UInput v-model="state.title" placeholder="Write Title" size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Text" name="text" v-model="state.text">
          <UTextarea
            v-model="state.text"
            placeholder="Write Text"
            size="xl"
            class="w-full"
            :max-rows="6"
            autoresize
          />
        </UFormField>

        <UButton type="submit" size="xl" block>{{ actionType === 'add' ? 'Add' : 'Save' }}</UButton>
      </UForm>
    </template>
  </UModal>
</template>
