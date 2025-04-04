<script setup lang="ts">
import { ClipboardCheck, BrainCircuit, PackageCheck } from "lucide-vue-next";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Complete Assessment",
    description: "Answer questions about your health, lifestyle, and goals.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "Our AI analyzes your data and creates personalized recommendations.",
  },
  {
    icon: PackageCheck,
    title: "Get Your Plan",
    description:
      "Receive your customized supplement recommendations and start your journey.",
  },
];
</script>

<template>
  <section class="py-12 bg-secondary">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-extrabold">How It Works</h2>
      <p class="mt-4 text-lg">
        Get your personalized supplement plan in three easy steps
      </p>

      <div class="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 text-white">
        <ViewsIndexFeaturesUtilsStepCard
          v-for="(step, index) in steps"
          :key="step.title"
          :icon="step.icon"
          :title="step.title"
          :description="step.description"
          :number="index + 1"
        />
      </div>
    </div>
  </section>
</template>
