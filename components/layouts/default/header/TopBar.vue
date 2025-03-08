<script setup lang="ts">
import { ChevronDown, House, Sun, Moon } from "lucide-vue-next";
import { Toggle } from "@/components/ui/toggle";

const authStore = useAuthStore();
const isDark = ref(false);

onMounted(() => {
  isDark.value = localStorage.getItem("theme") === "dark";
  updateTheme();
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
};

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

const showRegisterDialog = ref(false);
const showLoginDialog = ref(false);

const switchToRegister = () => {
  showLoginDialog.value = false;
  showRegisterDialog.value = true;
};

const switchToLogin = () => {
  showRegisterDialog.value = false;
  showLoginDialog.value = true;
};
</script>

<template>
  <div class="bg-muted-foreground/[0.03] shadow-md border-b">
    <div class="container mx-auto py-1 xl:py-2 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap justify-between items-center">
        <NuxtLink
          to="/"
          class="rounded-full border p-2 hover:bg-secondary hover:duration-75"
        >
          <House class="size-6"></House>
        </NuxtLink>

        <div v-if="!authStore.isAuthenticated" class="flex space-x-2">
          <UtilsRegisterForm
            v-model:open="showRegisterDialog"
            @switchToLogin="switchToLogin"
          />
          <UtilsLoginForm
            v-model:open="showLoginDialog"
            @switchToRegister="switchToRegister"
          />
        </div>

        <div class="flex gap-2 items-center">
          <DropdownMenu v-if="authStore.isAuthenticated">
            <DropdownMenuTrigger as-child>
              <Button variant="outline" size="sm" class="gap-x-2">
                <img
                  :src="authStore.user?.avatar"
                  alt="Avatar"
                  class="w-4 h-4 rounded-sm"
                />
                {{ authStore.user?.name }}
                <ChevronDown
                  class="w-4 h-4 transition-transform duration-200"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-fit" align="end">
              <DropdownMenuLabel class="font-normal">
                <div class="flex flex-col space-y-1">
                  <p class="text-sm font-medium leading-none">My account</p>
                  <p class="text-xs leading-none text-muted-foreground">
                    {{ authStore.user?.email }}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <NuxtLink to="/profile">
                    <span>My profile</span>
                  </NuxtLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="authStore.logout">
                <span>Disconnect</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" @click="toggleTheme">
            <Sun v-if="!isDark" class="size-6" />
            <Moon v-else class="size-6" />
          </Button variant="ghost">
        </div>
      </div>
    </div>
  </div>
</template>
