import { globalRuls, globalRulsNotWhitespace, menberNo } from './fromConfig'
import { DatePicker } from '@/components/Global/Picker'
import MccCasecader from './../MccCasecader'

const { RangePicker } = DatePicker

export const baseFromList = [
    {
        type: 'miniTitle',
        label: '商户基本信息',
        key: 'miniTitle-1',
    },
    {
        key: 'name',
        label: '商户名称',
        type: 'input',
        props: {
            placeholder: '请输入',
            maxLength: 64,
        },
        rules: [...globalRuls],
    },
    {
        key: 'shortName',
        label: '商户简称',
        type: 'input',
        props: {
            placeholder: '请输入',
            maxLength: 16,
        },
        rules: [...globalRuls],
    },
    {
        key: 'bizType',
        label: '经营分类',
        type: 'select',
        valueEnum: [
            {
                value: 1,
                label: '实体商户',
            },
            {
                value: 2,
                label: '网络商户',
            },
            {
                value: 3,
                label: '实体兼网络商户',
            },
        ],
        props: {
            placeholder: '请选择',
        },

        rules: [...globalRulsNotWhitespace],
    },
    {
        key: 'identityType',
        label: '证件类型',
        type: 'select',
        valueEnum: [
            {
                value: 1,
                label: '营业执照注册号（非三证合一）',
            },
            {
                value: 2,
                label: '统一社会信用代码（三证合一证件）',
            },
            {
                value: 3,
                label: '事业单位事业证',
            },
            {
                value: 4,
                label: '个体户注册号',
            },
            {
                value: 5,
                label: '社会团队社会号',
            },
        ],
        props: {
            placeholder: '请选择',
        },
        rules: [...globalRulsNotWhitespace],
    },
    {
        key: 'identityNo',
        label: '证件号码',
        type: 'input',
        props: {
            placeholder: '请输入',
            maxLength: 64,
        },
        rules: [...globalRuls],
    },
] as const

export const midFromJson = [
    {
        type: 'miniTitle',
        label: '商户附加信息',
        key: 'miniTitle-2',
    },
    {
        key: 'citys',
        label: '地址',
        type: 'cascader',
        props: {
            type: 'area',
            placeholder: '请选择',
        },
        rules: [...globalRulsNotWhitespace],
    },
    {
        key: 'addressDetail',
        label: '详细地址',
        type: 'input',
        props: {
            placeholder: '请输入',
            maxLength: 64,
        },
        rules: [...globalRuls],
    },
    {
        key: 'mchtPhone',
        label: '联系电话',
        type: 'input',
        props: {
            placeholder: '请输入',
            maxLength: 11,
        },
        rules: [...globalRuls, ...menberNo],
    },
    {
        key: 'mccCode',
        label: '行业类别',
        type: 'input',
        props: {
            placeholder: '请输入',
            maxLength: 64,
        },
        rules: [...globalRulsNotWhitespace],
        formItemRender() {
            return <MccCasecader />
        },
    },
    {
        key: 'crossBorder',
        label: '是否跨境电商',
        type: 'radio',
        valueEnum: [
            {
                value: '1',
                label: '是',
            },
            {
                value: '0',
                label: '否',
            },
        ],
        rules: [...globalRulsNotWhitespace],
    },
    {
        type: 'miniTitle',
        label: '商户自然人信息',
        key: 'miniTitle-3',
    },
    {
        type: 'miniTitle-4',
        label: '法人代表',
        key: 'miniTitle-4F',
    },

    {
        key: 'nativeName_juridical',
        label: '姓名',
        type: 'input',
        props: {
            placeholder: '请输入',
            maxLength: 64,
        },
        rules: [...globalRuls],
    },
    {
        key: 'nativeIdentityType_juridical',
        label: '证件类型',
        type: 'select',
        valueEnum: [
            {
                value: 1,
                label: '身份证',
            },
            {
                value: 2,
                label: '军官证',
            },
            {
                value: 3,
                label: '护照',
            },
            {
                value: 4,
                label: '户口簿',
            },
            {
                value: 5,
                label: '士兵证',
            },
            {
                value: 6,
                label: '港澳来往内地通行证',
            },
            {
                value: 7,
                label: '台湾同胞来往内地通行证',
            },
            {
                value: 8,
                label: '临时身份证',
            },
            {
                value: 9,
                label: '外国人居留证',
            },
            {
                value: 10,
                label: '警官证',
            },
            {
                value: 11,
                label: '其他',
            },
        ],
        props: {
            placeholder: '请选择',
        },
        rules: [...globalRulsNotWhitespace],
    },
    {
        key: 'nativeIdentityNo_juridical',
        label: '证件号码',
        type: 'input',
        props: {
            placeholder: '请输入',
            maxLength: 64,
        },
        rules: [...globalRuls],
    },
    {
        key: 'nativeIdentityEffect_juridical',
        label: '证件有效期',
        rules: [...globalRulsNotWhitespace],
        formItemRender() {
            return <RangePicker />
        },
    },
    {
        key: 'nativePhone_juridical',
        label: '联系电话',
        type: 'input',
        props: {
            placeholder: '请输入',
            maxLength: 11,
        },
        rules: [...globalRuls, ...menberNo],
    },
] as const

type getFormListMap<T extends Readonly<any[]>, L extends unknown[] = []> = T extends Readonly<
    [infer First, ...infer Rest]
>
    ? 'key' extends keyof First
        ? getFormListMap<Rest, [...L, First['key']]>
        : false
    : L[number]

type getLinkTypeFn<T> = {
    [key in T as key extends string ? `${key}OnChange` : '']: (v: any) => void
}
type GeneratorMap<T extends Readonly<any[]>> = getLinkTypeFn<getFormListMap<T>>

type MoveReadOnly<T> = {
    -readonly [key in keyof T]: T[key]
}

type baseFromListMapType = GeneratorMap<typeof baseFromList>
type midFromListMapType = GeneratorMap<typeof midFromJson>

export const getFromJsonBaseFunction = <T extends Record<string, (v: any) => void>>(
    json: any[],
    params?: Partial<T>,
) => {
    return json?.map((item: any) => {
        return {
            ...item,
            props: {
                ...item.props,
                onChange(v: any) {
                    params?.[`${item.key}OnChange` as keyof T]?.(v)
                },
            },
        }
    })
}

export const getMidFromJson = (params?: Partial<midFromListMapType>) =>
    getFromJsonBaseFunction(midFromJson as MoveReadOnly<typeof midFromJson>, params)

export const getBaseFromJson = (params?: Partial<baseFromListMapType>) =>
    getFromJsonBaseFunction(baseFromList as MoveReadOnly<typeof baseFromList>, params)
