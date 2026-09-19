<script setup lang="ts">
import { User, History, Store } from "lucide-vue-next";
import { useAdminStore } from "@/stores/admin";

const route = useRoute();
const adminStore = useAdminStore();

// Calculé, pour que l'entrée admin apparaisse dès que le rôle est connu
const menuItems = computed(() => [
  { title: "My profile", path: "/profile", icon: User },
  { title: "My orders", path: "/profile/orders", icon: History },
  ...(adminStore.isAdmin
    ? [{ title: "Shop editor", path: "/profile/shop-editor", icon: Store }]
    : []),
]);

const isActive = (path: string) => route.path === path;
</script>

<template>
  <aside class="w-full md:w-1/4">
    <p class="kicker mb-4">Account</p>
    <nav aria-label="Account" class="flex flex-col">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :aria-current="isActive(item.path) ? 'page' : undefined"
        :class="[
          'group flex h-14 items-center gap-3 border-t px-1 transition-colors last:border-b',
          isActive(item.path) ? 'font-semibold text-primary' : 'text-foreground hover:text-primary',
        ]"
      >
        <span
          :class="[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors',
            isActive(item.path)
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-rule group-hover:border-primary',
          ]"
        >
          <component :is="item.icon" class="h-4 w-4" />
        </span>
        <span class="flex-1 text-[17px]">{{ item.title }}</span>
        <LucideChevronRight
          class="h-4 w-4 transition-transform group-hover:translate-x-1"
          :class="isActive(item.path) ? 'text-primary' : 'text-muted-foreground'"
        />
      </NuxtLink>
    </nav>
  </aside>
</template>
