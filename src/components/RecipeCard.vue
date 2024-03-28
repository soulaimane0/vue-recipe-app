<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipes';
import type { RecipeI } from '@/types';

// Define props
defineProps({
  recipe: {
    type: Object as () => RecipeI,
    required: true
  }
});

// Access recipe store
const recipeStore = useRecipeStore();
</script>

<template>
  <!-- Recipe card container -->
  <div
    :class="`${recipe.status === 'done' ? 'bg-green-100' : 'bg-blue-100'} shadow-md rounded-lg overflow-hidden`"
  >
    <!-- Recipe image and status -->
    <div class="relative">
      <img class="w-full h-56 object-cover object-center" :src="recipe.image" alt="recipe image" />

      <!-- Display recipe status -->
      <div class="absolute top-2 left-2">
        <span
          v-if="recipe.status === 'done'"
          class="bg-green-500 text-white px-2 py-1 rounded-full"
        >
          Done
        </span>
        <span v-else class="bg-blue-500 text-white px-2 py-1 rounded-full"> Pending </span>
      </div>
    </div>

    <!-- Recipe details -->
    <div class="p-4">
      <!-- Recipe name -->
      <h2 class="text-xl font-semibold text-gray-800" :title="recipe.name">
        {{ recipe.name.length > 25 ? `${recipe.name.substring(0, 25)}...` : recipe.name }}
      </h2>

      <!-- Recipe description -->
      <p class="text-gray-600" :title="recipe.description">
        {{
          recipe.description.length > 50
            ? `${recipe.description.substring(0, 50)}...`
            : recipe.description
        }}
      </p>

      <!-- View Recipe link -->
      <div class="mt-4 flex justify-between">
        <RouterLink
          :to="`/recipes/${recipe.id}`"
          class="font-semibold text-violet-500 hover:text-violet-600 hover:underline transition-all"
        >
          View Recipe
        </RouterLink>

        <!-- Recipe status toggle -->
        <label class="inline-flex items-center mb-5 cursor-pointer">
          <input
            type="checkbox"
            class="sr-only peer"
            :checked="recipe.status === 'done' ? true : false"
            @change="recipeStore.toggleRecipeStatus(recipe.id)"
          />
          <div
            class="relative w-9 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"
          ></div>
          <span class="ms-2 text-sm font-medium text-gray-900">
            {{ recipe.status === 'done' ? 'Done' : 'Pending' }}
          </span>
        </label>
      </div>
    </div>
  </div>
</template>
