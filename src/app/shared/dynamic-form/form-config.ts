import { ValidatorFn, FormGroup, FormArray } from '@angular/forms'

export interface ControlConfig {
  name: string
  type: ControlConfigType
  label: string
  value?: any
  disabled?: boolean
  controlClass?: string
  controlValidators: { key: string; message: string; validator: ValidatorFn }[]
}

export interface FormConfig {
  header: string
  formGroup?: FormGroup
  formControls?: ControlConfig[]
  formArray?: FormArray
  formArrayName?: string
  formArrayControls?: FormConfig[]
}

export const TEXT_CONTROL = 'text'
export const DROPDOWN_CONTROL = 'dropdown'
export const TEXT_AREA_CONTROL = 'textArea'

export type ControlConfigType = 'text' | 'dropdown' | 'textArea'
