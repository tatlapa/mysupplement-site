<script setup lang="ts">
import { Input, InputError } from "~/components/ui/input";
import { reactive } from "vue";
import { useToast } from "~/components/ui/toast";

const authStore = useAuthStore();
const { toast } = useToast();
const form = reactive({
  current_password: "",
  password: "",
  password_confirmation: "",
});

// Check if user has a password set
const hasPassword = computed(() => authStore.user?.has_password ?? true);

const handleSubmit = async () => {
  // If user doesn't have a password, don't send current_password
  const submitData = hasPassword.value
    ? form
    : {
        password: form.password,
        password_confirmation: form.password_confirmation,
      };

  const success = await authStore.updatePassword(submitData);

  if (success) {
    toast({
      description: "Changes have been saved.",
    });
  }
};
</script>

<template>
  <section>
    <header>
      <h2 class="text-base sm:text-lg font-medium">Update Password</h2>
      <p class="mt-1 text-xs sm:text-sm text-muted-foreground">
        Ensure your account is using a long, random password to stay secure.
      </p>
    </header>

    <form
      @submit.prevent="handleSubmit"
      class="mt-4 sm:mt-6 space-y-4 sm:space-y-6"
    >
      <Alert v-if="authStore.formErrors.updatePassword_global" variant="destructive">
        <AlertDescription>
          {{ authStore.formErrors.updatePassword_global }}
        </AlertDescription>
      </Alert>
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div class="w-full sm:w-1/3">
          <div class="relative w-full items-center">
            <Input
              v-model="form.current_password"
              id="current_password"
              type="password"
              placeholder="Current Password"
              class="pl-10"
              :disabled="!hasPassword"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <LucideLock
                class="size-4 sm:size-5 text-muted-foreground"
                strokeWidth="1.5"
              />
            </span>
          </div>
          <InputError :message="authStore.formErrors.current_password" />
          <p v-if="!hasPassword" class="text-xs text-muted-foreground mt-1">
            No password set for this account
          </p>
        </div>
        <div class="w-full sm:w-1/3">
          <div class="relative w-full items-center">
            <Input
              v-model="form.password"
              id="password"
              type="password"
              placeholder="New Password"
              class="pl-10"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <LucideLock
                class="size-4 sm:size-5 text-muted-foreground"
                strokeWidth="1.5"
              />
            </span>
          </div>
          <InputError :message="authStore.formErrors.password" />
        </div>
        <div class="w-full sm:w-1/3">
          <div class="relative w-full items-center">
            <Input
              v-model="form.password_confirmation"
              id="password_confirmation"
              type="password"
              placeholder="Confirm Password"
              class="pl-10"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <LucideLock
                class="size-4 sm:size-5 text-muted-foreground"
                strokeWidth="1.5"
              />
            </span>
          </div>
          <InputError :message="authStore.formErrors.password_confirmation" />
        </div>
      </div>

      <Button
        type="submit"
        :disabled="authStore.formLoading"
        class="w-full sm:w-auto"
      >
        <LucideRefreshCcw
          v-if="authStore.formLoading"
          class="w-4 h-4 mr-2 animate-spin"
        />
        Save
      </Button>
    </form>
  </section>
</template>
