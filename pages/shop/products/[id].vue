<script setup lang="ts">
const route = useRoute();
const shopStore = useShopStore();
const cartStore = useCartStore();

const quantity = ref(1);

const product = computed(() => shopStore.product);
const stock = computed(() => product.value?.stock_quantity ?? 0);
const total = computed(() =>
  product.value ? (Number(product.value.price) * quantity.value).toFixed(2) : "0.00"
);

const decrement = () => {
  quantity.value = Math.max(1, quantity.value - 1);
};

const increment = () => {
  quantity.value = Math.min(stock.value, quantity.value + 1);
};

const addToCart = () => {
  if (!product.value) return;
  cartStore.addToCart(product.value.id, quantity.value);
  cartStore.isOpen = true;
  quantity.value = 1;
};

onMounted(async () => {
  // Le panier invité retrouve le produit dans la liste : elle doit être chargée
  if (shopStore.products.length === 0) {
    await shopStore.getProducts();
  }
  await shopStore.getProduct(Number(route.params.id));
});
</script>

<template>
  <main class="container pb-24 pt-7">
    <!-- Chargement -->
    <div v-if="shopStore.isLoading" class="grid gap-10 pt-8 lg:grid-cols-2 lg:gap-20">
      <Skeleton class="h-[420px] rounded-3xl lg:h-[640px]" />
      <div class="flex flex-col gap-5 pt-6">
        <Skeleton class="h-4 w-40" />
        <Skeleton class="h-16 w-2/3" />
        <Skeleton class="h-8 w-28" />
        <Skeleton class="h-24 w-full" />
        <Skeleton class="h-14 w-full rounded-full" />
      </div>
    </div>

    <template v-else-if="product">
      <nav
        aria-label="Breadcrumb"
        class="flex gap-2.5 font-mono text-xs uppercase tracking-[0.06em] text-muted-foreground"
      >
        <NuxtLink to="/shop" class="hover:text-foreground">Shop</NuxtLink>
        <span aria-hidden="true">/</span>
        <NuxtLink
          v-if="product.category"
          to="/shop"
          class="hover:text-foreground"
          @click="shopStore.setCategory(product.category.name)"
        >
          {{ product.category.name }}
        </NuxtLink>
        <span v-if="product.category" aria-hidden="true">/</span>
        <span class="text-foreground">{{ product.name }}</span>
      </nav>

      <section class="grid items-start gap-10 pt-8 lg:grid-cols-2 lg:gap-20">
        <div class="product-tile h-[380px] rounded-3xl p-10 md:h-[560px] lg:h-[680px] lg:p-16">
          <img
            :src="product.image_url"
            :alt="product.name"
            class="max-h-full max-w-full object-contain"
          />
        </div>

        <div class="flex flex-col gap-7 lg:pt-6">
          <div class="flex flex-col gap-3.5">
            <p class="kicker">{{ product.category?.name || "Supplement" }}</p>
            <h1 class="text-5xl md:text-[76px] md:leading-none">{{ product.name }}</h1>
            <span class="font-mono text-2xl md:text-[26px]">${{ product.price }}</span>
          </div>

          <p class="text-lg leading-relaxed text-foreground/85 md:text-[19px]">
            {{ product.description || "No description available for this product." }}
          </p>

          <div class="flex flex-col gap-4 border-t pt-7">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div
                role="group"
                aria-label="Quantity"
                class="flex h-14 items-center justify-between rounded-full border border-foreground px-1.5 sm:justify-start"
              >
                <button
                  type="button"
                  class="btn-icon border-transparent"
                  aria-label="Decrease quantity"
                  :disabled="quantity <= 1"
                  @click="decrement"
                >
                  <LucideMinus class="h-[18px] w-[18px]" />
                </button>
                <span aria-live="polite" class="w-9 text-center font-mono">{{ quantity }}</span>
                <button
                  type="button"
                  class="btn-icon border-transparent"
                  aria-label="Increase quantity"
                  :disabled="quantity >= stock"
                  @click="increment"
                >
                  <LucidePlus class="h-[18px] w-[18px]" />
                </button>
              </div>
              <button
                type="button"
                class="btn-primary flex-1 text-[17px]"
                :disabled="stock === 0"
                @click="addToCart"
              >
                {{ stock === 0 ? "Out of stock" : `Add to cart · $${total}` }}
              </button>
            </div>
            <p class="font-mono text-xs tracking-[0.04em] text-muted-foreground">
              <template v-if="stock === 0">OUT OF STOCK</template>
              <template v-else-if="stock <= 5">ONLY {{ stock }} LEFT</template>
              <template v-else>IN STOCK · {{ stock }} UNITS</template>
              · DEMO SHOP, NO REAL ORDERS
            </p>
          </div>

          <NuxtLink
            to="/supplement-advicer"
            class="label-card mt-3 flex items-center justify-between gap-6 px-7 py-6 [box-shadow:6px_6px_0_hsl(var(--primary))]"
          >
            <span class="flex flex-col gap-1.5">
              <span class="font-display text-[22px]">Is it right for you?</span>
              <span class="text-[15px] text-muted-foreground">
                Four questions, and you’ll know if it belongs in your protocol.
              </span>
            </span>
            <LucideArrowRight class="h-[22px] w-[22px] shrink-0" />
          </NuxtLink>
        </div>
      </section>
    </template>

    <!-- Produit introuvable -->
    <div v-else class="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <h1 class="text-4xl">Product not found</h1>
      <p class="text-muted-foreground">The product you’re looking for doesn’t exist.</p>
      <NuxtLink to="/shop" class="btn-outline h-12">Back to the shop</NuxtLink>
    </div>
  </main>
</template>
