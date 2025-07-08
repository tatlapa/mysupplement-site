<script setup lang="ts">
const shopStore = useShopStore();

const isFilterOpen = ref(false);

const toggleFilter = () => {
  isFilterOpen.value = !isFilterOpen.value;
};
</script>

<template>
  <!-- Mobile filter button -->
  <div class="md:hidden mb-4">
    <Button
      @click="toggleFilter"
      variant="outline"
      class="w-full flex items-center justify-between"
    >
      <span>Filters</span>
      <LucideChevronDown
        :class="[
          'transition-transform duration-200',
          isFilterOpen ? 'rotate-180' : '',
        ]"
      />
    </Button>
  </div>

  <!-- Mobile filter dropdown -->
  <div v-if="isFilterOpen" class="md:hidden mb-4">
    <Card class="bg-muted-foreground/[0.03]">
      <CardHeader class="p-4">
        <CardTitle class="text-base">Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="mb-2 text-sm">
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
  </div>

  <!-- Desktop sidebar -->
  <aside class="hidden md:block w-full md:w-1/4 lg:w-1/5">
    <Card class="bg-muted-foreground/[0.03] sticky top-4">
      <CardHeader class="p-4">
        <CardTitle class="text-lg">Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="mb-2 text-sm">
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
