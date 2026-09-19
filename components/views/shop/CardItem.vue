<script setup lang="ts">
import type { Product } from "~/types/shopTypes";

const props = defineProps<{ product: Product }>();

const cartStore = useCartStore();

const outOfStock = computed(() => props.product.stock_quantity <= 0);

const addToCart = () => {
  cartStore.addToCart(props.product.id, 1);
  cartStore.isOpen = true;
};
</script>

<template>
  <div class="group flex flex-col gap-3.5">
    <Card
      class="overflow-hidden border-[#E4DED1] bg-white shadow-none transition-transform duration-300 group-hover:-translate-y-1 dark:border-rule"
    >
      <NuxtLink
        :to="`/shop/products/${product.id}`"
        :aria-label="product.name"
        class="flex h-[200px] items-center justify-center p-6 md:h-[280px]"
      >
        <img :src="product.image_url" alt="" loading="lazy" class="max-h-full max-w-full object-contain" />
      </NuxtLink>
    </Card>
    <span class="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
      {{ product.category?.name || "Supplement" }}
    </span>
    <div class="flex items-center justify-between gap-2">
      <div class="flex min-w-0 flex-col gap-1">
        <NuxtLink
          :to="`/shop/products/${product.id}`"
          class="font-display text-lg leading-tight hover:text-primary md:text-[22px]"
        >
          {{ product.name }}
        </NuxtLink>
        <span class="font-mono text-sm md:text-[15px]">${{ product.price }}</span>
      </div>
      <Button
        variant="outline"
        size="icon"
        class="shrink-0 border-foreground"
        :disabled="outOfStock"
        :aria-label="outOfStock ? `${product.name} is out of stock` : `Add ${product.name} to cart`"
        @click="addToCart"
      >
        <LucidePlus />
      </Button>
    </div>
  </div>
</template>
