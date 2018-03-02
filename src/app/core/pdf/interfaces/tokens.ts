import { InjectionToken } from '@angular/core'
import { JSPDFConfig } from './js-pdf-config'

export const PDFConfig = new InjectionToken<JSPDFConfig>(
  'PDF Configuration injected from module',
)
