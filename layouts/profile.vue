<template>
    <div>
      <LayoutsDefaultHeader/>
      <div class="container mx-auto py-8 xl:py-16 px-4 sm:px-6 lg:px-8">
        <div class="h-full w-full flex flex-row-reverse md:flex-row gap-2 gap-y-4">
          <LayoutsDefaultProfileMenu/>
          <slot/>
        </div>
      </div>
      <LayoutsDefaultFooter/>
    </div>
  </template>
    