<script setup lang="ts">
// Extrait d'une vraie réponse de l'advisor, affiché comme exemple
const sample = [
  { name: "Melatonin", benefit: "Improves sleep onset", dose: "0.5–3 mg", timing: "before bed" },
  { name: "L-Theanine", benefit: "Calm without drowsiness", dose: "100–200 mg", timing: "morning" },
  { name: "Ashwagandha", benefit: "Lowers cortisol", dose: "300–500 mg", timing: "with breakfast" },
];
</script>

<template>
  <section
    class="container grid items-center gap-16 pb-20 pt-12 md:pb-28 md:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-20"
  >
    <div class="rise-in flex flex-col gap-6 md:gap-8">
      <p class="kicker">Personal supplement advisor</p>
      <h1 class="text-5xl leading-none md:text-7xl xl:text-[86px] xl:leading-[0.98]">
        Supplements chosen for <em class="italic text-primary">you</em>, not for everyone.
      </h1>
      <p class="max-w-[540px] text-lg leading-relaxed text-muted-foreground md:text-xl">
        Answer four questions about your age, goals, sleep and stress. Get a
        short protocol with doses, timing, and the reason behind each pick.
      </p>
      <div class="flex flex-col gap-3 pt-2 sm:flex-row">
        <NuxtLink to="/supplement-advicer" class="btn-primary">
          Start the analysis
          <LucideArrowRight class="h-[18px] w-[18px]" />
        </NuxtLink>
        <NuxtLink to="/shop" class="btn-outline">Browse the shop</NuxtLink>
      </div>
      <p class="font-mono text-xs tracking-[0.04em] text-muted-foreground max-sm:text-center">
        4 QUESTIONS · NO ACCOUNT NEEDED · FREE
      </p>
    </div>

    <div class="flex justify-center">
      <div
        class="label-card rise-in flex w-full max-w-[520px] flex-col gap-5 p-6 [animation-delay:150ms] md:p-8"
      >
        <div class="flex justify-between font-mono text-xs tracking-[0.08em]">
          <span>YOUR PROTOCOL</span>
          <span class="text-muted-foreground">SAMPLE</span>
        </div>
        <p
          class="border-b-[1.5px] border-dashed border-foreground/30 pb-4 font-mono text-xs text-muted-foreground"
        >
          Female · 34 · Sleep: poor · Stress: high
        </p>
        <div class="flex flex-col gap-[18px]">
          <div
            v-for="item in sample"
            :key="item.name"
            class="flex items-baseline justify-between gap-4"
          >
            <div class="flex flex-col gap-1">
              <span class="font-display text-xl md:text-2xl">{{ item.name }}</span>
              <span class="text-sm text-muted-foreground">{{ item.benefit }}</span>
            </div>
            <span class="text-right font-mono text-[13px]">
              {{ item.dose }}<br />{{ item.timing }}
            </span>
          </div>
        </div>
        <div
          class="flex justify-between border-t-[1.5px] border-dashed border-foreground/30 pt-4 font-mono text-[11px] tracking-[0.04em] text-muted-foreground"
        >
          <span>+ 3 MORE IN YOUR RESULTS</span>
          <span>NOT MEDICAL ADVICE</span>
        </div>
      </div>
    </div>
  </section>
</template>
