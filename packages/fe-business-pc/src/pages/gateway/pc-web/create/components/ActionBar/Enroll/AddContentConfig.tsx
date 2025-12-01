import React from 'react'
import type PcPageStore from './../../../store'
import type { PreviewItem } from '../../../../../components/utils/interface'
import styles from './index.module.less'
import { Form, InputNumber } from 'antd'
import { RADIO_VALUE_ENUM } from '@/pages/gateway/web/create/components/ActionBar/ArticleContent/const'
import AddCard from '@/pages/gateway/components/AddCard'
import MoveContainer from '@/pages/gateway/components/MoveContainer'
import { CloseCircleFilled } from '@ant-design/icons'
import { cloneDeep } from 'lodash'
import dayjs from 'dayjs'
import ChoiceCategoryEnroll from './ChoiceCategoryEnroll'

export const getDate = (time: number | string | undefined, format = 'YYYY-MM-DD HH:mm') => {
    if (!Number(time || 0)) return '待定'
    return dayjs(time).format(format)
}
export const getEnrollTime = (activityDetails: any) => {
    let time = ''
    const { applyStartTime = 0, applyEndTime = 0, activityStart = 0 } = activityDetails
    if (applyStartTime > 0 && applyEndTime > 0) {
        time = `${getDate(applyStartTime)} 至 ${getDate(applyEndTime)}`
    } else if (applyStartTime === 0 && applyEndTime > 0) {
        // 报名开始时间不存在且报名结束时间在，取活动创建时间
        time = `${getDate(activityStart as number)} 至 ${getDate(applyEndTime)}`
    } else if (applyStartTime > 0 && applyEndTime === 0) {
        // 填写了报名开始时间，没有填报名结束时间
        time = `${getDate(applyStartTime)}`
    } else {
        // 都不存在不展示
        return
    }
    return time
}

export const renderEnrollTime = (detail: any) => {
    const time = getEnrollTime(detail)
    if (!time) return
    return (
        <div>
            <div>{time}</div>
        </div>
    )
}

const enrollCardRender = (items: any, data: PreviewItem, stores: PcPageStore) => {
    // console.log('🍊enrollCardRender item:', JSON.parse(JSON.stringify(items)))
    let { name, code, categoryName } = items || {}

    const clickDelete = (key: string) => {
        const _arr = cloneDeep(data?.codes) || []
        const arr = _arr?.filter(item => {
            return item?.code !== key
        })
        stores.fixPreviewList({
            ...data,
            codes: arr,
        })
    }
    const renderCategory = () => {
        let str = categoryName?.[0] || ''
        str = str?.split('/').slice(0, 3)
        str = str?.map((i: string, idx: number) => {
            return (
                <>
                    <span>{i}</span>
                    <span>{idx < str?.length - 1 && '>'}</span>
                </>
            )
        })
        return str
    }

    const getTimeValue = (detail: any) => {
        const { activityStart, activityEnd } = detail || {}

        if (activityStart && activityEnd) {
            return `${getDate(activityStart as unknown as number, 'YYYY-MM-DD HH:mm')} 至 ${getDate(
                activityEnd as unknown as number,
                'YYYY-MM-DD HH:mm',
            )}`
        }
        if (activityStart && !activityEnd) {
            return `${getDate(activityStart as unknown as number, 'YYYY-MM-DD HH:mm')} 至 待定`
        }
        if (!activityStart && !activityEnd) {
            return '-'
        }
    }

    return (
        <div className={styles.review_item}>
            <div className={styles.review_item_info_title}>{name}</div>
            <div className={styles.review_item_tags}>
                <span>{renderCategory()}</span>
            </div>
            <div className={styles.review_item_active_time}>{getTimeValue(items)}</div>
            <div className={styles.review_item_enroll_time}>{renderEnrollTime(items)}</div>

            <CloseCircleFilled
                className={styles.review_item_close}
                onClick={() => clickDelete(code)}
            />
        </div>
    )
}

export function AddContentConfig(
    data: PreviewItem,
    stores: PcPageStore,
    setEnrollCustomOpen: React.Dispatch<React.SetStateAction<boolean>>,
) {
    return (e: string) => {
        switch (e) {
            /**  默认规则  */
            case RADIO_VALUE_ENUM.DEFAULT:
                return (
                    <div className={styles.category}>
                        <Form layout="vertical">
                            <Form.Item
                                name="numberOfRows"
                                label="当前页展示："
                                rules={[{ required: true }]}
                            >
                                最多{' '}
                                <InputNumber
                                    min={1}
                                    max={4}
                                    value={data?.showLine || 2}
                                    onChange={event => {
                                        stores.fixPreviewList({
                                            ...data,
                                            showLine: event || 2,
                                        })
                                    }}
                                />
                                &nbsp;行
                            </Form.Item>
                        </Form>
                    </div>
                )
            /**  手动选择 按报名 */
            case RADIO_VALUE_ENUM.MANUAL:
                return (
                    <AddCard
                        label="添加报名"
                        disabled={false}
                        isUpload={false}
                        onChange={() => {
                            setEnrollCustomOpen(true)
                        }}
                    >
                        <MoveContainer
                            // isDragDisabled={radioValue === RADIO_VALUE_ENUM.DEFAULT}
                            datasource={data?.codes!.filter(Boolean)}
                            rowKey="code"
                            onChange={result => {
                                stores.fixPreviewList({
                                    ...data,
                                    codes: result,
                                })
                            }}
                        >
                            {item => {
                                return enrollCardRender(item, data, stores)
                            }}
                        </MoveContainer>
                    </AddCard>
                )
            /**  按分类  */
            case RADIO_VALUE_ENUM.CATEGORY:
                return (
                    <div className={styles.category}>
                        <Form layout="vertical">
                            <Form.Item
                                name="category"
                                label="添加报名项目："
                                rules={[{ required: true }]}
                            >
                                <ChoiceCategoryEnroll
                                    datas={data}
                                    fixPreviewList={stores.fixPreviewList}
                                />
                            </Form.Item>
                            <Form.Item
                                name="numberOfRows"
                                label="当前页展示："
                                rules={[{ required: true }]}
                            >
                                最多{' '}
                                <InputNumber
                                    min={1}
                                    max={4}
                                    value={data?.showLine || 2}
                                    onChange={event => {
                                        stores.fixPreviewList({
                                            ...data,
                                            showLine: event || 2,
                                        })
                                    }}
                                />{' '}
                                &nbsp;行
                            </Form.Item>
                        </Form>
                    </div>
                )
        }
    }
}
