<script setup lang="ts">
import { useShopStore } from "~/stores/shop";
const config = useRuntimeConfig(); // Récupérer l'URL backend

const route = useRoute();
const shopStore = useShopStore();

onMounted(async () => {
  await shopStore.getProduct(Number(route.params.id));
});
</script>

<template>
  <div v-if="shopStore.product">
    <h1 class="text-2xl font-bold">{{ shopStore.product.name }}</h1>
    <NuxtImg
      :src="`${config.public.public.imageBaseUrl}${shopStore.product.image_url}`"
      :alt="shopStore.product.name"
      class="w-64 h-64 object-cover"
    />
    <p class="text-lg text-gray-800">{{ shopStore.product.price }} $</p>
    <p>
      {{ shopStore.product.description || "Aucune description disponible" }}
    </p>
    <p>Stock : {{ shopStore.product.stock_quantity }}</p>
  </div>
  <div v-else>
    <p>Chargement...</p>
  </div>
</template>
