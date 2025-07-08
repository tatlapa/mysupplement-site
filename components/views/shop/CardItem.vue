<script setup lang="ts">
const props = defineProps<{
  product: {
    id: number;
    name: string;
    price: number;
    description?: string | null;
    stock_quantity: number;
    image_url: string;
    category?: { name: string };
  };
}>();
const config = useRuntimeConfig();
const { product } = toRefs(props);

const selectedProduct = computed(() => product.value);
</script>

<template>
  <NuxtLink :to="`/shop/products/${selectedProduct.id}`">
    <Card
      class="shadow-md transition-transform hover:scale-105 h-full flex flex-col"
    >
      <CardHeader class="flex-shrink-0 p-3 sm:p-4">
        <CardTitle class="text-base sm:text-lg lg:text-xl line-clamp-2">{{
          product.name
        }}</CardTitle>
        <CardDescription class="text-xs sm:text-sm text-gray-500">
          {{ product.category?.name || "No Category" }}
        </CardDescription>
      </CardHeader>

      <CardContent class="flex-1 flex flex-col p-3 sm:p-4">
        <img
          :src="`${config.public.backUrl}${product.image_url}`"
          :alt="product.name"
          class="w-full h-40 sm:h-48 md:h-56 object-contain rounded-md flex-shrink-0"
        />
        <p class="text-base sm:text-lg font-medium text-gray-800 mt-3 sm:mt-4">
          {{ product.price }} $
        </p>
      </CardContent>

      <CardFooter class="flex flex-start gap-3 flex-shrink-0 p-3 sm:p-4">
        <p class="text-xs sm:text-sm">Stock : {{ product.stock_quantity }}</p>
      </CardFooter>
    </Card>
  </NuxtLink>
</template>
