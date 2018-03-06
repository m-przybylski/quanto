import { Company } from '../company/company'
import { Product, Currency } from '../product/products'

export interface Quote {
  id: number
  company: Company
  created: Date
  expiration: Date
  preparedBy: string
  client: Client
  currency: Currency
  products: { product: Product; quantity: number }[]
}

export interface Client {
  name: string
  ship: ClientInfo
  bill: ClientInfo
}

export interface ClientInfo {
  name: string
  contanctName: string
  contanctEmail: string
  contanctAddress: string
  city: string
  postalCode: string
  country: string
}
