<script setup lang="ts">
import type { AdvicerForm, SupplementRecommendation } from "@/types/advicerTypes";
import { genders, goals, sleepQualities, stressLevels } from "~/utils/advicerOptions";

const props = defineProps<{
  result: SupplementRecommendation;
  form: AdvicerForm;
}>();

defineEmits<{ edit: [] }>();

const shopStore = useShopStore();
const cartStore = useCartStore();

onMounted(async () => {
  if (shopStore.products.length === 0) {
    await shopStore.getProducts();
  }
});

const labelOf = (list: { id: string; label: string }[], id: string) =>
  list.find((item) => item.id === id)?.label ?? id;

const profile = computed(() => [
  `${labelOf(genders, props.form.gender)} · ${props.form.age}`,
  `Sleep: ${labelOf(sleepQualities, props.form.sleepQuality)}`,
  `Stress: ${labelOf(stressLevels, props.form.stressLevel)}`,
  `Goals: ${props.form.goals.map((id) => labelOf(goals, id)).join(" · ")}`,
]);

// Produits de la boutique qui correspondent à une recommandation :
// « Ashwagandha (withanolides 10%) » retrouve « Ashwagandha »
const matches = computed(() =>
  props.result.supplements.flatMap((supplement, index) => {
    const name = supplement.name.toLowerCase();
    const product = shopStore.products.find((p) => {
      const productName = p.name.toLowerCase();
      return name.includes(productName) || productName.includes(name);
    });
    return product ? [{ product, rank: index + 1 }] : [];
  })
);

const matchesTotal = computed(() =>
  matches.value.reduce((sum, { product }) => sum + Number(product.price), 0).toFixed(2)
);

const addAll = () => {
  matches.value.forEach(({ product }) => cartStore.addToCart(product.id, 1));
  cartStore.isOpen = true;
};

const addOne = (id: number) => {
  cartStore.addToCart(id, 1);
  cartStore.isOpen = true;
};

const pad = (n: number) => String(n).padStart(2, "0");
</script>

<template>
  <div class="container pb-24 pt-12 md:pt-[72px]">
    <section class="rise-in flex flex-col gap-7 pb-12 md:pb-14">
      <p class="kicker">Your protocol · {{ result.supplements.length }} supplements</p>
      <h1 class="max-w-[1080px] md:text-[64px]">Here’s what fits your profile.</h1>
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <ul class="flex flex-wrap gap-2">
          <li v-for="item in profile" :key="item">
            <Badge variant="outline" class="h-9 bg-card px-3.5 font-mono text-xs font-normal uppercase">
              {{ item }}
            </Badge>
          </li>
        </ul>
        <Button variant="outline" size="lg" class="self-start border-foreground" @click="$emit('edit')">
          Edit answers
        </Button>
      </div>
    </section>

    <section aria-label="Recommended supplements">
      <article
        v-for="(supplement, index) in result.supplements"
        :key="supplement.name"
        class="grid gap-5 border-t py-8 md:grid-cols-[72px_minmax(0,1.3fr)_minmax(0,1fr)] md:gap-8 xl:grid-cols-[72px_minmax(0,1.3fr)_minmax(0,1fr)_320px]"
      >
        <span class="font-mono text-[15px] text-primary md:pt-2">{{ pad(index + 1) }}</span>
        <div class="flex flex-col gap-2.5">
          <h2 class="text-[28px] md:text-[32px]">{{ supplement.name }}</h2>
          <p class="leading-relaxed text-muted-foreground">{{ supplement.description }}</p>
        </div>
        <ul class="flex flex-col gap-2.5 md:pt-2">
          <li
            v-for="benefit in supplement.benefits"
            :key="benefit"
            class="flex items-start gap-2.5 text-[15px] leading-snug"
          >
            <LucideCheck class="mt-px h-[18px] w-[18px] shrink-0 text-primary" />
            {{ benefit }}
          </li>
        </ul>
        <Card
          class="flex flex-col gap-2 rounded-md border-[1.5px] border-foreground px-[18px] py-4 shadow-none md:col-start-2 xl:col-start-auto"
        >
          <span class="font-mono text-[11px] tracking-[0.08em] text-muted-foreground">DOSE &amp; TIMING</span>
          <span class="font-mono text-[13px] leading-relaxed">{{ supplement.dosage }}</span>
        </Card>
      </article>
    </section>

    <Card class="mt-6 grid gap-6 rounded-[20px] p-6 shadow-none md:p-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
      <CardTitle class="font-display text-3xl font-medium tracking-tight md:text-4xl md:leading-[1.1]">
        Why this combination
      </CardTitle>
      <CardDescription class="text-[17px] leading-[1.7] text-foreground/85">
        {{ result.explanation }}
      </CardDescription>
    </Card>

    <section v-if="matches.length" class="flex flex-col gap-8 pt-20">
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div class="flex flex-col gap-3">
          <p class="kicker">In our shop</p>
          <h2 class="text-3xl md:text-[40px]">
            {{ matches.length }} of your {{ result.supplements.length }} {{ matches.length > 1 ? "are" : "is" }} on the shelf
          </h2>
        </div>
        <Button v-if="matches.length > 1" size="lg" @click="addAll">
          Add all to cart · ${{ matchesTotal }}
        </Button>
      </div>
      <div class="grid gap-6 md:grid-cols-2">
        <Card
          v-for="{ product, rank } in matches"
          :key="product.id"
          class="flex items-center gap-4 border-[#E4DED1] bg-white p-4 shadow-none dark:border-rule dark:bg-card md:gap-6 md:p-5"
        >
          <NuxtLink
            :to="`/shop/products/${product.id}`"
            class="flex h-24 w-24 shrink-0 items-center justify-center md:h-[140px] md:w-[140px]"
          >
            <img :src="product.image_url" :alt="product.name" class="max-h-full max-w-full object-contain" />
          </NuxtLink>
          <div class="flex flex-1 flex-col gap-1.5">
            <span class="font-mono text-xs tracking-[0.08em] text-muted-foreground">MATCHES {{ pad(rank) }}</span>
            <NuxtLink :to="`/shop/products/${product.id}`" class="font-display text-2xl hover:text-primary md:text-[26px]">
              {{ product.name }}
            </NuxtLink>
            <span class="font-mono text-[15px]">${{ product.price }}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            class="h-12 w-12 shrink-0 border-foreground"
            :aria-label="`Add ${product.name} to cart`"
            :disabled="product.stock_quantity <= 0"
            @click="addOne(product.id)"
          >
            <LucidePlus class="!size-5" />
          </Button>
        </Card>
      </div>
    </section>

    <Separator class="mt-14" />
    <Alert class="mt-6 border-0 bg-transparent p-0 [&>svg]:left-0 [&>svg]:top-1">
      <LucideInfo class="h-4 w-4" />
      <AlertTitle class="font-mono text-xs uppercase tracking-[0.08em]">Not medical advice</AlertTitle>
      <AlertDescription class="leading-relaxed text-muted-foreground">
        Generated by an AI model from your answers. Check with a doctor or
        pharmacist before starting a supplement, especially if you are pregnant,
        have a condition or take medication.
      </AlertDescription>
    </Alert>
  </div>
</template>
