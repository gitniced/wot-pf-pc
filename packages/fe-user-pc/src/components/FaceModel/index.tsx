import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import styles from './index.module.less'
import { inject, observer } from 'mobx-react'
import classNames from 'classnames'
import { history, useLocation } from 'umi'
import type { FaceModalProps } from './interface'
import { getLocalStorage } from '@/storage'
import http from '@/servers/http'
import api from './api'

const FaceModel = (props: FaceModalProps) => {
    const { search: urlSearch, query } = useLocation() || {}
    const { logintype = 1 } = query || {}
    const { userCode = '', isLogin = false, onCancel = () => {}, userStore } = props || {}
    const sid = getLocalStorage('SID')

    const [tempStream, setTempStream] = useState(null)
    // const [showCamera, setShowCamera] = useState(false)
    // const [imgBase64, setImgBase64] = useState('')
    const [canvasAlpha, setCanvasAlpha] = useState(0)
    const [errorMsg, setErrorMsg] = useState('')
    const [onVerify, setOnVerify] = useState(false)

    /**
     * 照片录入
     * @param {File} image
     * @param {string} faceBase64
     */
    const inputImage = async (image: File, faceBase64: string) => {
        setOnVerify(true)
        http(
            api.inputImage,
            'post',
            { file: image, faceBase64, userCode, sid },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                delayTime: 60000,
                form: true,
            },
        )
            .then(res => {
                setOnVerify(false)
                //@ts-ignore
                const { success, message } = res || {}
                if (success) {
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    cancelHandler()
                    Modal.success({
                        className: styles.face_login_modal_warning,
                        content: '人脸录入成功',
                        centered: true,
                    })
                } else {
                    if (message.includes('人脸比对失败')) {
                        let messageStr = message.split('人脸比对失败')
                        messageStr = messageStr.join('人脸比对失败：')
                        setErrorMsg(messageStr)
                    } else {
                        setErrorMsg(message)
                    }
                }
            })
            .catch(() => {
                setOnVerify(false)
            })
    }
    /**
     * 人脸登录
     * @param {string} faceBase64
     */
    const faceLogin = async (faceBase64: string) => {
        if (!userCode || !faceBase64) return
        setOnVerify(true)
        http(
            api.faceLogin,
            'post',
            {
                userCode,
                appKey: 'WEB',
                faceBase64,
                sid,
                type: logintype,
            },
            {
                form: true,
            },
        )
            .then((res: any) => {
                setOnVerify(false)
                //@ts-ignore
                const { success, message, data } = res || {}
                if (success) {
                    userStore?.updateUserAccount(data, Number(logintype))
                } else {
                    if (message.includes('人脸比对失败')) {
                        let messageStr = message.split('人脸比对失败')
                        messageStr = messageStr.join('人脸比对失败：')
                        setErrorMsg(messageStr)
                    } else {
                        setErrorMsg(message)
                    }
                }
            })
            .catch(() => {
                setOnVerify(false)
            })
    }

    // dataURL 为base64数据 filename为文件名（必须带后缀名，如.jpg,.png）
    const dataURLtoFile = (dataURL: string) => {
        const arr = dataURL.split(',')
        const mime = arr[0]?.match?.(/:(.*?);/)?.[1]
        const bstr = window.atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], 'face.jpeg', { type: mime })
    }

    /**关闭摄像头 */
    const closeCamera = () => {
        if (tempStream) {
            // 获取stream中所有的track
            const tracks = tempStream.getVideoTracks()
            // 停止所有的track
            tracks.forEach(function (track) {
                track.stop()
            })
            setTempStream(null)
        }
    }

    /**
     * 初始化摄像头
     */
    const openCamera = () => {
        navigator.mediaDevices
            .enumerateDevices()
            .then(devices => {
                const videoDevices = devices.filter(device => device.kind === 'videoinput')
                if (videoDevices.length > 0) {
                    // 存在摄像头设备，可以请求摄像头权限
                    navigator.mediaDevices
                        .getUserMedia({
                            audio: false,
                            video: {
                                width: 421,
                                height: 421,
                                // facingMode: { exact: "environment" }, //强制后置摄像头
                                facingMode: 'user', //前置摄像头
                            },
                        })
                        .then(stream => {
                            // 获取到了摄像头权限，可以在页面上展示视频流
                            console.log('获取摄像头权限成功:', stream)
                            const videoEl = document.getElementById('face_login_video')
                            if (!videoEl) return
                            videoEl.srcObject = stream
                            videoEl.play()
                            // setShowCamera(true)
                            setTempStream(stream)
                        })
                        .catch(error => {
                            // 用户拒绝了摄像头权限请求或其他错误发生
                            console.log('获取摄像头权限失败:', error)
                            Modal.warning({
                                className: styles.face_login_modal_warning,
                                content: '监测到未获得浏览器摄像头权限，请开启权限再尝试。',
                                okText: '我知道了',
                            })
                        })
                } else {
                    console.log('没有可用的摄像头设备')
                    Modal.error({
                        className: styles.face_login_modal_warning,
                        content:
                            '检测到您未安装摄像头，请安装摄像头，或使用带摄像头的笔记本再进行人脸识别。',
                        okText: '我知道了',
                    })
                }
            })
            .catch(error => {
                console.log('获取摄像头设备列表失败:', error)
                Modal.error({
                    className: styles.face_login_modal_warning,
                    content:
                        '检测到您未安装摄像头，请安装摄像头，或使用带摄像头的笔记本再进行人脸识别。',
                    okText: '我知道了',
                })
            })
    }

    /**
     * 截取照片
     */
    const takePhoto = () => {
        const canvasDom = document.getElementById('face_login_canvas')
        const videoDom = document.getElementById('face_login_video')
        if (!canvasDom || !videoDom) {
            setErrorMsg('功能初始化失败')
            return
        }
        const ctx = canvasDom.getContext('2d')
        canvasDom.width = videoDom.offsetWidth
        canvasDom.height = videoDom.offsetHeight
        ctx.drawImage(videoDom, 0, 0, canvasDom.width, canvasDom.height)
        const base64Str = canvasDom.toDataURL('image/jpeg', 1)
        const tempFile = dataURLtoFile(base64Str)
        // setImgBase64(base64Str)
        setCanvasAlpha(1)
        // isLogin 为true时 为人脸登录功能
        // isLogin 为false时 为人脸录入功能
        if (isLogin) {
            faceLogin(base64Str)
        } else {
            inputImage(tempFile, base64Str)
        }
    }

    /**
     * 重置照片
     */
    const resetPhoto = () => {
        setCanvasAlpha(0)
        // setImgBase64('')
        setErrorMsg('')
    }
    /**
     * 回到选择登录方式
     */
    const backToLogin = e => {
        e.stopPropagation()
        closeCamera()
        history.replace(`/user/login${urlSearch ? `${urlSearch}` : ''}`)
    }

    /**
     * 取消回调
     */
    const cancelHandler = () => {
        closeCamera()
        onCancel()
    }

    useEffect(() => {
        openCamera()
        return () => {
            if (tempStream) {
                // 获取stream中所有的track
                const tracks = tempStream.getVideoTracks()
                // 停止所有的track
                tracks.forEach(function (track) {
                    track.stop()
                })
                setTempStream(null)
            }
        }
    }, [])

    return (
        <Modal
            centered
            title={null}
            footer={null}
            open={true}
            closable={false}
            width={918}
            className={styles.mask_content}
            style={{ padding: 0, borderRadius: '8px', overflow: 'hidden' }}
            destroyOnClose
            onCancel={cancelHandler}
        >
            <div className={styles.face_login_content}>
                <div className={styles.face_login_content_left}>
                    <div className={styles.face_login_content_left_bg}>
                        <div className={styles.face_login_content_left_title_1}>
                            {isLogin
                                ? errorMsg
                                    ? '请完成人脸识别'
                                    : '为保证您的账号安全，请完成人脸识别'
                                : errorMsg
                                ? '请完成人脸识别'
                                : '请完成人脸录入，用于您的下次登录'}
                        </div>
                        <div className={styles.face_login_content_left_des}>
                            照片仅用于登录验证，我们将严格保护您的隐私安全
                        </div>
                        <div className={styles.face_login_content_left_title_2}>操作提示</div>

                        <div className={styles.face_login_content_left_info_item}>
                            <div className={styles.face_login_content_left_info_item_img}>
                                <svg aria-hidden="true" className={classNames('icon')}>
                                    <use xlinkHref={`#icon_shexiangtouzhengchang`} />
                                </svg>
                            </div>

                            <div className={styles.face_login_content_left_info_item_des}>
                                <div>请确保摄像头已连接并且能正常工作</div>
                            </div>
                        </div>

                        <div className={styles.face_login_content_left_info_item}>
                            <div className={styles.face_login_content_left_info_item_img}>
                                <svg aria-hidden="true" className={classNames('icon')}>
                                    <use xlinkHref={`#icon_guangyuanchongzu`} />
                                </svg>
                            </div>

                            <div className={styles.face_login_content_left_info_item_des}>
                                <div>请保持光源充足，不要逆光操作</div>
                            </div>
                        </div>

                        <div className={styles.face_login_content_left_info_item}>
                            <div className={styles.face_login_content_left_info_item_img}>
                                <svg aria-hidden="true" className={classNames('icon')}>
                                    <use xlinkHref={`#icon_mianduishexiang`} />
                                </svg>
                            </div>

                            <div className={styles.face_login_content_left_info_item_des}>
                                <div>
                                    请保持脸部正对面对摄像头，并调整姿势保持脸部能进入摄像头镜头范围
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.face_login_content_right}>
                    <div className={styles.face_login_content_right_content}>
                        <video id="face_login_video" />
                        <canvas
                            id="face_login_canvas"
                            className={styles.face_login_content_canvas}
                            style={{ opacity: canvasAlpha }}
                        />
                        <svg
                            aria-hidden="true"
                            className={classNames('icon', styles.face_login_content_right_race)}
                        >
                            <use xlinkHref={`#renlianshibiekuang`} />
                        </svg>
                        <svg
                            aria-hidden="true"
                            className={classNames('icon', styles.face_login_content_right_man)}
                        >
                            <use xlinkHref={`#renlian`} />
                        </svg>
                        <div className={styles.face_login_content_right_split} />
                    </div>

                    {errorMsg && (
                        <div className={styles.face_login_content_right_error}>{errorMsg}</div>
                    )}
                    <div
                        className={styles.face_login_content_right_btn_content}
                        style={{ marginTop: errorMsg ? '12px' : '16px' }}
                    >
                        {isLogin &&
                            (errorMsg ? (
                                <>
                                    <Button
                                        type={'default'}
                                        href={`/user/login${urlSearch ? `${urlSearch}` : ''}`}
                                        className={styles.face_login_btn_cancel}
                                        onClick={backToLogin}
                                    >
                                        选择其他登录方式
                                    </Button>
                                    <Button
                                        type={'primary'}
                                        className={styles.face_login_btn_ok}
                                        onClick={resetPhoto}
                                    >
                                        重新识别
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    type={'primary'}
                                    className={styles.face_login_btn_ok}
                                    onClick={takePhoto}
                                    disabled={onVerify}
                                    loading={onVerify}
                                >
                                    开始人脸识别
                                </Button>
                            ))}
                        {!isLogin &&
                            (errorMsg ? (
                                <>
                                    <Button
                                        type={'default'}
                                        className={styles.face_login_btn_cancel}
                                        onClick={cancelHandler}
                                    >
                                        取消
                                    </Button>
                                    <Button
                                        type={'primary'}
                                        className={styles.face_login_btn_ok}
                                        onClick={resetPhoto}
                                    >
                                        重新识别
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    type={'primary'}
                                    className={styles.face_login_btn_ok}
                                    onClick={takePhoto}
                                    disabled={onVerify}
                                    loading={onVerify}
                                >
                                    拍照
                                </Button>
                            ))}
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default inject('siteStore', 'userStore')(observer(FaceModel))
