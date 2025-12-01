import type { FaceIdentifyProps } from './interface'
import styles from './index.module.less'
import { CAMERA_TYPE, IDENTIFY_TYPE, SIGN_TYPE_TEXT } from '../../const'
import { useEffect, useState } from 'react'
import { Space, message } from 'antd'
import { dataURLtoBlob, takePhoto } from './utils'
import HandleModal from './HandleModal'
import Hooks from './store'
import { observer } from 'mobx-react'
import type { TaskSignTable } from '../../interface'
import IdentificationBox from './IdentificationBox'
import VideoBox from './VideoBox'
import { SyncOutlined } from '@ant-design/icons'
import { getUserMedia } from '@/utils'

/** 签到页面 */
const FaceIdentify: React.FC<FaceIdentifyProps> = ({
    getCameraType,
    cameraType,
    signType,
    signStore,
}) => {
    const [signInStatus, setSignInStatus] = useState<IDENTIFY_TYPE>(IDENTIFY_TYPE.WAIT) //识别状态
    const [handleModal, setHandleModal] = useState<boolean>(false) // 手动签到弹出框
    const [signInName, setSignInName] = useState<string>('') // 签到名称
    const [signInPhoto, setSignInPhoto] = useState<string>('') // 签到照片
    const [taskUserSignCode, setTaskUserSignCode] = useState<string>('') //确认签到的code

    const [facingMode, setFacingMode] = useState('environment')

    /** 签到/签退 */
    const signText: string = SIGN_TYPE_TEXT[signType]

    /** 开始人脸识别 */
    const onSignIn = async () => {
        // 开始识别
        setSignInStatus(IDENTIFY_TYPE.START)
        const { imgStr = '', hideImgStr = '' } = takePhoto()
        const imgFile: File = dataURLtoBlob(imgStr, `${signText}图片`)
        const imgUrl: string = await Hooks.uploadImg(imgFile)
        setSignInPhoto(imgUrl)
        const file: File = dataURLtoBlob(hideImgStr, `${signText}图片`)
        const res = await Hooks.faceRecognize(file)
        res && setTaskUserSignCode(res)
        setSignInStatus(res ? IDENTIFY_TYPE.SUCCESS : IDENTIFY_TYPE.ERROR)
        const { taskSignTable = [] } = signStore || {}
        const signinUser = taskSignTable.find((i: any) => i.code === res) || {}
        setSignInName(signinUser?.name)
    }

    /** 重新识别 */
    const onReSignIn = () => {
        setSignInStatus(IDENTIFY_TYPE.WAIT)
    }

    /** 手动签到 */
    const openHandleCheckIn = () => {
        Hooks.getTaskSignTable(signType)
        setHandleModal(true)
    }

    /** 刷新签到列表 */
    const getTableList = () => {
        signStore.getTabCounts()
        signStore.getTaskSignTable()
    }

    /** 手动签到确认 */
    const handleSignOk = async (data: TaskSignTable) => {
        setHandleModal(false)
        await Hooks.checkCentral({
            checkType: '1',
            taskUserSignCode: data.code,
            signType,
            imgUrl: signInPhoto,
        })
        getTableList()
        message.success(`${signText}成功`)
        onReSignIn()
    }

    /** 自动确认签到 */
    const confirmSignIn = async () => {
        await Hooks.checkCentral({
            checkType: '2',
            taskUserSignCode,
            signType,
            imgUrl: signInPhoto,
        })
        getTableList()
        message.success(`${signText}成功`)
        onReSignIn()
    }

    useEffect(() => {
        getCameraType()
    }, [])


    /** 点击反转摄像头 */
    const handleFlipCamera = () => {
        const video = document.getElementById('video') as HTMLVideoElement | undefined
        if (video?.srcObject) {
            video?.srcObject?.getTracks()[0].stop()
            getUserMedia(
                {
                    video: {
                        facingMode: facingMode === 'environment' ? 'user' : 'environment'
                    }
                },
                (stream: any) => {
                    setFacingMode(facingMode === 'environment' ? 'user' : 'environment')
                    video.srcObject = stream
                    video.play()
                },
                () => console.log('video error')
            )
        }
    }
    
    function isMobileDevice() {
        return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    /** 操作按钮 */
    const OperatingButton: React.FC = () => {
        return (
            <div className={styles.btn_wrap}>
                <Space>
                    {signInStatus === IDENTIFY_TYPE.WAIT && (
                        <>
                            <div className={styles.btn_box} onClick={onSignIn}>
                                开始人脸识别
                            </div>
                            {isMobileDevice() && <SyncOutlined className={styles.btn_filp_box} onClick={handleFlipCamera} />}
                        </>
                    )}
                    {(signInStatus === IDENTIFY_TYPE.SUCCESS ||
                        signInStatus === IDENTIFY_TYPE.ERROR) && (
                            <>
                                <div
                                    className={`${styles.btn_box} ${styles.blank_btn_box}`}
                                    onClick={openHandleCheckIn}
                                >
                                    手动{signText}
                                </div>
                                <div
                                    className={`${styles.btn_box} ${styles.blank_btn_box}`}
                                    onClick={onReSignIn}
                                >
                                    重新识别
                                </div>
                            </>
                        )}
                    {signInStatus === IDENTIFY_TYPE.SUCCESS && (
                        <div className={styles.btn_box} onClick={confirmSignIn}>
                            确认{signText}
                        </div>
                    )}
                </Space>
            </div>
        )
    }

    return (
        <div
            className={styles.face_identify}
            style={{ display: cameraType === CAMERA_TYPE.WAIT ? 'none' : 'block' }}
        >
            <div className={styles.content}>
                <VideoBox signInStatus={signInStatus} />
                <IdentificationBox signInStatus={signInStatus} signInName={signInName || ''} />
                <OperatingButton />
            </div>
            {handleModal && (
                <HandleModal
                    visible={handleModal}
                    dataList={Hooks.taskSignTable}
                    imgData={signInPhoto}
                    handleOk={handleSignOk}
                    handleCancel={() => setHandleModal(false)}
                    signText={signText}
                />
            )}
        </div>
    )
}

export default observer(FaceIdentify)
