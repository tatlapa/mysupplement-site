export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
        },
      ],
    },
  },
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      // apiUrl: "https://mysupplement-api.onrender.com/api",
      // backUrl: "https://mysupplement-api.onrender.com",
      apiUrl: process.env.API_URL,
      backUrl: process.env.BACK_URL,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxt/icon",
    "@nuxt/image",
    "nuxt-lucide-icons",
    "@nuxtjs/color-mode",
  ],
  colorMode: {
    classSuffix: "",
    preference: "light",
    fallback: "light",
    storage: "localStorage",
    storageKey: "nuxt-color-mode",
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  compatibilityDate: "2024-11-10",
});
