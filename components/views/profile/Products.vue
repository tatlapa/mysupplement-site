<script setup lang="ts">
const adminStore = useAdminStore();

onMounted(async () => {
  await adminStore.getProducts();
});
</script>

<template>
  List of products
  <Card
    v-for="product in adminStore.products"
    :key="product.id"
    class="flex gap-2"
  >
    <p>Product name : {{ product.name }}</p> |
    <p>{{ product.price }}$</p> |
    <p>Description : {{ product.description }}</p> |
    <p>Stock quantity : {{ product.stock_quantity }}</p> |
    <p>Category : {{ product.category.name }}</p>
  </Card>
</template>
