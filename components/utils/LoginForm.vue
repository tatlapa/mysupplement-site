<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { useAuthStore } from "@/stores/auth";
import { Lock, Mail, RefreshCcw } from "lucide-vue-next";
import { Input, InputError } from "~/components/ui/input";

const props = defineProps(["open"]);
const emit = defineEmits(["update:open", "switchToRegister"]);
const hostname = ref(typeof window !== "undefined" ? navigator.userAgent : "");
const form = reactive({
  email: "",
  password: "",
  hostname: hostname,
});
const { toast } = useToast();
const authStore = useAuthStore();

const handleLogin = async (event: Event) => {
  const success = await authStore.login(form);

  if (success) {
    toast({
      title: "Login successful!",
      description: "You are now logged in.",
    });
  }
};

const switchToRegister = () => {
  emit("update:open", false);
  emit("switchToRegister");
};

onMounted(() => {
  if (typeof window !== "undefined") {
    hostname.value = navigator.userAgent;
  }
});
</script>

<template>
  <!-- Dialog component for the login form -->
  <Dialog :open="open" @update:open="(value) => $emit('update:open', value)">
    <!-- Trigger button for the dialog -->
    <DialogTrigger asChild>
      <Button size="sm"> Login </Button>
    </DialogTrigger>
    <!-- Content of the dialog -->
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="text-2xl font-bold"> Login </DialogTitle>
        <DialogDescription> Log in to access your account. </DialogDescription>
      </DialogHeader>

      <!-- Login form -->
      <form class="space-y-4" @submit.prevent="handleLogin">
        <Alert v-if="authStore.formErrors.global" variant="destructive">
          <AlertDescription>
            {{ authStore.formErrors.global }}
          </AlertDescription>
        </Alert>
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

        <!-- Footer with additional links and submit button -->
        <div
          class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mt-6"
        >
          <div class="shrink-0">
            <Button
              type="button"
              variant="link"
              as-child
              class="px-0 py-0 h-6 block"
            >
              <NuxtLink to="/auth/forget-password"> Forgot password? </NuxtLink>
            </Button>
            <Button
              type="button"
              variant="link"
              @click="switchToRegister"
              class="px-0 py-0 h-6 block"
            >
              Not registered yet?
            </Button>
          </div>

          <Button
            type="submit"
            class="w-full"
            :disabled="authStore.formLoading"
          >
            <RefreshCcw
              v-if="authStore.formLoading"
              class="w-4 h-4 mr-2 animate-spin"
            />
            Login
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
