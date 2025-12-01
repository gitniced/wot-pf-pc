import { Table, Tag, Tooltip, Image, Input, Badge, Typography } from 'antd'
import React, { useState } from 'react'
import styles from './index.module.less'
import {
    templateTypeName,
    compositionType,
    scoreSetType,
    questionStructureType,
    isRandomPaperType,
    isEditStateType,
    questionType,
    lackQuestionType,
} from './const'
import getColumns from './getColumns'
import Summary from '../Summary'
import { InfoCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import type { DetailContentProps } from './interface'
import {
    COMPOSITION_WAY,
    QUESTION_STRUCTURE_TYPE,
    SCORE_SETTING_TYPE,
} from '@/components/PaperExamine/const'

const { TextArea } = Input

const DetailContent = (props: DetailContentProps) => {
    const { isEdit, formData, setFormData } = props || {}

    const [imgVisible, setImgVisible] = useState<boolean>(false) // 查看应用场景
    /** 应用场景照片 */
    const imgSrc = 'https://static.zpimg.cn/public/fe-merchant-pc/application_scenarios.png'

    const {
        templateType,
        templateTitle,
        composition = '',
        authenticateTitle,
        scoreType = '',
        unificationScore,
        qualifiedProp,
        questionStructure = '',
        questionConfigList = [],
        questionTypeLeast,
        questionTotal,
        randomQuestionState = 0,
        randomQuestionNum,
        chaosOrderState,
        chaosOptionsState,
        numContinuousState,
        receiptStartTime,
        receiptEndTime,
        quoteNumStatus,
        questionCitedLimit,
        suggestedTime,
        precautions,
        canEditState = 0,
    } = formData || {}

    // 注意事项发生改变
    const precautionsChange = (e: any) => {
        const value = e.target.value || ''
        setFormData((v: any) => ({ ...v, precautions: value }))
    }

    return (
        <div className={styles.detail_content}>
            {isEdit && (
                <div className={styles.title_bold}>
                    <Badge status="success" text={`${templateTypeName[templateType]}：`} />
                    <span>{templateTitle}</span>
                </div>
            )}
            <div className={styles.description_item}>
                <label className={styles.required}>组卷方式：</label>
                <div>
                    <span className={styles.info}>{compositionType[composition]?.value}</span>
                    <p className={styles.describe}>{compositionType[composition]?.describe}</p>
                </div>
            </div>
            {composition === COMPOSITION_WAY.AUTHENTICATE && (
                <div className={styles.description_item}>
                    <label className={styles.required}>要素细目表：</label>
                    <span className={styles.info}>{authenticateTitle}</span>
                </div>
            )}
            <div className={styles.description_item}>
                <label className={styles.required}>分值设置：</label>
                <span className={styles.info}>{scoreSetType[scoreType]}</span>
            </div>
            {scoreType === SCORE_SETTING_TYPE.UNIFICATION && (
                <div className={styles.description_item}>
                    <label className={styles.required}>单题统一分值：</label>
                    <span className={styles.info}>{unificationScore}分</span>
                </div>
            )}
            <div className={styles.description_item}>
                <label className={styles.required}>合格线：</label>
                <span className={styles.info}>{qualifiedProp}%</span>
            </div>
            <div className={styles.description_item}>
                <label className={[styles.required, styles.no_shrink].join(' ')}>题型结构：</label>
                <div className={styles.grow}>
                    <span className={styles.info}>{questionStructureType[questionStructure]}</span>
                    {questionStructure !== QUESTION_STRUCTURE_TYPE.RULES && (
                        <>
                            <Table
                                bordered
                                rowKey="questionType"
                                className={styles.table}
                                columns={getColumns({ scoreType, isEdit })}
                                dataSource={questionConfigList}
                                pagination={false}
                                summary={(pageData: any) => (
                                    <Summary scoreType={scoreType} pageData={pageData} />
                                )}
                            />
                            {isEdit && lackQuestionType(questionConfigList).length > 0 && (
                                <span className={styles.table_extra}>
                                    {lackQuestionType(questionConfigList).join('、')}
                                    数量不足，请先前往题库添加
                                </span>
                            )}
                        </>
                    )}
                </div>
            </div>
            {questionStructure === QUESTION_STRUCTURE_TYPE.RULES && (
                <div className={styles.description_item}>
                    <label className={styles.required}>规则设置：</label>
                    <div>
                        <div>
                            {questionConfigList.map(item => (
                                <Tag key={item?.questionType}>
                                    {questionType[item?.questionType]}
                                </Tag>
                            ))}
                        </div>
                        <p className={styles.describe}>
                            以上勾选题型至少抽取{questionTypeLeast}种，总题数至少{questionTotal}题
                        </p>
                    </div>
                </div>
            )}
            <div className={styles.description_item}>
                <label className={styles.required}>
                    建议作答时间
                    <Tooltip title="实际考试时可直接使用试卷建议作答时间，也可以重新设置考试时间">
                        <InfoCircleOutlined />
                    </Tooltip>
                    ：
                </label>
                <span className={styles.info}>{suggestedTime} 分钟</span>
            </div>
            <div className={styles.description_item}>
                <label className={[styles.no_required, styles.no_shrink].join(' ')}>
                    注意事项：
                </label>
                <div className={styles.grow}>
                    <TextArea
                        rows={6}
                        placeholder={!isEdit || !canEditState ? '' : '请输入'}
                        value={precautions}
                        disabled={!isEdit || !canEditState}
                        maxLength={500}
                        onChange={precautionsChange}
                    />
                    <Typography.Link onClick={() => setImgVisible(true)}>
                        查看应用场景
                    </Typography.Link>
                    <Image
                        style={{ display: 'none' }}
                        src={imgSrc}
                        preview={{
                            visible: imgVisible,
                            src: imgSrc,
                            onVisibleChange: value => {
                                setImgVisible(value)
                            },
                        }}
                    />
                    {!isEdit && (
                        <div className={styles.allow_edit}>
                            <span className={styles.required}>允许编辑：</span>
                            <span>{isEditStateType[canEditState]}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.description_item}>
                <label className={styles.required}>高级设置：</label>
                <div>
                    <p className={styles.info}>
                        {isRandomPaperType[randomQuestionState]}
                        {randomQuestionState ? (
                            <span>
                                ，随机 {randomQuestionNum} 题
                                <Tooltip title="考试时，考生的考卷将从本试卷题目中随机抽取，不同考生抽取到的题目可能不同">
                                    <InfoCircleOutlined className={styles.pdl_5} />
                                </Tooltip>
                            </span>
                        ) : (
                            <Tooltip title="考试时，全部考生的考卷均包含本试卷全部题目">
                                <InfoCircleOutlined className={styles.pdl_5} />
                            </Tooltip>
                        )}
                    </p>
                    {Boolean(chaosOrderState) && (
                        <p className={[styles.info, styles.allow_edit].join(' ')}>题目乱序</p>
                    )}
                    {Boolean(chaosOptionsState) && (
                        <p className={[styles.info, styles.allow_edit].join(' ')}>选项乱序</p>
                    )}
                    {Boolean(numContinuousState) && (
                        <p className={[styles.info, styles.allow_edit].join(' ')}>
                            整卷序号连续
                            <Tooltip title="开启后，试卷上所有小题序号将连续展示，否则将分题型连续展示">
                                <InfoCircleOutlined className={styles.pdl_5} />
                            </Tooltip>
                        </p>
                    )}
                    {Boolean(receiptStartTime) && (
                        <p className={[styles.info, styles.allow_edit].join(' ')}>
                            试题入库时间：{dayjs(receiptStartTime).format('YYYY-MM-DD')} 至{' '}
                            {receiptEndTime ? dayjs(receiptEndTime).format('YYYY-MM-DD') : '不限'}
                        </p>
                    )}
                    {Boolean(quoteNumStatus) && (
                        <p className={[styles.info, styles.allow_edit].join(' ')}>
                            试题引用次数：不超过 {questionCitedLimit} 次
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DetailContent
