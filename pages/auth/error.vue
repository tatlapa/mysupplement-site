<template>
    <div class="flex items-center justify-center h-screen">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-red-500">Erreur d'authentification</h1>
        <p class="mt-4 text-gray-600">{{ message }}</p>
        <div class="mt-6">
          <nuxt-link to="/" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Retour à l'accueil
          </nuxt-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const message = route.query.message || "Une erreur inconnue est survenue.";
  </script>
  
  <style scoped>
  /***** Ajoute des styles si nécessaire *****/
  </style>
  