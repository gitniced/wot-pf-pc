import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import Left from './components/Left'
import type { ExamDetailType, QuestionListType } from './interface'
import http from '@/servers/http'
import { history } from 'umi'
import Top from './components/Top'
import QuestionComponent from './components/QuestionComponent'
import Topic from './components/Topic'
import { Button, message } from 'antd'
import { getCookie, getLocalStorage } from '@/storage'
import { findSiteData } from '@/utils/valueGet'
import useSiteStore from '@/hooks/useSiteStore'

const TestPaper = () => {
    const siteStore = useSiteStore()
    const { code } = history.location.query || {}
    // 试卷名称
    const [paperTitle, setPaperTitle] = useState<string>('')
    // 试卷详情
    const [examDetail, setExamDetail] = useState<ExamDetailType>()
    // 题目列表
    const [questionList, setQuestionList] = useState<QuestionListType[]>([])
    // 下载中
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' }) || ''
        document.title = `下载试卷-${siteName}`
    }, [])
    // 获取试卷详情
    const getPaperDetail = async () => {
        const res = (await http(
            `/exam/front/detail/${code}`,
            'get',
            {},
        )) as unknown as ExamDetailType
        const { jobName = '', jobLevel = '' } = res?.customContent?.commonJob || {}
        setPaperTitle(jobName + jobLevel + '试卷')
        setExamDetail(res)
    }
    // 获取题型分布详情
    const getQuestionList = async () => {
        const res = (await http(
            `/exam/front/get_question_detail/${code}`,
            'get',
            {},
        )) as unknown as QuestionListType[]
        setQuestionList(res)
    }
    useEffect(() => {
        if (code) {
            getPaperDetail()
            getQuestionList()
        }
    }, [code])

    // 下载试卷
    const downloadPaper = () => {
        setLoading(true)
        const sid = getLocalStorage('SID')
        const params = {
            url: window.location.href,
            fileName: paperTitle,
            pdfPrintBackground: false,
            customCookies: {
                [`token${sid}`]: getCookie('TOKEN'),
                [`userCode${sid}`]: getCookie('USER_CODE'),
                [`selectUserType${sid}`]: getCookie('SELECT_USER_TYPE'),
                [`selectOrgCode${sid}`]: getCookie('SELECT_ORG_CODE'),
            },
        }
        http('/exam_main/paper/download/pdf', 'post', params, { delayTime: 8000000 })
            .then((res: any) => {
                if (!res?.path) return
                message.success('下载成功')
                window.open(res.path)
            })
            .catch(() => {
                message.error('下载失败')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className={styles.test_paper}>
            <div className={styles.a4_page}>
                <Left />
                <div className={styles.a4_page_right}>
                    <Top
                        paperTitle={paperTitle}
                        examDetail={examDetail}
                        questionList={questionList}
                    />
                    {(questionList || []).map(item => {
                        const { questionType, questionList: questionItemList } = item || {}
                        return (
                            <React.Fragment key={questionType}>
                                <Topic examDetail={examDetail} questionItem={item} />
                                {(questionItemList || []).map(_item => {
                                    return (
                                        <QuestionComponent
                                            examDetail={examDetail}
                                            questionItem={_item}
                                            key={_item?.questionCode}
                                        />
                                    )
                                })}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>

            <Button
                className={styles.print_button}
                onClick={downloadPaper}
                type="primary"
                disabled={loading}
            >
                {loading ? '正在下载中...' : '点击下载'}
            </Button>
        </div>
    )
}
export default TestPaper
