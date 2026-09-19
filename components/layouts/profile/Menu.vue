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
</script>

<template>
  <!-- Sidebar de shadcn, en version statique : ni repli ni tiroir mobile -->
  <SidebarProvider class="min-h-0 w-full md:w-1/4">
    <Sidebar collapsible="none" class="w-full bg-transparent">
      <SidebarContent>
        <SidebarGroup class="p-0">
          <SidebarGroupLabel class="kicker h-auto pb-4 pl-0">Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu class="gap-0">
              <SidebarMenuItem v-for="item in menuItems" :key="item.path">
                <SidebarMenuButton
                  as-child
                  :is-active="route.path === item.path"
                  class="group h-14 gap-3 rounded-none border-t px-1 text-[17px] data-[active=true]:bg-transparent data-[active=true]:font-semibold data-[active=true]:text-primary [&>svg]:size-4"
                >
                  <NuxtLink :to="item.path">
                    <span
                      :class="[
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors',
                        route.path === item.path
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'group-hover:border-primary',
                      ]"
                    >
                      <component :is="item.icon" class="h-4 w-4" />
                    </span>
                    <span class="flex-1">{{ item.title }}</span>
                    <LucideChevronRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </SidebarProvider>
</template>
