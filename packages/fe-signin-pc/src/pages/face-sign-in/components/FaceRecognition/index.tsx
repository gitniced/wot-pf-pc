import type { FaceRecognitionProps } from './interface'
import styles from './index.module.less'
import { CAMERA_TYPE, SIGN_TIME_TYPE, SIGN_TYPE, SIGN_TYPE_TEXT } from '../../const'
import FaceIdentify from '../FaceIdentify'
import { useEffect, useState } from 'react'
import { getUserMedia } from '@/utils'
import FaceTipsModal from '../FaceTipsModal'
import dayjs from '@/components/Dayjs'

/** 人脸识别 */
const FaceRecognition: React.FC<FaceRecognitionProps> = ({
    signTimeType,
    signType,
    taskRule,
    signStore,
}) => {
    const [cameraType, setCameraType] = useState<CAMERA_TYPE>(CAMERA_TYPE.WAIT) // 摄像头状态
    const [faceVisible, setFaceVisible] = useState<boolean>(false) // 签到签提示弹出框
    /** 签到/退文案 */
    const SignText: string = SIGN_TYPE_TEXT[signType]
    /** 未开始时间 */
    const beforeTime =
        signType === SIGN_TYPE.SIGN_IN ? taskRule.signInBeforeTime : taskRule.signOutBeforeTime
    /** 已结束时间 */
    const afterTime =
        signType === SIGN_TYPE.SIGN_IN ? taskRule.signInAfterTime : taskRule.signOutAfterTime

    /** 尝试打开用户摄像头 */
    const getCameraType = (hidden?: boolean) => {
        const video = document.getElementById('video') as HTMLVideoElement | undefined
        getUserMedia(
            {
                video: {
                    facingMode: 'environment', //前置摄像头
                }
            },
            (stream: any) => {
                if (video && signTimeType === SIGN_TIME_TYPE.BETWEEN) {
                    !hidden && setFaceVisible(true)
                    video.srcObject = stream
                    video.play()
                }
            },
            () => setCameraType(CAMERA_TYPE.CLOSE),
        )
    }

    /** 用户离开页面关闭摄像头 */
    const closeCamera = () => {
        const video = document.getElementById('video') as HTMLVideoElement | undefined
        video?.srcObject?.getTracks()[0].stop()
    }

    /** 关闭弹出框回调 */
    const closeFaceModal = () => {
        setCameraType(CAMERA_TYPE.OPEN)
        getCameraType(true)
        setFaceVisible(false)
    }

    useEffect(() => {
        return closeCamera
    }, [])

    /** 签到/退 时间状态DOM */
    const SignTime: Record<SIGN_TIME_TYPE, () => JSX.Element | null> = {
        [SIGN_TIME_TYPE.BEFORE]: () => (
            <div className={styles.error_content}>
                <svg className={styles.camera_icon} aria-hidden="true">
                    <use xlinkHref="#icon_yijieshu" />
                </svg>
                <div>
                    {SignText}未开始，请在{dayjs(beforeTime).format('YYYY-MM-DD HH:mm:ss')}开始
                    {SignText}
                </div>
            </div>
        ),
        [SIGN_TIME_TYPE.BETWEEN]: () => (
            <FaceIdentify
                getCameraType={getCameraType}
                cameraType={cameraType}
                signType={signType}
                signStore={signStore}
            />
        ),
        [SIGN_TIME_TYPE.AFTER]: () => (
            <div className={styles.error_content}>
                <svg className={styles.camera_icon} aria-hidden="true">
                    <use xlinkHref="#icon_yijieshu" />
                </svg>
                <div>
                    {SignText}已结束，结束时间为{dayjs(afterTime).format('YYYY-MM-DD HH:mm:ss')}
                </div>
            </div>
        ),
    }

    /** 摄像头状态DOM */
    const CameraTypeObj: Record<CAMERA_TYPE, () => JSX.Element | null> = {
        [CAMERA_TYPE.WAIT]: SignTime[signTimeType],
        [CAMERA_TYPE.CLOSE]: () => (
            <div className={styles.error_content}>
                <svg className={styles.camera_icon} aria-hidden="true">
                    <use xlinkHref="#icon_shexiang" />
                </svg>
                <div>未检测到摄像头设备</div>
            </div>
        ),
        [CAMERA_TYPE.OPEN]: SignTime[signTimeType],
    }

    return (
        <div className={styles.face_recognition}>
            {CameraTypeObj?.[cameraType]?.()}
            <FaceTipsModal visible={faceVisible} handleKnow={closeFaceModal} />
        </div>
    )
}

export default FaceRecognition
