import { defineStore } from "pinia";
import type { Product } from "@/types/shopTypes";

export const useShopStore = defineStore("shop-store", {
  state: () => ({
    isLoading: false,
    products: [] as Product[],
    product: null as Product | null,
    sortOrder: "asc" as "asc" | "desc",
    priceRange: [0, 1000] as [number, number],
  }),
  getters: {
    filteredAndSortedProducts(state) {
      return [...state.products]
        .filter((product) => {
          const [min, max] = state.priceRange;
          return product.price >= min && product.price <= max;
        })
        .sort((a, b) => {
          return state.sortOrder === "asc"
            ? a.price - b.price
            : b.price - a.price;
        });
    },
  },
  actions: {
    async getProducts() {
      const { $api } = useNuxtApp();
      this.isLoading = true;
      try {
        const response = await $api<Product[]>("/shop/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
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
    async getProduct(id: number) {
      const { $api } = useNuxtApp();
      this.isLoading = true;
      try {
        const response = await $api<Product>(`/shop/products/${id}`, {
          method: "GET",
        });
        this.product = response;
        return true;
      } catch (error) {
        console.error("Failed to request products:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    setSortOrder(order: "asc" | "desc") {
      this.sortOrder = order;
    },
    setPriceRange(range: [number, number]) {
      this.priceRange = range;
    },
  },
});
