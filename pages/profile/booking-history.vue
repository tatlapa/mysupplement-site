<script setup lang="ts">
import { Separator } from "~/components/ui/separator";

definePageMeta({
  alias: ["/profile/booking-history"],
  middleware: "auth",
  layout: "profile",
});
</script>

<template>
  <Card class="w-full md:w-3/4">
    <CardContent class="p-4">
      <h2 class="text-lg font-medium">Booking History</h2>
      <Separator class="my-6" />
      Haha
    </CardContent>
  </Card>
</template>
