import styles from './index.module.less'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { useEffect, useMemo, useState } from 'react'
import CustomTitle from '@/components/CustomTitle'
import { history, useLocation } from 'umi'
import { Button, Col, Row, Tooltip } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { getPerformanceScoreTableColumns } from './const'
import BusinessTable from '@/components/BusinessTable'
import GlobalUpload from '@/components/GlobalUpload'
import { useSaasTitle } from '@wotu/wotu-components'

const Index: React.FC = () => {
    const { query } = useLocation<{
        query: { mode: string; scheduleCode: string; stepCode: string }
    }>()
    const { mode, scheduleCode, stepCode } = query || {}

    const store = useLocalObservable(() => new Store())
    const [uploading, setUploading] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const {
        isRequestPending,
        classPerformanceInfo,
        studentPerformanceList,
        batchImport,
        batchSubmit,
        onDataChange,
        downloadTemplate,
        initPerformanceInfo,
    } = store

    const performanceScoreTableColumns = useMemo(
        () => getPerformanceScoreTableColumns(mode === 'grade', onDataChange),
        [mode],
    )

    useSaasTitle(`${mode === 'view' ? '课堂表现-查看' : '课堂表现-评分'}`)
    useEffect(() => {
        initPerformanceInfo(scheduleCode, stepCode, mode !== 'grade')
    }, [scheduleCode, stepCode, mode])

    /**
     * 处理文件上传变化
     */
    const handleFileChange = (fileList: any[]) => {
        if (Array.isArray(fileList) && fileList.length > 0) {
            const latestFile = fileList[fileList.length - 1]
            const { response } = latestFile
            if (response?.url) {
                batchImport(scheduleCode, response.url, () => {
                    setUploading(false)
                    initPerformanceInfo(scheduleCode, stepCode, true)
                })
            }
        }
    }

    return (
        <div className={styles.page}>
            <CustomTitle title={`课堂表现${mode === 'view' ? '查看' : '评分'}`} marginBottom={32} />
            <div className={styles.content}>
                <div className={styles.performance_info}>
                    <Row style={{ marginBottom: 24 }}>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>课程：</span>
                                <Tooltip
                                    title={classPerformanceInfo.courseName}
                                    placement="topLeft"
                                >
                                    <span>{classPerformanceInfo.courseName}</span>
                                </Tooltip>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>班级：</span>
                                <Tooltip title={classPerformanceInfo.className} placement="topLeft">
                                    <span>{classPerformanceInfo.className}</span>
                                </Tooltip>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>学习任务：</span>
                                <Tooltip title={classPerformanceInfo.taskName} placement="topLeft">
                                    <span>{classPerformanceInfo.taskName}</span>
                                </Tooltip>
                            </div>
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: 32 }}>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>学习环节：</span>
                                <Tooltip title={classPerformanceInfo.stageName} placement="topLeft">
                                    <span>{classPerformanceInfo.stageName}</span>
                                </Tooltip>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.performance_info_item}>
                                <span>步骤：</span>
                                <Tooltip title={classPerformanceInfo.stepName} placement="topLeft">
                                    <span>{classPerformanceInfo.stepName}</span>
                                </Tooltip>
                            </div>
                        </Col>
                    </Row>
                </div>

                {mode === 'grade' && (
                    <div className={styles.performance_input_content}>
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
                                className={styles.performance_input_content_btn}
                            >
                                批量导入
                            </Button>
                        </GlobalUpload>
                        <div className={styles.performance_input_content_text}>
                            可下载
                            <span
                                onClick={() => {
                                    if (classPerformanceInfo.classCode) {
                                        downloadTemplate(classPerformanceInfo.classCode)
                                    }
                                }}
                            >
                                《课堂表现评分》
                            </span>
                            模版，填写后批量导入
                        </div>
                    </div>
                )}

                <BusinessTable
                    loading={isRequestPending}
                    search={false}
                    toolBar={false}
                    pagination={false}
                    columns={performanceScoreTableColumns}
                    dataSource={studentPerformanceList}
                    rowKey="studentCode"
                />

                {mode === 'grade' && (
                    <div className={styles.performance_score_submit_content}>
                        <Button
                            type="default"
                            onClick={() => {
                                history.replace(`/performance`)
                            }}
                        >
                            取消
                        </Button>
                        <Button
                            loading={isSubmitting}
                            type="primary"
                            onClick={() => {
                                setIsSubmitting(true)
                                batchSubmit(() => {
                                    setIsSubmitting(false)
                                })
                            }}
                        >
                            提交
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default inject('userStore')(observer(Index))
