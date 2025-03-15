<script setup lang="ts">
import { defineEmits } from "vue";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";

defineProps<{
  product: {
    id: number;
    name: string;
    price: number;
    description?: string | null;
    stock_quantity: number;
    image_url: string;
    category?: { name: string };
  };
}>();

const emit = defineEmits(["add-to-cart"]);
const quantity = ref(1); // ✅ Default quantity: 1

// ✅ Prevents selecting more than available stock
const maxQuantity = computed(() =>
  Math.min(quantity.value, product.stock_quantity)
);
</script>

<template>
  <Card
    class="p-4 border rounded-lg shadow-md transition-transform hover:scale-105"
  >
    <CardHeader>
      <h3 class="text-lg font-semibold">{{ product.name }}</h3>
      <p class="text-sm text-gray-500">
        {{ product.category?.name || "No Category" }}
      </p>
      <p v-if="product.description" class="text-gray-700 mt-1">
        {{ product.description }}
      </p>
    </CardHeader>

    <CardContent class="flex flex-col items-center">
      <img
        :src="`http://localhost:8000${product.image_url}`"
        :alt="product.name"
        class="w-32 h-32 object-cover rounded-md mb-3"
      />
      <p class="text-lg font-medium text-gray-800">{{ product.price }} $</p>
    </CardContent>

    <CardContent class="flex flex-col items-center"> </CardContent>

    <CardFooter class="flex-col gap-3">
      <div class="flex gap-2 items-center">
        <NumberField
          id="quantity"
          class="w-24"
          :min="0"
          :max="product.stock_quantity"
          :default-value="0"
        >
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
        <p>Stock : {{ product.stock_quantity }}</p>
      </div>
      <Button
        variant="outline"
        class="text-sm px-3 py-2"
        :disabled="product.stock_quantity === 0 || quantity < 1"
        @click="emit('add-to-cart', { product, quantity: maxQuantity })"
      >
        🛒 Add to Cart
      </Button>
    </CardFooter>
  </Card>
</template>
