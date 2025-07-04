<script setup lang="ts">
import { useShopStore } from "~/stores/shop";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
} from "~/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

definePageMeta({
  alias: ["/shop"],
  layout: "shop-menu-filter",
});

const shopStore = useShopStore();

onMounted(async () => {
  await shopStore.getProducts();
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
        v-for="product in shopStore.paginatedProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <Pagination
      v-if="shopStore.filteredAndSortedProducts.length > 1"
      v-model:page="shopStore.currentPage"
      :total="shopStore.filteredAndSortedProducts.length"
      :items-per-page="shopStore.itemsPerPage"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationFirst />
        <PaginationPrevious />
        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === shopStore.currentPage"
          >
            {{ item.value }}
          </PaginationItem>
          <PaginationEllipsis v-else-if="item.type === 'ellipsis'" />
        </template>

        <PaginationNext />
        <PaginationLast />
      </PaginationContent>
    </Pagination>
  </div>
</template>
