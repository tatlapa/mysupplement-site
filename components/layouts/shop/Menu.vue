<script setup lang="ts">
const shopStore = useShopStore();

</script>

<template>
  <aside class="w-1/4">
    <Card class="bg-muted-foreground/[0.03]">
      <CardHeader class="p-4">
        <CardTitle>Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="mb-2">
          ${{ shopStore.priceRange[0] }} - ${{ shopStore.priceRange[1] }}
        </div>
        <Slider
          :min="0"
          :max="100"
          :step="1"
          :range="true"
          v-model="shopStore.priceRange"
        />
      </CardContent>
    </Card>
  </aside>
</template>
