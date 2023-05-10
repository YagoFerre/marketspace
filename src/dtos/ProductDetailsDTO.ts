export interface ProductDetailsDTO {
  id: string
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  is_active: boolean
  payment_methods: {
    key: string
    name: string
  }[]
  product_images: {
    id: string
    path: string
  }[]
  user: {
    avatar: string
    name: string
  }
}
