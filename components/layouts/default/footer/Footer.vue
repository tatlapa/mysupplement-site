<template>
  <footer class="bg-black text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Explore -->
        <div>
          <h3 class="text-base font-semibold mb-4">Explore</h3>
          <ul class="space-y-2 text-gray-400">
            <li><NuxtLink to="/" class="hover:text-white">Home</NuxtLink></li>
            <li>
              <NuxtLink to="/" class="hover:text-white"
                >Personalized Supplements</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/" class="hover:text-white"
                >Limited Editions</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/" class="hover:text-white">Contact Us</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Customer Service</h3>
          <ul class="space-y-2 text-gray-400">
            <li><NuxtLink to="/" class="hover:text-white">FAQ</NuxtLink></li>
            <li>
              <NuxtLink to="/" class="hover:text-white"
                >Shipping & Returns</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/" class="hover:text-white">Policies</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- About -->
        <div>
          <h3 class="text-lg font-semibold mb-4">About</h3>
          <ul class="space-y-2 text-gray-400">
            <li>
              <NuxtLink to="/" class="hover:text-white">Story</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="hover:text-white"
                >Vision for the Future</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/" class="hover:text-white">Follow Us</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social Media -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Follow Us</h3>
          <ul class="flex gap-2">
            <li>
              <NuxtLink to="/"><LucideInstagram class="w-6 h-6" /></NuxtLink>
            </li>
            <li>
              <NuxtLink to="/"><LucideFacebook class="w-6 h-6" /></NuxtLink>
            </li>
            <li>
              <NuxtLink to="/"><LucideTwitter class="w-6 h-6" /></NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <Separator class="mt-8" />

      <div class="mt-8 text-center text-sm text-gray-400">
        As an Amazon Associate, I earn from qualifying purchases.
        <br />
        &copy; {{ new Date().getFullYear() }} MySupplement – All rights
        reserved.
      </div>
    </div>
  </footer>
</template>
