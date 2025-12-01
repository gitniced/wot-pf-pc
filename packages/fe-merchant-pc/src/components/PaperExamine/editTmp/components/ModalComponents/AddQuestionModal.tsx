/**
 * 添加试题
 */
import { Space, Typography } from 'antd'
import QuestionTable from './QuestionTable'
import QuestionForm from './QuestionForm'
import useTableSearch from '../../hooks/useTableSearch'
import { history } from 'umi'
import { SyncOutlined } from '@ant-design/icons'
import { useContext, useEffect } from 'react'
import { ModalCallbackContext, ModalValueContext } from '@/components/ModalProvider'
import { ExamineEditValueContext } from '../../context'
import styles from './index.module.less'
import useUserStore from '@/hooks/useUserStore'
import { getCookie } from '@/storage'

const AddQuestionModal = () => {
    const userStore = useUserStore()

    const { code } = history.location.query || {}
    const { dataSource } = useContext(ModalValueContext)
    const { confirmValueCallback } = useContext(ModalCallbackContext)
    const { examDetail } = useContext(ExamineEditValueContext)
    const { jobNameCode, jobTypeCode, jobLevelCode } = examDetail?.customContent?.commonJob || {}
    const hooks = useTableSearch({
        searchUrl: `/exam/front/page_question/${code}`,
        initParams: {
            workName: jobNameCode,
            workType: jobTypeCode,
            workLevel: jobLevelCode,
            authenticateCode: examDetail?.authenticateCode,
            pointCode: dataSource?.pointCode,
            storageStartTime: examDetail?.receiptStartTime || undefined,
            storageEndTime: examDetail?.receiptEndTime || undefined,
            quoteNumStatus: examDetail?.quoteNumStatus,
            questionCitedLimit: examDetail?.questionCitedLimit,
            merchantCode: getCookie('SELECT_ORG_CODE'),
        },
    })

    useEffect(() => {
        confirmValueCallback?.(hooks.selectedRowKeys)
    }, [hooks.selectedRowKeys, confirmValueCallback])

    const handleRefresh = () => {
        hooks.formCallBack()
    }

    return (
        <>
            <QuestionForm callBack={hooks.formCallBack} />
            <Space size={10} style={{ margin: '8px 0 16px' }}>
                {/* TODO 跳转路由待确认 */}
                <span>
                    没有想添加的试题，
                    <Typography.Link href="/merchant-center/simulation/edit" target="_blank">
                        去新建
                    </Typography.Link>
                </span>
                <SyncOutlined onClick={handleRefresh} className={styles.icon_hover} />
            </Space>
            <QuestionTable hooks={hooks} />
        </>
    )
}

export default AddQuestionModal
