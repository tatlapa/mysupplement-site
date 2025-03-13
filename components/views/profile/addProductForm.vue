<script setup lang="ts">
import { RefreshCcw } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, Field } from "vee-validate";
import * as z from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";

const adminStore = useAdminStore();
const { toast } = useToast();

onMounted(async () => {
  await adminStore.getCategories();
  console.log("Categories:", adminStore.categories);
});

const formSchema = toTypedSchema(
  z.object({
    productName: z.string().min(1, "Product name is required"),
    productPrice: z.number().min(1, "Price is required"),
    productDescription: z.string().min(1, "Description is required"),
    stockQuantity: z.number().min(1, "Stock quantity is required"),
    category: z.number().min(1, "At least one category is required"),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});

const submitProduct = handleSubmit(async (values) => {
  try {
    await adminStore.addProduct({
      name: values.productName,
      price: values.productPrice,
      description: values.productDescription,
      stock_quantity: values.stockQuantity,
      category_id: values.category,
    });

    resetForm();
    toast({
      title: "Success",
      description: "Product added successfully",
      variant: "default",
    });
  } catch (error) {
    console.error("Failed to add product", error);
    toast({
      title: "Error",
      description: "Failed to add product",
      variant: "destructive",
    });
  }
});
</script>

<template>
  <Card class="w-full md:w-3/4">
    <CardContent class="p-4">
      <h2 class="text-lg font-medium">Add Product</h2>
      <Separator class="my-6" />

      <form @submit="submitProduct" class="space-y-4">
        <div class="mb-4">
          <Label for="productName">Product Name</Label>
          <Field v-slot="{ field, errorMessage }" name="productName">
            <Input
              id="productName"
              v-bind="field"
              placeholder="Enter product name"
            />
            <p v-if="errorMessage" class="text-red-500 text-sm">
              {{ errorMessage }}
            </p>
          </Field>
        </div>

        <div class="mb-4">
          <Label for="productPrice">Price</Label>
          <Field v-slot="{ field, errorMessage }" name="productPrice">
            <Input
              id="productPrice"
              v-bind="field"
              placeholder="Enter price"
              type="number"
            />
            <p v-if="errorMessage" class="text-red-500 text-sm">
              {{ errorMessage }}
            </p>
          </Field>
        </div>

        <div class="mb-4">
          <Label for="productDescription">Description</Label>
          <Field v-slot="{ field, errorMessage }" name="productDescription">
            <Input
              id="productDescription"
              v-bind="field"
              placeholder="Enter product description"
            />
            <p v-if="errorMessage" class="text-red-500 text-sm">
              {{ errorMessage }}
            </p>
          </Field>
        </div>

        <div class="mb-4">
          <Label for="stockQuantity">Stock Quantity</Label>
          <Field v-slot="{ field, errorMessage }" name="stockQuantity">
            <Input
              id="stockQuantity"
              v-bind="field"
              placeholder="Enter stock quantity"
              type="number"
            />
            <p v-if="errorMessage" class="text-red-500 text-sm">
              {{ errorMessage }}
            </p>
          </Field>
        </div>

        <div class="mb-4">
          <Label for="category">Category</Label>
          <Field v-slot="{ field, errorMessage }" name="category">
            <Select type="text" v-bind="field">
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem
                    v-for="categorie in adminStore.categories"
                    :key="categorie.id"
                    :value="categorie.id"
                  >
                    {{ categorie.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p v-if="errorMessage" class="text-red-500 text-sm">
              {{ errorMessage }}
            </p>
          </Field>
        </div>

        <Button
          type="submit"
          :disabled="adminStore.formLoading"
          @click="submitProduct"
          ><RefreshCcw
            v-if="adminStore.formLoading"
            class="w-4 h-4 mr-2 animate-spin"
          />Add Product</Button
        >
      </form>
    </CardContent>
  </Card>
</template>
