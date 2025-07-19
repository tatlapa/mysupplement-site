<script setup lang="ts"></script>

<template>
  <main
    class="container flex flex-col gap-4 text-center items-center justify-center pt-40 pb-20"
  >
    <h1 class="mb-6 animate-slide-up gradient-text">
      Get Your Personalized Supplement Plan
    </h1>
    <p
      class="my-4 text-gray-600 text-lg leading-relaxed animate-slide-up-delay"
    >
      Answer a few questions about your health goals and lifestyle, and we'll
      create a customized supplement recommendation just for you.
    </p>
    <ViewsSupplementAdvicerStepperForm />
  </main>
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
