<script setup lang="ts">
import { useShopStore } from "~/stores/shop";

definePageMeta({
  alias: ["/shop"],
  layout: "shop-menu-filter",
});

const shopStore = useShopStore();

onMounted(() => {
  shopStore.getProducts();
});
</script>

<template>
  <div class="flex flex-col items-start gap-4 w-full">
    <div class="flex items-center justify-between w-full gap-4">
      <Select
        :model-value="shopStore.sortOrder"
        @update:model-value="shopStore.setSortOrder"
      >
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by :</SelectLabel>
            <SelectItem value="asc">Price: Low to High</SelectItem>
            <SelectItem value="desc">Price: High to Low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <span>
        {{ shopStore.filteredAndSortedProducts.length }} products found
      </span>
    </div>

    <div class="grid grid-cols-4 gap-6 w-full">
      <ViewsShopCardItem
        v-for="product in shopStore.filteredAndSortedProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
