<script setup lang="ts">
const shopStore = useShopStore();

// Quatre produits, pris dans le catalogue réel
const featured = computed(() => shopStore.products.slice(0, 4));

onMounted(async () => {
  if (shopStore.products.length === 0) {
    await shopStore.getProducts();
  }
});
</script>

<template>
  <section class="container flex flex-col gap-10 pb-20 pt-10 md:gap-12 md:pb-28 md:pt-16">
    <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div class="flex flex-col gap-4">
        <p class="kicker">From the shelf</p>
        <h2>
          {{ shopStore.products.length ? `${shopStore.products.length} essentials` : "Essentials" }}, nothing more.
        </h2>
      </div>
      <Button variant="link" class="self-start px-0 text-base" as-child>
        <NuxtLink to="/shop">See the whole shelf <LucideArrowRight /></NuxtLink>
      </Button>
    </div>

    <div class="grid grid-cols-2 gap-x-3 gap-y-8 md:gap-6 lg:grid-cols-4">
      <template v-if="shopStore.isLoading && featured.length === 0">
        <Skeleton v-for="n in 4" :key="n" class="h-[260px] rounded-2xl md:h-80" />
      </template>
      <ViewsShopCardItem v-for="product in featured" v-else :key="product.id" :product="product" />
    </div>
  </section>
</template>
