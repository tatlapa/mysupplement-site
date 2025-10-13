<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Main footer content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <!-- Brand section -->
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-2 mb-6">
            <div
              class="w-10 h-10 bg-gradient-to-r from-primary to-green-600 rounded-lg flex items-center justify-center"
            >
              <LucideLeaf class="w-6 h-6 text-white" />
            </div>
            <span class="text-2xl font-bold">MySupplement.ai</span>
          </div>
          <p class="text-gray-400 mb-6 leading-relaxed">
            Your personal AI-powered supplement advisor, helping you achieve
            optimal health through personalized recommendations.
          </p>
          <div class="flex space-x-4">
            <NuxtLink
              to="/"
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
            >
              <LucideInstagram class="w-5 h-5" />
            </NuxtLink>
            <NuxtLink
              to="/"
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
            >
              <LucideTwitter class="w-5 h-5" />
            </NuxtLink>
            <NuxtLink
              to="/"
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
            >
              <LucideLinkedin class="w-5 h-5" />
            </NuxtLink>
          </div>
        </div>

        <!-- Explore -->
        <div>
          <h3 class="text-lg font-semibold mb-6 text-white">Explore</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >Home</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >Personalized Supplements</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >Limited Editions</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >Contact Us</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h3 class="text-lg font-semibold mb-6 text-white">
            Customer Service
          </h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >FAQ</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >Shipping & Returns</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >Policies</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >Support</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- About -->
        <div>
          <h3 class="text-lg font-semibold mb-6 text-white">About</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >Our Story</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >Vision for the Future</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >Team</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                >Careers</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom section -->
      <div class="border-t border-gray-800 pt-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div class="text-sm text-gray-400">
            As an Amazon Associate, I earn from qualifying purchases.
            <br />
            &copy; {{ new Date().getFullYear() }} MySupplement – All rights
            reserved.
          </div>
          <div class="flex space-x-6 text-sm">
            <NuxtLink
              to="/privacy-policy"
              class="text-gray-400 hover:text-white transition-colors duration-200"
              >Privacy Policy</NuxtLink
            >
            <NuxtLink
              to="/terms"
              class="text-gray-400 hover:text-white transition-colors duration-200"
              >Terms of Service</NuxtLink
            >
            <NuxtLink
              to="/"
              class="text-gray-400 hover:text-white transition-colors duration-200"
              >Cookie Policy</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
