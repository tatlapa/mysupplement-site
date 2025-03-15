<script setup lang="ts">
import { useShopStore } from "~/stores/shop";
import type { Product } from "~/types/adminTypes";
import { useToast } from "@/components/ui/toast";

definePageMeta({
  alias: ["/shop"],
  layout: "shop-menu-filter",
});

const shopStore = useShopStore();
const cart = ref<Product[]>([]);
const { toast } = useToast();

const addToCart = ({ product, quantity }) => {
  cart.value.push({ ...product, quantity });

  toast({
    title: "Product Added",
    description: `${quantity} x ${product.name} added to your cart.`,
    variant: "default",
  });

  console.log("Cart updated:", cart.value);
};

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
      @add-to-cart="addToCart"
    />
  </div>
</template>
