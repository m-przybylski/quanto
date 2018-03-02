import { pageFormats } from './page-format'

export interface JSPDFConfig {
  orientation: 'portrait' | 'landscape' | 'p' | 'l'
  unit: 'pt' | 'mm' | 'cm' | 'in'
  format: pageFormats
  compressPdf: boolean
}
