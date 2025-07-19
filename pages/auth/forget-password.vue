<script setup lang="ts">
import { useToast } from "~/components/ui/toast";

definePageMeta({
  alias: ["/auth/forget-password"],
});

const authStore = useAuthStore();
const { toast } = useToast();
const email = ref("");

const handlePasswordReset = async () => {
  const success = await authStore.requestPasswordReset(email.value);

  if (success) {
    email.value = "";

    toast({
      title: "Email sent",
    });
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address to receive a password reset link.
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
            <div class="relative">
              <Input
                v-model="email"
                type="email"
                placeholder="name@example.com"
                class="pl-10"
                required
              />
              <LucideMail
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
            Send Reset Link
          </Button>
        </form>
      </CardContent>

      <CardFooter class="flex justify-center">
        <NuxtLink to="/" class="text-sm text-gray-600 text-foreground">
          Back to Home
        </NuxtLink>
      </CardFooter>
    </Card>
  </div>
</template>
