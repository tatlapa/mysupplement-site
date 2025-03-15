<script setup lang="ts">

const adminStore = useAdminStore();

onMounted(async () => {
  await adminStore.getProducts();
});
</script>

<template>
  List of products
  <div class="grid grid-cols-2 gap-2">
    <Card v-for="product in adminStore.products" :key="product.id">
      <div class="flex flex-col justify-between gap-2 p-2">
        <p>Product name : {{ product.name }}</p>
        <p>Price : {{ product.price }}$</p>
        <p>Description : {{ product.description }}</p>
        <p>Stock quantity : {{ product.stock_quantity }}</p>
        <p>Category : {{ product.category.name }}</p>
        <p>Image : {{ `http://localhost:8000${product.image_url}` }}</p>
        <img
          :src="`http://localhost:8000${product.image_url}`"
          :alt="product.name"
          class="w-24 h-24"
        />
        <ViewsProfileAdminUpdateProductForm :product="product" />
      </div>
    </Card>
  </div>
</template>
