<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <h1 class="text-destructive">Erreur d'authentification</h1>
      <p class="mt-4 text-muted-foreground">{{ message }}</p>
      <div class="mt-6">
        <nuxt-link
          to="/"
          class="btn-primary h-12"
        >
          Retour à l'accueil
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const message = route.query.message || "Une erreur inconnue est survenue.";
</script>

<style scoped>
/***** Ajoute des styles si nécessaire *****/
</style>
