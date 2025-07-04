import { defineStore } from "pinia";
import type { Product } from "@/types/shopTypes";

// Fonction utilitaire pour filtrer et trier les produits
const getFilteredAndSortedProducts = (
  products: Product[],
  priceRange: [number, number],
  sortOrder: "asc" | "desc"
) => {
  return [...products]
    .filter((product) => {
      const [min, max] = priceRange;
      return product.price >= min && product.price <= max;
    })
    .sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
};

export const useShopStore = defineStore("shop-store", {
  state: () => ({
    isLoading: false,
    products: [] as Product[],
    product: null as Product | null,
    sortOrder: "asc" as "asc" | "desc",
    priceRange: [0, 100] as [number, number],
    currentPage: 1,
    itemsPerPage: 12,
  }),
  getters: {
    filteredAndSortedProducts(state) {
      return getFilteredAndSortedProducts(
        state.products,
        state.priceRange,
        state.sortOrder
      );
    },
    paginatedProducts(state) {
      const startIndex = (state.currentPage - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      const filtered = getFilteredAndSortedProducts(
        state.products,
        state.priceRange,
        state.sortOrder
      );
      return filtered.slice(startIndex, endIndex);
    },
  },
  actions: {
    async getProducts() {
      const { $api } = useNuxtApp();
      this.isLoading = true;
      try {
        const response = await $api<Product[]>("/shop/products", {
          method: "GET",
        });
        this.products = response;
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
    setSortOrder(order: any) {
      if (order === "asc" || order === "desc") {
        this.sortOrder = order;
      }
    },
    setPriceRange(range: [number, number]) {
      this.priceRange = range;
    },
  },
});
