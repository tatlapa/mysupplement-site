<template>
  <LayoutsDefaultHeader />
  <main
    class="container pt-12 md:pt-16 pb-20"
  >
    <div class="flex flex-col md:flex-row gap-4">
      <LayoutsProfileMenu />
      <slot />
    </div>
  </main>
  <LayoutsDefaultFooter />
</template>
