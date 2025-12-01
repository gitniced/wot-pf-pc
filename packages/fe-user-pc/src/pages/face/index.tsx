import { inject, Observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import baseHooks from './hooks'
import { Button } from 'antd'
import CustomTitle from '@/components/Global/CustomTitle'
import { useEffect, useState } from 'react'
import type { IRoute } from 'umi'
import type { BaseInfoProps } from './interface'
import classNames from 'classnames'
import FaceModel from '@/components/FaceModel'
import { getCookie, getLocalStorage } from '@/storage'

const Face = (props: BaseInfoProps) => {
    // const { userStore, siteStore } = props
    console.log(props)
    const hooks = useLocalObservable(() => new baseHooks())
    const [showFaceModal, setShowFaceModal] = useState(false)
    const userCode = getCookie('USER_CODE')
    const sid = getLocalStorage('SID')

    useEffect(() => {
        hooks.getFaceInfo(userCode, sid)
    }, [])

    const closeModal = () => {
        hooks.getFaceInfo(userCode, sid)
        setShowFaceModal(false)
    }

    return (
        <Observer>
            {() => {
                return (
                    <div className={styles.page}>
                        <div className={styles.content}>
                            <CustomTitle title="人脸识别" />
                            <div className={styles.face_content}>
                                <svg
                                    aria-hidden="true"
                                    className={classNames(
                                        'icon',
                                        styles.face_content_icon,
                                        hooks.existPhoto ? styles.success : styles.wait,
                                    )}
                                >
                                    <use
                                        xlinkHref={
                                            hooks.existPhoto
                                                ? `#Check-Circle-Fill`
                                                : `#Warning-Circle-Fill`
                                        }
                                    />
                                </svg>
                                <div className={styles.face_content_title}>
                                    {hooks.existPhoto ? '已录入人脸' : '未录入人脸'}
                                </div>
                                <div className={styles.face_content_des}>
                                    {hooks.existPhoto
                                        ? '照片仅用于登录验证，我们将严格保护您的隐私安全'
                                        : '为保障您的账号安全，请完成人脸录入'}
                                </div>

                                <Button
                                    type={'primary'}
                                    className={styles.face_content_btn}
                                    onClick={() => {
                                        setShowFaceModal(true)
                                    }}
                                >
                                    {hooks.existPhoto ? '重新录入' : '录入人脸'}
                                </Button>
                            </div>
                        </div>
                        {showFaceModal ? (
                            <FaceModel userCode={userCode} isLogin={false} onCancel={closeModal} />
                        ) : null}
                    </div>
                )
            }}
        </Observer>
    )
}

const ObserverFace: IRoute = inject('userStore', 'siteStore')(Face)

ObserverFace.title = '人脸识别'

export default ObserverFace
