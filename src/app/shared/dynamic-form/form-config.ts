import { ValidatorFn, FormGroup, FormArray } from '@angular/forms'

/**
 * Config of individual control
 * based on type some information is required
 */
export interface ControlConfig {
  name: string
  type: ControlConfigType
  label: string
  value?: any
  disabled?: boolean
  controlClass?: string
  controlValidators?: { key: string; message: string; validator: ValidatorFn }[]
  options?: any[]
  optionLabel?: string
}

/**
 * Config of whole form. In case of an array provide formArrayControls
 * as template for controls and values as list of key: value parameter
 * key MUST be represented in formArrayControls.formControls.name
 * This helps when array is empty and there is a need to append new value
 */
export interface FormConfig {
  header: string
  formGroup?: FormGroup
  formControls?: ControlConfig[]
  formArray?: FormArray
  formArrayName?: string
  formArrayControls?: FormConfig
  formArrayValues?: { [key: string]: any }[]
}

export const TEXT_CONTROL = 'text'
export const DROPDOWN_CONTROL = 'dropdown'
export const TEXT_AREA_CONTROL = 'textArea'

export type ControlConfigType = 'text' | 'dropdown' | 'textArea'
