import { defineStore } from "pinia";
import { useShopStore } from "~/stores/shop";
import { useAuthStore } from "~/stores/auth"; // Ajout du store d'authentification
import type { Cart } from "~/types/cartTypes";

export const useCartStore = defineStore("cart-store", {
  state: () => ({
    cart: [] as Cart[],
  }),

  getters: {
    cartTotal: (state) =>
      state.cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    cartItemCount: (state) =>
      state.cart.reduce((count, item) => count + item.quantity, 0),
  },

  actions: {
    /** ✅ Récupère le panier en base si l'utilisateur est connecté */
    async getCartUser() {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) return;

      const { $api } = useNuxtApp();
      try {
        const response = await $api<Cart>("/cart", { method: "GET" });
        this.cart = response;
      } catch (error) {
        console.error("❌ Failed to fetch cart:", error);
      }
    },

    /** ✅ Vérifie si l'utilisateur est connecté et utilise la bonne méthode */
    addToCart(productId: number, quantity: number = 1) {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) {
        this.addToCartUser(productId, quantity);
      } else {
        this.addToCartGuest(productId, quantity);
      }
    },

    /** ✅ Ajoute un produit au panier pour un invité (localStorage) */
    addToCartGuest(productId: number, quantity: number = 1) {
      const shopStore = useShopStore();
      const product = shopStore.products.find((p) => p.id === productId);

      if (!product || product.stock_quantity < quantity) return;

      const existingItem = this.cart.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cart.push({
          id: this.cart.length,
          product: {
            id: product.id,
            name: product.name,
            image_url: product.image_url,
            price: product.price,
            stock_quantity: product.stock_quantity,
          },
          quantity,
        });
      }
    },

    /** ✅ Ajoute un produit au panier pour un utilisateur connecté (BDD) */
    async addToCartUser(productId: number, quantity: number = 1) {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        console.warn("❌ Cannot add to cart: User is not authenticated");
        return;
      }

      const { $api } = useNuxtApp();
      try {
        await $api("/cart/add", {
          method: "POST",
          body: { product_id: productId, quantity },
        });
      } catch (error) {
        console.error("❌ Failed to add to cart:", error);
      }
    },

    /** ✅ Vérifie si l'utilisateur est connecté et utilise la bonne méthode */
    removeFromCart(productId: number) {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) {
        this.removeFromCartUser(productId);
      } else {
        this.removeFromCartGuest(productId);
      }
    },

    /** ✅ Supprime un item du panier (invité) */
    removeFromCartGuest(productId: number) {
      this.cart = this.cart.filter((item) => item.product.id !== productId);
    },

    /** ✅ Supprime un produit du panier (BDD) */
    async removeFromCartUser(productId: number) {
      const { $api } = useNuxtApp();
      try {
        await $api(`/cart/delete/${productId}`, { method: "DELETE" });
        await this.getCartUser();
      } catch (error) {
        console.error("❌ Failed to remove item:", error);
      }
    },

    /** ✅ Vérifie si l'utilisateur est connecté et utilise la bonne méthode */
    updateCartQuantity(productId: number, quantity: number) {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) {
        this.updateCartQuantityUser(productId, quantity);
      } else {
        this.updateCartQuantityGuest(productId, quantity);
      }
    },

    /** ✅ Met à jour la quantité dans le panier (invité) */
    updateCartQuantityGuest(productId: number, quantity: number) {
      const item = this.cart.find((item) => item.product.id === productId);
      if (item) {
        item.quantity = quantity > 0 ? quantity : 1;
      }
    },

    /** ✅ Met à jour la quantité dans le panier (BDD) */
    async updateCartQuantityUser(productId: number, quantity: number) {
      const { $api } = useNuxtApp();
      try {
        await $api("/cart/update", {
          method: "PATCH",
          body: { product_id: productId, quantity },
        });
        await this.getCartUser();
      } catch (error) {
        console.error("❌ Failed to update cart:", error);
      }
    },
  },

  persist: {
    key: "cart-store",
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ["cart"],
  },
});
