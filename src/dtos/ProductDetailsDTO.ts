export interface ProductDetailsDTO {
  id: string
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  is_active: boolean
  product_images: {
    id: string
    path: string
  }[]
  payment_methods: string[]
  user: {
    avatar: string
    name: string
  }
}
