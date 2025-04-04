<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  const token = route.query.token as string | undefined;

  if (token) {
    authStore.token = token;

    try {
      await authStore.refreshUser();
      router.push("/");
    } catch (err) {
      console.error("Error during refreshUser", err);
      router.push("/error");
    }
  } else {
    router.push("/auth/error");
  }
});
</script>

<template>
  <div
    class="flex h-screen items-center justify-center text-center text-gray-700 dark:text-gray-200"
  >
    <div>
      <p class="text-xl font-semibold">Authentication in progress...</p>
      <p class="text-sm text-muted-foreground">Please wait</p>
    </div>
  </div>
</template>
