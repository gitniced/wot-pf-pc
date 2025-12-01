interface ILabel<T> {
    label: string
    value: T
}

interface IItem<T> {
    label: string
    key: T
}

export const enumToLabel = <K extends string | number>(
    obj: Record<K, string>,
    options?: {
        number?: boolean
        order?: K[]
        exclude?: K[]
    },
): ILabel<K>[] => {
    const { number = false, order, exclude } = options || {}

    const entries = order ? order.map(key => [key, obj[key]]) : Object.entries(obj)

    return entries
        .filter(item => !exclude?.includes(item[0] as K))
        .map(([key, value]) => {
            return {
                label: value,
                value: number ? (Number(key) as K) : (key as K),
            } as ILabel<K>
        })
}

export const enumToItem = <K extends string>(obj: Record<K, string>): IItem<K>[] => {
    return Object.entries(obj).map(([key, value]) => {
        return {
            label: value,
            key: key as K,
        } as IItem<K>
    })
}
