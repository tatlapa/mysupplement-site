<template>
  <div class="flex flex-col items-center text-center">
    <div
      class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white"
    >
      <icon />
    </div>
    <h3 class="mt-4 text-lg font-medium text-gray-900">{{ title }}</h3>
    <p class="mt-2 text-base text-gray-500">{{ description }}</p>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  icon: Object,
  title: String,
  description: String,
});
</script>
