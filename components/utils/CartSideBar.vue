<script setup>
import { ref, computed, onMounted } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";

const config = useRuntimeConfig();
const cartStore = useCartStore();
const cartOpen = computed({
  get: () => cartStore.isOpen,
  set: (value) => (cartStore.isOpen = value),
});

onMounted(async () => {
  await cartStore.getCartUser();
});

const updateQuantity = (productId, newQuantity) => {
  if (newQuantity < 1) return;
  cartStore.updateCartQuantity(productId, newQuantity);
};

const removeFromCart = (id) => {
  cartStore.removeFromCart(id);
};

</script>

<template>
  <TransitionRoot as="template" :show="cartOpen">
    <Dialog class="relative z-50" @close="cartOpen = false">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-foreground/40 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col bg-background">
                  <div class="flex h-20 items-center justify-between border-b px-6">
                    <DialogTitle class="font-display text-2xl font-medium">
                      Your cart
                    </DialogTitle>
                    <button
                      type="button"
                      class="btn-icon border-transparent"
                      aria-label="Close cart"
                      @click="cartOpen = false"
                    >
                      <LucideX class="h-5 w-5" />
                    </button>
                  </div>

                  <div class="flex-1 overflow-y-auto px-6">
                    <ul v-if="cartStore.cart.length > 0" role="list" class="divide-y">
                      <li
                        v-for="item in cartStore.cart"
                        :key="item.id"
                        class="flex gap-4 py-6"
                      >
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
                            <button
                              type="button"
                              class="text-sm text-muted-foreground underline underline-offset-4 hover:text-destructive"
                              @click="removeFromCart(item.product.id)"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>

                    <div v-else class="flex flex-col items-center gap-4 py-20 text-center">
                      <p class="font-display text-2xl">Your cart is empty.</p>
                      <NuxtLink to="/shop" class="btn-outline h-12" @click="cartOpen = false">
                        Browse the shop
                      </NuxtLink>
                    </div>
                  </div>

                  <div v-if="cartStore.cart.length > 0" class="border-t px-6 py-6">
                    <div class="flex items-baseline justify-between">
                      <p class="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">Subtotal</p>
                      <p class="font-mono text-xl">${{ cartStore.cartTotal.toFixed(2) }}</p>
                    </div>
                    <p class="mt-1 text-sm text-muted-foreground">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <NuxtLink to="/checkout" class="btn-primary mt-6 w-full" @click="cartOpen = false">
                      Checkout
                    </NuxtLink>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
