// stores/stripe.ts
import { defineStore } from "pinia";

export const useStripeStore = defineStore("stripe", {
  state: () => ({
    clientSecret: "",
    paymentIntentId: "",
    loading: false,
    error: "",
  }),
  actions: {
    async initiatePayment(amount: number, currency: string = "eur") {
      const { $api } = useNuxtApp();
      this.loading = true;
      this.error = "";
      try {
        const response = await $api("/payment/initiate", {
          method: "POST",
          body: {
            amount,
            currency,
          },
        });

        this.clientSecret = response.client_secret;
        this.paymentIntentId = response.payment_intent_id;
      } catch (err: any) {
        this.error = err?.data?.error || "Erreur inconnue";
      } finally {
        this.loading = false;
      }
    },
  },
});
