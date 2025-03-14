import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth"; // Import du store auth

export const useAdminStore = defineStore("admin-store", {
  state: () => ({
    isLoading: false,
    formLoading: false,
    products: [],
    categories: [],
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
        const response = await $api("/api/admin/products", {
          method: "GET",
        });
        this.products = response.map((product) => ({
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
        const response = await $api("/api/admin/categories", {
          method: "GET",
        });
        this.categories = response.map((categorie) => ({
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
    async addProduct(form) {
      if (!this.isAdmin) {
        console.warn("Unauthorized access");
        return;
      }

      const { $api } = useNuxtApp();
      this.formLoading = true;
      try {
        const response = await $api("/api/admin/products", {
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
    async addProductImage(form) {
      if (!this.isAdmin) {
        console.warn("Unauthorized access");
        return;
      }

      const { $api } = useNuxtApp();
      this.formLoading = true;
      try {
        const response = await $api("/api/admin/product-images", {
          method: "POST",
          body: form,
        });
        return response;
      } catch (error) {
        console.error("Failed to add image product:", error);
        throw error;
      } finally {
        this.formLoading = false;
      }
    }
  },
});
