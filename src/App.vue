<script setup lang="ts">
import { onMounted } from 'vue';
import { useRecipeStore } from '@/stores/recipes';
import Navbar from '@/components/Navbar.vue';

const recipeStore = useRecipeStore();

// Fetch recipes from the API after the component is mounted
onMounted(() => {
  recipeStore.fetchRecipes();
});
</script>

<template>
  <Navbar />

  <RouterView />
</template>
