import { defineStore } from 'pinia'
import { Category } from "@/types/dish";

interface State {
  category: Category[]
}

export const useDishStore = defineStore('dish', {
  state: (): State => ({
    category: [
      {
        category_id: 1,
        category_name: '分类1',
        category_dishes: [
          {
            dish_id: 1,
            category_id: 1,
            dish_name: '番茄炒蛋',
            dish_price: 18,
            dish_monthSales: 100,
            dish_kal: 1100,
            dish_image_url: 'https://img.yzcdn.cn/vant/apple-2.jpg',
            dish_description: '这是一条菜品描述',
            dish_notes: '这是一条备注',
            dish_created_at: '2024-01-01 12:34:52',
            dish_updated_at: '2024-04-01 12:34:52',
            dish_rating: 5,
            dish_steps: [
              { step_description: '这是一条步骤描述', step_img_url: 'https://img.yzcdn.cn/vant/apple-1.jpg' },
            ],
            dish_ingredients: [
              { name: '番茄', quantity: 100 },
              { name: '鸡蛋', quantity: 100 },
            ],
            dish_energy: {
              calories: {
                value: '100',
                unit: '千卡'
              },

              protein: {
                value: '100',
                unit: '克'
              },
              fat: {
                value: '100',
                unit: '克'
              },
              carbs: {
                value: '100',
                unit: '克'
              }
            }
          },
        ],
      },
      {
        category_id: 2,
        category_name: '分类2',
        category_dishes: [
          {
            dish_id: 2,
            category_id: 2,
            dish_name: '番茄炒蛋2',
            dish_price: 18,
            dish_monthSales: 100,
            dish_kal: 1100,
            dish_image_url: 'https://img.yzcdn.cn/vant/apple-1.jpg',
            dish_description: '这是一条菜品描述',
            dish_notes: '这是一条备注',
            dish_created_at: '2024-01-01 12:34:52',
            dish_updated_at: '2024-04-01 12:34:52',
            dish_rating: 5,
            dish_steps: [
              { step_description: '这是一条步骤描述', step_img_url: 'https://img.yzcdn.cn/vant/apple-1.jpg' },
            ],
            dish_ingredients: [
              { name: '番茄', quantity: 100 },
              { name: '鸡蛋', quantity: 100 },
            ],
            dish_energy: {
              calories: {
                value: '100',
                unit: '千卡'
              },

              protein: {
                value: '100',
                unit: '克'
              },
              fat: {
                value: '100',
                unit: '克'
              },
              carbs: {
                value: '100',
                unit: '克'
              }
            }
          },
        ],
      },
      // 添加更多分类和商品
    ]
  }),
  getters: {
    getCategoryList: (state) => state.category, // 获取openid
    getCategoryPickerList: (state) => state.category.map((item: Category) => {
      return {
        value: item.category_id,
        text: item.category_name
      }
    }), // 获取openid
  },
  actions: {
    setCategory(category: Category[]) {
      this.category = category
    },
    getCategoryDishList(category_id: number) {
      return this.category.find(item => item.category_id === category_id)
    }
  },
})