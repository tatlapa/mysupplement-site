<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { useAuthStore } from "@/stores/auth";
import { InputError, Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

defineProps(["open"]);
const emit = defineEmits(["update:open", "switchToLogin"]);
const authStore = useAuthStore();
const config = useRuntimeConfig();
const { toast } = useToast();

// Hostname detection
const hostname = ref(typeof window !== "undefined" ? navigator.userAgent : "");
onMounted(() => {
  if (typeof window !== "undefined") {
    hostname.value = navigator.userAgent;
  }
});

// Form data
const form = reactive({
  email: "",
  password: "",
  password_confirmation: "",
  hostname: hostname,
});

// Submit handler
const onSubmit = async () => {
  const success = await authStore.register(form);

  if (success) {
    toast({
      title: "Registration successful!",
      description: "Welcome to Hotel!",
    });
  }
};

// Redirect to social providers
const redirectToProvider = (provider: string) => {
  window.location.href = `${config.public.backUrl}/api/auth/redirect/${provider}`;
};

// Switch to login form
const switchToLogin = () => {
  emit("update:open", false);
  emit("switchToLogin");
};
</script>

<template>
  <Dialog :open="open" @update:open="(value) => $emit('update:open', value)">
    <DialogTrigger asChild>
      <Button size="sm"> Sign Up </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogDescription>
          Fill in the fields below to create your account.
        </DialogDescription>
      </DialogHeader>

      <form
        aria-label="Registration Form"
        class="space-y-4"
        @submit.prevent="onSubmit"
      >
        <Alert v-if="authStore.formErrors.register_global" variant="destructive">
          <AlertDescription>
            {{ authStore.formErrors.register_global }}
          </AlertDescription>
        </Alert>

        <!-- Email Input -->
        <div>
          <div class="relative w-full max-w-sm items-center">
            <Input
              v-model="form.email"
              id="email"
              type="email"
              placeholder="Email Address"
              class="pl-10"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <LucideMail
                class="size-5 text-muted-foreground"
                strokeWidth="1.5"
              />
            </span>
          </div>
          <InputError :message="authStore.formErrors.email" />
        </div>

        <!-- Password Input -->
        <div>
          <div class="relative w-full max-w-sm items-center">
            <Input
              v-model="form.password"
              id="password"
              type="password"
              placeholder="Password"
              class="pl-10"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <LucideLock
                class="size-5 text-muted-foreground"
                strokeWidth="1.5"
              />
            </span>
          </div>
          <InputError :message="authStore.formErrors.password" />
        </div>

        <!-- Password Confirmation -->
        <div>
          <div class="relative w-full max-w-sm items-center">
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
                class="size-5 text-muted-foreground"
                strokeWidth="1.5"
              />
            </span>
          </div>
          <InputError :message="authStore.formErrors.password_confirmation" />
        </div>

        <!-- Footer -->
        <DialogFooter class="mt-6">
          <div class="w-full">
            <Button
              type="submit"
              class="w-full"
              :disabled="authStore.formLoading"
            >
              <LucideRefreshCcw
                v-if="authStore.formLoading"
                class="w-4 h-4 mr-2 animate-spin"
              />
              Sign Up
            </Button>
            <div class="flex w-full justify-end">
              <Button @click="switchToLogin" variant="link" type="button">
                Already registered?
              </Button>
            </div>

            <!-- Social Buttons -->
            <p class="mt-4">Or, sign up with</p>
            <div class="flex w-full gap-4 mt-2">
              <Button
                variant="outline"
                @click="redirectToProvider('google')"
                class="flex items-center justify-center gap-2"
              >
                <Icon name="logos:google-icon" style="color: black" />
                Google
              </Button>
            </div>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
