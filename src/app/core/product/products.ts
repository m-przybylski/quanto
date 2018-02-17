export interface Product {
  id?: string
  sku: string
  name: string
  price: Price[]
  description: string
  customFields?: { [key: string]: any }
  category: string
}

export interface Price {
  currency: Currency
  price: number
}

export type Currency = 'USD' | 'EUR'

export interface ProductCategory {
  id?: string
  name: string
  description: string
}
