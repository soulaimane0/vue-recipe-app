export interface RecipeI {
  id: string
  name: string
  description: string
  ingredients: string[]
  instructions: string
  status: 'pending' | 'done'
  image: string
  createdAt: string
}
