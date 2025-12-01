import React from 'react'
import styles from './index.module.less'
import { Button } from 'antd'
import { DownloadOutlined, EyeOutlined, PlayCircleOutlined } from '@ant-design/icons'
import type { ResourceListDto } from '../StepComponents/interface'
import {
    CAN_DOWNLOAD_FORMAT,
    CAN_ONLINE_PREVIEW_FORMAT,
    CAN_PLAY_FORMAT,
    DEVICE,
    RESOURCE_TYPE_LABEL,
} from '../StepComponents/const'
import { downloadFileByUrl } from '@/utils/file'
import { inject, observer } from 'mobx-react'
import type { PageProps } from '@/types'
import { findSiteData } from '@wotu/wotu-components'
import useJudgeTeacher from '@/components/useJudgeTeacher'
import Empty from '@/components/Empty'

// eslint-disable-next-line no-empty-pattern, @typescript-eslint/no-unused-vars
const StepResource = ({
    list,
    current,
    siteStore,
}: { list: ResourceListDto[]; current: string } & PageProps) => {
    const isTeacher = useJudgeTeacher()
    const currentList = list.find(item => item.key === current)?.list || []
    const { siteData = {} } = siteStore || {}
    const midDomain = findSiteData(siteData, 'midDomain', { findKey: 'baseInfo' }) || ''
    if (currentList.length === 0) {
        return <Empty type="component" style={{ paddingTop: '20px' }} />
    }
    return (
        <div className={styles.resource_content}>
            {currentList.map(item => {
                const {
                    code,
                    resourceLibraryCode,
                    name,
                    fileFormat = '',
                    kind,
                    content = '',
                    fileType = '',
                    fileSize = '',
                    size = '',
                } = item || {}
                return (
                    <div
                        key={`${current}-${code}`}
                        className={[styles.resource_item, styles.active].join(' ')}
                    >
                        <div
                            className={[
                                fileFormat === DEVICE
                                    ? styles.resource_item_device_name
                                    : styles.resource_item_name,
                            ].join(' ')}
                        >
                            <span className={[styles.sign, styles.sign_1].join(' ')}>
                                {RESOURCE_TYPE_LABEL[kind as keyof typeof RESOURCE_TYPE_LABEL]}
                            </span>
                            {name}
                        </div>
                        {fileFormat !== DEVICE ? (
                            <>
                                <div className={styles.resource_item_info}>
                                    {CAN_PLAY_FORMAT.includes(fileFormat) ? (
                                        size ? (
                                            `时长：${size}`
                                        ) : null
                                    ) : (
                                        <div className={styles.resource_item_info_content}>
                                            <div>{String(fileType).toUpperCase()}</div>
                                            {String(fileSize) === '0' ? null : (
                                                <div>{String(fileSize).toUpperCase()}MB</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className={styles.resource_item_mask}>
                                    <div className={styles.btn_list}>
                                        {CAN_PLAY_FORMAT.includes(fileFormat) ? (
                                            <Button
                                                type={'text'}
                                                className={styles.btn}
                                                icon={<PlayCircleOutlined />}
                                                href={
                                                    isTeacher
                                                        ? `${midDomain}/engineer/train-gateway/selfcrouse/video?course_id=${content}&class_id=1`
                                                        : `${midDomain}/engineer/train-gateway/study/video?course_id=${content}&class_id=1`
                                                }
                                                target={'_blank'}
                                            >
                                                播放
                                            </Button>
                                        ) : null}
                                        {CAN_ONLINE_PREVIEW_FORMAT.includes(fileFormat) ? (
                                            <Button
                                                type={'text'}
                                                className={styles.btn}
                                                icon={<EyeOutlined />}
                                                href={`/engineer-center/office/${fileFormat}/${resourceLibraryCode}?preview=true`}
                                                target={'_blank'}
                                            >
                                                预览
                                            </Button>
                                        ) : null}
                                        {CAN_DOWNLOAD_FORMAT.includes(fileFormat) ? (
                                            <Button
                                                type={'text'}
                                                className={styles.btn}
                                                icon={<DownloadOutlined />}
                                                onClick={() => {
                                                    // if (
                                                    //     CAN_ONLINE_PREVIEW_FORMAT.includes(
                                                    //         fileFormat,
                                                    //     )
                                                    // ) {
                                                    //     message.error('该格式不支持下载')
                                                    // } else {
                                                    //     downloadFileByUrl(content, name || '文件')
                                                    // }
                                                    downloadFileByUrl(content, name || '文件')
                                                }}
                                            >
                                                下载
                                            </Button>
                                        ) : null}
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                )
            })}
        </div>
    )
}

export default inject('siteStore')(observer(StepResource))
