declare interface Window {
    page_size: number
    opera: any
}
declare const defaultLogo: string
declare const defaultAvatar: string
declare const defaultOrgLogo: string
declare const defaultImage: string
declare const ALIAS_ENV: string
declare const BUILD_ENV: string
declare const RUN_ENV: string

declare interface Window {
    page_size: number
    opera: any
}

type Includes<Arr extends unknown[], FindItem> = Arr extends [infer NowItem, ...infer Rest]
    ? IsEqual<FindItem, NowItem> extends true
        ? true
        : Includes<Rest, FindItem>
    : false

type IsEqual<A, B> = A extends B ? true : false

type result = Includes<[1, 2, 3], 4>

type replaceStr<
    Str extends string,
    M extends string,
    T extends string = '',
> = Str extends `${infer prefix}${M}${infer suffix}` ? `${prefix}${T}${suffix}` : Str

type repalceStrAll<
    Str extends string,
    M extends string,
    T extends string = '',
> = Str extends `${infer prefix}${M}${infer subfix}`
    ? `${prefix}${T}${repalceStrAll<subfix, M, T>}`
    : Str

type a2 = replaceStr<'cqh zjl', 'l', 'n'>

type a3 = repalceStrAll<'cqh lll', 'l', 'j'>

type stringUnion<S extends string> = S extends `${infer F}${infer Rest}`
    ? F | stringUnion<Rest>
    : never

type a4 = stringUnion<'2345'>