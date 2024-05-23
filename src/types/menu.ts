export interface Category {
  category_id: number
  category_name: string
  category_dishes: Dish[]
}
export interface Dish {
  category_id: number
  dish_id: string
  dish_name: string
  dish_price: number
  dish_monthSales: number
  dish_kal: number
  dish_image_url: string
  dish_description: string
  dish_notes: string
  dish_created_at: string
  dish_updated_at: string
  dish_rating: number
  dish_ingredients: Ingredient[]
}
export interface Ingredient {
  name: string
  quantity: number
} 