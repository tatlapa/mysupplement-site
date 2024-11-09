export default defineNuxtPlugin((nuxtApp) => {

    const authStore = useAuthStore();

    const api = $fetch.create({
        baseURL: 'http://localhost:8000',
        onRequest({ request, options, error }) {
            if (authStore.token) {
                options.headers.set('Authorization', `Bearer ${authStore.token}`)
            }
        },
        async onResponseError({ response }) {
            if (response.status === 401) {
                await nuxtApp.runWithContext(() => navigateTo('/login'))
            }
        }
    })

    return {
        provide: {
            api
        }
    }
})
