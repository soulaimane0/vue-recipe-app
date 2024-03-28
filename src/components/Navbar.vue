<script setup lang="ts">
import MobileNav from '@/components/MobileNav.vue';
</script>

<template>
  <nav
    class="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all"
  >
    <div class="mx-auto w-full px-2.5 md:px-20 max-w-screen-xl">
      <!-- Navbar container -->
      <div class="flex h-14 items-center justify-between border-b border-zinc-200">
        <!-- Logo -->
        <RouterLink to="/" class="flex z-40 font-semibold">
          <span>RecipeVueTest.</span>
        </RouterLink>

        <!-- Mobile navigation -->
        <MobileNav />

        <!-- Desktop navigation -->
        <div class="hidden items-center space-x-4 sm:flex">
          <RouterLink
            to="/"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 px-3 py-1.5"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/recipe-create"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 px-3 py-1.5"
          >
            Recipe Create
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
