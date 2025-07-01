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
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div
        v-if="!shopStore.product"
        class="flex items-center justify-center min-h-[400px]"
      >
        <div class="text-center">
          <div
            class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
          ></div>
          <p class="text-gray-600">Loading product...</p>
        </div>
      </div>

      <!-- Product Details -->
      <div v-else class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <!-- Product Image -->
          <div class="relative overflow-hidden bg-gray-100">
            <img
              :src="`${config.public.backUrl}${shopStore.product.image_url}`"
              :alt="shopStore.product.name"
              class="w-full h-96 lg:h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <!-- Category Badge -->
            <div class="absolute top-4 left-4">
              <Badge variant="secondary" class="bg-white/90 backdrop-blur-sm">
                {{ shopStore.product.category?.name || "No Category" }}
              </Badge>
            </div>
            <!-- Stock Badge -->
            <div class="absolute top-4 right-4">
              <Badge
                :variant="
                  shopStore.product.stock_quantity > 0
                    ? 'default'
                    : 'destructive'
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
                    class="text-gray-500 hover:text-primary transition-colors"
                  >
                    Shop
                  </NuxtLink>
                </li>
                <li>
                  <div class="flex items-center">
                    <LucideChevronRight class="w-4 h-4 text-gray-400 mx-2" />
                    <span class="text-gray-900 font-medium">{{
                      shopStore.product.name
                    }}</span>
                  </div>
                </li>
              </ol>
            </nav>

            <!-- Product Title -->
            <h1
              class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight"
            >
              {{ shopStore.product.name }}
            </h1>

            <!-- Price -->
            <div class="flex items-baseline gap-3 mb-6">
              <span class="text-4xl font-bold text-primary">
                ${{ shopStore.product.price }}
              </span>
              <span class="text-lg text-gray-500">USD</span>
            </div>

            <!-- Description -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {{
                  shopStore.product.description ||
                  "No description available for this product."
                }}
              </p>
            </div>

            <!-- Product Details -->
            <div class="space-y-4 mb-8">
              <div class="flex items-center gap-3">
                <LucidePackage class="w-5 h-5 text-gray-400" />
                <span class="text-gray-600">
                  <strong>Stock:</strong>
                  {{ shopStore.product.stock_quantity }} units available
                </span>
              </div>
              <div class="flex items-center gap-3">
                <LucideShield class="w-5 h-5 text-gray-400" />
                <span class="text-gray-600">
                  <strong>Quality:</strong> Premium grade supplements
                </span>
              </div>
            </div>

            <!-- Add to Cart Section -->
            <div class="border-t border-gray-200 pt-8">
              <div
                class="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                <!-- Quantity Selector -->
                <div class="flex items-center gap-3">
                  <label class="text-sm font-medium text-gray-700"
                    >Quantity:</label
                  >
                  <NumberField
                    class="w-32"
                    :min="1"
                    :max="shopStore.product.stock_quantity"
                    v-model="quantity"
                  >
                    <NumberFieldContent
                      class="border border-gray-300 rounded-lg"
                    >
                      <NumberFieldDecrement class="hover:bg-gray-100" />
                      <NumberFieldInput class="text-center font-medium" />
                      <NumberFieldIncrement class="hover:bg-gray-100" />
                    </NumberFieldContent>
                  </NumberField>
                </div>

                <!-- Add to Cart Button -->
                <Button
                  variant="default"
                  size="lg"
                  class="flex-1 sm:flex-none px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
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

      <!-- Cart Sidebar -->
      <UtilsCartSideBar ref="cartSidebar" />
    </div>
  </div>
</template>
