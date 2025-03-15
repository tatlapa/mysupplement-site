import { defineStore } from "pinia";
import type { Product } from "@/types/shopTypes";

export const useShopStore = defineStore("shop-store", {
  state: () => ({
    isLoading: false,
    products: [] as Product[],
  }),
  actions: {
    async getProducts() {
      const { $api } = useNuxtApp();
      this.isLoading = true;
      try {
        const response = await $api<Product[]>("/api/products", {
          method: "GET",
        });
        this.products = response.map((product: Product) => ({
          ...product,
        }));
        return true;
      } catch (error) {
        console.error("Failed to request products:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
