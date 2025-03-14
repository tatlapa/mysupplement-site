<script setup lang="ts">
const props = defineProps<{
  message?: string[];
}>();
</script>

<template>
  <div v-show="props.message" class="mt-1">
    <p v-for="(msg, index) in props.message" :key="index" class="text-xs text-red-600 dark:text-red-400">
      {{ msg }}
    </p>
  </div>
</template>
