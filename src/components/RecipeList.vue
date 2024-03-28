<script setup lang="ts">
import RecipeCard from '@/components/RecipeCard.vue';
import { useRecipeStore } from '@/stores/recipes';

const recipeStore = useRecipeStore();
</script>

<template>
  <!-- Display recipes if available, otherwise show a message -->
  <div v-if="recipeStore.loading" class="text-center mt-12">
    <p class="text-gray-600 font-semibold text-lg">Loading...</p>
  </div>

  <div
    v-else-if="recipeStore.sortedRecipes.length > 0"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    <!-- Render RecipeCard for each recipe -->
    <RecipeCard v-for="recipe in recipeStore.sortedRecipes" :key="recipe.id" :recipe="recipe" />
  </div>

  <div v-else class="text-center mt-12">
    <p class="text-gray-600 font-semibold text-lg">No recipes found...</p>
  </div>
</template>
