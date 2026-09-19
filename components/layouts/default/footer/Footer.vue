<template>
  <footer class="border-t">
    <div class="border-b bg-card">
      <p class="container py-5 text-sm leading-relaxed text-muted-foreground">
        <span class="mr-2 font-mono text-xs tracking-[0.08em] text-primary">DEMO PROJECT</span>
        This site is a portfolio lab, built to show how I design and develop a
        full product. Nothing here is actually for sale: shop products, prices and
        orders are fictional, and no payment is ever taken. The only real items are
        the Amazon links on the Top picks page.
      </p>
    </div>
    <div
      class="container flex flex-col gap-8 py-10 text-[15px] text-muted-foreground md:flex-row md:items-center md:justify-between md:py-12"
    >
      <NuxtLink to="/" class="flex items-baseline gap-0.5 text-foreground">
        <span class="font-display text-[22px] font-semibold tracking-tight">mysupplement</span>
        <span class="font-mono text-xs text-primary">.ai</span>
      </NuxtLink>

      <nav aria-label="Footer" class="grid grid-cols-2 gap-x-8 gap-y-1 md:flex md:gap-8">
        <NuxtLink to="/about" class="flex h-11 items-center hover:text-foreground">About</NuxtLink>
        <NuxtLink to="/contact" class="flex h-11 items-center hover:text-foreground">Contact</NuxtLink>
        <NuxtLink to="/privacy-policy" class="flex h-11 items-center hover:text-foreground">Privacy policy</NuxtLink>
        <NuxtLink to="/terms" class="flex h-11 items-center hover:text-foreground">Terms</NuxtLink>
      </nav>

      <div class="flex flex-col gap-1 font-mono text-xs md:items-end">
        <span>© {{ new Date().getFullYear() }} mysupplement.ai</span>
        <span>As an Amazon Associate, I earn from qualifying purchases.</span>
      </div>
    </div>
  </footer>
</template>
