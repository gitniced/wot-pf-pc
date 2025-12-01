// 上传电子照片

import type { FileUpload, UploadDigitalPhotoProps } from './interface'

import styles from './index.module.less'
import { Alert, Button, message, Space, Typography, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { fileUpload } from '../api'
import { observer } from 'mobx-react'
// import EnrollInformationStore from '../store'
import { history } from 'umi'
import type { IRouteQuery } from '../interface'
import { ENROLL_CHANNEL_NUM } from '@/types/enroll-const'
import { ENROLL_TYPE, EVENT_KIND, EVENT_KIND_VALUE } from '@/types'
import { getCookie } from '@/storage'
import { useState } from 'react'

const ACCEPT = 'image/jpeg,image/png,image/jpg'
const GYXX_ACCEPT = 'image/jpeg,image/jpg'
const UNIT = 1024

const UploadDigitalPhoto = ({
    store,
    enrollType,
    activityData,
    applyChannel,
    onPrev,
    sidAlias,
}: UploadDigitalPhotoProps) => {
    const [isPending, setIsPending] = useState<boolean>(false)
    const { entryCode } = activityData || {}
    const { activityCode, organizationCode, careerCode } =
        (history.location.query as unknown as IRouteQuery) ?? {}

    const getAccept = () => {
        const alias = getCookie('ALIAS') || sidAlias || ''
        console.log('🍊 alias:', alias)
        /**  定制仅支持上传jpg格式图片！！！  */
        if (alias === 'gyxx') {
            return GYXX_ACCEPT
        } else {
            return ACCEPT
        }
    }

    const getTips = () => {
        const alias = getCookie('ALIAS') || sidAlias || ''
        /**  定制仅支持上传jpg格式图片！！！  */
        if (alias === 'gyxx') {
            return 'JPG'
        } else {
            return 'JPG、PNG、JPEG'
        }
    }

    const handleBeforeUpload = (file: File) => {
        // 图片格式和大小校验
        const { size, type } = file

        if (getAccept().indexOf(type) === -1) {
            message.error(`文件格式不正确，请重新选择！`)
            return Upload.LIST_IGNORE
        }

        if (size < 30 * UNIT || size > 1024 * UNIT) {
            message.error(`超过大小限制，请重新选择！`)
            return Upload.LIST_IGNORE
        }

        return true
    }

    // 自定义上传
    const handleFileUpload = (option: any) => {
        const params: FileUpload = { file: option.file, type: 8, isPrivate: false }

        fileUpload(params).then((res: any) => {
            const { url } = res
            store.updateDigitalPhoto(url)
        })
    }

    /** 根据报名项目类型获取报名的详细type */
    const getFinallyParams = () => {
        switch (enrollType) {
            case ENROLL_TYPE.ORGANIZATION:
                return {
                    type: EVENT_KIND_VALUE[EVENT_KIND.ORGANIZATION],
                    activityCode: organizationCode,
                    applyChannel: ENROLL_CHANNEL_NUM[applyChannel],
                    organizationCode,
                }
            case ENROLL_TYPE.ACTIVITY:
                return {
                    //@ts-ignore
                    type: EVENT_KIND_VALUE[EVENT_KIND[entryCode]],
                    activityCode,
                    applyChannel: ENROLL_CHANNEL_NUM[applyChannel],
                    organizationCode: activityData.organizationCode,
                }
            case ENROLL_TYPE.CAREER:
                return {
                    type: EVENT_KIND_VALUE[EVENT_KIND.CAREER],
                    activityCode: careerCode,
                    applyChannel: ENROLL_CHANNEL_NUM[applyChannel],
                    organizationCode,
                }
            default:
                return {}
        }
    }

    /** 下一步 */
    const handleNextOrSubmit = () => {
        // 校验电子照片是否必传（电子）
        const { dp = {} } = store
        const { rule = {} } = dp
        const { required } = rule

        if (required) {
            if (!store.digitalPhoto) {
                return message.error('请先上传电子照片')
            }
        }

        /** 当前阶段不是最后阶段时，跳转到下一步 */
        if (store.currentStep !== store.stepList.length - 1) {
            return onPrev(store.currentStep + 1)
        }

        const finallyParams = getFinallyParams()

        if (
            !finallyParams.organizationCode &&
            store.projectType.toString() !== EVENT_KIND_VALUE[EVENT_KIND.EVENTS].toString()
        ) {
            message.error('未获取到机构信息')
            return
        }

        if (!isPending) {
            setIsPending(true)
            //@ts-ignore
            store
                .submitForm(finallyParams)
                .then(() => {
                    setIsPending(false)
                    history.push(
                        `/enroll-succeeded?openAudit=${store.openAudit}&openPay=${store.openPay}&status=${store.status}&activityCode=${finallyParams.activityCode}`,
                    )
                })
                .catch(() => {
                    setIsPending(false)
                })
        }
    }

    return (
        <div className={styles.component_upload_digital_photo}>
            <Alert
                showIcon
                type="warning"
                message="请按照以下要求准备并上传电子照片"
                description={
                    <Space size={0} direction="vertical">
                        <Typography>1.照片背景为白色；</Typography>
                        <Typography>2.正面免冠，包括整体头部，确保本人的脸部轮廓清晰；</Typography>
                        <Typography>
                            {`3.上传照片为${getTips()}格式，建议尺寸2寸照片（413×626像素）且文件大小在30KB至1M之间；`}
                        </Typography>
                        <Typography>4.电子照片将用于证书发放。</Typography>
                    </Space>
                }
            />

            <div className={styles.upload_wrapper}>
                <Upload
                    value={[store.digitalPhoto]}
                    maxCount={1}
                    accept={getAccept()}
                    beforeUpload={handleBeforeUpload}
                    customRequest={handleFileUpload}
                    showUploadList={false}
                >
                    {store.digitalPhoto ? (
                        <div className={styles.upload}>
                            <img src={(store.digitalPhoto || '') as string} />
                        </div>
                    ) : (
                        <div className={styles.upload}>
                            <PlusOutlined />
                            <Typography>上传照片</Typography>
                        </div>
                    )}
                </Upload>
            </div>

            <div className={styles.operate_btn}>
                <Space size={16}>
                    <Button
                        onClick={() => {
                            onPrev(store.currentStep - 1)
                        }}
                    >
                        上一步
                    </Button>
                    {store.stepList.length > 2 && store.currentStep === 1 ? (
                        <Button onClick={handleNextOrSubmit} type="primary">
                            下一步
                        </Button>
                    ) : (
                        <Button onClick={handleNextOrSubmit} disabled={isPending} type="primary">
                            提交
                        </Button>
                    )}
                </Space>
            </div>
        </div>
    )
}

export default observer(UploadDigitalPhoto)
