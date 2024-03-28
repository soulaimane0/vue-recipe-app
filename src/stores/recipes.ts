import { defineStore } from 'pinia';
import type { RecipeI } from '@/types/index';

// Define API URL
const API_URL = 'http://localhost:3000/recipes';

// Define store
interface State {
  recipes: RecipeI[];
  originalRecipes: RecipeI[];
  loading: boolean;
  errMsg: string;
}

export const useRecipeStore = defineStore('recipe-store', {
  state: (): State => ({
    recipes: [],
    originalRecipes: [],
    loading: true,
    errMsg: ''
  }),

  getters: {
    // Getter to retrieve sorted recipes by creation date
    sortedRecipes(): RecipeI[] {
      return this.recipes.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    isLoading(): boolean {
      return this.loading;
    }
  },

  actions: {
    // Action to fetch recipes from the API
    async fetchRecipes() {
      try {
        const response = await fetch(API_URL);
        const recipes = await response.json();
        this.setRecipes(recipes);
      } catch (error) {
        this.setError('Failed to fetch recipes. Please try again later.');
        console.error(error);
      } finally {
        this.setLoading(false);
      }
    },

    // Action to set recipes in the store
    setRecipes(recipes: RecipeI[]) {
      this.recipes = recipes;
      this.originalRecipes = recipes;
    },

    // Action to get a recipe by ID
    getRecipeById(id: string): RecipeI | undefined {
      return this.originalRecipes.find((recipe) => recipe.id === id);
    },

    // Action to filter recipes by status
    filterRecipesByStatus(status: string) {
      if (status === 'all') {
        this.recipes = this.originalRecipes;
      } else {
        this.recipes = this.originalRecipes.filter((recipe) => recipe.status === status);
      }
    },

    // Action to search recipes by name or description
    searchRecipes(searchTerm: string) {
      this.recipes = this.originalRecipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },

    // Action to add a new recipe
    async addRecipe(recipe: RecipeI) {
      try {
        this.setLoading(true);
        this.recipes.push(recipe);

        // Simulate delay to show loading state
        await new Promise((resolve) => setTimeout(resolve, 1000));

        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recipe)
        });
      } catch (error) {
        this.setError('Failed to add recipe. Please try again later.');
        console.error(error);
      } finally {
        this.setLoading(false);
      }
    },

    // Action to toggle recipe status (pending/done)
    async toggleRecipeStatus(id: string) {
      const recipe = this.recipes.find((recipe) => recipe.id === id);
      if (!recipe) return;

      recipe.status = recipe.status === 'pending' ? 'done' : 'pending';

      try {
        await fetch(`${API_URL}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: recipe.status })
        });
      } catch (error) {
        this.setError('Failed to update recipe status. Please try again later.');
        console.error(error);
      }
    },

    // Helper action to set loading state
    setLoading(loading: boolean) {
      this.loading = loading;
    },

    // Helper action to set error message
    setError(message: string) {
      this.errMsg = message;
    }
  }
});
