import { makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import { message } from 'antd'
import { history } from 'umi'
import type { FormValuesType } from './interface'
import globalApi from '@/servers/globalApi'
import GlobalLoading from '@/components/Loading'
import api from './api'
import type { UserOrgItem } from '@/stores/interface'
// import type SiteStore from '@/stores/siteStore'
import { getWorkBenchUrlByType } from '@/utils/urlUtil'
import { getMasterHistory } from '@/utils/masterHistoryVO'

let loadingDom = GlobalLoading()

// let tempEvent: NodeJS.Timeout[] = []
class CustomerStore {
    constructor() {
        makeAutoObservable(this)
    }
    creditImage: string = ''

    // 是否正在上传
    public isUpload: boolean = false

    isDisabled: boolean = false

    setIsDisabled = (isDisabled: boolean) => {
        this.isDisabled = isDisabled
    }

    setCreditImage = (url: string) => {
        this.creditImage = url
    }

    toggleUploading = (upload: boolean) => {
        this.isUpload = upload
    }
    // 当前选中机构详情
    orgInfo: UserOrgItem = {}

    /*
     * 获取机构详情
     */
    getOrgDetail = async (orgCode: string) => {
        if (!orgCode) return
        this.orgInfo = (await http(`${globalApi.orgDetail}/${orgCode}`, 'get', {
            repeatFilter: false,
        })) as unknown as UserOrgItem
        return this.orgInfo
    }

    orgCertify = (
        value: FormValuesType,
        updateCurrentOrganization: (code?: string) => void,
        // 认证后是否需要跳转
        isSkipAfterCreate: boolean,
        // 机构code
        currentOrganization: string,
        workBenchObj: any,
    ) => {
        const { name, companyCode, legalPersonName, manualCertifyFlag, attachments = [] } = value
        http(api.certify, 'post', {
            ...value,
            companyCode,
            attachments: attachments?.map(item => item?.response?.url || item?.url).join(','),
            name,
            organizationCode: currentOrganization,
            creditImage: this.creditImage,
            legalPersonName,
            manualCertifyFlag,
        }).then(() => {
            this.getOrgDetail(currentOrganization)
            // 根据manualCertifyFlag判断为人工审核还是正常认证
            let messageInfo = manualCertifyFlag ? '提交成功' : '机构认证成功'
            // 认证成功or提交人工审核时，表单置灰
            this.setIsDisabled(true)
            message.success(messageInfo)
            // 机构认证，跟新机构详情、权限、认证状态
            updateCurrentOrganization(currentOrganization)
            // 在创建机构页面 认证成功后跳转对应工作台
            if (isSkipAfterCreate) {
                this.historyAfterProve(workBenchObj)
            } else {
                //  人工审核停留在原页面 机构认证返回成员管理
                // !manualCertifyFlag && history.replace('/member')
                history.replace('/detail')
            }
        })
    }

    // 创建页面得机构认证后跳转
    historyAfterProve = (workBenchObj: any) => {
        let currentWorkBenchUrl = getWorkBenchUrlByType({ workBenchObj, isGoCompanyBack: true })
        if (currentWorkBenchUrl) {
            // 跳转对应工作台地址
            window.location.replace(currentWorkBenchUrl)
        } else {
            const masterHistoryVO = getMasterHistory()
            masterHistoryVO?.masterHistory?.replace('/account')
        }
    }

    imageUpload = async (image: File) => {
        // tempEvent.map(item => clearTimeout(item))
        // let loadEvent = setTimeout(() => {
        //     this.toggleUploading(true)
        // }, 2000)
        // tempEvent.push(loadEvent)
        this.toggleUploading(true)
        http(
            globalApi.upload,
            'post',
            { file: image, isPrivate: false, type: 6 },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                delayTime: 60000,
            },
        )
            .then(imageData => {
                // tempEvent.map(item => clearTimeout(item))
                this.toggleUploading(false)
                let { url } = imageData || {}
                if (url) {
                    this.creditImage = url || ''
                } else {
                    message.error('文件上传失败')
                }
            })
            .catch(() => {
                loadingDom.close()
            })
    }

    handleUpload = async (option: any) => {
        const { file } = option
        http(
            globalApi.upload,
            'post',
            { file: file, isPrivate: false, type: 6 },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                delayTime: 60000,
            },
        )
            .then((res: any) => {
                const { url, name, hash } = res

                const resFile = {
                    uid: url,
                    name: name,
                    url,
                    size: res.size,
                    hash,
                }
                option.onSuccess(resFile)
            })
            .catch(() => {
                option.onError()
            })
    }
}

export default CustomerStore
