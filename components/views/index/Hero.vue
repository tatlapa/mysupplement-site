<template>
  <section
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50"
  >
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-full blur-3xl"
      ></div>
    </div>

    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
    >
      <!-- Badge -->
      <div
        class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in"
      >
        <LucideSparkles class="w-4 h-4 mr-2" />
        AI-Powered Health Solutions
      </div>

      <!-- Main heading -->
      <h1
        class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-slide-up"
      >
        <span
          class="block bg-gradient-to-r from-gray-900 via-primary to-blue-600 bg-clip-text text-transparent"
        >
          Your Personal AI
        </span>
        <span
          class="block bg-gradient-to-r from-primary via-green-600 to-blue-600 bg-clip-text text-transparent"
        >
          Supplement Advisor
        </span>
      </h1>

      <!-- Subtitle -->
      <p
        class="mt-8 max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 leading-relaxed animate-slide-up-delay"
      >
        Get personalized supplement recommendations based on your unique health
        profile, goals, and lifestyle using advanced AI technology.
      </p>

      <!-- CTA Buttons -->
      <div
        class="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delay-2"
      >
        <NuxtLink to="/supplement-advicer">
          <Button
            size="lg"
            class="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <LucideZap class="w-5 h-5 mr-2" />
            Start Your Analysis
          </Button>
        </NuxtLink>
      </div>

      <!-- Stats -->
      <div
        class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-delay"
      >
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-primary mb-2">
            10K+
          </div>
          <div class="text-gray-600">Happy Customers</div>
        </div>
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-primary mb-2">
            95%
          </div>
          <div class="text-gray-600">Satisfaction Rate</div>
        </div>
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-primary mb-2">
            24/7
          </div>
          <div class="text-gray-600">AI Support</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-slide-up {
  animation: slide-up 1s ease-out;
}

.animate-slide-up-delay {
  animation: slide-up 1s ease-out 0.2s both;
}

.animate-slide-up-delay-2 {
  animation: slide-up 1s ease-out 0.4s both;
}

.animate-fade-in-delay {
  animation: fade-in 1s ease-out 0.6s both;
}
</style>
