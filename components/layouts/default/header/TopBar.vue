<script setup lang="ts">
const authStore = useAuthStore();
const adminStore = useAdminStore();
const cartStore = useCartStore();
const cartSidebar = ref(null);
const colorMode = useColorMode();

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

const openCart = () => {
  if (cartSidebar.value) {
    cartSidebar.value.cartOpen = true;
  }
};
</script>

<template>
  <div
    class="bg-gradient-to-r from-primary via-green-600 to-emerald-600 shadow-lg border-b border-primary/20 flex justify-between items-center mx-auto py-2 sm:py-3 px-3 sm:px-6 md:px-8"
  >
      <!-- Logo text -->
      <div >
        <h1 class="text-white font-bold text-base sm:text-lg">
          MySupplement.ai
        </h1>
        <p class="text-white/80 text-xs">Health & Wellness</p>
      </div>

    <div class="flex gap-2 sm:gap-3 items-center">
      <!-- Auth buttons - responsive layout -->
      <div v-if="!authStore.isAuthenticated" class="flex gap-1 sm:gap-2">
        <UtilsRegisterForm
          v-model:open="showRegisterDialog"
          @switchToLogin="switchToLogin"
        />
        <UtilsLoginForm
          v-model:open="showLoginDialog"
          @switchToRegister="switchToRegister"
        />
      </div>

      <div class="flex gap-1 sm:gap-2 items-center">
        <!-- User dropdown - responsive button -->
        <DropdownMenu v-if="authStore.isAuthenticated">
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              size="sm"
              class="gap-1 sm:gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-2 sm:px-3"
            >
              <LucideUser
                v-if="!adminStore.isAdmin"
                class="text-white w-4 h-4 sm:w-5 sm:h-5"
              />
              <LucideUserCog
                v-if="adminStore.isAdmin"
                class="text-white w-4 h-4 sm:w-5 sm:h-5"
              />
              <LucideChevronDown
                class="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 text-white"
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

        <!-- Theme toggle - responsive button -->
        <Button
          v-if="colorMode.preference === 'light'"
          variant="outline"
          @click="colorMode.preference = 'dark'"
          class="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 p-2 sm:p-2"
        >
          <LucideMoon class="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button
          v-else
          variant="outline"
          @click="colorMode.preference = 'light'"
          class="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 p-2 sm:p-2"
        >
          <LucideSun class="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>

        <!-- Cart button - responsive with text hidden on mobile -->
        <Button
          @click="openCart"
          variant="outline"
          class="bg-yellow-500/20 border-yellow-400/30 text-yellow-100 hover:bg-yellow-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 relative group px-2 sm:px-3"
        >
          <LucideShoppingCart class="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" />
          <span class="hidden sm:inline">Cart</span>
          <span
            v-if="cartStore.cartItemCount > 0"
            class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center animate-pulse"
          >
            {{ cartStore.cartItemCount }}
          </span>
        </Button>
        <UtilsCartSideBar ref="cartSidebar" />
      </div>
    </div>
  </div>
</template>
