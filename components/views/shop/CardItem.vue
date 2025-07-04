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
      <CardHeader class="flex-shrink-0">
        <CardTitle class="text-xl line-clamp-2">{{ product.name }}</CardTitle>
        <CardDescription class="text-sm text-gray-500">
          {{ product.category?.name || "No Category" }}
        </CardDescription>
      </CardHeader>

      <CardContent class="flex-1 flex flex-col">
        <img
          :src="`${config.public.backUrl}${product.image_url}`"
          :alt="product.name"
          class="w-full h-56 object-cover object-center rounded-md flex-shrink-0"
        />
        <p class="text-lg font-medium text-gray-800 mt-4">
          {{ product.price }} $
        </p>
      </CardContent>

      <CardFooter class="flex flex-start gap-3 flex-shrink-0">
        <p>Stock : {{ product.stock_quantity }}</p>
      </CardFooter>
    </Card>
  </NuxtLink>
</template>
