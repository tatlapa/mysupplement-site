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

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <div class="bg-white shadow-md border-b border-gray-200 relative">
    <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div class="flex justify-between items-center py-3 sm:py-4">
        <!-- Logo/Brand - responsive sizing -->
        <div class="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
          <NuxtLink
            to="/"
            class="flex items-center space-x-2 group"
            @click="closeMobileMenu"
          >
            <div
              class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-r from-primary to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            >
              <LucideHouse
                class="w-4 h-4 md:w-5 md:h-5 text-white"
              />
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation Menu - hidden on mobile, visible on tablet and up -->
        <NavigationMenu class="hidden md:block">
          <NavigationMenuList class="flex space-x-1 sm:space-x-2 md:space-x-4">
            <NavigationMenuItem
              v-for="(item, index) in menuItems"
              :key="item.path"
              class="relative"
            >
              <NuxtLink :to="item.path" class="block">
                <NavigationMenuLink
                  :class="[
                    navigationMenuTriggerStyle(),
                    'px-2 sm:px-3 md:px-4 py-2 rounded-lg transition-all duration-200 hover:bg-primary/5 hover:text-primary relative overflow-hidden',
                  ]"
                >
                  <div
                    class="flex items-center space-x-1 sm:space-x-2 relative z-10"
                  >
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

        <!-- Mobile menu button - visible only on mobile and tablet -->
        <div class="md:hidden">
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

      <!-- Mobile menu dropdown - improved responsive design -->
      <div
        v-if="isMobileMenuOpen"
        class="sm:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50"
      >
        <div class="px-3 py-4 space-y-2">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
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
            <span class="font-medium text-gray-900">{{ item.title }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
