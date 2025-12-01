import { getPreName, getOnceBem, peelObjectBem } from './fromConfig'
import { isEmpty } from 'lodash'
/** 自然人类型  */
export const NATICETYPE = {
    /** 法人代表 */
    LEGAL: '1',
    /** 商户负责人 */
    MERCHANT_RESPONSIBLE: '2',
    /** 授权经办人 */
    AUTHORIZED: '3',
    /** 业务联系人 */
    BUS_CONTACT: '6',
    /** 商户管理员 */
    MERCHANT_MANAGE: 'A',
    /** 受益人 */
    BENEFICIAY: '4',
}
const bankMapKey = 'bankId'

// 统一的时间的key
const timeKey = 'nativeIdentityEffect'
// 统一的时间 转换成的字段
const transFromTimeKe = ['nativeIdentityEffect', 'nativeIdentityExpiration']

// 处理时间数据
const dayjstransFrom = (obj: Record<string, any>, key: string, tarnsArr: string[]) => {
    if (obj[key]) {
        let templateData = obj[key]
        delete obj[key]
        obj[tarnsArr[0]] = +templateData[0]?.startOf().format('x')
        obj[tarnsArr[1]] = +templateData[1]?.endOf().format('x')
    }
}

const getFileFirstPath = (obj: Record<string, any>, key: string, bankKey: string) => {
    if (obj[key]) {
        obj[bankKey] = obj[key]?.[0]?.response?.[bankMapKey] || obj[key]?.[0]?.[bankMapKey]
        obj[key] = obj[key]?.[0]?.response?.url || obj[key]?.[0]?.url
    }
}

// 把数组file  映射到具体字段 file
const arrToObjKeyBeyFile = (
    obj: Record<string, unknown>,
    key: string,
    keys: string[],
    bankKey: string[],
) => {
    const source = obj[key]
    if (source && Array.isArray(source)) {
        source.forEach((i, index) => {
            obj[keys[index]] = source[index]?.response?.url || source[index]?.url
            obj[bankKey[index]] =
                source[index]?.response?.[bankMapKey] || source[index]?.[bankMapKey] // 银行文件id 字段存储
        })
        delete obj[key]
    }
}

// 把key 映射对应的数组字段
const arrToObjKey = (obj: Record<string, unknown>, key: string, keys: string[]) => {
    const source = obj[key]
    if (source && Array.isArray(source)) {
        source.forEach((i, index) => {
            obj[keys[index]] = source[index]
        })
        delete obj[key]
    }
}

// 取出对象中的n个元素
const getArrByObjValue = (params: Record<string, unknown>, keys: string[]) => {
    const newObj: Record<string, any> = {}
    keys.forEach(i => {
        if (params[i] || typeof params[i] === 'number') {
            newObj[i] = params[i]
            delete params[i]
        } else {
            newObj[i] = null
        }
    })
    return newObj
}

// 获取当前字段的自然人信息并对齐进行处理
const getSelfNativeData = (
    params: Record<string, unknown>,
    key: string,
    type: string | number,
    rest: Record<string, unknown>,
) => {
    const obj = getArrByObjValue(params, getPreName(key))
    // obj 数据处理
    dayjstransFrom(obj, getOnceBem(timeKey, key), transFromTimeKe)
    obj.nativeType = type
    return { ...obj, ...rest }
}

// 删除特定字段为0
const moveZero = (params: Record<string, unknown>, keys: string[]) => {
    keys.forEach(i => {
        if (params[i] === 0) {
            delete params[i]
        }
    })
    return params
}

// 剥离后缀
const peelParamsKey = (
    params: Record<string, unknown>,
    key: string,
    type: string | number,
    rest: Record<string, unknown>,
) => {
    // 没有数据就直接返回
    if (!Object.keys(params).length) return
    const native = getSelfNativeData(params, key, type, rest)
    const keys = peelObjectBem(native)
    return moveZero(keys, ['nativeIdentityType'])
}

// 转换数据丢给接口
const getNativeFinshData = (params: Record<string, any>, rest?: Record<string, unknown>) => {
    console.log('getNativeFinshData => params: ', params)
    if (!Array.isArray(params.nativePersons)) {
        params.nativePersons = []
    }
    // 法人
    params.nativePersons.push(
        peelParamsKey(params, 'juridical', 1, {
            ...rest,
        }),
    )
    let sameLegal_profitPeople = params.sameLegal_profitPeople
    // 受益人
    if (params.isProfitPeople === '1') {
        params.nativePersons.push(
            peelParamsKey(params, 'profitPeople', 4, {
                ...rest,
            }),
        )
    }
    params.sameLegal_profitPeople = sameLegal_profitPeople
    // 商户负责人
    params.nativePersons.push({
        sameLegal: '1',
        nativeType: NATICETYPE.MERCHANT_RESPONSIBLE,
    })
    // 授权经办人
    params.nativePersons.push({
        sameLegal: '1',
        nativeType: NATICETYPE.AUTHORIZED,
    })
    // 业务联系人
    params.nativePersons.push({
        sameLegal: '1',
        nativeType: NATICETYPE.BUS_CONTACT,
        nativePhone: params.nativePhone_vocational,
    })
    // 商户管理员
    params.nativePersons.push({
        sameLegal: '1',
        nativeType: NATICETYPE.MERCHANT_MANAGE,
        nativePhone: params.nativePhone_vocational,
    })
    //  回填code merchantCode
    params.nativePersons.forEach(item => {
        const target =
            params?.merchantNativeInfoList?.find(native => {
                return String(native.nativeType) === String(item.nativeType)
            }) || {}
        if (!isEmpty(target)) {
            item.code = target.code
            item.merchantCode = target.merchantCode
        }
    })
    delete params.merchantNativeInfoList
}

const moveKeys = (params: Record<string, any>, keys: string[]) => {
    keys.forEach(i => {
        if (i in params) {
            delete params[i]
        }
    })
}

export {
    bankMapKey,
    dayjstransFrom,
    getFileFirstPath,
    arrToObjKeyBeyFile,
    arrToObjKey,
    getArrByObjValue,
    getSelfNativeData,
    moveZero,
    peelParamsKey,
    getNativeFinshData,
    moveKeys,
}
