<script setup lang="ts">
import { cn } from "@/lib/utils";
import { computed, ref, watch } from "vue";

const props = defineProps<{
  isOpen: boolean;
  class?: string;
}>();

// une fois ouvert au moins une fois, on garde le DOM vivant
const hasBeenOpened = ref(props.isOpen);

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) hasBeenOpened.value = true;
  }
);

const containerClass = computed(() =>
  cn(
    "overflow-hidden text-sm transition-all",
    props.isOpen ? "animate-accordion-down" : "animate-accordion-up",
    props.class
  )
);
</script>

<template>
  <!-- 🧠 Ne monte le DOM que si ouvert une fois -->
  <div v-if="hasBeenOpened" :class="containerClass" v-show="props.isOpen">
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </div>
</template>
