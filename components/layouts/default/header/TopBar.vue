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
</script>

<template>
  <div
    class="bg-muted-foreground/[0.03] shadow-md border-b flex justify-between items-center mx-auto py-1 xl:py-2 px-4 sm:px-6 lg:px-8"
  >
    <NuxtLink
      to="/"
      class="rounded-full border p-2 hover:bg-secondary hover:duration-75"
    >
      <LucideHouse class="size-6"></LucideHouse>
    </NuxtLink>

    <div class="relative">
      <LucideSearch
        class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
      />
      <input
        class="w-full pl-10 p-2 border rounded-lg"
        placeholder="Search..."
      />
    </div>

    <div class="flex gap-2 items-center">
      <div v-if="!authStore.isAuthenticated" class="flex gap-2">
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
            <Button variant="outline" size="sm" class="gap-2">
              <LucideUser v-if="!adminStore.isAdmin" />
              <LucideUserCog v-if="adminStore.isAdmin" />
              <LucideChevronDown
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
        <Button
          v-if="colorMode.preference === 'light'"
          variant="outline"
          @click="colorMode.preference = 'dark'"
        >
          <LucideMoon class="size-6" />
        </Button>
        <Button
          v-else
          variant="outline"
          @click="colorMode.preference = 'light'"
        >
          <LucideSun class="size-6" />
        </Button>
        <Button @click="cartSidebar.cartOpen = true" variant="outline">
          <LucideShoppingCart /> Cart ({{ cartStore.cartItemCount }})
        </Button>
        <UtilsCartSideBar ref="cartSidebar" />
      </div>
    </div>
  </div>
</template>
