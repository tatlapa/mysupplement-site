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
    <Card class="shadow-md transition-transform hover:scale-105">
      <CardHeader>
        <CardTitle class="text-xl">{{ product.name }}</CardTitle>
        <CardDescription class="text-sm text-gray-500">
          {{ product.category?.name || "No Category" }}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <NuxtImg
          :src="`${config.public.backUrl}${product.image_url}`"
          :alt="product.name"
          class="w-full h-48 object-cover rounded-md"
        />
        <p class="text-lg font-medium text-gray-800">{{ product.price }} $</p>
      </CardContent>

      <CardFooter class="flex flex-start gap-3">
        <p>Stock : {{ product.stock_quantity }}</p>
      </CardFooter>
    </Card>
  </NuxtLink>
</template>
