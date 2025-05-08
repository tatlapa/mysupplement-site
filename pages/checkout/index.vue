<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { useStripeStore } from "@/stores/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { onMounted, ref, computed, reactive } from "vue";
import AccordionContentPersist from "~/components/ui/accordion/AccordionContentPersist.vue";

const stripeStore = useStripeStore();
const cartStore = useCartStore();
const config = useRuntimeConfig();

const stripePromise = loadStripe(
  "pk_test_51R4yCHLm7mC4vi7yrFLKfVlv5xvUhXpTOy62QqNd2OMDVhos1t94Tcq3sjR5E9tstWid02DU1y1RIJoCdSokOR8s00yNd5fgHC"
);

const selectedPayment = ref<"card" | "paypal">("card");
const cart = computed(() => cartStore.cart);

const subtotal = computed(() =>
  cartStore.cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )
);
const shippingFee = 5.0;
const taxRate = 0.1;
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

const paymentElementInstance = ref<any>(null);

onMounted(async () => {
  if (!stripeStore.clientSecret) {
    const total = Math.round(grandTotal.value * 100);
    await stripeStore.initiatePayment(total, "usd");
  }

  if (!stripeStore.clientSecret) return;

  const stripe = await stripePromise;
  if (!stripe) return;

  const elements = stripe.elements({
    clientSecret: stripeStore.clientSecret,
    locale: "en", // 🔤 Forcer la langue
  });

  paymentElementInstance.value = elements.create("payment");
  paymentElementInstance.value.mount("#payment-element");
});

async function handleStripePayment() {
  const stripe = await stripePromise;
  if (!stripe || !stripeStore.clientSecret) return;

  const elements = stripe.elements({ clientSecret: stripeStore.clientSecret });

  const result = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: window.location.origin + "/checkout/success",
      payment_method_data: {
        billing_details: {
          name: form.name,
          email: form.email,
          address: {
            line1: form.address,
            city: form.city,
            postal_code: form.postal,
            country: form.country,
          },
        },
      },
    },
  });

  if (result.error) {
    console.error(result.error.message);
  }
}
</script>

<template>
  <div
    class="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-8"
  >
    <div class="space-y-6">
      <!-- 🚚 Shipping Info -->
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
              placeholder="john@example.com"
            />
          </div>
          <div class="space-y-2">
            <Label for="address">Address</Label>
            <Input
              v-model="form.address"
              id="address"
              placeholder="123 Main St"
            />
          </div>
          <div class="space-y-2">
            <Label for="country">Country</Label>
            <Input v-model="form.country" id="country" placeholder="Thailand" />
          </div>
          <div class="space-y-2">
            <Label for="city">City</Label>
            <Input v-model="form.city" id="city" placeholder="Bangkok" />
          </div>
          <div class="space-y-2">
            <Label for="postal">Postal Code</Label>
            <Input v-model="form.postal" id="postal" placeholder="10110" />
          </div>
        </CardContent>
      </Card>

      <!-- 💳 Payment Accordion -->
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion
            type="single"
            collapsible
            v-model="selectedPayment"
            class="w-full"
          >
            <AccordionItem value="card">
              <AccordionTrigger>
                <div class="w-full h-full">
                  <div class="flex items-center gap-2">
                    <LucideCreditCard />
                    <p>Credit / Debit card</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContentPersist
                :isOpen="selectedPayment === 'card'"
                class="space-y-4 mt-2"
              >
                <div class="mb-4" id="payment-element"></div>
                <Button
                  type="button"
                  class="w-full"
                  @click="handleStripePayment"
                >
                  Pay now {{ grandTotal.toFixed(2) }} $
                </Button>
              </AccordionContentPersist>
            </AccordionItem>

            <AccordionItem value="paypal">
              <AccordionTrigger>PayPal</AccordionTrigger>
              <AccordionContent class="text-muted-foreground text-sm mt-2">
                You’ll be redirected to PayPal to complete your purchase.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>

    <!-- 🛒 Cart Summary -->
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
              <img
                :src="`${config.public.backUrl}${item.product.image_url}`"
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
