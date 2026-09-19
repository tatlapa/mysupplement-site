<script setup lang="ts">
const steps = [
  { title: "Basic info", description: "Age and sex, the two things that shift most doses." },
  { title: "Health goals", description: "Pick what you want to improve, from sleep to performance." },
  { title: "Lifestyle", description: "Sleep quality and stress level sharpen the picture." },
  { title: "Your protocol", description: "A short list with dose, timing and why each one is there." },
];
</script>

<template>
  <section class="border-y bg-card">
    <div class="container flex flex-col gap-10 py-16 md:gap-14 md:py-24">
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div class="flex flex-col gap-4">
          <p class="kicker">How it works</p>
          <h2>Four questions. One protocol.</h2>
        </div>
        <NuxtLink
          to="/supplement-advicer"
          class="flex items-center gap-2 font-semibold text-primary"
        >
          Try it now <LucideArrowRight class="h-[18px] w-[18px]" />
        </NuxtLink>
      </div>
      <ol class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          :class="[
            'flex flex-col gap-3 border-t-2 pt-6',
            index === steps.length - 1 ? 'border-primary' : 'border-foreground',
          ]"
        >
          <span
            :class="[
              'font-mono text-[13px]',
              index === steps.length - 1 ? 'text-primary' : 'text-muted-foreground',
            ]"
          >
            0{{ index + 1 }}
          </span>
          <h3 class="text-2xl md:text-[26px]">{{ step.title }}</h3>
          <p class="leading-relaxed text-muted-foreground">{{ step.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
