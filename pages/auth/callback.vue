<script setup>
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const token = route.query.token;

if (token) {
  // Enregistre le token dans le store
  authStore.token = token;

  // Récupère les informations utilisateur
  authStore.refreshUser().then(() => {
    router.push("/"); // Redirige l'utilisateur après succès
  });
} else {
  router.push("/error"); // Redirige en cas d'erreur
}
</script>

<template>
  <div>Authentification en cours...</div>
</template>
