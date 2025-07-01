<script setup lang="ts">
import { Bolt, CheckCircle2, RefreshCw } from "lucide-vue-next";
</script>

<template>
  <section class="py-20 bg-white relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0">
      <div
        class="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/5 to-transparent rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
        >
          <LucideStar class="w-4 h-4 mr-2" />
          Advanced Features
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Smart Supplement Recommendations
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Powered by cutting-edge AI technology to deliver personalized health
          solutions
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ViewsIndexFeaturesUtilsCard
          :icon="Bolt"
          title="AI-Powered Analysis"
          description="Advanced AI algorithms analyze your health data to provide personalized recommendations."
          color="from-yellow-500 to-orange-500"
          bgColor="bg-yellow-500/10"
        />
        <ViewsIndexFeaturesUtilsCard
          :icon="CheckCircle2"
          title="Evidence-Based"
          description="Recommendations backed by scientific research and clinical studies."
          color="from-green-500 to-emerald-500"
          bgColor="bg-green-500/10"
        />
        <ViewsIndexFeaturesUtilsCard
          :icon="RefreshCw"
          title="Real-Time Updates"
          description="Continuously updated recommendations based on your progress and changing needs."
          color="from-blue-500 to-cyan-500"
          bgColor="bg-blue-500/10"
        />
      </div>
    </div>
  </section>
</template>
