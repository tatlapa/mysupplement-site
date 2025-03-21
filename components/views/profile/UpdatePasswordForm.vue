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

const handleSubmit = async () => {
  const success = await authStore.updatePassword(form);

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
      <h2 class="text-lg font-medium">Update Password</h2>
      <p class="mt-1 text-sm text-muted-foreground">
        Ensure your account is using a long, random password to stay secure.
      </p>
    </header>

    <form @submit.prevent="handleSubmit" class="mt-6 space-y-6">
      <Alert v-if="authStore.formErrors.global" variant="destructive">
        <AlertDescription>
          {{ authStore.formErrors.global }}
        </AlertDescription>
      </Alert>
      <div class="flex gap-4">
        <div class="w-1/3">
          <div class="relative w-full items-center">
            <Input
              v-model="form.current_password"
              id="current_password"
              type="password"
              placeholder="Current Password"
              class="pl-10"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <LucideLock class="size-5 text-muted-foreground" strokeWidth="1.5" />
            </span>
          </div>
          <InputError :message="authStore.formErrors.current_password" />
        </div>
        <div class="w-1/3">
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
              <LucideLock class="size-5 text-muted-foreground" strokeWidth="1.5" />
            </span>
          </div>
          <InputError :message="authStore.formErrors.password" />
        </div>
        <div class="w-1/3">
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
              <LucideLock class="size-5 text-muted-foreground" strokeWidth="1.5" />
            </span>
          </div>
          <InputError :message="authStore.formErrors.password_confirmation" />
        </div>
      </div>

      <Button type="submit" :disabled="authStore.formLoading">
        <LucideRefreshCcw
          v-if="authStore.formLoading"
          class="w-4 h-4 mr-2 animate-spin"
        />
        Save
      </Button>
    </form>
  </section>
</template>
