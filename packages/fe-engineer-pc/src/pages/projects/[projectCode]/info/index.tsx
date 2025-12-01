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
const { TextArea } = Input

const Index: React.FC = () => {
    const { projectCode } = useParams<{ projectCode: string }>()
    const { query } = useLocation<{
        query: { mode: string; scheduleCode: string; projectCode: string; evaluationTask: string }
    }>()
    const { mode, scheduleCode, evaluationTask } = query || {}
    const store = useLocalObservable(() => new Store())

    const {
        getCurrentStudentEvaluation,
        getTaskExamProjectStudentList,
        getTaskExamProjectInfo,
        getCourseClassInfo,
        getProjectOutcomes,
        getCriteria,
        onFormFinish,
        currentStudentEvaluation = {},
        taskExamProjectStudentList = [],
        taskExamProjectInfo = {},
        courseClassInfo = {},
        projectOutcomes = [],
        currentProjectOutcomes = {},
        criteriaList = [],
    } = store
    const { taskName, projectName } = taskExamProjectInfo || {}
    const { courseName, className } = courseClassInfo || {}

    // const [iframeMounted, setIframeMounted] = useState<boolean>(false)
    const [gradeAble, setGradeAble] = useState<boolean>(true)
    const [form] = Form.useForm()
    useSaasTitle(`${mode === 'view' ? '班级任务考核-查看' : '班级任务考核-评分'}`)
    useEffect(() => {
        getCourseClassInfo(scheduleCode)
    }, [scheduleCode])

    useEffect(() => {
        getTaskExamProjectInfo(projectCode)
        getCriteria(projectCode)
    }, [projectCode])

    useEffect(() => {
        if (scheduleCode && projectCode) {
            getTaskExamProjectStudentList({
                scheduleCode,
                projectCode,
                status: mode === 'grade' ? 0 : 1,
            })
        }
    }, [scheduleCode, projectCode])

    useEffect(() => {
        if (taskExamProjectStudentList.length > 0) {
            const currentStudent = taskExamProjectStudentList.find(
                item => item.evaluationTask === evaluationTask,
            )
            if (currentStudent) {
                const { userCode, status } = currentStudent
                if (status) {
                    // 已评分
                    setGradeAble(false)
                } else {
                    // 未评分
                    setGradeAble(true)
                    form.resetFields()
                }
                getProjectOutcomes(scheduleCode, userCode!, projectCode)
                getCurrentStudentEvaluation(userCode!, projectCode)
            }
        }
    }, [scheduleCode, evaluationTask, projectCode, taskExamProjectStudentList])

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
            <CustomTitle title={`考核项目${mode === 'view' ? '查看' : '评分'}`} marginBottom={32} />
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
                                <span>考核项目：</span>
                                <span>{projectName}</span>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className={styles.grade_content}>
                    <div className={styles.grade_content_left}>
                        {taskExamProjectStudentList.map(item => {
                            return (
                                <div
                                    key={item.evaluationTask}
                                    className={[
                                        styles.student_item,
                                        evaluationTask === item.evaluationTask ? styles.active : '',
                                    ].join(' ')}
                                    onClick={() => {
                                        history.push(
                                            `/projects/${projectCode}/info?scheduleCode=${scheduleCode}&evaluationTask=${item.evaluationTask}&mode=${mode}`,
                                        )
                                    }}
                                >
                                    {item.name}
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.grade_content_middle}>
                        {/* 成果选择 */}
                        <div className={styles.grade_content_gain}>
                            <div className={styles.grade_content_gain_label}>Ta的学习成果：</div>
                            {projectOutcomes.map(item => {
                                return (
                                    <div
                                        key={item.outcomeCode}
                                        className={[
                                            styles.grade_content_gain_value,
                                            currentProjectOutcomes.outcomeCode === item.outcomeCode
                                                ? styles.active
                                                : '',
                                        ].join(' ')}
                                        onClick={() => {
                                            store.currentProjectOutcomes = item
                                        }}
                                    >
                                        {item.outcomeName}
                                    </div>
                                )
                            })}
                        </div>
                        {/* 成果预览 */}
                        <div className={styles.grade_content_gain_view}>
                            {currentProjectOutcomes.editFormat === 1 ? (
                                <OfficeOnlinePreview
                                    key={currentProjectOutcomes.contentUrl || ''}
                                    code={currentProjectOutcomes.contentUrl || ''}
                                    emptyComponent={getErrorContent}
                                    onMounted={() => {
                                        // setIframeMounted(true)
                                    }}
                                />
                            ) : null}

                            {currentProjectOutcomes.editFormat === 2
                                ? getErrorContent({
                                      fileUrl: currentProjectOutcomes.contentUrl || '',
                                      fileName: currentProjectOutcomes.outcomeName || '',
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
                                    layout="vertical"
                                    onFinish={values => {
                                        onFormFinish(values, evaluationTask, projectCode)
                                    }}
                                >
                                    {criteriaList.map(item => {
                                        return (
                                            <Form.Item
                                                key={item.code}
                                                name={item.code}
                                                label={
                                                    <div className={styles.form_item_label}>
                                                        <div className={styles.label}>
                                                            {item.evaluatedRubric}({item.weight})
                                                        </div>
                                                        <div className={styles.desc}>
                                                            {item.evaluatorCriteria}
                                                        </div>
                                                    </div>
                                                }
                                                rules={[{ required: true, message: '请输入评分' }]}
                                                required={false}
                                            >
                                                <InputNumber
                                                    className={styles.form_item_input}
                                                    placeholder="请输入"
                                                    min={0}
                                                    max={item.weight}
                                                />
                                            </Form.Item>
                                        )
                                    })}

                                    <Form.Item
                                        name="comment"
                                        label={
                                            <div className={styles.form_item_label}>
                                                <div className={styles.label}>
                                                    {/* <span className={styles.label_required}>*</span> */}
                                                    评语
                                                </div>
                                            </div>
                                        }
                                        rules={[{ required: true, message: '请输入评语' }]}
                                        required={true}
                                    >
                                        <TextArea
                                            className={styles.form_item_textarea}
                                            placeholder={'可填写对本次作业的点评建议或改进方向'}
                                            rows={5}
                                            maxLength={255}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className={styles.form_item_btn}
                                        >
                                            提交
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        ) : null}

                        {mode === 'view' || !gradeAble ? (
                            <div className={styles.grade_content_right_content}>
                                {currentStudentEvaluation.criterionScores?.map?.((item: any) => {
                                    return (
                                        <div key={item.code} className={styles.grade_item}>
                                            <div className={styles.grade_item_label}>
                                                {item.evaluatedRubric}({item.weight}%)
                                            </div>
                                            <div className={styles.grade_item_score}>
                                                {item?.score || 0}
                                            </div>
                                        </div>
                                    )
                                })}

                                <div className={styles.comment_item}>
                                    <div className={styles.comment_item_label}>评语</div>
                                    <div className={styles.comment_item_value}>
                                        {currentStudentEvaluation?.comment}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject('userStore')(observer(Index))
