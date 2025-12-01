/**
 * 编辑考试，模板
 */
import { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Card, Space, Tabs, message, Tooltip, Typography } from 'antd'
import ModalProvider from '@/components/ModalProvider'
import Header from './components/Header'
import AuthTabPane from './components/AuthTabPane'
import QuestionTabpanel from './components/QuestionTabpanel'
import FooterControl from '@/components/FooterControl'
import { config } from './config'
import http from '@/servers/http'
import {
    ExamineEditCallbackContext,
    ExamineEditValueContext,
    ExamineTmpWrapperContext,
} from './context'
import type { AuthDetailType, ExamineDetailType, PublishType } from './interface'
import { debounce } from 'lodash'
import type { QuestionDetailType } from '../list/interface'
import useModalControl from './hooks/useModalControl'
import { ModalType } from './enums'
import styles from './index.modules.less'
import Breadcrumbs from '@/components/Breadcrumbs'
import { InfoCircleOutlined } from '@ant-design/icons'
import { history, useParams } from 'umi'

import PaperCheckStore from '@/components/PaperCheck/store'
import { useLocalObservable, Observer } from 'mobx-react'
import useMasterHistory from '@/hooks/userMasterHistory'
import useUserStore from '@/hooks/useUserStore'
import type { QuestionRouteType } from '@/hooks/useCommonParams'
import useCommonParams from '@/hooks/useCommonParams'

const ExamineEditTmp = () => {
    const masterHistory = useMasterHistory()
    const userStore = useUserStore()

    const commonParams = useCommonParams()

    // 试卷详情
    const [examDetail, setExamDetail] = useState<ExamineDetailType>()
    // 鉴定点分布详情
    const [authDetail, setAuthDetail] = useState<AuthDetailType>()
    // 题型分布
    const [question, setQuestion] = useState<QuestionDetailType[]>([])
    // 高亮的tab
    const [activeKey, setActiveKey] = useState<'auth' | 'question'>('auth')

    // 重复试题组数
    const [totalGroup, setTotalGroup] = useState<number>()

    const paperCheckStore = useLocalObservable(() => PaperCheckStore)

    // code
    const { code } = masterHistory.location.query || {}
    const { type } = useParams() as { type: QuestionRouteType }

    const { isDetail } = useContext(ExamineTmpWrapperContext)

    // 获取试卷详情
    const getPaperDetail = async () => {
        const res = (await http(
            `/exam/front/detail/${code}`,
            'GET',
            {},
        )) as unknown as ExamineDetailType
        setExamDetail(res)
    }
    // 获取鉴定点分布详情
    const getAuthDetail = async () => {
        const res = (await http(
            `/exam/front/get_auth_detail/${code}`,
            'GET',
            {},
        )) as unknown as AuthDetailType
        setAuthDetail(res)
    }
    // 获取题型分布详情
    const getQuestionList = async () => {
        const res = (await http(
            `/exam/front/get_question_detail/${code}`,
            'get',
            {},
        )) as unknown as QuestionDetailType[]
        setQuestion(res)
    }

    const { handleClose, handleConfirm, modalData, setModalData } = useModalControl(
        code as string,
        setExamDetail as React.Dispatch<React.SetStateAction<ExamineDetailType>>,
        getPaperDetail,
        getAuthDetail,
        getQuestionList,
    )

    // 打开弹窗
    const showModal = (type: ModalType, data: any) => {
        setModalData({ visible: true, dataSource: data, type })
    }
    // 改变tab
    const changeTab = (key: string) => {
        setActiveKey(key as 'auth' | 'question')
    }

    // 试卷发布
    const handlePublish = async () => {
        const res = (await http('/exam/front/update_publish', 'post', {
            paperCode: code,
            state: 1,
            ...commonParams,
        })) as unknown as PublishType
        if (res.success) {
            message.success('发布成功')
            masterHistory.push(`/merchant-center/paper-library/${type}/examine/list`)
        } else {
            setModalData({ visible: true, dataSource: res.failReasons, type: ModalType.PUBLISH })
        }
    }

    // 保存分数
    const handleSaveScore = useCallback(
        (value, item) => {
            // 乐观分数保存成功
            const list = question.reduce((pre, cur, index) => {
                pre.push(cur)
                if (cur.questionType === item.questionType) {
                    pre[index].questionList = pre[index]?.questionList?.map(Item => {
                        if (Item.questionCode === item.questionCode) {
                            return { ...Item, score: value }
                        } else return Item
                    })
                }
                return pre
            }, [] as QuestionDetailType[])
            setQuestion(list)
            debounce(() => {
                const { code: userCode } = userStore?.userData || {}

                http('/exam/front/set_question_score', 'post', {
                    paperCode: code,
                    questionCode: item.questionCode,
                    questionType: item.questionType,
                    score: Number(value),
                    userCode,
                    ...commonParams,
                }).finally(() => {
                    getPaperDetail()
                    getQuestionList()
                })
            }, 500)()
        },
        [code, question],
    )

    // 删除考题
    const handleDeleteQuestion = useCallback(
        item => {
            const { code: userCode } = userStore?.userData || {}
            http('/exam/front/delete_question', 'post', [
                {
                    paperCode: code,
                    questionCode: item.questionCode,
                    questionType: item.questionType,
                    userCode,
                    ...commonParams,
                },
            ]).then(() => {
                getPaperDetail()
                getAuthDetail()
                getQuestionList()
                message.success('删除成功')
            })
        },
        [code],
    )

    // 考试详情
    useEffect(() => {
        if (!code) return
        Promise.allSettled([
            http(`/exam/front/get_auth_detail/${code}`, 'GET', {}),
            http(`/exam/front/detail/${code}`, 'GET', {}),
            http(`/exam/front/get_question_detail/${code}`, 'get', {}),
        ]).then((res: any) => {
            const [auth, detail, que] = res || []

            if (auth.status === 'fulfilled') {
                setAuthDetail(auth.value)
            }
            if (detail.status === 'fulfilled') {
                if (detail.value?.composition === 'authenticate') {
                    setActiveKey('auth')
                } else {
                    setActiveKey('question')
                }
                setExamDetail(detail.value)
            }
            if (que.status === 'fulfilled') {
                setQuestion(que.value)
            }
        })

        paperCheckStore
            .getRepeatedPapaerDetail({ sourceCode: code, sourceFunction: 'exam' })
            .then((_totalGroup: any) => {
                setTotalGroup(_totalGroup)
            })
    }, [code])

    // 重复试题信息
    const renderRepeatDetail = () => {
        return (
            <div className={styles.repeat_detail}>
                <Space size={0}>
                    <Tooltip title="题目/题干内容完全一致视的若干试题视为1组">
                        重复试题
                        <InfoCircleOutlined />：
                    </Tooltip>
                    <Typography.Text type="secondary">{totalGroup} 组</Typography.Text>
                </Space>
                {totalGroup! > 0 && (
                    <Typography.Link
                        className={styles.link}
                        onClick={() =>
                            history.push(
                                `/paper-library/${type}/check?code=${code}&is_detail=${isDetail}`,
                            )
                        }
                    >
                        详情
                    </Typography.Link>
                )}
            </div>
        )
    }

    return (
        <Observer>
            {() => (
                <div className={styles.examine_wrapper}>
                    <div className={styles.examine_wrapper_inner}>
                        <Breadcrumbs
                            crumbData={[
                                { link: `/paper-library/${type}/examine/list`, name: '模拟卷库' },
                                { link: '', name: `${isDetail ? '查看试卷结构' : '编辑试卷'}` },
                            ]}
                        />
                        <div className={styles.examine_edit} id="examine_edit">
                            <ExamineEditValueContext.Provider
                                value={{ questionList: question, examDetail }}
                            >
                                <ExamineEditCallbackContext.Provider
                                    value={{
                                        openModal: showModal,
                                        handleSaveScore,
                                        handleDeleteQuestion,
                                    }}
                                >
                                    <Card className={styles.header}>
                                        <Header data={examDetail} />
                                    </Card>
                                    <Card className={styles.main}>
                                        <Tabs
                                            activeKey={activeKey}
                                            onChange={changeTab}
                                            tabBarExtraContent={renderRepeatDetail()}
                                        >
                                            {/* 只有选择了【按键定点组卷】，才会显示本菜单 */}
                                            {examDetail?.composition === 'authenticate' && (
                                                <Tabs.TabPane tab="鉴定点分布详情" key="auth">
                                                    <AuthTabPane data={authDetail} />
                                                </Tabs.TabPane>
                                            )}

                                            <Tabs.TabPane tab="题型分布详情" key="question">
                                                <QuestionTabpanel />
                                            </Tabs.TabPane>
                                        </Tabs>
                                    </Card>
                                    <FooterControl>
                                        <Space size={16}>
                                            <Button
                                                onClick={() =>
                                                    masterHistory.push(
                                                        `/merchant-center/paper-library/${type}/examine/list`,
                                                    )
                                                }
                                            >
                                                返回列表
                                            </Button>
                                            {!isDetail && (
                                                <Button type="primary" onClick={handlePublish}>
                                                    发布
                                                </Button>
                                            )}
                                        </Space>
                                    </FooterControl>
                                </ExamineEditCallbackContext.Provider>
                                {modalData.visible && (
                                    <ModalProvider
                                        {...modalData}
                                        config={config}
                                        handleClose={handleClose}
                                        handleConfirm={handleConfirm}
                                    />
                                )}
                            </ExamineEditValueContext.Provider>
                        </div>
                    </div>
                </div>
            )}
        </Observer>
    )
}

export default ExamineEditTmp
