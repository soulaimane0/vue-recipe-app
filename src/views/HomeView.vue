<script setup lang="ts">
import RecipeListControls from '@/components/RecipeListControls.vue';
import RecipeList from '@/components/RecipeList.vue';
</script>

<template>
  <main>
    <!-- Recipe list controls for filtering and searching -->
    <RecipeListControls />

    <!-- Main section for displaying recipes -->
    <section class="mx-auto w-full px-2.5 md:px-20 max-w-screen-xl pb-12">
      <!-- Section title -->
      <h1 class="text-2xl text-gray-900 font-semibold my-8">Recipes</h1>

      <!-- Recipe list -->
      <RecipeList />
    </section>
  </main>
</template>
