<script setup lang="ts">
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

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
      <NavigationMenu class="hidden lg:flex">
        <NavigationMenuList class="gap-2">
          <NavigationMenuItem v-for="item in menuItems" :key="item.path">
            <NavigationMenuLink
              as-child
              :active="isActive(item.path)"
              :class="[
                navigationMenuTriggerStyle(),
                'bg-transparent text-[15px] data-[active]:text-primary data-[active]:underline data-[active]:underline-offset-[6px]',
              ]"
            >
              <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

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
            <Button variant="ghost" size="icon" aria-label="My account">
              <LucideUserCog v-if="adminStore.isAdmin" class="!size-5" />
              <LucideUser v-else class="!size-5" />
            </Button>
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

        <Button
          variant="ghost"
          size="icon"
          class="hidden sm:inline-flex"
          :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
        >
          <LucideSun v-if="colorMode.value === 'dark'" class="!size-5" />
          <LucideMoon v-else class="!size-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          class="relative"
          :aria-label="`Cart, ${cartStore.cartItemCount} items`"
          @click="openCart"
        >
          <LucideShoppingBag class="!size-5" />
          <Badge
            v-if="cartStore.cartItemCount > 0"
            class="absolute -right-2 -top-2 h-5 min-w-5 justify-center px-1 font-mono text-[11px]"
          >
            {{ cartStore.cartItemCount }}
          </Badge>
        </Button>
        <UtilsCartSideBar />

        <!-- Menu mobile -->
        <Sheet v-model:open="isMobileMenuOpen">
          <SheetTrigger as-child>
            <Button variant="ghost" size="icon" class="lg:hidden" aria-label="Open menu">
              <LucideMenu class="!size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" class="w-full bg-background sm:max-w-sm">
            <SheetHeader>
              <SheetTitle class="text-left font-display text-2xl">Menu</SheetTitle>
              <SheetDescription class="sr-only">Site navigation</SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile" class="mt-6 flex flex-col">
              <NuxtLink
                v-for="item in menuItems"
                :key="item.path"
                :to="item.path"
                class="flex h-16 items-center justify-between border-t font-display text-3xl last:border-b"
                @click="closeMobileMenu"
              >
                {{ item.title }}
                <LucideArrowRight class="h-5 w-5" />
              </NuxtLink>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
</template>
