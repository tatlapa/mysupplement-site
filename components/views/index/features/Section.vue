<script setup lang="ts">
import { Bolt, CheckCircle2, RefreshCw } from "lucide-vue-next";
</script>

<template>
  <section class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold">
          Smart Supplement Recommendations
        </h2>
      </div>
      <div class="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <ViewsIndexFeaturesUtilsCard
          :icon="Bolt"
          title="AI-Powered Analysis"
          description="Advanced AI algorithms analyze your health data to provide personalized recommendations."
        />
        <ViewsIndexFeaturesUtilsCard
          :icon="CheckCircle2"
          title="Evidence-Based"
          description="Recommendations backed by scientific research and clinical studies."
        />
        <ViewsIndexFeaturesUtilsCard
          :icon="RefreshCw"
          title="Real-Time Updates"
          description="Continuously updated recommendations based on your progress and changing needs."
        />
      </div>
    </div>
  </section>
</template>
