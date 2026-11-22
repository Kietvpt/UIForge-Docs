/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const MDXContent: ComponentType<{ components?: Record<string, ComponentType<any>> }>
  export default MDXContent
}

declare module '@kietvpt/uiforge-core' {
  import type { ComponentType, ReactNode } from 'react'

  export interface ComponentNode {
    id: string
    type: string
    parentId: string | null
    pageId: string
    order: number
    props: Record<string, any>
    style: Record<string, any>
    events: any[]
    children?: ComponentNode[]
    dataBinding?: Record<string, any>
    validation?: Record<string, any>
    permissions?: Record<string, any>
  }

  export const ComponentRenderer: ComponentType<any>
  export const EnterpriseSelect: ComponentType<any>
  export const EnterpriseDatePicker: ComponentType<any>
  export const ForgeFormContainer: ComponentType<any>
  export const ForgeAdvancedGrid: ComponentType<any>
  export const ForgeTabs: ComponentType<any>
  export const ForgeTabStack: ComponentType<any>
  export const ForgeSearchModal: ComponentType<any>
  export const UIForgeApp: ComponentType<any>
  export const PermissionGuard: ComponentType<{ node: ComponentNode; children: ReactNode; isEditing?: boolean }>
  export const useDataEngine: any
  export const usePermissionEngine: any
  export const useNavigationEngine: any
  export const useRealtimeEngine: any
  export const setApiBaseUrl: (url: string) => void
}
