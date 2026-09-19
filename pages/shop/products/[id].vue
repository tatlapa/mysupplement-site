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
      <Breadcrumb>
        <BreadcrumbList class="font-mono text-xs uppercase tracking-[0.06em]">
          <BreadcrumbItem>
            <BreadcrumbLink as-child><NuxtLink to="/shop">Shop</NuxtLink></BreadcrumbLink>
          </BreadcrumbItem>
          <template v-if="product.category">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <NuxtLink to="/shop" @click="shopStore.setCategory(product.category.name)">
                  {{ product.category.name }}
                </NuxtLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </template>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{{ product.name }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section class="grid items-start gap-10 pt-8 lg:grid-cols-2 lg:gap-20">
        <Card class="flex h-[380px] items-center justify-center border-[#E4DED1] bg-white p-10 shadow-none dark:border-rule md:h-[560px] lg:h-[680px] lg:p-16">
          <img
            :src="product.image_url"
            :alt="product.name"
            class="max-h-full max-w-full object-contain"
          />
        </Card>

        <div class="flex flex-col gap-7 lg:pt-6">
          <div class="flex flex-col gap-3.5">
            <Badge variant="outline" class="self-start font-mono font-normal uppercase tracking-[0.08em]">
              {{ product.category?.name || "Supplement" }}
            </Badge>
            <h1 class="text-5xl md:text-[76px] md:leading-none">{{ product.name }}</h1>
            <span class="font-mono text-2xl md:text-[26px]">${{ product.price }}</span>
          </div>

          <p class="text-lg leading-relaxed text-foreground/85 md:text-[19px]">
            {{ product.description || "No description available for this product." }}
          </p>

          <div class="flex flex-col gap-4 border-t pt-7">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <NumberField
                v-model="quantity"
                :min="1"
                :max="Math.max(stock, 1)"
                :disabled="stock === 0"
                class="w-full sm:w-36"
              >
                <Label for="quantity" class="sr-only">Quantity</Label>
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput id="quantity" class="h-14 font-mono text-base" />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <Button size="lg" class="h-14 flex-1 text-[17px]" :disabled="stock === 0" @click="addToCart">
                {{ stock === 0 ? "Out of stock" : `Add to cart · $${total}` }}
              </Button>
            </div>
            <p class="font-mono text-xs tracking-[0.04em] text-muted-foreground">
              <template v-if="stock === 0">OUT OF STOCK</template>
              <template v-else-if="stock <= 5">ONLY {{ stock }} LEFT</template>
              <template v-else>IN STOCK · {{ stock }} UNITS</template>
              · DEMO SHOP, NO REAL ORDERS
            </p>
          </div>

          <Card
            class="mt-3 rounded-md border-[1.5px] border-foreground shadow-[6px_6px_0_hsl(var(--primary))] transition-transform hover:-translate-y-0.5"
          >
            <NuxtLink to="/supplement-advicer" class="flex items-center justify-between gap-6 px-7 py-6">
              <span class="flex flex-col gap-1.5">
                <CardTitle class="font-display text-[22px] font-medium">Is it right for you?</CardTitle>
                <CardDescription class="text-[15px]">
                  Four questions, and you’ll know if it belongs in your protocol.
                </CardDescription>
              </span>
              <LucideArrowRight class="h-[22px] w-[22px] shrink-0" />
            </NuxtLink>
          </Card>
        </div>
      </section>
    </template>

    <!-- Produit introuvable -->
    <div v-else class="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <h1 class="text-4xl">Product not found</h1>
      <p class="text-muted-foreground">The product you’re looking for doesn’t exist.</p>
      <Button variant="outline" size="lg" as-child>
        <NuxtLink to="/shop">Back to the shop</NuxtLink>
      </Button>
    </div>
  </main>
</template>
