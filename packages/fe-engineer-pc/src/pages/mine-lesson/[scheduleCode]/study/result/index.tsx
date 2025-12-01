import Breadcrumbs from '@/components/Breadcrumbs'
import { useEffect } from 'react'
import styles from './index.module.less'
import { useLocation, useParams } from 'umi'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import OfficeOnlinePreview from '@/modules/office/components/OfficeOnlinePreview'
import { downloadFileByUrl } from '@/utils/file'
import Empty from '@/components/Empty'
import { useSaasTitle } from '@wotu/wotu-components'

const Result = () => {
    useSaasTitle('教学-查看学习成果')
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const { query } = useLocation<{ activityCode: string; gainCode: string }>()
    const { activityCode, gainCode } = query || {}
    const store = useLocalObservable(() => new Store())
    const {
        studyGain,
        studentList,
        pendingCount,
        submittedCount,
        getSubmitterOutcome,
        getSubmitteds,
        updateCurrentStudent,
    } = store || {}

    useEffect(() => {
        if (scheduleCode && activityCode) {
            getSubmitteds(scheduleCode, activityCode)
        }
    }, [scheduleCode, activityCode])

    useEffect(() => {
        if (gainCode && studentList.length > 0) {
            const student = studentList.find(item => item.active)
            if (student) {
                getSubmitterOutcome(gainCode, student.submitterCode!)
            }
        }
    }, [gainCode, studentList])

    /**当前文件格式不支持在线预览 */
    const getErrorContent = ({
        fileUrl,
        fileName,
        status = 'empty',
    }: {
        fileUrl: string
        fileName: string
        status: 'empty' | 'error'
    }) => {
        return (
            <div className={styles.no_preview_content}>
                <div className={styles.no_preview} />
                {status === 'empty' ? (
                    <div className={styles.no_preview_text}>当前文件不存在</div>
                ) : null}

                {status === 'error' ? (
                    <>
                        <div className={styles.no_preview_text}>当前文件格式不支持在线预览</div>
                        <Button
                            type={'default'}
                            icon={<DownloadOutlined />}
                            onClick={() => {
                                downloadFileByUrl(fileUrl, fileName)
                            }}
                        >
                            下载
                        </Button>
                    </>
                ) : null}
            </div>
        )
    }

    return (
        <div className={styles.result_content}>
            <Breadcrumbs
                crumbData={[
                    { name: '教学', link: `/mine-lesson/${scheduleCode}/study/roadmap` },
                    {
                        name: '查看学习成果',
                        link: `/mine-lesson/${scheduleCode}/study/result?activityCode=${activityCode}&gainCode=${gainCode}`,
                    },
                ]}
            />

            <div className={styles.result_title_content}>
                <div className={styles.result_title}>成果名称：{studyGain?.name}</div>
                <div className={styles.result_info}>
                    <span>{pendingCount}</span>
                    待提交/
                    <span>{submittedCount}</span>
                    已提交
                </div>
            </div>

            {studentList.length > 0 ? (
                <>
                    <div className={styles.result_info_content}>
                        <div className={styles.result_info_content_left}>
                            {studentList.map(item => (
                                <div
                                    key={item.submitterCode}
                                    className={[
                                        styles.student_item,
                                        item.active ? styles.active : '',
                                    ].join(' ')}
                                    onClick={() => updateCurrentStudent(item)}
                                >
                                    {item.submitterName}
                                </div>
                            ))}
                        </div>
                        <div className={styles.result_info_content_right}>
                            {/* 成果预览 */}
                            <div className={styles.grade_content_gain_view}>
                                {studyGain?.editFormat === 1 ? (
                                    <OfficeOnlinePreview
                                        key={studyGain?.contentUrl || ''}
                                        code={studyGain?.contentUrl || ''}
                                        emptyComponent={getErrorContent}
                                        onMounted={() => {
                                            // setIframeMounted(true)
                                        }}
                                    />
                                ) : null}

                                {studyGain?.editFormat === 2
                                    ? getErrorContent({
                                          fileUrl: studyGain?.contentUrl || '',
                                          fileName: studyGain?.outcomeName || '',
                                          status: 'error',
                                      })
                                    : null}

                                {!studyGain && (
                                    <div className={styles.full_page}>
                                        {getErrorContent({
                                            fileUrl: '',
                                            fileName: '',
                                            status: 'empty',
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Empty type={'page'} />
            )}
        </div>
    )
}

export default inject('userStore')(observer(Result))
