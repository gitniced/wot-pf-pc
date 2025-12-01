import styles from './index.module.less'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { useEffect, useState } from 'react'
import CustomTitle from '@/components/CustomTitle'
import { history, useLocation, useParams } from 'umi'
import { Button, Col, Form, InputNumber, Row, Input } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { downloadFileByUrl } from '@/utils/file'
import OfficeOnlinePreview from '@/modules/office/components/OfficeOnlinePreview'
import { useSaasTitle } from '@wotu/wotu-components'
import Empty from '@/components/Empty'
const { TextArea } = Input

const Index: React.FC = () => {
    const { homeworkCode } = useParams<{ homeworkCode: string }>()
    const { query } = useLocation<{
        query: { mode: string; scheduleCode: string; homeworkCode: string; evaluationTask: string }
    }>()
    const { mode, scheduleCode, evaluationTask } = query || {}
    const store = useLocalObservable(() => new Store())

    const {
        getCourseClassInfo,
        getHomeworkBaseInfo,
        getCurrentStudentHomework,
        getStudentHomework,
        getHomeworkStudentList,
        onFormFinish,
        currentStudentHomework = {},
        homeworkStudentList = [],
        courseClassInfo = {},
        homeworkBaseInfo = {},
        studentHomework = {},
    } = store
    const { taskName, stageName, stepName, homeworkName } = homeworkBaseInfo || {}
    const { courseName, className } = courseClassInfo || {}

    // const [iframeMounted, setIframeMounted] = useState<boolean>(false)
    const [gradeAble, setGradeAble] = useState<boolean>(true)
    const [form] = Form.useForm()
    useSaasTitle(`${mode === 'view' ? '班级课后作业-查看' : '班级课后作业-批改'}`)
    useEffect(() => {
        getCourseClassInfo(scheduleCode)
    }, [scheduleCode])

    useEffect(() => {
        getHomeworkBaseInfo(homeworkCode)
    }, [homeworkCode])

    useEffect(() => {
        getHomeworkStudentList({
            scheduleCode,
            homeworkCode,
            status: mode === 'grade' ? 1 : 2,
        })
    }, [scheduleCode, homeworkCode])

    useEffect(() => {
        if (homeworkStudentList.length > 0) {
            getCurrentStudentHomework(evaluationTask)
        }
    }, [evaluationTask, homeworkStudentList])

    useEffect(() => {
        const { status, evaluationTask: studentEvaluationTask } = currentStudentHomework
        if (status) {
            // 已批改
            setGradeAble(false)
        } else {
            // 未批改
            setGradeAble(true)
        }
        getStudentHomework(studentEvaluationTask)
    }, [currentStudentHomework])

    useEffect(() => {
        form.resetFields()
    }, [gradeAble])

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
        <div className={styles.page}>
            <CustomTitle title={`课后作业${mode === 'view' ? '查看' : '批改'}`} marginBottom={32} />
            <div className={styles.content}>
                <div className={styles.task_exam_info}>
                    <Row style={{ marginBottom: 24 }}>
                        <Col span={8}>
                            <div className={styles.task_exam_info_item}>
                                <span>课程：</span>
                                <span>{courseName}</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.task_exam_info_item}>
                                <span>班级：</span>
                                <span>{className}</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.task_exam_info_item}>
                                <span>学习任务：</span>
                                <span>{taskName}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <div className={styles.task_exam_info_item}>
                                <span>学习环节：</span>
                                <span>{stageName}</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.task_exam_info_item}>
                                <span>步骤：</span>
                                <span>{stepName}</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.task_exam_info_item}>
                                <span>课后作业：</span>
                                <span>{homeworkName}</span>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className={styles.grade_content}>
                    {homeworkStudentList.length === 0 ? (
                        <Empty type={'component'} />
                    ) : (
                        <>
                            <div className={styles.grade_content_left}>
                                {homeworkStudentList.map(item => {
                                    return (
                                        <div
                                            key={item.evaluationTask}
                                            className={[
                                                styles.student_item,
                                                currentStudentHomework.evaluationTask ===
                                                item.evaluationTask
                                                    ? styles.active
                                                    : '',
                                            ].join(' ')}
                                            onClick={() => {
                                                history.push(
                                                    `/homework/${homeworkCode}/info?scheduleCode=${scheduleCode}&evaluationTask=${item.evaluationTask}&mode=${mode}`,
                                                )
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.grade_content_middle}>
                                {/* 成果预览 */}
                                <div className={styles.grade_content_gain_view}>
                                    {String(studentHomework.editFormat) === '1' ? (
                                        <OfficeOnlinePreview
                                            key={studentHomework.contentInfo}
                                            code={studentHomework.contentInfo}
                                            emptyComponent={getErrorContent}
                                            onMounted={() => {
                                                // setIframeMounted(true)
                                            }}
                                        />
                                    ) : null}

                                    {String(studentHomework.editFormat) === '2'
                                        ? getErrorContent({
                                              fileUrl: studentHomework.contentInfo || '',
                                              fileName: studentHomework.homeworkName || '',
                                              status: 'error',
                                          })
                                        : null}
                                </div>
                            </div>
                            <div className={styles.grade_content_right}>
                                <div className={styles.grade_content_right_title}>评分</div>
                                {mode === 'grade' && gradeAble ? (
                                    <div className={styles.grade_content_right_content}>
                                        <Form
                                            form={form}
                                            layout={'horizontal'}
                                            labelCol={{ span: 6 }}
                                            wrapperCol={{ span: 18 }}
                                            onFinish={values => {
                                                onFormFinish(
                                                    values,
                                                    scheduleCode,
                                                    evaluationTask,
                                                    homeworkCode,
                                                )
                                            }}
                                        >
                                            <Form.Item
                                                name={'score'}
                                                label={'得分'}
                                                rules={[{ required: true, message: '请输入得分' }]}
                                                extra={
                                                    '请输入0~100之间的分数，用于评价学生本次作业表现'
                                                }
                                            >
                                                <InputNumber
                                                    className={styles.form_item_input}
                                                    placeholder="请输入"
                                                    min={0}
                                                    max={100}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                name="comment"
                                                label={
                                                    <div className={styles.form_item_label}>
                                                        <div className={styles.label}>评语</div>
                                                    </div>
                                                }
                                            >
                                                <TextArea
                                                    className={styles.form_item_textarea}
                                                    placeholder={
                                                        '可填写对本次作业的点评建议或改进方向'
                                                    }
                                                    rows={5}
                                                    maxLength={255}
                                                />
                                            </Form.Item>
                                            <Form.Item label={' '} colon={false}>
                                                <Button type="primary" htmlType="submit">
                                                    提交
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                ) : null}

                                {mode === 'view' || !gradeAble ? (
                                    <div className={styles.grade_content_right_content}>
                                        <div className={styles.grade_item}>
                                            <div className={styles.grade_item_label}>得分：</div>
                                            <div className={styles.grade_item_score}>
                                                {currentStudentHomework?.score || 0}
                                            </div>
                                        </div>

                                        <div className={styles.comment_item}>
                                            <div className={styles.comment_item_label}>评语：</div>
                                            <div className={styles.comment_item_value}>
                                                {currentStudentHomework?.comment}
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default inject('userStore')(observer(Index))
