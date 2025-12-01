import { timeToDayJs } from './transFormUtil'

export const nameList = [
    'nativeName',
    'nativeIdentityType',
    'nativeIdentityNo',
    'nativeIdentityEffect',
    'sameLegal',
    'account',
    'nativePhone',
    'nativeAddress',
]
export const mapingBem: Record<string, any> = {
    '1': 'juridical',
    '2': 'merchant',
    '3': 'handling',
    '6': 'vocational',
    A: 'administrators',
    '4': 'profitPeople',
}

// 全局校验去除空格
export const globalRuls = [{ required: true, message: '这个是必填的', whitespace: true }]
//全局校验包含空格
export const globalRulsNotWhitespace = [{ required: true, message: '这个是必填的' }]

export const menberNo = [
    { pattern: /(^(1)\d{10}$)|(^0\d{2,3}-?\d{7,8}$)/, message: '请输入正确的手机号' },
]

// 拼接单个的bem前缀
export const getOnceBem = (name: string, bem: string) => {
    return `${name}_${bem}`
}

// 获取和前缀拼接后的名称
export const getPreName = (name: string) => {
    return nameList.map(k => getOnceBem(k, name))
}

// 剥离 后缀
export const peelBem = (key: string) => {
    return key.split('_')[0]
}

// 剥离对象的后缀
export const peelObjectBem = params => {
    const newObj: Record<string, unknown> = {}
    for (const k in params) {
        newObj[peelBem(k)] = params[k]
    }
    return newObj
}

// 拼接一个bem的后缀
export const getJoinOnceBem = (key, type) => {
    return `${key}_${mapingBem[type]}`
}

// 拼接后缀
export const getJoinBem = params => {
    timeToDayJs(
        params,
        ['nativeIdentityEffect', 'nativeIdentityExpiration'],
        'nativeIdentityEffect',
    )
    const newObj: Record<string, any> = {}
    for (const k in params) {
        if (nameList.includes(k)) {
            newObj[getJoinOnceBem(k, params.nativeType)] = params[k]
        }
    }
    return newObj
}

// 对数组的 arrkey 进行拼接
export const arrParamsStep = (arr: Record<string, unknown>[]) => {
    let newObj: Record<string, any> = {}
    arr.forEach(i => {
        newObj = Object.assign(newObj, getJoinBem(i))
    })
    return newObj
}

// 获取bem拼接后的对象 支持ignore 跳过
export const getBemEmptyObj = (key: string, ignore?: string[]) => {
    const newObj: Record<string, any> = {}
    nameList
        .filter(i => !ignore?.includes(i))
        .forEach(i => {
            newObj[getOnceBem(i, key)] = undefined
        })
    return newObj
}

// 获取bem 拼接后的array
export const getBemObjKeyToArr = (key: string) => {
    const newArr = []
    for (let k in mapingBem) {
        newArr.push(getOnceBem(key, mapingBem[k]))
    }
    return newArr
}

// 获取全部的bem
export const getAllBemKey = () => {
    const newArr: string[] = []
    nameList.forEach(i => {
        newArr.push(...getBemObjKeyToArr(i))
    })
    return newArr
}
