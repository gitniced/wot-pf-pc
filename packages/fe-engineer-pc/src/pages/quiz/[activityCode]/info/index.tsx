import styles from './index.module.less'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { useEffect } from 'react'
import CustomTitle from '@/components/CustomTitle'
import { useLocation, useParams } from 'umi'
import { Col, Form, InputNumber, Row, Input, Button } from 'antd'
import SwitchQuesRender from '@/modules/question/render/SwitchQuesRender'
import { useSaasTitle } from '@wotu/wotu-components'
import classNames from 'classnames'
import { QUESTION_TYPE } from '@/modules/question/const'
import { sortQuestionsByType } from '@/utils/questionSort'

const Index: React.FC = () => {
    const { activityCode } = useParams<{ activityCode: string }>()
    const { query } = useLocation<{
        query: { mode: string; scheduleCode: string; activityCode: string; stuCode: string }
    }>()
    const { mode, scheduleCode, stuCode } = query || {}
    const store = useLocalObservable(() => new Store())

    const {
        getCourseClassInfo,
        getHomeworkBaseInfo,
        setCurrentStudent,
        getStudentHomework,
        getHomeworkStudentList,
        onFormFinish,
        studentHomework,
        currentStudent = {},
        homeworkStudentList = [],
        courseClassInfo = {},
        homeworkBaseInfo = {},
    } = store
    const { taskName, stageName, stepName, activityName } = homeworkBaseInfo || {}
    const { courseName, className } = courseClassInfo || {}

    // const [iframeMounted, setIframeMounted] = useState<boolean>(false)
    const [form] = Form.useForm()

    useSaasTitle(`课堂测验${mode === 'view' ? '查看' : '批改'}`)
    useEffect(() => {
        getCourseClassInfo(scheduleCode)
    }, [scheduleCode])

    useEffect(() => {
        getHomeworkBaseInfo({ activityCode, scheduleCode })
    }, [activityCode, scheduleCode])

    useEffect(() => {
        getHomeworkStudentList({
            scheduleCode,
            activityCode,
            mode,
        })
    }, [scheduleCode, activityCode, stuCode])

    useEffect(() => {
        if (homeworkStudentList.length > 0) {
            setCurrentStudent(stuCode)
        }
    }, [stuCode, homeworkStudentList])

    useEffect(() => {
        const { stuCode: studentCode } = currentStudent
        console.log('studentCode', currentStudent)
        if (studentCode) {
            getStudentHomework({ studentCode, activityCode, type: mode === 'grade' ? 2 : 1 })
        }
    }, [currentStudent])

    useEffect(() => {
        if (!studentHomework.questionList) return
        form.setFieldsValue({ grade: sortQuestionsByType(studentHomework.questionList) })
    }, [studentHomework])

    // 设置 #grade_content 为屏幕剩余空间高度，允许滚动
    useEffect(() => {
        const container = document.getElementById('grade_content')
        if (!container) return
        const applyHeight = () => {
            const rect = container.getBoundingClientRect()
            const bottomPadding = 48 // 与页面下内边距保持一致
            const height = window.innerHeight - rect.top - bottomPadding
            container.style.height = `${Math.max(height, 200)}px`
            container.style.overflow = 'auto'
        }
        applyHeight()
        window.addEventListener('resize', applyHeight)
        return () => window.removeEventListener('resize', applyHeight)
    }, [])

    return (
        <div className={styles.page}>
            <CustomTitle title={`课堂测验${mode === 'view' ? '查看' : '批改'}`} marginBottom={32} />
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
                                <span>活动：</span>
                                <span>{activityName}</span>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className={styles.grade_content} id="grade_content">
                    <div className={styles.grade_content_left}>
                        {homeworkStudentList.map(item => {
                            return (
                                <div
                                    key={item.stuCode}
                                    className={[
                                        styles.student_item,
                                        currentStudent.stuCode === item.stuCode
                                            ? styles.active
                                            : '',
                                    ].join(' ')}
                                    onClick={() => {
                                        setCurrentStudent(item.stuCode)
                                    }}
                                >
                                    {item.stuName}
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.grade_content_middle}>
                        <Form
                            form={form}
                            labelCol={{ span: 4 }}
                            onFinish={values =>
                                onFormFinish(values, stuCode, activityCode, scheduleCode)
                            }
                        >
                            <Form.List name="grade">
                                {fields => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => {
                                            const { fieldKey } = restField
                                            const data: any = form.getFieldValue([
                                                'grade',
                                                fieldKey,
                                            ])
                                            return (
                                                <div className={styles.ques_container} key={key}>
                                                    <SwitchQuesRender
                                                        data={data}
                                                        showType
                                                        showAnalysis
                                                        correct={
                                                            studentHomework?.commentList?.filter(
                                                                item =>
                                                                    item.questionCode === data.code,
                                                            )?.[0]
                                                        }
                                                        answerData={
                                                            studentHomework?.answerList?.filter(
                                                                item =>
                                                                    item.questionCode === data.code,
                                                            )?.[0]
                                                        }
                                                        wrapperRender={
                                                            mode === 'grade'
                                                                ? (child: any, index?: number) => {
                                                                      return (
                                                                          <div
                                                                              className={classNames(
                                                                                  styles.ques_wrapper,
                                                                                  {
                                                                                      [styles.sub_ques]:
                                                                                          [
                                                                                              QUESTION_TYPE.combination,
                                                                                              QUESTION_TYPE.case,
                                                                                          ].includes(
                                                                                              data.type,
                                                                                          ),
                                                                                  },
                                                                              )}
                                                                          >
                                                                              <div
                                                                                  className={
                                                                                      styles.ques_info
                                                                                  }
                                                                              >
                                                                                  {child}
                                                                              </div>
                                                                              {mode !== 'view' && (
                                                                                  <div
                                                                                      className={
                                                                                          styles.ques_grade
                                                                                      }
                                                                                  >
                                                                                      <Form.Item
                                                                                          {...restField}
                                                                                          name={
                                                                                              typeof index ===
                                                                                              'number'
                                                                                                  ? [
                                                                                                        name,
                                                                                                        'subQuestions',
                                                                                                        index,
                                                                                                        'score',
                                                                                                    ]
                                                                                                  : [
                                                                                                        name,
                                                                                                        'score',
                                                                                                    ]
                                                                                          }
                                                                                          label="得分"
                                                                                          rules={[
                                                                                              {
                                                                                                  required:
                                                                                                      true,
                                                                                                  message:
                                                                                                      '请输入得分',
                                                                                              },
                                                                                          ]}
                                                                                          extra="请输入0~100之间的分数，用于评价学生本题表现"
                                                                                      >
                                                                                          <InputNumber
                                                                                              min={
                                                                                                  0
                                                                                              }
                                                                                              max={
                                                                                                  100
                                                                                              }
                                                                                              precision={
                                                                                                  0
                                                                                              }
                                                                                              style={{
                                                                                                  width: 120,
                                                                                              }}
                                                                                              placeholder="请输入得分"
                                                                                          />
                                                                                      </Form.Item>
                                                                                      <Form.Item
                                                                                          {...restField}
                                                                                          name={
                                                                                              typeof index ===
                                                                                              'number'
                                                                                                  ? [
                                                                                                        name,
                                                                                                        'subQuestions',
                                                                                                        index,
                                                                                                        'remark',
                                                                                                    ]
                                                                                                  : [
                                                                                                        name,
                                                                                                        'remark',
                                                                                                    ]
                                                                                          }
                                                                                          label="评语"
                                                                                          rules={[
                                                                                              {
                                                                                                  required:
                                                                                                      false,
                                                                                              },
                                                                                          ]}
                                                                                      >
                                                                                          <Input.TextArea
                                                                                              rows={
                                                                                                  4
                                                                                              }
                                                                                              placeholder="可填写对本题作答的点评建议或改进方向"
                                                                                              maxLength={
                                                                                                  255
                                                                                              }
                                                                                          />
                                                                                      </Form.Item>
                                                                                  </div>
                                                                              )}
                                                                          </div>
                                                                      )
                                                                  }
                                                                : undefined
                                                        }
                                                    />
                                                </div>
                                            )
                                        })}
                                    </>
                                )}
                            </Form.List>
                            {mode === 'grade' && (
                                <div className={styles.footer_wrapper}>
                                    <Button type="primary" htmlType="submit">
                                        提交
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject('userStore')(observer(Index))
