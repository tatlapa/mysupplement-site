export default defineNuxtRouteMiddleware(async () => {

    if (process.client) {
        const adminStore = useAdminStore();

        if (!adminStore.isAdmin) {
            return navigateTo("/profile");
        }
    }
});
