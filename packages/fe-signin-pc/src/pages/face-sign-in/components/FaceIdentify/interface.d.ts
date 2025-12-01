import type { CAMERA_TYPE, IDENTIFY_TYPE, SIGN_TYPE } from '../../const'
export interface FaceIdentifyProps {
    /** 打开摄像头 */
    getCameraType: () => void
    /** 摄像头状态 */
    cameraType: CAMERA_TYPE
    /** 签到类型 */
    signType: SIGN_TYPE
    /** 签到store */
    signStore: any
}

export interface IdentificationBoxProps {
    /** 识别状态 */
    signInStatus: IDENTIFY_TYPE
    /** 识别名称 */
    signInName: string
}

export interface VideoBoxProps {
    /** 识别状态 */
    signInStatus: IDENTIFY_TYPE
}

export type TakePhoto = () => {
    imgStr?: string
    hideImgStr?: string
}

export type DataURLtoBlob = (dataUrl: string, name: string) => File

export type CheckCentral = (params: {
    /** 签到验证类型 0 默认 1 手动 2 自动 */
    checkType: '1' | '2'
    /** 用户code */
    taskUserSignCode: string
    signType: SIGN_TYPE
    /** 签到未裁剪照片 */
    imgUrl: string
}) => void
