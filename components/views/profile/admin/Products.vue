<script setup lang="ts">
const adminStore = useAdminStore();
const config = useRuntimeConfig();

// Delete confirmation
const confirmDelete = async (productId: number) => {
  try {
    await adminStore.deleteProduct(productId);
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
};

// Get product name for confirmation
const getProductName = (productId: number) => {
  const product = adminStore.products.find((p) => p.id === productId);
  return product?.name || "Unknown Product";
};
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-lg font-medium">Products List</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        v-for="product in adminStore.products"
        :key="product.id"
        class="hover:shadow-lg transition-shadow bg-card dark:bg-card text-card-primary"
      >
        <CardHeader>
          <div class="flex justify-between items-start">
            <CardTitle class="text-lg">{{ product.name }}</CardTitle>
            <div class="flex gap-2">
              <ViewsProfileAdminUpdateProductForm :product="product" />

              <!-- Delete Dialog -->
              <Dialog>
                <DialogTrigger as-child>
                  <Button variant="destructive" size="sm" class="px-2">
                    <LucideTrash2 class="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle class="text-destructive"
                      >Delete Product</DialogTitle
                    >
                    <DialogDescription>
                      Are you sure you want to delete "<strong>{{
                        getProductName(product.id)
                      }}</strong
                      >"? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter class="flex gap-2">
                    <Button
                      variant="destructive"
                      @click="confirmDelete(product.id)"
                      :disabled="adminStore.formLoading"
                    >
                      <LucideTrash2
                        v-if="!adminStore.formLoading"
                        class="w-4 h-4 mr-2"
                      />
                      <span v-if="adminStore.formLoading">Deleting...</span>
                      <span v-else>Delete Product</span>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>

        <CardContent class="space-y-3">
          <div class="flex items-center gap-2">
            <span class="font-medium text-card-primary"
              >${{ product.price }}</span
            >
            <Badge variant="secondary">{{ product.category.name }}</Badge>
          </div>

          <p class="text-sm text-card-secondary">
            {{ product.description }}
          </p>

          <div class="flex items-center gap-2 text-sm text-card-secondary">
            <LucidePackage class="w-4 h-4" />
            <span>Stock: {{ product.stock_quantity }}</span>
          </div>

          <img
            :src="product.image_url"
            :alt="product.name"
            class="w-full h-32 object-cover rounded-md"
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
