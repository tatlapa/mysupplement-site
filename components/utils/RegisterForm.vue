<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { useAuthStore } from "@/stores/auth";
import { Mail, User, Lock, RefreshCcw } from "lucide-vue-next";
import { InputError, Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

defineProps(["open"]);
const emit = defineEmits(["update:open", "switchToLogin"]);
const authStore = useAuthStore();
const { toast } = useToast();
const hostname = ref(typeof window !== "undefined" ? navigator.userAgent : "");

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  hostname: hostname,
});

onMounted(() => {
  if (typeof window !== "undefined") {
    hostname.value = navigator.userAgent;
  }
});

const onSubmit = async () => {
  const success = await authStore.register(form);

  if (success) {
    toast({
      title: "Registration successful!",
      description: "Welcome to Drakonia!",
    });
  }
};
const switchToLogin = () => {
  emit("update:open", false);
  emit("switchToLogin");
};
</script>

<template>
  <!-- Dialog component for the registration form -->
  <Dialog :open="open" @update:open="(value) => $emit('update:open', value)">
    <!-- Trigger button for the dialog -->
    <DialogTrigger asChild>
      <Button size="sm"> Sign Up </Button>
    </DialogTrigger>
    <!-- Content of the dialog -->
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="text-2xl font-bold">Sign Up</DialogTitle>
        <DialogDescription>
          Fill in the fields below to create your account.
        </DialogDescription>
      </DialogHeader>

      <!-- Registration form -->
      <form
        aria-label="Registration Form"
        class="space-y-4"
        @submit.prevent="onSubmit"
      >
        <Alert v-if="authStore.formErrors.global" variant="destructive">
          <AlertDescription>
            {{ authStore.formErrors.global }}
          </AlertDescription>
        </Alert>
        <div>
          <div class="relative w-full max-w-sm items-center">
            <Input
              v-model="form.name"
              id="name"
              type="text"
              placeholder="Username"
              class="pl-10"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
            >
              <User class="size-5 text-muted-foreground" strokeWidth="1.5" />
            </span>
          </div>
          <InputError :message="authStore.formErrors.name" />
        </div>
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
              <Mail class="size-5 text-muted-foreground" strokeWidth="1.5" />
            </span>
          </div>
          <InputError :message="authStore.formErrors.email" />
        </div>
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
              <Lock class="size-5 text-muted-foreground" strokeWidth="1.5" />
            </span>
          </div>
          <InputError :message="authStore.formErrors.password" />
        </div>
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
              <Lock class="size-5 text-muted-foreground" strokeWidth="1.5" />
            </span>
          </div>
          <InputError :message="authStore.formErrors.password_confirmation" />
        </div>
        <DialogFooter class="mt-6">
          <div class="w-full">
            <Button
              type="submit"
              class="w-full"
              :disabled="authStore.formLoading"
            >
              <RefreshCcw
                v-if="authStore.formLoading"
                class="w-4 h-4 mr-2 animate-spin"
              />
              Sign Up
            </Button>
            <div class="flex w-full justify-end">
              <Button @click="switchToLogin" variant="link">
                Already registered?
              </Button>
            </div>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
