declare module '*.css'
declare module '*.less'
declare module '*.png'
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
// oss 统一管理别名 只读
declare const __ALIAS__: Readonly<Record<string, string>>
