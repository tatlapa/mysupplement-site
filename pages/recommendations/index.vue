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
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
    <!-- Header de la page -->
    <section class="relative py-20 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0">
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        ></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
        >
          <LucideStar class="w-4 h-4 mr-2" />
          AI Recommendations
        </div>

        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          The {{ products.length }} most recommended
          <span class="gradient-text">supplements by AI</span>
        </h1>

        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the most popular and effective nutritional supplements based
          on our AI analysis of thousands of user profiles.
        </p>
      </div>
    </section>

    <!-- Contenu principal -->
    <section class="relative pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid gap-8">
          <div
            v-for="(product, index) in products"
            :key="product.id"
            class="group relative"
          >
            <Card
              class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              <CardContent class="p-0">
                <div class="grid md:grid-cols-2 gap-0">
                  <!-- Image placeholder -->
                  <div
                    class="relative h-48 md:h-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center"
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
                      class="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors leading-tight"
                    >
                      {{ product.name }}
                    </h2>

                    <div
                      class="flex items-center gap-2 text-sm text-gray-500 mb-6"
                    >
                      <LucideShield class="w-4 h-4 text-green-500" />
                      <span>Recommended by our AI</span>
                    </div>

                    <NuxtLink target="_blank" :to="product.link">
                      <Button
                        class="w-full bg-primary hover:bg-primary/90 text-white group-hover:scale-105 transition-all duration-200"
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
      </div>
    </section>
  </div>
</template>
