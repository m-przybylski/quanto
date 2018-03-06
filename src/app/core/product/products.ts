export interface Product {
  sku: string
  name: string
  price: Price[]
  description: string
  customFields?: { [key: string]: any }
  categories: ProductCategory[]
}

export interface Price {
  currency: Currency
  price: number
}

export type Currency = 'USD' | 'EUR' | 'PLN'

export interface CurrencyDropDown {
  label: string
  value: Currency
}

export interface ProductCategory {
  name: string
  description: string
}
