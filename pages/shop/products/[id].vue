<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useShopStore } from "~/stores/shop";
import { useCartStore } from "~/stores/cart";

const config = useRuntimeConfig();
const route = useRoute();
const shopStore = useShopStore();
const cartStore = useCartStore();

const quantity = ref(0);

console.log(cartStore.cart);

// Limiter la quantité en fonction du stock
const maxQuantity = computed(() =>
  Math.min(quantity.value, shopStore.product?.stock_quantity || 1)
);

watch(quantity, (newValue) => {
  console.log("Updated quantity:", newValue);
  console.log("Max quantity:", maxQuantity.value);

  if (newValue > (shopStore.product?.stock_quantity || 1)) {
    quantity.value = shopStore.product?.stock_quantity || 1;
  }
});

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
      class="w-64 h-64 object-cover rounded-lg"
    />
    <p class="text-lg text-gray-800 font-semibold">
      {{ shopStore.product.price }} $
    </p>
    <p class="text-gray-600">
      {{ shopStore.product.description || "No description available" }}
    </p>
    <p class="text-gray-500">Stock: {{ shopStore.product.stock_quantity }}</p>

    <div class="flex items-center gap-4">
      <NumberField
        class="w-24"
        :min="1"
        :max="shopStore.product.stock_quantity"
        v-model="quantity"
      >
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>

      <Button
        variant="default"
        class="text-sm px-4 py-2"
        :disabled="shopStore.product.stock_quantity === 0"
        @click="cartStore.addToCart(shopStore.product.id, quantity)"
      >
        Add to Cart
      </Button>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
