<script setup lang="ts">
const props = defineProps<{
  icon: Function;
  title: string;
  description: string;
  number: number;
}>();
</script>

<template>
  <div class="text-center flex flex-col items-center">
    <div
      class="flex items-center justify-center h-12 w-12 rounded-md bg-primary mb-4"
    >
      <component :is="props.icon" />
    </div>
    <div class="text-sm mb-2 text-primary">Step {{ props.number }}</div>
    <h3 class="text-lg font-medium text-primary">{{ props.title }}</h3>
    <p class="mt-2 text-base text-muted-foreground">{{ props.description }}</p>
  </div>
</template>
