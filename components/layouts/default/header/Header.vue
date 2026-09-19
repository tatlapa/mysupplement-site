<script setup lang="ts">
const authStore = useAuthStore();
const adminStore = useAdminStore();
const cartStore = useCartStore();
const colorMode = useColorMode();
const route = useRoute();

const showRegisterDialog = ref(false);
const showLoginDialog = ref(false);

const menuItems = [
  { title: "Advisor", path: "/supplement-advicer" },
  { title: "Shop", path: "/shop" },
  { title: "Top picks", path: "/recommendations" },
];

const isMobileMenuOpen = ref(false);

const isActive = (path: string) => route.path.startsWith(path);

const switchToRegister = () => {
  showLoginDialog.value = false;
  showRegisterDialog.value = true;
};

const switchToLogin = () => {
  showRegisterDialog.value = false;
  showLoginDialog.value = true;
};

const openCart = () => {
  cartStore.isOpen = true;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Changer de page referme le menu mobile
watch(() => route.path, closeMobileMenu);

watch(showLoginDialog, (value) => {
  if (value === true) {
    authStore.formErrors = {};
  }
});

watch(showRegisterDialog, (value) => {
  if (value === true) {
    authStore.formErrors = {};
  }
});
</script>

<template>
  <header class="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
    <div class="container flex h-16 items-center justify-between gap-4 md:h-[88px]">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex items-baseline gap-0.5 text-foreground"
        @click="closeMobileMenu"
      >
        <span class="font-display text-[21px] font-semibold tracking-tight md:text-[26px]">
          mysupplement
        </span>
        <span class="font-mono text-[11px] text-primary md:text-[13px]">.ai</span>
      </NuxtLink>

      <!-- Navigation -->
      <nav aria-label="Main" class="hidden items-center gap-10 text-[15px] font-medium lg:flex">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          :aria-current="isActive(item.path) ? 'page' : undefined"
          :class="[
            'transition-colors hover:text-primary',
            isActive(item.path) && 'text-primary underline underline-offset-[6px]',
          ]"
        >
          {{ item.title }}
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-1 sm:gap-2">
        <template v-if="!authStore.isAuthenticated">
          <UtilsLoginForm
            v-model:open="showLoginDialog"
            @switchToRegister="switchToRegister"
          />
          <UtilsRegisterForm
            v-model:open="showRegisterDialog"
            @switchToLogin="switchToLogin"
          />
        </template>

        <DropdownMenu v-if="authStore.isAuthenticated">
          <DropdownMenuTrigger as-child>
            <button type="button" class="btn-icon border-rule" aria-label="My account">
              <LucideUserCog v-if="adminStore.isAdmin" class="h-5 w-5" />
              <LucideUser v-else class="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56" align="end">
            <DropdownMenuLabel class="font-normal">
              <div class="flex flex-col gap-1">
                <p class="text-sm font-medium leading-none">My account</p>
                <p class="text-xs leading-none text-muted-foreground">
                  {{ authStore.user?.email }}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem as-child>
                <NuxtLink to="/profile">My profile</NuxtLink>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="authStore.logout">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          type="button"
          class="btn-icon hidden border-transparent sm:inline-flex"
          :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
        >
          <LucideSun v-if="colorMode.value === 'dark'" class="h-5 w-5" />
          <LucideMoon v-else class="h-5 w-5" />
        </button>

        <button
          type="button"
          class="btn-icon relative border-rule"
          :aria-label="`Cart, ${cartStore.cartItemCount} items`"
          @click="openCart"
        >
          <LucideShoppingBag class="h-5 w-5" />
          <span
            v-if="cartStore.cartItemCount > 0"
            class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 font-mono text-[11px] text-primary-foreground"
          >
            {{ cartStore.cartItemCount }}
          </span>
        </button>
        <UtilsCartSideBar />

        <button
          type="button"
          class="btn-icon border-transparent lg:hidden"
          :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMobileMenuOpen"
          @click="toggleMobileMenu"
        >
          <LucideX v-if="isMobileMenuOpen" class="h-5 w-5" />
          <LucideMenu v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Menu mobile -->
    <nav
      v-if="isMobileMenuOpen"
      aria-label="Mobile"
      class="border-t bg-background lg:hidden"
    >
      <div class="container flex flex-col py-2">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex h-14 items-center justify-between border-b font-display text-2xl last:border-b-0"
          @click="closeMobileMenu"
        >
          {{ item.title }}
          <LucideArrowRight class="h-5 w-5" />
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
