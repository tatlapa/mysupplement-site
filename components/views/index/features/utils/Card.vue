<script setup lang="ts">
const props = defineProps<{
  icon: Function;
  title: string;
  description: string;
  color?: string;
  bgColor?: string;
}>();
</script>

<template>
  <div
    class="group relative bg-card dark:bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-card-secondary"
  >
    <!-- Icon container -->
    <div class="flex justify-center mb-6">
      <div
        :class="`flex items-center justify-center h-16 w-16 rounded-xl ${
          props.bgColor || 'bg-primary/10'
        } group-hover:scale-110 transition-transform duration-300`"
      >
        <component :is="props.icon" :class="`w-8 h-8 text-primary`" />
      </div>
    </div>

    <!-- Content -->
    <div class="text-center">
      <h3
        class="text-xl font-bold text-card-foreground dark:text-card-foreground mb-4 group-hover:text-primary transition-colors duration-300"
      >
        {{ props.title }}
      </h3>
      <p class="text-muted-foreground leading-relaxed">
        {{ props.description }}
      </p>
    </div>

    <!-- Hover effect overlay -->
    <div
      class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
    ></div>
  </div>
</template>
