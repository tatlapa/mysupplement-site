<template>
  <LayoutsDefaultHeader />
  <main
    class="pt-40 pb-20"
  >
    <div class="container h-full w-full flex flex-col md:flex-row-reverse gap-4 md:gap-6">
      <LayoutsShopMenu />
      <slot />
    </div>
  </main>
  <LayoutsDefaultFooter />
</template>
