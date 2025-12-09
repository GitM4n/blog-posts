<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'

const emit = defineEmits<{
  intersect: []
}>()

const observable = useTemplateRef('observable')

onMounted(() => {
  if (!observable.value) return

  const observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) emit('intersect')
  })

  observer.observe(observable.value)
})
</script>

<template>
  <div ref="observable" class="w-full h-px" />
</template>
