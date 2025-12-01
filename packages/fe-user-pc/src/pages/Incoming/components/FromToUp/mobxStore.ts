import { makeAutoObservable } from 'mobx'
import { findItem } from '@wotu/wotu-components'
import http from '@/servers/http'
import Api from './api'
import {
    dayjstransFrom,
    getFileFirstPath,
    arrToObjKeyBeyFile,
    arrToObjKey,
    getNativeFinshData,
    moveKeys,
} from './transFromToRequest'
import { getAllBemKey } from './fromConfig'
import { getCookie } from '@/storage'
import { message } from 'antd'

let refCityData: any[] = []

// 字段转换
const transFromParams = (params: Record<string, unknown>, rest?: Record<string, unknown>) => {
    getNativeFinshData(params, rest)

    //机构代码有效期
    dayjstransFrom(params, 'orgCodeEffect', ['orgCodeEffect', 'orgCodeExpiration'])
    //税务登记证有效期
    dayjstransFrom(params, 'taxCodeEffect', ['taxCodeEffect', 'taxCodeExpiration'])
    //证件有效期
    dayjstransFrom(params, 'nativeIdentityEffect', [
        'nativeIdentityEffect',
        'nativeIdentityExpiration',
    ])

    // 营业执照
    getFileFirstPath(params, 'bizLicensePic', 'bizLicensePicField')
    // 场所照片
    arrToObjKeyBeyFile(
        params,
        'bizPlacePic',
        ['bizPlacePic1', 'bizPlacePic2', 'bizPlacePic3', 'bizPlacePic4', 'bizPlacePic5'],
        [
            'bizPlacePicField1',
            'bizPlacePicField2',
            'bizPlacePicField3',
            'bizPlacePicField4',
            'bizPlacePicField5',
        ],
    )
    // 受益人身份证
    if (String(params.sameLegal_profitPeople) === '0' && String(params.isProfitPeople) === '1') {
        arrToObjKeyBeyFile(
            params,
            'beneficiaryIdentity',
            ['beneficiaryIdentityPicFront', 'beneficiaryIdentityPicBack'],
            ['beneficiaryIdentityPicFrontField', 'beneficiaryIdentityPicBackField'],
        )
    }
    delete params.sameLegal_profitPeople
    // 身份证正反面照片
    arrToObjKeyBeyFile(
        params,
        'legalIdentity',
        ['legalIdentityPicFront', 'legalIdentityPicBack'],
        ['legalIdentityPicFrontField', 'legalIdentityPicBackField'],
    )

    // 城市code 字段取出
    arrToObjKey(params, 'citys', ['province', 'city', 'zone'])
    // 开户行所在的 code字段取出
    arrToObjKey(params, 'openingBankAddress', ['openingBankProvince', 'openingBankCity'])
    params.openingBankAddress = refCityData
        .map(i => i.name)
        .slice(0, 2)
        .join('/')
    moveKeys(params, getAllBemKey())
    moveKeys(params, ['bizNo'])
    return params
}

export default class {
    /** 城市数据 */
    public cityData = []
    public stringCityData = []
    /** 进件详情 */
    public detail: any = {}
    /** 用来控制步骤的 第一步填写数据 第二步进行签约 */
    public stepsCurrent: number = 0
    /** 进件的状态码 */
    public selfStatus: number = -1
    /** 资源方 code */
    public merchantOrgCode: string = ''
    /** 选中的城市数据 */
    public selectCityData: any = []
    public selfCode = ''
    public orgCode = ''
    public bizNo = ''
    public mccCodeData: any[] = []
    constructor() {
        makeAutoObservable(this)
        this.getMccData()
    }
    /**
     * 解析mcc编码 此时拿到的是antd的 treepath
     *  用最后一位查找对应的mcc object 然后把对应的mcc编码返回过来
     * @param params
     */
    parseMcc(params: Record<string, any>) {
        if (params.mccCode && Array.isArray(params.mccCode)) {
            params.mccCode = findItem(
                this.mccCodeData,
                item => {
                    return item.id === params.mccCode.at(-1)
                },
                { findKey: 'childCategory' },
            ).mccCode
        }
    }
    /**
     *  获取对应的机构code
     * @returns
     */
    getOrgOrgCode() {
        return new Promise((resolvd, reject) => {
            const orgCode = getCookie('SELECT_ORG_CODE')
            if (orgCode) {
                this.merchantOrgCode = orgCode
                resolvd(void 0)
            } else {
                message.error('未查询到机构code')
                reject(void 0)
            }
        })
    }

    /**
     * 获取城市
     * @param areaCode
     * @returns
     */
    getCityList(areaCode: string[] = []) {
        return http(Api.getCityList, 'POST', { codeList: areaCode }).then(res => {
            refCityData = res
        })
    }

    /**
     *  获取进件的详情
     * @param settlementCode 结算主体编码
     * @returns
     */
    getSouceData(settlementCode: string) {
        return http(Api.getNowSaveData, 'post', {
            merchantOrgCode: this.merchantOrgCode,
            settleTargetCode: settlementCode,
            // sid: 1,
        }).then((res: any) => {
            // res.status = 3
            this.detail = res || {}
            this.selfCode = res?.code
            this.orgCode = res?.orgCode
            if (res) {
                this.selfStatus = res.status
                if (res.status === 1) this.stepsCurrent = 1
                this.bizNo = res.bizNo
            }
            return res
        })
    }

    /**
     *  保存草稿
     * @param params
     * @returns
     */
    saveDraft(params, settlementCode: string) {
        this.parseMcc(params)
        const _params = transFromParams({
            ...params,
            merchantOrgCode: this.merchantOrgCode,
        })
        _params.settleTargetCode = settlementCode
        console.log(_params, '保存草稿params')
        return http(Api.saveDraft, 'POST', _params)
    }

    /**
     *  清空进件数据 页面暂时不用
     * @returns
     */
    clearchDraft() {
        return http(Api.saveDraft, 'POST', {
            merchantOrgCode: this.merchantOrgCode,
            nativePersons: this.detail.merchantNativeInfoList?.map(i => ({
                code: i.code,
                merchantCode: i.merchantCode,
            })),
        })
    }

    /**
     * 发布
     * @param params
     * @returns
     */
    savePublish(params, settlementCode: string) {
        this.parseMcc(params)
        return http(
            Api.savePublish,
            'POST',
            transFromParams({
                ...params,
                merchantOrgCode: this.merchantOrgCode,
                settleTargetCode: settlementCode,
                status: 1,
                mchtOrgType: 1,
                sid: 1,
            }),
        )
    }

    /**
     * 进行下一步 到签约链接那里
     */
    toNextStep() {
        this.stepsCurrent = 1
    }

    /**
     * 重新签约
     * @returns
     */
    resetContract() {
        return http(Api.resetContract, 'GET', { sid: 1, code: this.selfCode, bizNo: this.bizNo })
    }
    /**
     * 获取mcc 编码
     */
    getMccData() {
        http(Api.getMccDataList, 'GET', {}).then((res: any) => {
            this.mccCodeData = res || []
        })
    }
}

/**
 * 给银行上传文件
 * @param param0
 * @returns
 */
export async function bankUploadBeforeFile(file: Blob, settlementCode: string) {
    try {
        const data = await http(
            '/merchant/front/create/upload_image',
            'post',
            {
                file: file,
                settleTargetCode: settlementCode,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                delayTime: 60000,
            },
        )
        return { bankId: data }
    } catch (err) {
        console.log(err)
        throw err
    }
}
