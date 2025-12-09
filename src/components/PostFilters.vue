<script setup lang="ts">
import { reactive } from 'vue'
import type { RadioGroupItem, SelectItem } from '@nuxt/ui'
import type { PostParameters } from '@/types';

type PostFilter = Pick<PostParameters, 'sortBy' | 'order' | 'searchQuery'>

const emit = defineEmits<{
  fetchWithFilters:[data: PostFilter],
}>()

const sortFields:SelectItem[] = [
  { label: 'By author', value: 'name' },
  { label: 'By title', value: 'title' },
  { label: 'By date', value: 'createdAt' },
]

const orderOptions: RadioGroupItem[] = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
]

const filters = reactive<PostFilter>({
  sortBy:'',
  order:'asc',
  searchQuery: '',
})

function reset(){
  filters.sortBy = ''
  filters.order = 'asc'
  filters.searchQuery = ''
}

function applyFilters(){
  emit('fetchWithFilters', filters)
}
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <UInput v-model="filters.searchQuery" placeholder="Search by keywords" size="xl" class="w-full" />
    </div>

    <div class="space-y-2">
      <div>
        <p class="mb-2">Sort by</p>
        <USelect
          v-model="filters.sortBy"
          :items="sortFields"
          placeholder="Sort by..."
          class="w-full"
          size="xl"
        />
      </div>

      <div>
        <p class="mb-2">Order</p>
        <URadioGroup
          v-model="filters.order"
          :items="orderOptions"
          placeholder="Order"
          class="w-full"
          size="xl"
        />
      </div>
    </div>

    <UButton class="w-full mb-2" size="xl" @click="applyFilters">Search</UButton>
    <UButton v-if="filters.sortBy" @click="reset" color="error" class="w-full" size="xl">Reset</UButton>
  </div>
</template>
