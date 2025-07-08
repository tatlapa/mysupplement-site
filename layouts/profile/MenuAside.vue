<template>
  <LayoutsDefaultHeader />
  <main
    class="max-w-7xl mx-auto py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 px-3 sm:px-4 md:px-6 lg:px-8"
  >
    <div class="h-full w-full flex flex-col md:flex-row gap-4 md:gap-6">
      <LayoutsProfileMenu />
      <slot />
    </div>
  </main>
  <LayoutsDefaultFooter />
</template>
