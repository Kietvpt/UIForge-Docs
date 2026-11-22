import type { ComponentNode } from '@kietvpt/uiforge-core'
import type { BilingualText } from '@/i18n/translations'

export type ComponentCategory =
  | 'form-inputs'
  | 'layout'
  | 'data-display'
  | 'navigation-overlay'
  | 'media-utility'

export type ControlType = 'text' | 'number' | 'boolean' | 'select'

export interface PlaygroundControl {
  key: string
  label: BilingualText
  type: ControlType
  options?: { value: string; label: string }[]
  min?: number
  max?: number
  step?: number
}

export interface PropDoc {
  name: string
  type: string
  defaultValue?: string
  required?: boolean
  description: BilingualText
}

export interface EventDoc {
  trigger: string
  payload?: string
  description: BilingualText
}

export interface ComponentDocEntry {
  id: string
  slug: string
  name: string
  exportName: string
  componentType?: string
  rendererSupported: boolean
  category: ComponentCategory
  summary: BilingualText
  description: BilingualText
  defaultNode: ComponentNode
  controls: PlaygroundControl[]
  props: PropDoc[]
  events?: EventDoc[]
  notes?: BilingualText[]
  /** Custom render mode for direct-import-only components */
  directMode?:
    | 'EnterpriseSelect'
    | 'EnterpriseDatePicker'
    | 'ForgeFormContainer'
    | 'ForgeAdvancedGrid'
    | 'ForgeTabs'
    | 'ForgeTabStack'
    | 'ForgeSearchModal'
    | 'ForgeCheckbox'
  reactSnippet: string
}

export interface GuideDocEntry {
  slug: string
  section: 'getting-started' | 'engines' | 'backend' | 'maintaining'
  title: BilingualText
  summary: BilingualText
  badge?: string
  keywords?: string[]
}
