<script setup lang="ts">
import { useToast } from "@/components/ui/toast";
import { Textarea } from "@/components/ui/textarea";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, Field } from "vee-validate";
import * as z from "zod";
import { useAdminStore } from "@/stores/admin";
import { ref, onMounted } from "vue";

const adminStore = useAdminStore();
const { toast } = useToast();
const selectedImage = ref<File | null>(null);
const imageError = ref<string | null>(null);

onMounted(async () => {
  await adminStore.getCategories();
});

const formSchema = toTypedSchema(
  z.object({
    productName: z.string().min(1, "Product name is required"),
    productPrice: z
      .number()
      .min(1, "Price is required")
      .max(100, "Price cannot exceed $100"),
    productDescription: z.string().min(1, "Description is required"),
    stockQuantity: z.number().min(1, "Stock quantity is required"),
    category: z.number().min(1, "At least one category is required"),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      imageError.value = "Image size must be less than 2MB.";
      selectedImage.value = null;
    } else {
      selectedImage.value = file;
      imageError.value = null;
    }
  }
};

const submitProduct = handleSubmit(async (values) => {
  if (!selectedImage.value) {
    imageError.value = "Please select an image.";
    return;
  }

  try {
    const formData = new FormData();
    formData.append("name", values.productName);
    formData.append("price", values.productPrice.toString());
    formData.append("description", values.productDescription);
    formData.append("stock_quantity", values.stockQuantity.toString());
    formData.append("category_id", values.category.toString());
    formData.append("image", selectedImage.value);

    await adminStore.addProduct(formData);

    resetForm();
    selectedImage.value = null;

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
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> Add Product </Button>
    </DialogTrigger>
    <DialogScrollContent>
      <DialogHeader>
        <DialogTitle> Add Product </DialogTitle>
        <DialogDescription> Add a new product to the shop. </DialogDescription>
      </DialogHeader>

      <form @submit="submitProduct">
        <div class="grid grid-cols-2 gap-4">
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
                min="1"
                max="100"
                step="0.01"
              />
              <p v-if="errorMessage" class="text-red-500 text-sm">
                {{ errorMessage }}
              </p>
            </Field>
          </div>

          <div class="mb-4">
            <Label for="productDescription">Description</Label>
            <Field v-slot="{ field, errorMessage }" name="productDescription">
              <Textarea
                id="productDescription"
                v-bind="field"
                placeholder="Enter product description"
                class="p-0.5"
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

          <div class="mb-4">
            <Label for="imageUrl">Product Image</Label>
            <Input
              id="imageUrl"
              type="file"
              accept="image/*"
              class="border rounded p-2 w-full"
              @change="handleFileUpload"
            />
            <p v-if="imageError" class="text-red-500 text-sm">
              {{ imageError }}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" :disabled="adminStore.formLoading">
            <LucideRefreshCcw
              v-if="adminStore.formLoading"
              class="w-4 h-4 mr-2 animate-spin"
            />
            Add Product
          </Button>
        </DialogFooter>
      </form>
    </DialogScrollContent>
  </Dialog>
</template>
