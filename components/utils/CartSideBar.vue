<script setup lang="ts">
const cartStore = useCartStore();

const cartOpen = computed({
  get: () => cartStore.isOpen,
  set: (value: boolean) => (cartStore.isOpen = value),
});

onMounted(async () => {
  await cartStore.getCartUser();
});

const updateQuantity = (productId: number, newQuantity: number) => {
  if (newQuantity < 1) return;
  cartStore.updateCartQuantity(productId, newQuantity);
};
</script>

<template>
  <Sheet v-model:open="cartOpen">
    <SheetContent side="right" class="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md">
      <SheetHeader class="h-20 justify-center border-b px-6">
        <SheetTitle class="text-left font-display text-2xl font-medium">Your cart</SheetTitle>
        <SheetDescription class="sr-only">Products in your cart</SheetDescription>
      </SheetHeader>

      <div class="flex-1 overflow-y-auto px-6">
        <ul v-if="cartStore.cart.length > 0" role="list" class="divide-y">
          <li v-for="item in cartStore.cart" :key="item.id" class="flex gap-4 py-6">
            <div class="product-tile h-24 w-24 shrink-0 p-2">
              <img
                :src="item.product.image_url"
                :alt="item.product.name"
                class="max-h-full max-w-full object-contain"
              />
            </div>
            <div class="flex flex-1 flex-col justify-between gap-3">
              <div class="flex justify-between gap-4">
                <h3 class="font-display text-lg">{{ item.product.name }}</h3>
                <p class="font-mono text-sm">${{ item.product.price }}</p>
              </div>
              <div class="flex items-center justify-between">
                <NumberField
                  class="w-28"
                  :min="1"
                  :max="item.product.stock_quantity"
                  :model-value="item.quantity"
                  @update:model-value="(value) => updateQuantity(item.product.id, value)"
                >
                  <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldContent>
                </NumberField>
                <Button
                  variant="link"
                  size="sm"
                  class="px-0 text-muted-foreground hover:text-destructive"
                  @click="cartStore.removeFromCart(item.product.id)"
                >
                  Remove
                </Button>
              </div>
            </div>
          </li>
        </ul>

        <div v-else class="flex flex-col items-center gap-4 py-20 text-center">
          <p class="font-display text-2xl">Your cart is empty.</p>
          <Button variant="outline" size="lg" as-child @click="cartOpen = false">
            <NuxtLink to="/shop">Browse the shop</NuxtLink>
          </Button>
        </div>
      </div>

      <SheetFooter v-if="cartStore.cart.length > 0" class="flex-col gap-0 border-t px-6 py-6 sm:flex-col">
        <div class="flex items-baseline justify-between">
          <p class="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">Subtotal</p>
          <p class="font-mono text-xl">${{ cartStore.cartTotal.toFixed(2) }}</p>
        </div>
        <p class="mt-1 text-sm text-muted-foreground">Shipping and taxes calculated at checkout.</p>
        <Button size="lg" class="mt-6 w-full" as-child @click="cartOpen = false">
          <NuxtLink to="/checkout">Checkout</NuxtLink>
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
