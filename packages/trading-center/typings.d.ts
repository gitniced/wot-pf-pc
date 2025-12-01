// typings.d.ts
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.svg' {
    export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
    const url: string
    export default url
}

// 自定义全局变量类型
declare const RUN_ENV: 'dev' | 'test' | 'pre' | 'pro' | 'local'
declare const BUILD_ENV: 'dev' | 'test' | 'pre' | 'pro' | 'local'
declare const ALIAS_ENV: string

declare const self_store: any
declare const defaultImage: string
declare const defaultLogo: string
declare const defaultAvatar: string
declare const defaultOrgLogo: string
declare const less: any

declare const update_page_size: ((pageSize: number) => void) | undefined
