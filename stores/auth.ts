import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import type {
  LoginForm,
  RegisterForm,
  FormErrors,
  User,
  ApiResponseUser,
  ApiError,
  UpdatePasswordForm,
  UpdateProfileForm,
} from "@/types/authTypes";

export const useAuthStore = defineStore("auth-store", {
  state: () => ({
    token: null as string | null,
    user: null as User | null,
    formErrors: {} as FormErrors,
    formLoading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async register(form: RegisterForm) {
      const { $api } = useNuxtApp();

      this.formErrors = {};
      this.formLoading = true;

      try {
        const response = await $api<ApiResponseUser>("/api/auth/register", {
          method: "POST",
          body: form,
        });
        this.token = response.access_token;
        this.user = response.user;
        return true;
      } catch (error: any) {
        const apiError = error as ApiError;
        if (apiError.status === 422 && apiError.data) {
          this.formErrors = apiError.data.errors;
        } else {
          this.formErrors = { global: apiError.message };
        }
        throw error;
      } finally {
        this.formLoading = false;
      }
    },
    async login(form: LoginForm) {
      const { $api } = useNuxtApp();

      this.formErrors = {};
      this.formLoading = true;

      try {
        const response = await $api<ApiResponseUser>("/api/auth/login", {
          method: "POST",
          body: form,
        });
        this.token = response.access_token;
        this.user = response.user;
        return true;
      } catch (error: any) {
        const apiError = error as ApiError;
        if (apiError.status === 422 && apiError.data && apiError.data.errors) {
          this.formErrors = apiError.data.errors;
        } else {
          this.formErrors = { global: apiError.message };
        }
        throw error;
      } finally {
        this.formLoading = false;
      }
    },
    logout() {
      const { $api } = useNuxtApp();
      const router = useRouter();

      try {
        $api("/api/auth/logout", {
          method: "POST",
        });
        this.token = null;
        this.user = null;
        router.push("/");
      } catch (error) {
        console.error("Logout failed", error);
      }
    },
    async requestPasswordReset(email: string) {
      const { $api } = useNuxtApp();
      this.formLoading = true;

      try {
        await $api("/api/auth/password/email", {
          method: "POST",
          body: { email },
        });
        return true;
      } catch (error: any) {
        console.error("Password reset request failed", error);
        return false;
      } finally {
        this.formLoading = false;
      }
    },
    async resetPassword(
      email: string,
      token: string,
      password: string,
      passwordConfirmation: string
    ) {
      const { $api } = useNuxtApp();
      this.formLoading = true;

      try {
        const response = await $api("/api/auth/password/reset", {
          method: "POST",
          body: {
            email,
            token,
            password,
            password_confirmation: passwordConfirmation,
          },
        });
        return response;
      } catch (error: any) {
        console.error("Failed to reset password", error);
        throw new Error("Failed to reset password");
      } finally {
        this.formLoading = false;
      }
    },
    async refreshUser() {
      const { $api } = useNuxtApp();

      try {
        const response = await $api<User>("/api/user", {
          method: "GET",
        });

        if (response) {
          this.user = response;
        }
      } catch (error: any) {
        console.error("Failed to refresh user", error);
      }
    },
    async updateProfile(form: UpdateProfileForm) {
      const { $api } = useNuxtApp();

      this.formErrors = {};
      this.formLoading = true;

      try {
        const response = await $api<User>("/api/user", {
          method: "POST",
          body: form,
        });

        if (response) {
          this.user = response;
          return true;
        }
        return false;
      } catch (error: any) {
        const apiError = error as ApiError;
        if (apiError.status === 422 && apiError.data && apiError.data.errors) {
          this.formErrors = apiError.data.errors;
        } else {
          this.formErrors = { global: apiError.message };
        }
        throw error;
      } finally {
        this.formLoading = false;
      }
    },
    async updatePassword(form: UpdatePasswordForm) {
      const { $api } = useNuxtApp();

      this.formErrors = {};
      this.formLoading = true;

      try {
        const response = await $api("/api/user/password", {
          method: "POST",
          body: form,
        });

        if (response) {
          this.user = response as User;
          return true;
        }
        return false;
      } catch (error: any) {
        const apiError = error as ApiError;
        if (apiError.status === 422 && apiError.data && apiError.data.errors) {
          this.formErrors = apiError.data.errors;
        } else {
          this.formErrors = { global: apiError.message };
        }
        throw error;
      } finally {
        this.formLoading = false;
      }
    },
  },
  persist: {
    key: "auth-store", // Clé utilisée pour localStorage
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ["token", "user"], // Champs à sauvegarder
  },
});
