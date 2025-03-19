<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { X } from "lucide-vue-next";

const config = useRuntimeConfig();
const cartStore = useCartStore();
const cartOpen = ref(false);

const removeFromCart = (id) => {
  cartStore.removeFromCart(id);
};

defineExpose({ cartOpen });
</script>

<template>
  <TransitionRoot as="template" :show="cartOpen">
    <Dialog class="relative z-10" @close="cartOpen = false">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
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
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                >
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900"
                        >Shopping cart</DialogTitle
                      >
                      <div class="ml-3 flex h-7 items-center">
                        <Button
                          type="button"
                          variant="ghost"
                          class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          @click="cartOpen = false"
                        >
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close panel</span>
                          <X />
                        </Button>
                      </div>
                    </div>

                    <div v-if="cartStore.cart.length > 0" class="mt-8">
                      <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          <li
                            v-for="item in cartStore.cart"
                            :key="item.id"
                            class="flex py-6"
                          >
                            <div
                              class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200"
                            >
                              <NuxtImg
                                :src="`${config.public.public.imageBaseUrl}${item.image_url}`"
                                :alt="item.name"
                                class="size-full object-cover"
                              />
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div
                                  class="flex justify-between text-base font-medium text-gray-900"
                                >
                                  <h3>{{ item.name }}</h3>
                                  <p class="ml-4">${{ item.price }}</p>
                                </div>
                              </div>
                              <div
                                class="flex flex-1 items-end justify-between text-sm"
                              >
                                <p class="text-gray-500">
                                  Qty: {{ item.quantity }}
                                </p>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  @click="removeFromCart(item.id)"
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <p v-else class="text-center text-gray-500 mt-8">
                      Your cart is empty.
                    </p>
                  </div>

                  <div
                    v-if="cartStore.cart.length > 0"
                    class="border-t border-gray-200 px-4 py-6 sm:px-6"
                  >
                    <div
                      class="flex justify-between text-base font-medium text-gray-900"
                    >
                      <p>Subtotal</p>
                      <p>${{ cartStore.cartTotal.toFixed(2) }}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div class="mt-6">
                      <NuxtLink
                        to="/checkout"
                        class="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-primary/90"
                      >
                        Checkout
                      </NuxtLink>
                    </div>
                    <div
                      class="mt-6 flex justify-center text-center text-sm text-gray-500"
                    >
                      <p>
                        or
                        <Button
                          type="button"
                          variant="link"
                          @click="cartOpen = false"
                        >
                          Continue Shopping →
                        </Button>
                      </p>
                    </div>
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
