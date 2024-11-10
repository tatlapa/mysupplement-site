<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ChevronDown, Star } from "lucide-vue-next";

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

const getColorByTier = (tierId: number) => {
  switch (tierId) {
    case 1:
      return "from-amber-700 to-amber-600";
    case 2:
      return "from-slate-400 to-slate-300";
    case 3:
      return "from-yellow-500 to-yellow-400";
    default:
      return "from-slate-400 to-slate-300";
  }
};
</script>

<template>
  <div class="bg-muted-foreground/[0.03] shadow-md border-b">
    <div class="container mx-auto py-1 xl:py-2 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex items-center space-x-2 mb-2 sm:mb-0">
          <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p class="text-xs font-medium">Serveur en ligne</p>
        </div>

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
                <NuxtLink to="/profil">
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
