<script setup lang="ts">
import { useShopStore } from "~/stores/shop";

definePageMeta({
  alias: ["/shop"],
  layout: "shop-menu-filter",
});

const shopStore = useShopStore();

onMounted(() => {
  shopStore.getProducts();
});
</script>

<template>
  <div class="grid grid-cols-3 gap-12 w-full">
    <ViewsShopCardItem
      v-for="product in shopStore.products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
