<script setup lang="ts"></script>

<template>
  <section class="relative py-20 overflow-hidden">
    <!-- Background gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-primary via-green-600 to-blue-600"
    ></div>

    <!-- Background decoration -->
    <div class="absolute inset-0">
      <div
        class="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Badge -->
      <div
        class="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-8 backdrop-blur-sm"
      >
        <LucideHeart class="w-4 h-4 mr-2" />
        Start Your Health Journey
      </div>

      <h2 class="text-4xl md:text-6xl font-bold text-white mb-6">
        Ready to optimize your health?
      </h2>
      <p class="mt-6 text-xl leading-8 text-white/90 max-w-3xl mx-auto mb-12">
        Join thousands of users who have transformed their health with our
        AI-powered supplement recommendations.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <NuxtLink to="/supplement-advicer">
          <Button
            size="lg"
            class="px-8 py-4 text-lg font-semibold bg-white text-primary hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <LucideZap class="w-5 h-5 mr-2" />
            Get Started Now
          </Button>
        </NuxtLink>
      </div>

      <!-- Trust indicators -->
      <div
        class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
      >
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
          <div class="text-white/80">Happy Customers</div>
        </div>
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
          <div class="text-white/80">Satisfaction Rate</div>
        </div>
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
          <div class="text-white/80">AI Support</div>
        </div>
      </div>
    </div>
  </section>
</template>
