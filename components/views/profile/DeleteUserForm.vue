<script setup lang="ts">
import { useToast } from "~/components/ui/toast";

const authStore = useAuthStore();
const form = reactive({
  password: "",
});
const { toast } = useToast();

const handleSubmit = async () => {
  const success = await authStore.deleteUser(form);

  if (success) {
    toast({
      description: "Account deleted successfully",
    });
  }
};
</script>
<template>
  <section>
    <header>
      <h2 class="text-base sm:text-lg font-medium">Delete Account</h2>
    </header>
    <Dialog>
      <DialogTrigger class="mt-4" as-child>
        <Button variant="destructive" size="sm" class="px-2">
          Delete my account
          <LucideTrash2 class="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Delete my account</DialogHeader>
        <DialogDescription
          >Are you sure you want to delete your account? This action cannot be
          undone.</DialogDescription
        >
        <form @submit.prevent="handleSubmit" class="mt-2">
          <Input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="password"
          />
          <InputError :message="authStore.formErrors.password" />
          <Button variant="destructive" size="sm" class="mt-2"
            >Delete
            <LucideRefreshCcw
              v-if="authStore.formLoading"
              class="w-4 h-4 mr-2 animate-spin"
            />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  </section>
</template>
