import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";
import type { Category, Product } from "@/types/adminTypes";

export const useAdminStore = defineStore("admin-store", {
  state: () => ({
    isLoading: false,
    formLoading: false,
    products: [] as Product[],
    categories: [] as Category[],
  }),
  getters: {
    isAdmin() {
      const authStore = useAuthStore(); // Accès au store auth
      return authStore.user?.role === "admin";
    },
  },
  actions: {
    async getProducts() {
      if (!this.isAdmin) {
        console.warn("Unauthorized access");
        return;
      }

      const { $api } = useNuxtApp();
      this.isLoading = true;
      try {
        const response = await $api<Product[]>("/admin/products", {
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
    async getCategories() {
      if (!this.isAdmin) {
        console.warn("Unauthorized access");
        return;
      }

      const { $api } = useNuxtApp();
      this.isLoading = true;
      try {
        const response = await $api<Category[]>("/admin/categories", {
          method: "GET",
        });
        this.categories = response.map((categorie: Category) => ({
          ...categorie,
        }));
        return true;
      } catch (error) {
        console.error("Failed to request categories:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async addProduct(form: FormData) {
      if (!this.isAdmin) {
        console.warn("Unauthorized access");
        return;
      }

      const { $api } = useNuxtApp();
      this.formLoading = true;
      try {
        const response = await $api("/admin/products", {
          method: "POST",
          body: form,
        });
        return response;
      } catch (error) {
        console.error("Failed to add products:", error);
        throw error;
      } finally {
        this.formLoading = false;
      }
    },
    async updateProduct(productId: number, form: FormData) {
      if (!this.isAdmin) {
        console.warn("Unauthorized access");
        return;
      }

      const { $api } = useNuxtApp();
      this.formLoading = true;

      try {
        const response = await $api<Product>(
          `/admin/products/${productId}`,
          {
            method: "POST",
            body: form,
          }
        );

        return response;
      } catch (error) {
        console.error("Failed to update product:", error);
        throw error;
      } finally {
        this.formLoading = false;
      }
    },
  },
});
