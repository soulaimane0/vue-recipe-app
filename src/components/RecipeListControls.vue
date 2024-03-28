<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipes';

const recipeStore = useRecipeStore();
</script>

<template>
  <div class="mx-auto w-full px-2.5 md:px-20 max-w-screen-xl">
    <!-- Search and filter controls -->
    <div class="flex flex-col md:flex-row md:space-y-0 items-center md:space-x-4 mt-8">
      <!-- Search input -->
      <div class="flex-1 order-2 md:order-1 w-full mt-4 md:mt-0">
        <input
          type="search"
          class="block w-full py-2 px-4 text-gray-900 border border-gray-300 rounded-md bg-gray-50 outline-none"
          placeholder="Search Recipes..."
          @input="(e: Event) => recipeStore.searchRecipes((e.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Filter dropdown and Create recipe link -->
      <div
        class="flex space-x-2 w-full md:w-fit justify-between md:justify-start order-1 md:order-2"
      >
        <!-- Filter dropdown -->
        <select
          id="statusFilter"
          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-md block p-2.5"
          @change="
            (e: Event) => recipeStore.filterRecipesByStatus((e.target as HTMLSelectElement).value)
          "
        >
          <option value="all" selected>All</option>
          <option value="done">Done</option>
          <option value="pending">Pending</option>
        </select>

        <!-- Create recipe link -->
        <RouterLink
          to="recipe-create"
          class="block focus:outline-none text-white bg-violet-500 hover:bg-violet-600 focus:ring-1 font-medium rounded-md px-4 py-2 text-nowrap transition-colors"
        >
          Create Recipe
        </RouterLink>
      </div>
    </div>
  </div>
</template>
