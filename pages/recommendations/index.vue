<script setup lang="ts">
// Seule partie « réelle » du site : des liens affiliés Amazon
const products = [
  {
    id: 1,
    name: "Vital Proteins Collagen Peptides",
    detail: "With hyaluronic acid & vitamin C · 20 oz, unflavored · 28 servings",
    why: "Skin, joints and hair — one of the most studied collagen powders.",
    link: "https://amzn.to/4ckUVfz",
  },
  {
    id: 2,
    name: "Nordic Naturals Ultimate Omega",
    detail: "Lemon flavor · 180 soft gels · 1280 mg omega-3 (EPA & DHA)",
    why: "A high-potency fish oil for heart and brain health.",
    link: "https://amzn.to/4226DZ5",
  },
  {
    id: 3,
    name: "Nature Made Vitamin D3 2000 IU",
    detail: "50 mcg · 90 softgels · 90-day supply",
    why: "Bones, teeth, muscles and immunity, especially in winter.",
    link: "https://amzn.to/4coNT9B",
  },
];
</script>

<template>
  <main class="container pb-24 pt-12 md:pt-[72px]">
    <section class="rise-in flex max-w-3xl flex-col gap-6 pb-12">
      <p class="kicker">Top picks</p>
      <h1 class="md:text-7xl">Three to start with.</h1>
      <p class="text-lg leading-relaxed text-muted-foreground">
        The basics that come up again and again, from brands with a solid track
        record. These are real products, sold on Amazon.
      </p>
    </section>

    <ol>
      <li
        v-for="(product, index) in products"
        :key="product.id"
        class="grid gap-5 border-t py-10 md:grid-cols-[72px_minmax(0,1fr)_auto] md:items-center md:gap-8"
      >
        <span class="font-mono text-[15px] text-primary">0{{ index + 1 }}</span>
        <div class="flex flex-col gap-2.5">
          <h2 class="text-3xl md:text-4xl">{{ product.name }}</h2>
          <p class="font-mono text-xs uppercase tracking-[0.04em] text-muted-foreground">
            {{ product.detail }}
          </p>
          <p class="text-[17px] leading-relaxed">{{ product.why }}</p>
        </div>
        <a
          :href="product.link"
          target="_blank"
          rel="noopener sponsored"
          class="btn-outline h-[52px] self-start md:self-center"
        >
          View on Amazon
          <LucideArrowUpRight class="h-[18px] w-[18px]" />
          <span class="sr-only">(opens in a new tab)</span>
        </a>
      </li>
    </ol>

    <p class="border-t pt-6 text-sm text-muted-foreground">
      As an Amazon Associate, I earn from qualifying purchases. Buying through
      these links costs you nothing more.
    </p>
  </main>
</template>
