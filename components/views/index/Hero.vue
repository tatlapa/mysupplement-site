<script setup lang="ts"></script>

<template>
  <section id="hero" class="relative h-screen">
    <div
      class="absolute inset-0 bg-[url('@/assets/images/background/hero.jpg')] bg-cover bg-top"
    />
    <div class="absolute top-0 w-full h-full bg-black/30" />
    <div
      class="relative h-full container mx-auto px-8 flex flex-col justify-center gap-y-6"
    >
      <div class="space-y-3 mx-auto max-w-2xl">
        <h1 class="text-6xl font-bold text-center">
          Bienvenue sur Hotel de bg
        </h1>
        <p class="text-sm text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas sit
          architecto libero aut rem ut omnis deleniti suscipit culpa nulla
          similique id debitis repellat provident, in ducimus quae, dicta ipsam.
        </p>
      </div>
      <div class="flex justify-center items-center gap-x-2">
        <Button size="lg">Réserver</Button>
      </div>
    </div>
  </section>
</template>
