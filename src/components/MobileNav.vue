<script setup lang="ts">
import { ref } from 'vue';

// Define a reactive variable to track the navbar state
const isNavbarOpen = ref(false);

// Function to toggle the navbar
const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
};
</script>

<template>
  <div class="sm:hidden">
    <!-- Navbar toggle button -->
    <button
      aria-label="menu bars"
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 px-3 py-1.5"
      @click="toggleNavbar"
    >
      <fa :icon="isNavbarOpen ? 'x' : 'bars'" class="text-xl text-gray-600" />
    </button>

    <!-- Navbar overlay -->
    <div
      v-if="isNavbarOpen"
      class="fixed top-0 left-0 w-full h-screen z-20 bg-white/75 backdrop-blur-lg"
      @click="isNavbarOpen = false"
    >
      <div class="flex flex-col h-full w-64 bg-white p-4">
        <!-- Close button -->
        <div class="flex justify-end mb-6">
          <button
            aria-label="close menu"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 px-3 py-1.5"
            @click="toggleNavbar"
          >
            <fa icon="x" class="text-xl text-gray-600" />
          </button>
        </div>

        <!-- Navbar links -->
        <RouterLink
          to="/"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-gray-50 text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-1.5 mb-2"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/recipe-create"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-gray-50 text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-1.5 mb-2"
        >
          Recipe Create
        </RouterLink>
      </div>
    </div>
  </div>
</template>
