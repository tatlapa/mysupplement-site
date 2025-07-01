<script setup lang="ts">
import { Separator } from "~/components/ui/separator";

definePageMeta({
  alias: ["/profile/orders"],
  middleware: "auth",
  layout: "profile-menu-aside",
});
</script>

<template>
  <Card class="w-full md:w-3/4">
    <CardContent class="p-4">
      <h2 class="text-lg font-medium">My Orders</h2>
      <Separator class="my-6" />
      In progress...
    </CardContent>
  </Card>
</template>
