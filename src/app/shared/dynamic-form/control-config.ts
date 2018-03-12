export interface ControlConfig {
  name: string
  type: ControlConfigType
  label: string
  controlValidators: { key: string; message: string }[]
}

export type ControlConfigType = 'text' | 'dropdown' | 'textArea'
