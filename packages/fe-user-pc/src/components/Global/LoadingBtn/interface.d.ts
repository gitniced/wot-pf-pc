export interface PropsType {
    label?: string
    method: 'get' | 'post' | 'GET' | 'POST'
    url: string
    config?: object
    getParams?: () => object
    callback?: (res: unknown) => void
    form: any
}
