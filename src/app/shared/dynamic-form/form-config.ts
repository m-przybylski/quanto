import { ValidatorFn, FormGroup } from '@angular/forms'

export interface ControlConfig {
  name: string
  type: ControlConfigType
  label: string
  value?: any
  controlClass?: string
  controlValidators: { key: string; message: string; validator: ValidatorFn }[]
}

export interface FormConfig {
  header: string
  formGroup?: FormGroup
  formControls: ControlConfig[]
}

export const TEXT_CONTROL = 'text'
export const DROPDOWN_CONTROL = 'dropdown'
export const TEXT_AREA_CONTROL = 'textArea'

export type ControlConfigType = 'text' | 'dropdown' | 'textArea'
