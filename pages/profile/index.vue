<script setup lang="ts">
import { Separator } from "~/components/ui/separator";

definePageMeta({
  alias: ["/profile"],
  middleware: "auth",
  layout: "profile",
});
</script>

<template>
  <Card class="w-full md:w-3/4">
    <CardContent class="p-4">
      <ViewsProfileUpdateProfileInformationForm />
      <Separator class="my-6" />
      <ViewsProfileUpdatePasswordForm />
    </CardContent>
  </Card>
</template>
