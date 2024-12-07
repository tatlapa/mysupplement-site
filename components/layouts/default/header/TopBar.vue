<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ChevronDown, House } from "lucide-vue-next";

const authStore = useAuthStore();

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
        <NuxtLink to="/" class="rounded-full border p-2 hover:bg-primary hover:translate-x-3 hover:duration-75">
          <House class="size-7"></House>
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

        <DropdownMenu v-else>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="sm" class="gap-x-2">
              <img
                :src="authStore.user?.avatar"
                alt="Avatar"
                class="w-4 h-4 rounded-sm"
              />
              {{ authStore.user?.name }}
              <ChevronDown class="w-4 h-4 transition-transform duration-200" />
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
      </div>
    </div>
  </div>
</template>
