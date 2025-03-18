import { defineStore } from "pinia";
import { useShopStore } from "~/stores/shop";

export const useCartStore = defineStore("cart-store", {
  state: () => ({
    cart: [] as Array<{
      id: number;
      name: string;
      image_url: string;
      price: number;
      quantity: number;
    }>,
  }),

  getters: {
    cartTotal: (state) =>
      state.cart.reduce((total, item) => total + item.price * item.quantity, 0),

    cartItemCount: (state) =>
      state.cart.reduce((count, item) => count + item.quantity, 0),
  },

  actions: {
    addToCart(productId: number, quantity: number = 1) {
      const shopStore = useShopStore();
      const product = shopStore.products.find((p) => p.id === productId);
      if (!product || product.stock_quantity < quantity) return;

      const existingItem = this.cart.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          image_url: product.image_url,
          price: product.price,
          quantity,
        });
      }
      console.log(this.cart);
    },

    removeFromCart(productId: number) {
      this.cart = this.cart.filter((item) => item.id !== productId);
    },

    updateCartQuantity(productId: number, quantity: number) {
      const item = this.cart.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity > 0 ? quantity : 1;
      }
    },

    clearCart() {
      this.cart = [];
    },
  },

  persist: {
    key: "cart-store", // Clé pour localStorage
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ["cart"], // Ne sauvegarde que le panier
  },
});
