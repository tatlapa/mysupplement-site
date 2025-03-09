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
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];
</script>

<template>
  <div class="flex flex-row-reverse py-2 px-2 bg-secondary">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem v-for="item in menuItems" :key="item.path">
          <NuxtLink :to="item.path">
            <NavigationMenuLink :class="navigationMenuTriggerStyle()">{{
              item.title
            }}</NavigationMenuLink>
          </NuxtLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>
