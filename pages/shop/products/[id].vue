<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const shopStore = useShopStore();
const cartStore = useCartStore();
const cartSidebar = ref(null);

const quantity = ref(0);

watch(quantity, (newValue) => {
  if (newValue > (shopStore.product?.stock_quantity || 1)) {
    quantity.value = shopStore.product?.stock_quantity || 1;
  }
});

onMounted(async () => {
  await shopStore.getProducts();
  await shopStore.getProduct(Number(route.params.id));
});
</script>

<template>
  <div v-if="shopStore.product">
    <h1 class="text-2xl font-bold">{{ shopStore.product.name }}</h1>
    
    <NuxtImg
      :src="`${config.public.backUrl}${shopStore.product.image_url}`"
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
        :min="0"
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
        :disabled="shopStore.product.stock_quantity === 0 || quantity === 0"
        @click="
          cartStore.addToCart(shopStore.product.id, quantity),
            (cartSidebar.cartOpen = true)
        "
      >
        Add to Cart
      </Button>
      <UtilsCartSideBar ref="cartSidebar" />
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
