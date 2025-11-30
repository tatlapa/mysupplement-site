<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const authStore = useAuthStore();
const adminStore = useAdminStore();
const cartStore = useCartStore();
const cartSidebar = ref<any>(null);
const colorMode = useColorMode();

const showRegisterDialog = ref(false);
const showLoginDialog = ref(false);

const menuItems = [
  {
    title: "Shop",
    path: "/shop",
  },
  {
    title: "Supplement Advicer",
    path: "/supplement-advicer",
  },
  {
    title: "Recommendations",
    path: "/recommendations",
  },
];

const isMobileMenuOpen = ref(false);

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

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

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
  <header class="fixed z-50 mt-4 w-full">
    <div class="container">
      <!-- Top Bar -->
      <div class="flex justify-between items-center py-2 sm:py-3">
        <!-- Logo -->
        <div class="flex items-center gap-2 sm:gap-4 md:gap-8">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 group"
            @click="closeMobileMenu"
          >
            <!-- Mobile icon -->
            <Button variant="link" size="icon" class="sm:hidden">
              <LucideHouse />
            </Button>
            <!-- Desktop text -->
            <div class="hidden sm:block">
              <h1 class="text-primary font-bold text-base sm:text-lg">
                MySupplement.ai
              </h1>
              <p class="text-gray-600 dark:text-gray-400 text-xs">
                Health & Wellness
              </p>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation Menu - Centered -->
        <div class="absolute left-1/2 transform -translate-x-1/2">
          <NavigationMenu
            class="hidden lg:block border rounded-full px-2 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
          >
            <NavigationMenuList class="flex gap-1 md:gap-3">
              <NavigationMenuItem
                v-for="(item, index) in menuItems"
                :key="item.path"
                class="relative"
              >
                <NuxtLink :to="item.path" class="block">
                  <NavigationMenuLink
                    :class="[
                      navigationMenuTriggerStyle(),
                      'py-2 transition-all duration-200 hover:bg-primary/5 hover:text-primary relative overflow-hidden',
                    ]"
                  >
                    <div class="flex items-center gap-1 sm:gap-2 relative z-10">
                      <LucideShoppingBag
                        v-if="item.title === 'Shop'"
                        class="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 hover:scale-110"
                      />
                      <LucideBrain
                        v-if="item.title === 'Supplement Advicer'"
                        class="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 hover:scale-110"
                      />
                      <LucideStar
                        v-if="item.title === 'Recommendations'"
                        class="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 hover:scale-110"
                      />
                      <span class="font-medium text-sm sm:text-base">{{
                        item.title
                      }}</span>
                    </div>
                  </NavigationMenuLink>
                </NuxtLink>
                <!-- Bottom line hover effect -->
                <div
                  class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-green-600 hover:w-full hover:left-0 transition-all duration-300 ease-out"
                ></div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <!-- Right side actions -->
        <div class="flex gap-2 sm:gap-3 items-center">
          <!-- Auth buttons -->
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
            <!-- User dropdown -->
            <DropdownMenu v-if="authStore.isAuthenticated">
              <DropdownMenuTrigger as-child>
                <Button
                  variant="outline"
                  size="sm"
                  class="gap-1 sm:gap-2 bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 backdrop-blur-sm px-2 sm:px-3"
                >
                  <LucideUser
                    v-if="!adminStore.isAdmin"
                    class="text-primary w-4 h-4 sm:w-5 sm:h-5"
                  />
                  <LucideUserCog
                    v-if="adminStore.isAdmin"
                    class="text-primary w-4 h-4 sm:w-5 sm:h-5"
                  />
                  <LucideChevronDown
                    class="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 text-primary"
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

            <!-- Theme toggle -->
            <Button
              v-if="colorMode.preference === 'light'"
              variant="outline"
              @click="colorMode.preference = 'dark'"
              class="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 p-2 sm:p-2"
            >
              <LucideMoon class="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button
              v-else
              variant="outline"
              @click="colorMode.preference = 'light'"
              class="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 p-2 sm:p-2"
            >
              <LucideSun class="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            <!-- Cart button -->
            <Button
              @click="openCart"
              variant="outline"
              class="bg-yellow-500/20 border-yellow-400/30 text-yellow-600 hover:bg-yellow-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 relative group px-2 sm:px-3"
            >
              <LucideShoppingCart />
              <span
                v-if="cartStore.cartItemCount > 0"
                class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center animate-pulse"
              >
                {{ cartStore.cartItemCount }}
              </span>
            </Button>
            <UtilsCartSideBar ref="cartSidebar" class="z-50" />

            <!-- Mobile menu button -->
            <div class="lg:hidden">
              <Button
                variant="outline"
                size="sm"
                class="p-2"
                @click="toggleMobileMenu"
              >
                <LucideMenu v-if="!isMobileMenuOpen" class="w-5 h-5" />
                <LucideX v-else class="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu dropdown -->
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg z-50"
      >
        <div class="px-3 py-4 space-y-2">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <LucideShoppingBag
              v-if="item.title === 'Shop'"
              class="w-5 h-5 text-primary"
            />
            <LucideBrain
              v-if="item.title === 'Supplement Advicer'"
              class="w-5 h-5 text-primary"
            />
            <LucideStar
              v-if="item.title === 'Recommendations'"
              class="w-5 h-5 text-primary"
            />
            <span class="font-medium text-gray-900 dark:text-gray-100">{{
              item.title
            }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
