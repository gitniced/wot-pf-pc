/**
 * 试卷设置
 */
import type { FC } from 'react'
import { Space, Tooltip, Typography } from 'antd'
import { useContext } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import type { ExamineDetailType } from '../../interface'
import { PaperSettingEnum, scoreTypeEnum, ModalType } from '../../enums'
import { ExamineEditCallbackContext, ExamineTmpWrapperContext } from '../../context'
import styles from '../../index.modules.less'

dayjs.extend(duration)

const PaperSettingCard: FC<{
    data?: ExamineDetailType
}> = props => {
    const { data } = props
    const { openModal } = useContext(ExamineEditCallbackContext)
    // 当前页面是否为详情页
    const { isDetail } = useContext(ExamineTmpWrapperContext)

    // 编辑或查看注意事项
    const handleEditPrecautions = () => {
        if (isDetail) {
            return openModal?.(ModalType.VIEW_NOTE, { ...data, isDetail })
        } else return openModal?.(ModalType.NOTE, { ...data, isDetail })
    }
    // 题型要求
    const handleShowRequire = () => {
        return openModal?.(ModalType.QUESTION_REQUIRE, data)
    }
    // 题型分值详情
    const handleShowDetail = () => {
        const list = data?.questionConfigList.map(item => {
            const { needNumber, score } = item || {}
            return {
                ...item,
                totalScore: Number((Number(needNumber) * Number(score)).toFixed(1)),
            }
        })
        return openModal?.(ModalType.SCORE_DETAIL, list)
    }

    /**
     * 考卷设置
     * @param randomQuestionState 是否随机生成试卷
     * @param randomQuestionNum 随机抽取的试题数
     * @param savedQuestionTotal 试卷总数
     * @returns
     */
    const getPaperSet = (
        randomQuestionState: number = 0,
        randomQuestionNum?: number,
        savedQuestionTotal?: number,
    ) => {
        const [text, tips] = PaperSettingEnum.get(randomQuestionState) || []

        return (
            <div>
                {text}，共{randomQuestionState === 1 ? randomQuestionNum : savedQuestionTotal}题
                <Tooltip title={tips}>
                    <ExclamationCircleOutlined />
                </Tooltip>
            </div>
        )
    }

    return (
        <div className={styles.card} style={{ flex: '2 1 0%' }}>
            <div className={styles.card_title}>
                试卷设置
                <div className={styles.shadow} />
            </div>
            <div className={styles.card_content}>
                <div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>建议作答时间：</div>
                        <div className={styles.value}>
                            {data?.suggestedTime ? (
                                <div>
                                    {data?.suggestedTime ? data?.suggestedTime : '-'}分钟
                                    <Tooltip title="实际考试时可直接使用试卷建议作答时间，也可以重新设置考试时间">
                                        <ExclamationCircleOutlined />
                                    </Tooltip>
                                </div>
                            ) : (
                                '-'
                            )}
                        </div>
                    </div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>注意事项：</div>
                        <div className={styles.value}>
                            <Space size={8}>
                                <span>{data?.precautions ? '已设置' : '未设置'}</span>
                                <Typography.Link onClick={handleEditPrecautions}>
                                    {isDetail ? '详情' : '编辑'}
                                </Typography.Link>
                            </Space>
                        </div>
                    </div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>高级设置：</div>
                        <div className={styles.value}>{data?.advancedConfig || '-'}</div>
                    </div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>试题入库时间：</div>
                        <div className={styles.value}>
                            {data?.receiptStartTime
                                ? `${dayjs(data?.receiptStartTime).format('YYYY-MM-DD')}至 ${
                                      data?.receiptEndTime
                                          ? dayjs(data?.receiptEndTime).format('YYYY-MM-DD')
                                          : '不限'
                                  }`
                                : '不限'}
                        </div>
                    </div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>试题引用次数：</div>
                        <div className={styles.value}>
                            {data?.quoteNumStatus ? `不超过${data?.questionCitedLimit}次` : '不限'}
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>试卷题数：</div>
                        <div className={styles.value}>
                            <Space size={8}>
                                <span>{data?.savedQuestionTotal}题</span>
                                <Typography.Link onClick={handleShowRequire}>
                                    题型要求
                                </Typography.Link>
                            </Space>
                        </div>
                    </div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>考卷设置：</div>
                        <div className={styles.value}>
                            {getPaperSet(
                                data?.randomQuestionState,
                                data?.randomQuestionNum,
                                data?.savedQuestionTotal,
                            )}
                        </div>
                    </div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>分值设置：</div>
                        <div className={styles.value}>
                            {data?.scoreType && (scoreTypeEnum as any)[data?.scoreType] ? (
                                <Space size={8}>
                                    <span>
                                        {(scoreTypeEnum as any)[data?.scoreType]}
                                        {data?.scoreType === 'unification' && (
                                            <span>，每题 {data?.unificationScore} 分</span>
                                        )}
                                    </span>
                                    {data?.scoreType === 'single' && !isDetail && (
                                        <span className={styles.tip}>
                                            请在下方题型分布详情中设置
                                        </span>
                                    )}
                                    {data?.scoreType === 'questiontype' && (
                                        <Typography.Link onClick={handleShowDetail}>
                                            详情
                                        </Typography.Link>
                                    )}
                                </Space>
                            ) : (
                                '-'
                            )}
                        </div>
                    </div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>考卷总分：</div>
                        <div className={styles.value}>
                            {data?.scoreTotal ? `${data?.scoreTotal}` : '暂无数据'}
                        </div>
                    </div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>及格线：</div>
                        <div className={styles.value}>{data?.qualifiedProp || '-'}%</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaperSettingCard
