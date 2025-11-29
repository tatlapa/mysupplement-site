<script setup lang="ts">
import { Separator } from "~/components/ui/separator";

definePageMeta({
  alias: ["/profile"],
  middleware: "auth",
  layout: "profile-menu-aside",
});
</script>

<template>
  <Card class="w-full">
    <CardContent class="p-3 sm:p-4 md:p-6">
      <ViewsProfileUpdateProfileInformationForm />
      <Separator class="my-4 sm:my-6" />
      <ViewsProfileUpdatePasswordForm />
      <Separator class="my-4 sm:my-6" />
      <ViewsProfileDeleteUserForm />
    </CardContent>
  </Card>
</template>
