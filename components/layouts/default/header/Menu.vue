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
</script>

<template>
  <div class="bg-white shadow-md border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Logo/Brand -->
        <div class="flex items-center space-x-8">
          <NuxtLink to="/" class="flex items-center space-x-2 group">
            <div
              class="w-8 h-8 bg-gradient-to-r from-primary to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            >
              <LucideHouse class="w-5 h-5 text-white" />
            </div>
            <span
              class="text-xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent"
            >
              MySupplement
            </span>
          </NuxtLink>
        </div>

        <!-- Navigation Menu -->
        <NavigationMenu class="hidden md:block">
          <NavigationMenuList class="flex space-x-1">
            <NavigationMenuItem
              v-for="(item, index) in menuItems"
              :key="item.path"
              class="relative"
            >
              <NuxtLink :to="item.path" class="block">
                <NavigationMenuLink
                  :class="[
                    navigationMenuTriggerStyle(),
                    'px-4 py-2 rounded-lg transition-all duration-200 hover:bg-primary/5 hover:text-primary relative overflow-hidden',
                  ]"
                >
                  <div class="flex items-center space-x-2 relative z-10">
                    <LucideShoppingBag
                      v-if="item.title === 'Shop'"
                      class="w-4 h-4 transition-transform duration-200 hover:scale-110"
                    />
                    <LucideBrain
                      v-if="item.title === 'Supplement Advicer'"
                      class="w-4 h-4 transition-transform duration-200 hover:scale-110"
                    />
                    <LucideStar
                      v-if="item.title === 'Recommendations'"
                      class="w-4 h-4 transition-transform duration-200 hover:scale-110"
                    />
                    <span class="font-medium">{{ item.title }}</span>
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

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <Button variant="outline" size="sm" class="p-2">
            <LucideMenu class="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
