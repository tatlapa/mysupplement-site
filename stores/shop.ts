import { defineStore } from "pinia";
import type { Product } from "@/types/shopTypes";

// Fonction utilitaire pour filtrer et trier les produits
const getFilteredAndSortedProducts = (
  products: Product[],
  category: string | null,
  sortOrder: "asc" | "desc"
) => {
  return [...products]
    .filter((product) => !category || product.category?.name === category)
    .sort((a, b) => {
      // L'API renvoie le prix en chaîne (« 39.99 ») : on compare des nombres
      const diff = Number(a.price) - Number(b.price);
      return sortOrder === "asc" ? diff : -diff;
    });
};

export const useShopStore = defineStore("shop-store", {
  state: () => ({
    isLoading: false,
    products: [] as Product[],
    product: null as Product | null,
    sortOrder: "asc" as "asc" | "desc",
    // Catégorie affichée, par son nom ; null = toutes
    category: null as string | null,
    currentPage: 1,
    itemsPerPage: 12,
  }),
  getters: {
    filteredAndSortedProducts(state) {
      return getFilteredAndSortedProducts(
        state.products,
        state.category,
        state.sortOrder
      );
    },
    categories(state) {
      const names = state.products
        .map((product) => product.category?.name)
        .filter((name): name is string => Boolean(name));
      return [...new Set(names)].map((name) => ({
        name,
        count: state.products.filter((p) => p.category?.name === name).length,
      }));
    },
    paginatedProducts(state) {
      const startIndex = (state.currentPage - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      const filtered = getFilteredAndSortedProducts(
        state.products,
        state.category,
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
    setCategory(category: string | null) {
      this.category = category;
      this.currentPage = 1;
    },
  },
});
