<script setup lang="ts">
import { useShopStore } from "~/stores/shop";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

const shopStore = useShopStore();

onMounted(async () => {
  await shopStore.getProducts();
});
</script>

<template>
  <main class="container pb-24 pt-12 md:pt-[72px]">
    <section class="flex flex-col justify-between gap-8 pb-10 lg:flex-row lg:items-end">
      <div class="flex flex-col gap-5">
        <p class="kicker">The shelf</p>
        <h1 class="md:text-7xl">
          {{ shopStore.products.length ? `${shopStore.products.length} essentials.` : "The essentials." }}
        </h1>
        <p class="max-w-[520px] text-lg leading-relaxed text-muted-foreground">
          Every product here is one the advisor can recommend. Not sure where to
          start?
          <NuxtLink to="/supplement-advicer" class="font-semibold text-primary underline-offset-4 hover:underline">
            Take the analysis</NuxtLink>.
        </p>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div
          role="group"
          aria-label="Category"
          class="flex w-full divide-x overflow-x-auto rounded-xl border bg-card sm:w-auto"
        >
          <button
            type="button"
            :aria-pressed="shopStore.category === null"
            :class="[
              'flex h-[50px] flex-1 shrink-0 items-center justify-center gap-2 px-5 text-[15px] transition-colors sm:flex-none',
              shopStore.category === null ? 'bg-foreground font-semibold text-background' : 'hover:bg-accent',
            ]"
            @click="shopStore.setCategory(null)"
          >
            All
            <span class="font-mono text-xs opacity-70">{{ shopStore.products.length }}</span>
          </button>
          <button
            v-for="category in shopStore.categories"
            :key="category.name"
            type="button"
            :aria-pressed="shopStore.category === category.name"
            :class="[
              'flex h-[50px] flex-1 shrink-0 items-center justify-center gap-2 px-5 text-[15px] transition-colors sm:flex-none',
              shopStore.category === category.name ? 'bg-foreground font-semibold text-background' : 'hover:bg-accent',
            ]"
            @click="shopStore.setCategory(category.name)"
          >
            {{ category.name }}
            <span class="font-mono text-xs opacity-70">{{ category.count }}</span>
          </button>
        </div>

        <Select :model-value="shopStore.sortOrder" @update:model-value="shopStore.setSortOrder">
          <SelectTrigger class="h-[52px] w-full rounded-xl bg-card px-5 sm:w-[210px]" aria-label="Sort">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Price: low to high</SelectItem>
            <SelectItem value="desc">Price: high to low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>

    <section
      aria-label="Products"
      class="grid grid-cols-2 gap-x-3 gap-y-10 pt-4 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 xl:grid-cols-5"
    >
      <template v-if="shopStore.isLoading && shopStore.products.length === 0">
        <div v-for="n in 10" :key="`skeleton-${n}`" class="flex flex-col gap-3.5">
          <Skeleton class="h-[200px] rounded-2xl md:h-[280px]" />
          <Skeleton class="h-3 w-1/3" />
          <Skeleton class="h-5 w-2/3" />
        </div>
      </template>
      <ViewsShopCardItem
        v-for="product in shopStore.paginatedProducts"
        v-else
        :key="product.id"
        :product="product"
      />
    </section>

    <div
      v-if="shopStore.filteredAndSortedProducts.length > shopStore.itemsPerPage"
      class="flex justify-center pt-16"
    >
      <Pagination
        v-model:page="shopStore.currentPage"
        :total="shopStore.filteredAndSortedProducts.length"
        :items-per-page="shopStore.itemsPerPage"
      >
        <PaginationContent v-slot="{ items }">
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
        </PaginationContent>
      </Pagination>
    </div>
  </main>
</template>
