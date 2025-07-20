<script setup>
const products = [
  {
    id: 1,
    name: "Vital Proteins Collagen Peptides Powder Advanced with Hyaluronic Acid & Vitamin C - 20 oz Collagen, Unflavored, 28 Servings",
    link: "https://amzn.to/4ckUVfz",
  },
  {
    id: 2,
    name: "Nordic Naturals Ultimate Omega, Lemon Flavor - 180 Soft Gels - 1280 mg Omega-3 - High-Potency Fish Oil with EPA & DHA - Promotes Brain & Heart Health - Non-GMO - 90 Servings",
    link: "https://amzn.to/4226DZ5",
  },
  {
    id: 3,
    name: "Nature Made Vitamin D3 2000 IU (50 mcg), Dietary Supplement for Bone, Teeth, Muscle and Immune Health Support, 90 Softgels, 90 Day Supply",
    link: "https://amzn.to/4coNT9B",
  },
];
</script>

<template>
  <main class="pt-40 pb-20 container">
    <!-- Header de la page -->
    <section class="pb-20 text-center">
      <h1 class="mb-6 animate-slide-up gradient-text">
        The {{ products.length }} most recommended supplements by AI
      </h1>

      <p class="mt-8 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed animate-slide-up-delay">
        Discover the most popular and effective nutritional supplements based
        on our AI analysis of thousands of user profiles.
      </p>
    </section>

    <!-- Contenu principal -->
    <section class="animate-fade-in-delay">
      <div class="grid gap-8 w-2/3 mx-auto">
        <div
          v-for="(product, index) in products"
          :key="product.id"
          class="group"
        >
          <Card
            class="bg-card dark:bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-card-secondary overflow-hidden"
          >
            <CardContent class="p-0">
              <div class="grid md:grid-cols-2 gap-0">
                <!-- Image placeholder -->
                <div
                  class="h-48 md:h-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center"
                >
                  <LucidePill
                    class="w-16 h-16 text-primary/50 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div class="absolute top-4 left-4">
                    <Badge class="bg-primary text-white"
                      >#{{ index + 1 }}</Badge
                    >
                  </div>
                </div>

                <!-- Contenu -->
                <div class="p-6 md:p-8">
                  <h2
                    class="text-xl md:text-2xl font-bold text-card-foreground dark:text-card-foreground mb-4 group-hover:text-primary transition-colors leading-tight"
                  >
                    {{ product.name }}
                  </h2>

                  <div
                    class="flex items-center gap-2 text-sm text-muted-foreground mb-6"
                  >
                    <LucideShield class="w-4 h-4 text-green-500" />
                    <span>Recommended by our AI</span>
                  </div>

                  <NuxtLink target="_blank" :to="product.link">
                    <Button
                      class="w-full bg-primary hover:bg-primary/90 group-hover:scale-105 transition-all duration-200"
                    >
                      <LucideExternalLink class="w-4 h-4 mr-2" />
                      View on Amazon
                    </Button>
                  </NuxtLink>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
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
