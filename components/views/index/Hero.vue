<template>
  <section class="container pb-20 text-center">
    <!-- Main heading -->
    <h1 class="mb-6 animate-slide-up gradient-text">
      Your Personal AI Supplement Advisor
    </h1>

    <!-- Subtitle -->
    <p
      class="mt-8 max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed animate-slide-up-delay"
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
        <div class="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
        <div class="text-muted-foreground">Happy Customers</div>
      </div>
      <div class="text-center">
        <div class="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
        <div class="text-muted-foreground">Satisfaction Rate</div>
      </div>
      <div class="text-center">
        <div class="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
        <div class="text-muted-foreground">AI Support</div>
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
