import { Company } from '../company/company'
import { Product } from '../product/products'

export interface Quote {
  id: number
  company: Company
  products: Product[]
}
