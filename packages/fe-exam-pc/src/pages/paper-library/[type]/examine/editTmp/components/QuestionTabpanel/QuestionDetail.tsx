/**
 * 试题详情
 */
import React, { useContext } from 'react'
import {
    ExamineAlert,
    ExamineItemCard,
} from '@/pages/paper-library/[type]/examine/list/components/PreviewModal'
import styles from '../../index.modules.less'
import { Popconfirm, Space, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import {
    ExamineEditCallbackContext,
    ExamineEditValueContext,
    ExamineTmpWrapperContext,
} from '../../context'
import { discriminationEnum } from '../../enums'
import { getCookie } from '@/storage'
import useCommonParams from '@/hooks/useCommonParams'
import dayjs from 'dayjs'

const QuestionDetail = () => {
    const { handleSaveScore, handleDeleteQuestion } = useContext(ExamineEditCallbackContext)
    const { questionList, examDetail } = useContext(ExamineEditValueContext)
    const { skill } = useCommonParams()
    // 当前页面是否为详情页
    const { isDetail } = useContext(ExamineTmpWrapperContext)

    return (
        <div className={styles.question_detail}>
            {questionList?.map(v => (
                <React.Fragment key={v.questionType}>
                    <ExamineAlert data={v} />
                    <ExamineItemCard
                        data={v}
                        editable={!isDetail && examDetail?.scoreType === 'single'}
                        changeScoreCallback={handleSaveScore}
                    >
                        {item => (
                            <div className={styles.question_card_bar}>
                                <div className={styles.space}>
                                    <div>难易程度：{item?.difficulty}</div>
                                    <div>
                                        区分度：
                                        {item?.customContent?.discrimination
                                            ? (discriminationEnum as any)[
                                            item.customContent?.discrimination
                                            ]
                                            : '--'}
                                    </div>
                                    <Tooltip title={item.point}>
                                        <div className={styles.ellipsis}>
                                            考评点：
                                            {item?.customContent?.authenticatePoint?.pointName ? (
                                                <Tooltip
                                                    title={
                                                        item?.customContent?.authenticatePoint
                                                            ?.pointName
                                                    }
                                                >
                                                    {
                                                        item?.customContent?.authenticatePoint
                                                            ?.pointName
                                                    }
                                                </Tooltip>
                                            ) : (
                                                '--'
                                            )}
                                        </div>
                                    </Tooltip>
                                </div>
                                {getCookie('ALIAS') === 'esh' && skill === 20 && <div>
                                    版本号：
                                    {item?.version || '--'}
                                    {item?.version ? `(${dayjs(item?.storageTime).format('YYYY-MM-DD HH:mm:ss')})` : ''}
                                </div>}
                                {!isDetail && (
                                    <Popconfirm
                                        title="确认删除该试题吗？"
                                        onConfirm={() => handleDeleteQuestion?.({ ...v, ...item })}
                                        getPopupContainer={triggerNode =>
                                            triggerNode.parentNode as HTMLElement
                                        }
                                        okText="确认"
                                        cancelText="取消"
                                    >
                                        <Space size={3} className={styles.question_card_opt}>
                                            <DeleteOutlined />
                                            <span>删除</span>
                                        </Space>
                                    </Popconfirm>
                                )}
                            </div>
                        )}
                    </ExamineItemCard>
                </React.Fragment>
            ))}
        </div>
    )
}

export default QuestionDetail
