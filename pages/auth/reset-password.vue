<script setup lang="ts">
import { useToast } from "~/components/ui/toast";
import { InputError } from "~/components/ui/input";

definePageMeta({
  alias: ["/auth/reset-password"],
});

const route = useRoute();
const authStore = useAuthStore();
const { toast } = useToast();
const token = ref((route.query.token as string) || "");
const email = ref((route.query.email as string) || "");
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
      title: "Password changed!",
      description: "You can now login with your new password",
    });
  }
};

</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <CardTitle>Forget Password</CardTitle>
        <CardDescription>
          Enter your email adress for reset your password
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handlePasswordReset" class="space-y-4">
          <Alert v-if="authStore.formErrors.resetPassword_global" variant="destructive">
            <AlertDescription>
              {{ authStore.formErrors.resetPassword_global }}
            </AlertDescription>
          </Alert>
          <div class="space-y-2">
            <div>
              <div class="relative">
                <Input
                  v-model="newPassword"
                  type="password"
                  placeholder="Password"
                  class="pl-10"
                  required
                />
                <LucideLock
                  class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                />
              </div>
              <InputError :message="authStore.formErrors.password" />
            </div>
            <div class="relative">
              <Input
                v-model="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                class="pl-10"
                required
              />
              <LucideLock
                class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              />
            </div>
          </div>

          <Button
            type="submit"
            class="w-full"
            :disabled="authStore.formLoading"
          >
            <LucideRefreshCcw
              v-if="authStore.formLoading"
              class="w-4 h-4 mr-2 animate-spin"
            />
            Reset password
          </Button>
        </form>
      </CardContent>

      <CardFooter class="flex justify-center">
        <NuxtLink to="/" class="text-sm text-gray-600 text-foreground">
          Back to home
        </NuxtLink>
      </CardFooter>
    </Card>
  </div>
</template>
