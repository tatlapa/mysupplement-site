<script setup lang="ts">
import {Lock, RefreshCcw} from "lucide-vue-next";
import {useToast} from "~/components/ui/toast";
import {InputError} from "~/components/ui/input";

definePageMeta({
  alias: ['/auth/reset-password']
})

const route = useRoute();
const authStore = useAuthStore();
const {toast} = useToast();
const token = ref(route.query.token);
const email = ref(route.query.email);
const newPassword = ref("");
const confirmPassword = ref("");

const handlePasswordReset = async () => {
  const success = await authStore.resetPassword(
      email.value,
      token.value,
      newPassword.value,
      confirmPassword.value
  );

  if (success) {
    newPassword.value = "";
    confirmPassword.value = "";

    toast({
      title: "Mot de passe changé avec succès.",
    });
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl font-bold">Mot de passe oublié</CardTitle>
        <CardDescription>
          Entrez votre adresse e-mail pour recevoir un lien de réinitialisation de mot de passe.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handlePasswordReset" class="space-y-4">
          <Alert v-if="authStore.formErrors.global" variant="destructive">
            <AlertDescription>
              {{ authStore.formErrors.global }}
            </AlertDescription>
          </Alert>
          <div class="space-y-2">
            <div>
              <div class="relative">
                <Input
                    v-model="newPassword"
                    type="password"
                    placeholder="Mot de passe"
                    class="pl-10"
                    required
                />
                <Lock
                    class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                />
              </div>
              <InputError :message="authStore.formErrors.password"/>
            </div>
            <div class="relative">
              <Input
                  v-model="confirmPassword"
                  type="password"
                  placeholder="Confirmation du mot de passe"
                  class="pl-10"
                  required
              />
              <Lock
                  class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              />
            </div>
          </div>

          <Button type="submit" class="w-full" :disabled="authStore.formLoading">
            <RefreshCcw v-if="authStore.formLoading" class="w-4 h-4 mr-2 animate-spin"/>
            Réinitialiser le mot de passe
          </Button>
        </form>
      </CardContent>

      <CardFooter class="flex justify-center">
        <NuxtLink
            to="/"
            class="text-sm text-gray-600 text-foreground"
        >
          Retour à l'accueil
        </NuxtLink>
      </CardFooter>
    </Card>
  </div>
</template>