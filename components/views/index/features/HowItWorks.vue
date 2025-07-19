<script setup lang="ts">
import { ClipboardCheck, BrainCircuit, PackageCheck } from "lucide-vue-next";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Complete Assessment",
    description: "Answer questions about your health, lifestyle, and goals.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "Our AI analyzes your data and creates personalized recommendations.",
    color: "from-primary to-green-600",
    bgColor: "bg-primary/10",
  },
  {
    icon: PackageCheck,
    title: "Get Your Plan",
    description:
      "Receive your customized supplement recommendations and start your journey.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
  },
];
</script>

<template>
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
        >
          <LucideArrowRight class="w-4 h-4 mr-2" />
          Simple Process
        </div>
        <h2 class="mb-6">
          How It Works
        </h2>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
          Get your personalized supplement plan in three easy steps
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(step, index) in steps"
          :key="step.title"
          class="group relative"
        >
          <!-- Connection line -->
          <div
            v-if="index < steps.length - 1"
            class="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 transform -translate-y-1/2 z-0"
          ></div>

          <ViewsIndexFeaturesUtilsStepCard
            :icon="step.icon"
            :title="step.title"
            :description="step.description"
            :number="index + 1"
            :color="step.color"
            :bg-color="step.bgColor"
          />
        </div>
      </div>
    </div>
  </section>
</template>
