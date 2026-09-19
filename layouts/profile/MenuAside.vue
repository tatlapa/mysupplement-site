<template>
  <LayoutsDefaultHeader />
  <main
    class="container pt-12 md:pt-16 pb-20"
  >
    <div class="flex flex-col gap-10 md:flex-row md:gap-12">
      <LayoutsProfileMenu />
      <slot />
    </div>
  </main>
  <LayoutsDefaultFooter />
</template>
