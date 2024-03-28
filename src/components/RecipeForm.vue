<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRecipeStore } from '@/stores/recipes';
import { useRouter } from 'vue-router';
import type { RecipeI } from '@/types/recipe';

// Define a new interface for form data
interface FormData {
  image: string;
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
}

// Access recipe store and router
const recipeStore = useRecipeStore();
const router = useRouter();

// Define reactive form data object
const formData = reactive<FormData>({
  image: '',
  name: '',
  description: '',
  ingredients: '',
  instructions: ''
});

// Computed property to determine if the form is invalid
const isFormInvalid = computed(() => {
  return Object.values(formData).some((value) => !value);
});

// Function to handle image upload
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = (target.files as FileList)[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      formData.image = reader.result as string;
    };
  }
};

// Function to handle form submission
const handleFormSubmit = async () => {
  try {
    const ingredients: string[] = formData.ingredients
      .split('\n')
      .map((ingredient: string) => ingredient.trim());

    const newRecipe: RecipeI = {
      id: Date.now().toString(),
      ...formData,
      ingredients,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    await recipeStore.addRecipe(newRecipe);

    // Reset form data
    resetForm();
    router.push({ name: 'home' });
  } catch (error) {
    console.error('Error adding recipe:', error);
  }
};

// Function to reset form data
const resetForm = () => {
  Object.assign(formData, {
    image: '',
    name: '',
    description: '',
    ingredients: '',
    instructions: ''
  });
};
</script>

<template>
  <form @submit.prevent="handleFormSubmit" class="grid grid-cols-12 gap-4">
    <div class="col-span-12 md:col-span-6">
      <!-- Recipe image upload -->
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-900" for="recipe_image"
          >Upload image</label
        >
        <input
          class="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:py-2 file:px-3 file:border-none file:bg-violet-500 file:text-white hover:file:cursor-pointer hover:file:bg-violet-600 transition-all"
          id="recipe_image"
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          required
        />
      </div>

      <!-- Recipe name -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name"> Name </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter recipe name"
          required
          v-model="formData.name"
        />
      </div>

      <!-- Recipe description -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
          Description
        </label>
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Enter recipe description"
          rows="6"
          required
          v-model="formData.description"
        ></textarea>
      </div>
    </div>

    <div class="col-span-12 md:col-span-6">
      <!-- Recipe ingredients -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="ingredients">
          Ingredients
        </label>
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="ingredients"
          placeholder="Enter recipe ingredients"
          rows="6"
          required
          v-model="formData.ingredients"
        ></textarea>
      </div>

      <!-- Recipe instructions -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="instructions">
          Instructions
        </label>
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="instructions"
          placeholder="Enter recipe instructions"
          rows="6"
          required
          v-model="formData.instructions"
        ></textarea>
      </div>

      <!-- Recipe submit action -->
      <div class="flex justify-end">
        <button
          :class="`bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline
          ${isFormInvalid || recipeStore.isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          `"
          type="submit"
          :disabled="isFormInvalid || recipeStore.isLoading"
        >
          {{ recipeStore.isLoading ? 'Creating Recipe...' : 'Create Recipe' }}
        </button>
      </div>
    </div>
  </form>
</template>
