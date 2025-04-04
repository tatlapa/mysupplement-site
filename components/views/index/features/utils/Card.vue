<script setup lang="ts">
const props = defineProps<{
  icon: Function;
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center text-center">
    <div
      class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white"
    >
      <component :is="props.icon" />
    </div>
    <h3 class="mt-4 text-lg font-medium text-primary">
      {{ props.title }}
    </h3>
    <p class="mt-2 text-base text-muted-foreground">{{ props.description }}</p>
  </div>
</template>
