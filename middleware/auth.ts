import {useAuthStore} from "@/stores/auth";

export default defineNuxtRouteMiddleware(async () => {

    if (process.client) {
        const authStore = useAuthStore();

        if (!authStore.isAuthenticated) {
            return navigateTo("/");
        }
    }
});
