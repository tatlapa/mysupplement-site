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
  <section
    class="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
  >
    <!-- Background decoration -->
    <div class="absolute inset-0">
      <div
        class="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
        >
          <LucideArrowRight class="w-4 h-4 mr-2" />
          Simple Process
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          How It Works
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
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
