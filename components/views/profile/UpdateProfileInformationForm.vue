<script setup lang="ts">
import { useToast } from "~/components/ui/toast";

const authStore = useAuthStore();
const { toast } = useToast();
const form = reactive({
  email: authStore.user?.email ?? "",
});

const handleSubmit = async () => {
  const success = await authStore.updateProfile(form);

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
      <h2 class="text-base sm:text-lg font-medium">Profile Information</h2>
      <p class="mt-1 text-xs sm:text-sm text-muted-foreground">
        Update your account's profile information and email address.
      </p>
    </header>

    <form
      @submit.prevent="handleSubmit"
      class="mt-4 sm:mt-6 space-y-4 sm:space-y-6"
    >
      <Alert v-if="authStore.formErrors.global" variant="destructive">
        <AlertDescription>
          {{ authStore.formErrors.global }}
        </AlertDescription>
      </Alert>
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div class="w-full sm:w-1/2">
          <div class="relative w-full items-center">
            <Input
              v-model="form.email"
              id="email"
              type="email"
              placeholder="Email Address"
              disabled
              class="pl-10"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <LucideMail
                class="size-4 sm:size-5 text-muted-foreground"
                strokeWidth="1.5"
              />
            </span>
          </div>
          <InputError :message="authStore.formErrors.email" />
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
