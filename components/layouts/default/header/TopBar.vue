<script setup lang="ts"></script>

<template>
  <div>
    <div class="bg-black/30">
      <div class="container mx-auto px-8 flex justify-between items-center">
        <div>
          <a href="/">
            <!-- <img
              src="@/assets/images/logo.png"
              alt="Hotel de bg"
            /> -->
          </a>
        </div>
        <div class="flex gap-4">
          <UtilsRegisterForm
            v-model:open="showRegisterDialog"
            @switchToLogin="switchToLogin"
          />
          <UtilsLoginForm
            v-model:open="showLoginDialog"
            @switchToRegister="switchToRegister"
          />
        </div>
      </div>
    </div>
  </div>
</template>
