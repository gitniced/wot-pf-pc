declare module '*.css'
declare module '*.less'
declare module '*.png'
declare module '*.svg' {
    export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
    const url: string
    export default url
}
// oss 统一管理别名 只读
declare const __ALIAS__: Readonly<Record<string, string>>
