<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRecipeStore } from '@/stores/recipes';
import { useRoute, useRouter } from 'vue-router';
import type { RecipeI } from '@/types/recipe';

// Access recipe store and router
const recipeStore = useRecipeStore();
const route = useRoute();
const router = useRouter();

// Define a reactive reference for the recipe
const recipe = ref<RecipeI | null>(null);

// Watch for changes in the route parameters
watchEffect(() => {
  const recipeId = route.params.id as string;
  const fetchedRecipe = recipeStore.getRecipeById(recipeId);

  if (!fetchedRecipe) {
    router.push({ name: 'not-found' }); // Redirect to not-found page if recipe not found
  } else {
    recipe.value = fetchedRecipe; // Set the fetched recipe
  }
});
</script>

<template>
  <section class="mx-auto w-full px-2.5 md:px-20 max-w-screen-xl">
    <div v-if="recipe" class="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
      <!-- Recipe details -->
      <div>
        <h1 class="text-gray-900 font-bold text-2xl">{{ recipe.name }}</h1>
        <p class="text-gray-600 mt-2">{{ recipe.description }}</p>
        <div class="flex items-center mt-4 text-xs">
          <span class="text-gray-500"
            >Created on {{ new Date(recipe.createdAt).toLocaleDateString() }}</span
          >
          <p class="text-gray-500 ml-4">
            Status:
            <span :class="recipe.status === 'pending' ? 'text-blue-500' : 'text-green-500'">{{
              recipe.status
            }}</span>
          </p>
        </div>

        <!-- Ingredients -->
        <div class="mt-6">
          <h2 class="text-gray-900 font-bold text-lg">Ingredients</h2>
          <ul class="list-disc list-inside mt-2">
            <li v-for="ingredient in recipe.ingredients" :key="ingredient" class="text-gray-600">
              {{ ingredient === '.' ? null : ingredient }}
            </li>
          </ul>
        </div>

        <!-- Instructions -->
        <div class="mt-6">
          <h2 class="text-gray-900 font-bold text-lg">Instructions</h2>
          <p class="text-gray-600 mt-2" v-html="recipe.instructions.replace(/\n/g, '<br/>')"></p>
        </div>
      </div>
      <div>
        <img :src="recipe.image" alt="Recipe image" class="w-full h-auto rounded-md" />

        <!-- Status section -->
        <div class="mt-6 flex items-center space-x-6">
          <h4 class="text-gray-900 font-bold text-lg">Status:</h4>
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              :checked="recipe.status === 'done' ? true : false"
              @change="recipeStore.toggleRecipeStatus(recipe.id)"
            />
            <div
              class="relative w-9 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"
            ></div>
            <span class="ms-2 font-medium text-gray-900">
              {{ recipe.status === 'done' ? 'Done' : 'Pending' }}
            </span>
          </label>
        </div>
      </div>
    </div>
  </section>
</template>
