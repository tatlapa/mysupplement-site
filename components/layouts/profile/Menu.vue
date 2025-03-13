<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, User, History, Store } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { useAdminStore } from "@/stores/admin"; // Ajout de l'import du store admin

const route = useRoute();
const adminStore = useAdminStore();

const menuItems = [
  {
    title: "My profile",
    path: "/profile",
    icon: User,
  },
  {
    title: "My Orders",
    path: "/profile/orders",
    icon: History,
  },
];

if (adminStore.isAdmin) {
  menuItems.push({
    title: "Shop Editor",
    path: "/profile/shop-editor",
    icon: Store,
  });
}

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <aside class="w-full md:w-1/4">
    <Card class="bg-muted-foreground/[0.03]">
      <CardContent class="p-4 space-y-3">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="block group"
        >
          <div
            class="w-full p-3 flex items-center justify-between rounded-lg transition-all duration-200"
            :class="[
              isActive(item.path)
                ? 'bg-primary text-primary-foreground'
                : 'bg-zinc-800/50 hover:bg-zinc-800 group-hover:translate-x-2',
            ]"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg p-2 flex items-center justify-center"
                :class="[
                  isActive(item.path)
                    ? 'bg-primary-foreground/10'
                    : 'bg-zinc-700/50',
                ]"
              >
                <component :is="item.icon" class="w-5 h-5" />
              </div>
              <h3 class="font-medium">{{ item.title }}</h3>
            </div>
            <ChevronRight
              class="w-5 h-5"
              :class="[
                isActive(item.path)
                  ? 'text-primary-foreground'
                  : 'text-zinc-400 group-hover:text-zinc-200',
              ]"
            />
          </div>
        </NuxtLink>
      </CardContent>
    </Card>
  </aside>
</template>
