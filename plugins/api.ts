export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: `${config.public.apiBaseUrl}`,
    onRequest({ request, options, error }) {
      if (authStore.token) {
        options.headers.set("Authorization", `Bearer ${authStore.token}`);
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/login"));
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
