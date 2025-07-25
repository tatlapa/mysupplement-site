<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const shopStore = useShopStore();
const cartStore = useCartStore();
const cartSidebar = ref(null);

const quantity = ref(1);

watch(quantity, (newValue) => {
  if (newValue > (shopStore.product?.stock_quantity || 1)) {
    quantity.value = shopStore.product?.stock_quantity || 1;
  }
  if (newValue < 1) {
    quantity.value = 1;
  }
});

const addToCart = () => {
  if (cartSidebar.value) {
    cartStore.addToCart(shopStore.product!.id, quantity.value);
    cartSidebar.value.cartOpen = true;
  }
};

onMounted(async () => {
  await shopStore.getProducts();
  await shopStore.getProduct(Number(route.params.id));
});
</script>

<template>
  <main class="container pt-40 pb-20">
    <!-- Loading State -->
    <div
      v-if="shopStore.isLoading"
      class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <!-- Product Image Skeleton -->
        <div class="relative overflow-hidden">
          <Skeleton class="w-full h-96 lg:h-full" />
          <!-- Category Badge Skeleton -->
          <div class="absolute top-4 left-4">
            <Skeleton class="w-20 h-6 rounded-full" />
          </div>
          <!-- Stock Badge Skeleton -->
          <div class="absolute top-4 right-4">
            <Skeleton class="w-24 h-6 rounded-full" />
          </div>
        </div>

        <!-- Product Info Skeleton -->
        <div class="p-8 lg:p-12 flex flex-col justify-center">
          <!-- Breadcrumb Skeleton -->
          <div class="flex mb-6">
            <Skeleton class="h-4 w-16" />
            <Skeleton class="h-4 w-4 mx-2" />
            <Skeleton class="h-4 w-32" />
          </div>

          <!-- Product Title Skeleton -->
          <div class="mb-4">
            <Skeleton class="h-10 w-3/4 mb-2" />
            <Skeleton class="h-10 w-1/2" />
          </div>

          <!-- Price Skeleton -->
          <div class="flex items-baseline gap-3 mb-6">
            <Skeleton class="h-12 w-24" />
            <Skeleton class="h-6 w-12" />
          </div>

          <!-- Description Skeleton -->
          <div class="mb-8">
            <Skeleton class="h-6 w-32 mb-3" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-5/6" />
              <Skeleton class="h-4 w-4/6" />
            </div>
          </div>

          <!-- Product Details Skeleton -->
          <div class="space-y-4 mb-8">
            <div class="flex items-center gap-3">
              <Skeleton class="w-5 h-5" />
              <Skeleton class="h-4 w-48" />
            </div>
            <div class="flex items-center gap-3">
              <Skeleton class="w-5 h-5" />
              <Skeleton class="h-4 w-40" />
            </div>
          </div>

          <!-- Add to Cart Section Skeleton -->
          <div class="border-t border-gray-200 pt-8">
            <div
              class="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <!-- Quantity Selector Skeleton -->
              <div class="flex items-center gap-3">
                <Skeleton class="h-4 w-16" />
                <Skeleton class="w-32 h-10" />
              </div>

              <!-- Add to Cart Button Skeleton -->
              <div class="flex-1 sm:flex-none">
                <Skeleton class="w-40 h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details -->
    <div
      v-else-if="shopStore.product"
      class="bg-card dark:bg-card text-card-primary rounded-2xl shadow-xl overflow-hidden"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <!-- Product Image -->
        <div class="relative overflow-hidden bg-card dark:bg-card">
          <img
            :src="shopStore.product.image_url"
            :alt="shopStore.product.name"
            class="w-full h-96 lg:h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <!-- Category Badge -->
          <div class="absolute top-4 left-4">
            <Badge variant="secondary" class="bg-card-secondary backdrop-blur-sm">
              {{ shopStore.product.category?.name || "No Category" }}
            </Badge>
          </div>
          <!-- Stock Badge -->
          <div class="absolute top-4 right-4">
            <Badge
              :variant="
                shopStore.product.stock_quantity > 0 ? 'default' : 'destructive'
              "
              class="backdrop-blur-sm"
            >
              {{
                shopStore.product.stock_quantity > 0
                  ? `${shopStore.product.stock_quantity} in stock`
                  : "Out of stock"
              }}
            </Badge>
          </div>
        </div>

        <!-- Product Info -->
        <div class="p-8 lg:p-12 flex flex-col justify-center">
          <!-- Breadcrumb -->
          <nav class="flex mb-6" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <NuxtLink
                  to="/shop"
                  class="text-card-secondary hover:text-primary transition-colors"
                >
                  Shop
                </NuxtLink>
              </li>
              <li>
                <div class="flex items-center">
                  <LucideChevronRight class="w-4 h-4 text-card-secondary mx-2" />
                  <span class="text-card-primary font-medium">{{
                    shopStore.product.name
                  }}</span>
                </div>
              </li>
            </ol>
          </nav>

          <!-- Product Title -->
          <h1 class="text-card-primary mb-4 leading-tight">
            {{ shopStore.product.name }}
          </h1>

          <!-- Price -->
          <div class="flex items-baseline gap-3 mb-6">
            <span class="text-4xl font-bold text-card-primary">
              ${{ shopStore.product.price }}
            </span>
            <span class="text-lg text-card-secondary">USD</span>
          </div>

          <!-- Description -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-card-primary mb-3">
              Description
            </h3>
            <p class="text-card-secondary leading-relaxed">
              {{
                shopStore.product.description ||
                "No description available for this product."
              }}
            </p>
          </div>

          <!-- Product Details -->
          <div class="space-y-4 mb-8">
            <div class="flex items-center gap-3">
              <LucidePackage class="w-5 h-5 text-card-secondary" />
              <span class="text-card-secondary">
                <strong>Stock:</strong>
                {{ shopStore.product.stock_quantity }} units available
              </span>
            </div>
            <div class="flex items-center gap-3">
              <LucideShield class="w-5 h-5 text-card-secondary" />
              <span class="text-card-secondary">
                <strong>Quality:</strong> Premium grade supplements
              </span>
            </div>
          </div>

          <!-- Add to Cart Section -->
          <div class="border-t border-card-secondary pt-8">
            <div
              class="flex flex-col items-start sm:flex-row gap-4 sm:items-center"
            >
              <!-- Quantity Selector -->
              <div class="flex items-center gap-3">
                <label class="text-sm font-medium text-card-secondary"
                  >Quantity:</label
                >
                <NumberField
                  class="w-32"
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
              </div>

              <!-- Add to Cart Button -->
              <Button
                variant="default"
                size="lg"
                class="w-full sm:w-auto"
                :disabled="
                  shopStore.product.stock_quantity === 0 || quantity === 0
                "
                @click="addToCart"
              >
                <LucideShoppingCart class="w-5 h-5 mr-2" />
                {{
                  shopStore.product.stock_quantity === 0
                    ? "Out of Stock"
                    : "Add to Cart"
                }}
              </Button>
            </div>

            <!-- Stock Warning -->
            <div
              v-if="
                shopStore.product.stock_quantity <= 5 &&
                shopStore.product.stock_quantity > 0
              "
              class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
            >
              <div class="flex items-center gap-2">
                <LucideAlertTriangle class="w-4 h-4 text-yellow-600" />
                <span class="text-sm text-yellow-800">
                  Only {{ shopStore.product.stock_quantity }} left in stock!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else class="flex items-center justify-center min-h-[400px]">
      <div class="text-center">
        <div class="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <h2 class="text-gray-900 mb-2">Product Not Found</h2>
        <p class="text-gray-600 mb-4">
          The product you're looking for doesn't exist.
        </p>
        <NuxtLink
          to="/shop"
          class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Back to Shop
        </NuxtLink>
      </div>
    </div>

    <!-- Cart Sidebar -->
    <UtilsCartSideBar ref="cartSidebar" />
  </main>
</template>
