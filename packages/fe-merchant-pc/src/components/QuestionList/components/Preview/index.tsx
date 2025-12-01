import { Image, Modal } from 'antd'
import styles from './index.modules.less'
import type { TableItem } from '../../interface'
import React, { useState } from 'react'
import { handerAuthenticatePoint } from '../../const'
import { discriminationOptions } from '@/components/DropdownBox/const'
import { QUESTION_LEVEL_TEXT } from '@/constants'

interface TopicContentProps {
    previewData: TableItem | null
    isLevel?: boolean
    children?: React.ReactNode
}
const TopicContent: React.FC<TopicContentProps> = ({ previewData, isLevel, children }) => {
    const [src, setSrc] = useState<string>('')

    const previewImg = (node: any) => {
        setSrc(node?.target?.src)
    }

    const {
        jobName = '',
        jobType = '',
        jobLevel = '',
    } = previewData?.customContent?.commonJob ?? ({} as any)

    return (
        <div className={styles.preview}>
            {isLevel ? (
                <>
                    <div className={styles.item}>
                        <span className={styles.label}>职业/工种/等级</span>
                        <span className={styles.value}>{`${jobName}/${jobType}/${jobLevel}`}</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.label}>鉴定点</span>
                        <span className={styles.value}>
                            {handerAuthenticatePoint(previewData?.customContent)}
                        </span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.label}>区分度</span>
                        <span className={styles.value}>
                            {
                                discriminationOptions?.find(
                                    item =>
                                        item.value === previewData?.customContent?.discrimination,
                                )?.label
                            }
                        </span>
                    </div>
                </>
            ) : null}

            <div className={styles.item}>
                <span className={styles.label}>题目</span>
                <span
                    onClick={previewImg}
                    style={{ whiteSpace: 'break-spaces' }}
                    className={styles.value}
                    dangerouslySetInnerHTML={{ __html: previewData?.title || '-' }}
                />
                {/* 实现图片预览功能 */}
                <Image
                    style={{ display: 'none', position: 'absolute' }}
                    preview={{
                        visible: !!src,
                        src,
                        onVisibleChange: value => {
                            if (!value) {
                                setSrc('')
                            }
                        },
                    }}
                />
            </div>
            {/* 选项 */}
            {[20, 30].includes(previewData?.type as number) ? (
                <div className={styles.item} style={{ margin: 0 }}>
                    <span className={styles.label}> </span>
                    <span className={styles.value}>
                        {previewData?.optionList?.map(item => (
                            <div
                                key={item.sort}
                                className={styles.answer}
                                style={{ display: 'flex', marginTop: '16px' }}
                            >
                                <span>{String.fromCharCode(65 + Number(item.sort))}、</span>
                                <span dangerouslySetInnerHTML={{ __html: item.answer }} />
                            </div>
                        ))}
                    </span>
                </div>
            ) : null}

            {children ? null : (
                <div className={styles.item}>
                    <span className={styles.label}>答案</span>
                    {[20, 30].includes(previewData?.type as number) ? (
                        <span className={styles.value}>
                            {previewData?.optionList
                                ?.filter(item => item.isAnswer)
                                .map(item => String.fromCharCode(65 + Number(item.sort)))
                                .join(' ') || '-'}
                        </span>
                    ) : (
                        <span
                            className={styles.value}
                            style={{ display: 'flex' }}
                            dangerouslySetInnerHTML={{
                                __html:
                                    previewData?.optionList
                                        ?.filter(item => item.isAnswer)
                                        .map(item => item.answer)
                                        .join('；') || '-',
                            }}
                        />
                    )}
                </div>
            )}

            {children ? null : (
                <div className={styles.item}>
                    <span className={styles.label}>解析</span>
                    <span
                        className={styles.value}
                        dangerouslySetInnerHTML={{ __html: previewData?.analysis || '-' }}
                    />
                </div>
            )}

            {isLevel ? (
                <div className={styles.item}>
                    <span className={styles.label}>难易程度</span>
                    <span className={styles.value}>{QUESTION_LEVEL_TEXT[previewData?.level!]}</span>
                </div>
            ) : null}

            {children}
        </div>
    )
}

interface PreviewProps {
    previewData: TableItem | null
    updatePreviewData: (e: TableItem | null) => void
}
const Preview: React.FC<PreviewProps> = ({ previewData, updatePreviewData }) => {
    return (
        <Modal
            width={800}
            title="预览"
            open={!!previewData}
            onCancel={() => updatePreviewData(null)}
            cancelText="关闭"
            className={styles.modal}
            okButtonProps={{ style: { display: 'none' } }}
        >
            <TopicContent previewData={previewData} isLevel={true}>
                {/* 子题目目前有两个， 组合题、案例分析题 */}
                {/* @ts-ignore */}
                {[60, 90].includes(previewData?.type) &&
                    previewData?.childList.map(item => (
                        <div key={item.code} className={styles.TopicContent}>
                            <TopicContent previewData={item} />
                        </div>
                    ))}
            </TopicContent>
        </Modal>
    )
}

export default Preview
