import { useParams } from 'umi'
import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'
import { useEffect, useState } from 'react'
import { getExamTableColumns } from './const'
import Store from '../store'
import { Button, Table } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import GlobalUpload from '@/components/GlobalUpload'

const Index: React.FC = observer(() => {
    const store = useLocalObservable(() => new Store())
    const {
        hasRequest,
        finalAssessmentStatus,
        finalAssessmentList,
        getFinalAssessment,
        updateEditing,
        updateScoreSingle,
        downloadTemplateFinalAssessment,
        batchImportFinalAssessment,
        submitFinalAssessment,
    } = store
    const { scheduleCode } = useParams<{ scheduleCode: string }>()

    const [uploading, setUploading] = useState<boolean>(false)

    useEffect(() => {
        if (scheduleCode) {
            getFinalAssessment(scheduleCode)
        }
    }, [scheduleCode])

    /**
     * 处理文件上传变化
     */
    const handleFileChange = (fileList: any[]) => {
        if (Array.isArray(fileList) && fileList.length > 0) {
            const latestFile = fileList[fileList.length - 1]
            const { response } = latestFile
            if (response?.url) {
                batchImportFinalAssessment({ scheduleCode, fileUrl: response.url }, () => {
                    setUploading(false)
                })
            }
        }
    }

    return (
        <div className={styles.page}>
            {finalAssessmentStatus === 2 ? (
                <>
                    <div className={styles.no_preview_content}>
                        <div className={styles.no_preview} />
                        <div className={styles.no_preview_small_text}>暂无数据</div>
                        <div className={styles.no_preview_text}>
                            可下载
                            <span
                                onClick={() => {
                                    downloadTemplateFinalAssessment(scheduleCode)
                                }}
                            >
                                《课堂表现评分》
                            </span>
                            模板，填写后批量导入
                        </div>
                        <GlobalUpload
                            drag={false}
                            type={18}
                            size={100}
                            accept={'excel'}
                            otherProps={{ showUploadList: false, maxCount: 1 }}
                            onChange={handleFileChange}
                            onCustomRequestStart={() => {
                                setUploading(true)
                            }}
                            onCustomRequestEnd={() => {
                                setUploading(false)
                            }}
                        >
                            <Button
                                loading={uploading}
                                type={'default'}
                                icon={<DownloadOutlined />}
                                className={styles.no_preview_btn}
                            >
                                导入成绩
                            </Button>
                        </GlobalUpload>
                    </div>
                </>
            ) : (
                <>
                    {finalAssessmentStatus === 0 && (
                        <Button
                            className={styles.submit_score}
                            type="primary"
                            onClick={() => {
                                submitFinalAssessment(scheduleCode)
                            }}
                        >
                            提交成绩
                        </Button>
                    )}
                    <Table
                        loading={!hasRequest}
                        columns={getExamTableColumns(
                            finalAssessmentStatus!,
                            updateEditing,
                            updateScoreSingle,
                        )}
                        dataSource={finalAssessmentList}
                        pagination={false}
                    />
                </>
            )}
        </div>
    )
})

export default Index
