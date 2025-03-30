<script setup lang="ts">

const props = defineProps<{
  icon: object
  title: string
  description: string
  number: number
}>()
</script>

<template>
  <div class="text-center flex flex-col items-center">
    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
      <component :is="icon" class="w-5 h-5" />
    </div>
    <div class="text-sm text-muted-foreground mb-2">Step {{ number }}</div>
    <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
    <p class="mt-2 text-base text-gray-500">{{ description }}</p>
  </div>
</template>
