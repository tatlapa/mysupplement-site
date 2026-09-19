<script setup lang="ts">
import { goals } from "~/utils/advicerOptions";
</script>

<template>
  <section class="container flex flex-col gap-8 pb-10 pt-20 md:gap-10 md:pb-16 md:pt-28">
    <div class="flex flex-col gap-4">
      <p class="kicker">Start with a goal</p>
      <h2>What are you working on?</h2>
    </div>
    <div class="flex max-w-[1120px] flex-wrap gap-2 md:gap-3">
      <NuxtLink
        v-for="goal in goals"
        :key="goal.id"
        :to="{ path: '/supplement-advicer', query: { goal: goal.id } }"
        class="chip border-foreground md:h-[52px] md:px-6 md:text-[17px]"
      >
        {{ goal.label }}
      </NuxtLink>
    </div>
  </section>
</template>
