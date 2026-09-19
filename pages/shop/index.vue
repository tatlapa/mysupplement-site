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

// « all » tient lieu de null : un ToggleGroup ne sait pas sélectionner l'absence de valeur
const categoryOptions = computed(() => [
  { name: "all", label: "All", count: shopStore.products.length },
  ...shopStore.categories.map((category) => ({ ...category, label: category.name })),
]);

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
        <!-- Segments droits, séparés par des filets : le rayon n'est gardé qu'à l'extérieur -->
        <ToggleGroup
          type="single"
          :model-value="shopStore.category ?? 'all'"
          aria-label="Category"
          class="w-full gap-0 divide-x overflow-hidden rounded-md border bg-card sm:w-auto"
          @update:model-value="(value) => value && shopStore.setCategory(value === 'all' ? null : String(value))"
        >
          <ToggleGroupItem
            v-for="category in categoryOptions"
            :key="category.name"
            :value="category.name"
            class="h-[50px] flex-1 rounded-none px-5 text-[15px] hover:bg-accent hover:text-foreground data-[state=on]:bg-foreground data-[state=on]:font-semibold data-[state=on]:text-background data-[state=on]:hover:bg-foreground data-[state=on]:hover:text-background sm:flex-none"
          >
            {{ category.label }}
            <span class="font-mono text-xs opacity-70">{{ category.count }}</span>
          </ToggleGroupItem>
        </ToggleGroup>

        <Select :model-value="shopStore.sortOrder" @update:model-value="shopStore.setSortOrder">
          <SelectTrigger class="h-[52px] w-full bg-card px-5 sm:w-[210px]" aria-label="Sort">
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
