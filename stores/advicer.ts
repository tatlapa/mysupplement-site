import { defineStore } from "pinia";
import type {
  AdvicerForm,
  SupplementRecommendation,
} from "../types/advicerTypes";

export const useAdvicerStore = defineStore("advicer-store", {
  state: () => ({
    supplementRecommendations: null as SupplementRecommendation | null,
    formLoading: false,
  }),
  actions: {
    async getSupplementRecommendations(form: AdvicerForm) {
      const { $api } = useNuxtApp();

      this.formLoading = true;

      try {
        const response = await $api<SupplementRecommendation>(
          "/getSupplementRecommendations",
          {
            method: "POST",
            body: form,
          }
        );
        this.supplementRecommendations = response;
        return response;
      } catch (error: any) {
        console.error("Failed to request AI:", error);
        throw error;
      } finally {
        this.formLoading = false;
      }
    },
  },
});
