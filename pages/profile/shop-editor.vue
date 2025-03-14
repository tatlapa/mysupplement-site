<script setup lang="ts">
import { Separator } from "~/components/ui/separator";

const adminStore = useAdminStore();

onMounted(async () => {
  await adminStore.getProducts();
  console.log("Products:", adminStore.products);
});

definePageMeta({
  alias: ["/profile/shop-editor"],
  middleware: ["auth", "admin"],
  layout: "profile-menu-aside",
});
</script>

<template>
  <Card class="w-full md:w-3/4">
    <CardContent class="p-4">
      <h2 class="text-lg font-medium">Shop Editor</h2>
      <Separator class="my-6" />
      <ViewsProfileProducts />
      <Separator class="my-6" />
      <ViewsProfileAddProductForm />
    </CardContent>
  </Card>
</template>
