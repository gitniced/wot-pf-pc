import dayjs from 'dayjs'
import { bankMapKey } from './transFromToRequest'
import { arrParamsStep } from './fromConfig'

// 剔除空字段 "" undefined null 0
export const deleteObjectEmptyKey = (params: Record<string, any>) => {
    for (const k in params) {
        if (!params[k] /* && typeof params[k] !== 'number' */) delete params[k]
    }
}

// arr keys 转成成object
export const arrKeysToObject = (params: Record<string, any>, keys: string[], key: string) => {
    let arr: any[] = []
    keys.forEach(i => {
        if (params[i]) {
            arr.push(params[i])
            delete params[i]
        }
    })
    if (arr.length) {
        params[key] = arr
    }
}

// 把字段转换成 file对象
export const objKeyToFile = (params: Record<string, any>, key: string, bankId: string) => {
    if (params[key]) {
        params[key] = [
            {
                url: params[key],
                uid: params[key],
                status: 'done',
                name: 'xx.png',
                [bankMapKey]: params[bankId],
            },
        ]
    }
}

/* 
    将一个数组的keys 转换成 组件使用的file对象
 */
export const arrKeysToFile = (
    params: Record<string, any>,
    keys: string[],
    key: string,
    bankIds: string[],
) => {
    const arr: any[] = []
    keys.forEach((i, index) => {
        if (params[i]) {
            arr.push({
                url: params[i],
                uid: params[i],
                status: 'done',
                name: 'xx.png',
                [bankMapKey]: params[bankIds[index]],
            })
            delete params[i]
        }
    })
    arr.length && (params[key] = arr)
}

// 时间戳转成dayjs对象
export const timeToDayJs = (params: Record<string, any>, keys: string[], key: string) => {
    if (keys.every(i => params[i])) {
        let arr: any[] = []
        keys.forEach(i => {
            if (params[i]) {
                arr.push(dayjs(params[i]))
                delete params[i]
            }
        })
        params[key] = arr
    }
}

function transFromResponse(params: Record<string, any>) {
    deleteObjectEmptyKey(params) // 去除无用的字段
    timeToDayJs(params, ['orgCodeEffect', 'orgCodeExpiration'], 'orgCodeEffect')
    timeToDayJs(params, ['taxCodeEffect', 'taxCodeExpiration'], 'taxCodeEffect')
    timeToDayJs(
        params,
        ['nativeIdentityEffect', 'nativeIdentityExpiration'],
        'nativeIdentityEffect',
    )
    objKeyToFile(params, 'bizLicensePic', 'bizLicensePicField') // 营业执照字段转换
    arrKeysToFile(params, ['legalIdentityPicFront', 'legalIdentityPicBack'], 'legalIdentity', [
        'legalIdentityPicFrontField',
        'legalIdentityPicBackField',
    ]) // 身份证字段转换
    arrKeysToFile(
        params,
        ['beneficiaryIdentityPicFront', 'beneficiaryIdentityPicBack'],
        'beneficiaryIdentity',
        ['beneficiaryIdentityPicFrontField', 'beneficiaryIdentityPicBackField'],
    )
    arrKeysToFile(
        params,
        ['bizPlacePic1', 'bizPlacePic2', 'bizPlacePic3', 'bizPlacePic4', 'bizPlacePic5'],
        'bizPlacePic',
        [
            'bizPlacePicField1',
            'bizPlacePicField2',
            'bizPlacePicField3',
            'bizPlacePicField4',
            'bizPlacePicField5',
        ],
    ) // 经验场所照片
    arrKeysToObject(params, ['province', 'city', 'zone'], 'citys') // 城市
    arrKeysToObject(params, ['openingBankProvince', 'openingBankCity'], 'openingBankAddress') //结算账户所在地
    // params =
    return { ...params, ...arrParamsStep(params.merchantNativeInfoList || []) }
}

export { transFromResponse }
