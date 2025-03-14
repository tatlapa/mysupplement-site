<script setup lang="ts">
import { Separator } from "~/components/ui/separator";

const adminStore = useAdminStore();

onMounted(async () => {
  await adminStore.getProducts();
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
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-medium">Shop Editor</h2>
        <ViewsProfileAdminAddProductForm />
      </div>
      <Separator class="my-6" />
      <ViewsProfileAdminProducts />
      <Separator class="my-6" />
    </CardContent>
  </Card>
</template>