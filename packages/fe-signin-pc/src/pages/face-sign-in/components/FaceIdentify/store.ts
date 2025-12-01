import { makeAutoObservable } from 'mobx'
import { SIGN_TYPE } from '../../const';
import type { CheckCentral } from './interface'
import type { TaskSignTable } from '../../interface'
import globalApi from '@/servers/globalApi'
import api from '../../api'
import http from '@/servers/http'
import { history } from 'umi'

class useHook {
    // public taskCode: string = history.location.query?.taskCode as string 
    /** 名单信息列表 */
    public taskSignTable: TaskSignTable[] = []


    constructor() {
        makeAutoObservable(this)
    }

    /** 上传图片接口 */
    uploadImg = async (file: File) => {
        const data = await http(globalApi.upload, 'post', { file: file, type: 2, isPrivate: false, }, {
            headers: { 'Content-Type': 'multipart/form-data' },
            delayTime: 60000,
        }) as unknown as {
            url: string
        }
        return data?.url
    }

    /** 进行人脸识别比对 */
    faceRecognize = async (file: File) => {
        const taskCode = history.location.query?.taskCode 
        const faceImgUrl = await this.uploadImg(file)
        const data = await http(api.faceRecognize, 'post', {
            faceImgUrl,
            taskCode
        }) as unknown as string
        return data
    }

    /** 集中签到接口 */
    checkCentral: CheckCentral = async ({
        checkType,
        taskUserSignCode,
        signType,
        imgUrl
    }) => {
        const taskCode = history.location.query?.taskCode 
        const data = await http(api.checkCentral, 'post', {
            checkType,
            imgUrl: imgUrl,
            taskUserSignCode,
            taskCode,
            checkMode: signType
        })
        console.log(data);
    }

    /** 获取名单信息 */
    getTaskSignTable = async (signType: SIGN_TYPE) => {
        console.log(signType);
        // const sid = getLocalStorage('SID') ?? ''
        const taskCode = history.location.query?.taskCode 
        const res = await http(api.nameListPage, 'post', {
            // sid,
            pageNo: 1,
            pageSize: 999999, // 不分页
            [signType === SIGN_TYPE.SIGN_IN ? 'signStatus' : 'signOutStatus']: [0], // 找未签到/签退的名单
            taskCodes: [taskCode],
        })
        this.taskSignTable = res.data as TaskSignTable[]
    }
}

export default new useHook()
