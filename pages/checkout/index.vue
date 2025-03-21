<script setup lang="ts">
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const config = useRuntimeConfig();

const cart = computed(() => cartStore.cart);
const subtotal = computed(() =>
  cartStore.cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )
);

const shippingFee = 5.0;
const taxRate = 0.1; // 10%
const taxAmount = computed(() => subtotal.value * taxRate);
const grandTotal = computed(
  () => subtotal.value + shippingFee + taxAmount.value
);

const form = reactive({
  name: "",
  email: "",
  address: "",
  country: "",
  city: "",
  postal: "",
});
</script>

<template>
  <div
    class="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-8"
  >
    <!-- Shipping Info -->
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Full Name</Label>
          <Input v-model="form.name" id="name" placeholder="John Doe" />
        </div>
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            v-model="form.email"
            id="email"
            type="email"
            placeholder="john@example.com"
          />
        </div>
        <div class="space-y-2">
          <Label for="address">Address</Label>
          <Input
            v-model="form.address"
            id="address"
            placeholder="123 Maple Street"
          />
        </div>
        <div class="space-y-2">
          <Label for="country">Country</Label>
          <Input v-model="form.city" id="country" placeholder="Thailand" />
        </div>
        <div class="space-y-2">
          <Label for="city">City</Label>
          <Input v-model="form.city" id="city" placeholder="Bangkok" />
        </div>
        <div class="space-y-2">
          <Label for="postal">Postal Code</Label>
          <Input v-model="form.postal" id="postal" placeholder="10110" />
        </div>
        <Separator />
      </CardContent>
      <CardFooter class="flex justify-between">
        You won't be charged until the next step.
        <Button>Continue</Button>
      </CardFooter>
    </Card>

    <!-- Cart Summary -->
    <Card>
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div
          v-if="cart.length === 0"
          class="text-muted-foreground flex flex-col gap-4"
        >
          Your cart is empty.
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="item in cart"
            :key="item.product.id"
            class="flex justify-between items-start gap-4 border-b pb-4"
          >
            <div
              class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200"
            >
              <NuxtImg
                :src="`${config.public.public.imageBaseUrl}${item.product.image_url}`"
                :alt="item.product.name"
                class="size-full object-cover"
              />
            </div>
            <div class="flex-1">
              <div
                class="flex justify-between text-base font-medium text-gray-900"
              >
                <h3>{{ item.product.name }}</h3>
                <p>{{ (item.quantity * item.product.price).toFixed(2) }} $</p>
              </div>
              <p class="text-sm text-muted-foreground">
                Qty: {{ item.quantity }}
              </p>
            </div>
          </div>

          <!-- Breakdown -->
          <div class="space-y-2 pt-2 mt-4 text-sm text-gray-700">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>{{ subtotal.toFixed(2) }} $</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping</span>
              <span>{{ shippingFee.toFixed(2) }} $</span>
            </div>
            <div class="flex justify-between">
              <span>Tax (10%)</span>
              <span>{{ taxAmount.toFixed(2) }} $</span>
            </div>
            <div
              class="flex justify-between text-lg font-semibold pt-2 border-t"
            >
              <span>Total</span>
              <span>{{ grandTotal.toFixed(2) }} $</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
