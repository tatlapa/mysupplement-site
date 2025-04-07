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
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">
      The {{ products.length }} most recommended food supplements by AI
    </h1>

    <div class="space-y-6">
      <Card v-for="product in products" :key="product.id">
        <CardContent class="p-6">
          <h2 class="text-lg font-semibold mb-4">{{ product.name }}</h2>
          <NuxtLink target="_blank" :to="product.link">
            <Button variant="link"> See on Amazon </Button>
          </NuxtLink>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
