import React, { useEffect, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import { getViewStore } from './../../../store'
import { getViewStore as getPCViewStore } from '@/pages/gateway/pc-web/create/store'
import { ADD_RULE, LAYOUT_STYLE } from '../../../../../components/utils/interface.d'
import type { PreviewItem } from '../../../../../components/utils/interface'
import styles from './index.module.less'
import { Form, Radio, InputNumber } from 'antd'
import { ADD_TYPE_ENUM, ADD_TYPE_ENUM_TO_TIPS, ADD_TYPE_OPTIONS } from './const'
import SetMicroComponentStyle from '@/pages/gateway/components/SetMicroComponentStyle'
import AddCard from '@/pages/gateway/components/AddCard'
import MoveContainer from '@/pages/gateway/components/MoveContainer'
import type { RadioChangeEvent } from 'antd'
import { cloneDeep } from 'lodash'
import { CloseCircleFilled } from '@ant-design/icons'
import {
    getDate,
    renderEnrollTime,
} from '@/pages/gateway/pc-web/create/components/ActionBar/Enroll/AddContentConfig'
import EnrollModal from '@/components/EnrollModal'
import ChoiceCategoryEnroll from '@/pages/gateway/pc-web/create/components/ActionBar/Enroll/ChoiceCategoryEnroll'

function EnrollCard(props: { data: PreviewItem; type?: 'pc' | 'h5' }) {
    const { data, type = 'h5' } = props
    const [form] = Form.useForm()
    // 获取全局唯一的store
    const stores = useLocalObservable(() => (type === 'h5' ? getViewStore() : getPCViewStore()))

    /**  //radio的值  */
    const [value, setValue] = useState('')
    /**  添加方式为按报名 添加报名modal的open  */
    const [enrollCustomOpen, setEnrollCustomOpen] = useState(false)

    /**  获取报名默认数据  */
    const getEnrollData = async (flag?: boolean) => {
        const response = (await stores.getEnrollData()) || []

        const tempContent = (cloneDeep(response) as unknown as []) || []
        tempContent?.length !== 0 &&
            stores.fixPreviewList({
                ...data,
                codes: tempContent,
                rule: ADD_RULE.DEFAULT,
                selectCategory: [],
                showLine: flag ? 2 : data?.showLine,
            })
    }
    useEffect(() => {
        form.setFieldValue('rule', data?.rule)
        form.setFieldValue('showLine', data?.showLine || 2)
        if (data?.rule === 'default') {
            setValue(ADD_TYPE_ENUM.DEFAULT)
            getEnrollData()
        }
        if (data?.rule === 'custom') {
            setValue(ADD_TYPE_ENUM.BY_ENROLL)
        }
        if (data?.rule === 'by_category') {
            setValue(ADD_TYPE_ENUM.BY_CATEGORY)
        }
    }, [])

    /** 添加方式 radio  change  */
    const onChange = (e: RadioChangeEvent) => {
        if (e.target.value === ADD_TYPE_ENUM.DEFAULT) {
            setValue(e.target.value)
            getEnrollData(true)
        }
        if (e.target.value === ADD_TYPE_ENUM.BY_ENROLL) {
            setValue(e.target.value)
            stores.fixPreviewList({
                ...data,
                codes: [],
                rule: ADD_RULE.CUSTOM,
                selectCategory: [],
                showLine: 1,
            })
        }

        if (e.target.value === ADD_TYPE_ENUM.BY_CATEGORY) {
            setValue(e.target.value)
            stores.fixPreviewList({
                ...data,
                codes: [],
                rule: ADD_RULE.BY_CATEGORY,
                selectCategory: [],
                showLine: 2,
            })
        }
    }

    const enrollCardRender = (items: any) => {
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
                return `${getDate(
                    activityStart as unknown as number,
                    'YYYY-MM-DD HH:mm',
                )} 至 ${getDate(activityEnd as unknown as number, 'YYYY-MM-DD HH:mm')}`
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
    const onEnrollModalOk = (e: any) => {
        let tempData = cloneDeep(e)
        setEnrollCustomOpen(false)

        stores.fixPreviewList({
            ...data,
            codes: tempData,
            showLine: tempData.length,
        })
    }

    return (
        <div className={styles.page}>
            <div className={styles.title}>报名</div>
            <div className={styles.main}>
                <Form
                    form={form}
                    layout="vertical"
                    colon={true}
                    initialValues={{
                        showLine: 2,
                        layoutStyle: type === 'pc' && LAYOUT_STYLE.TWO_IN_ROW,
                    }}
                    requiredMark={true}
                >
                    <Form.Item name="rule" label="添加方式" className={styles.rule}>
                        <Radio.Group options={ADD_TYPE_OPTIONS} onChange={onChange} value={value} />
                    </Form.Item>

                    <div className={styles.line} />
                    <div className={styles.main_title}>添加内容</div>

                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                            prevValues?.rule !== currentValues?.rule
                        }
                    >
                        {({ getFieldValue }) => {
                            let rule = getFieldValue('rule') || ''
                            let tips = ADD_TYPE_ENUM_TO_TIPS?.[rule]
                            return (
                                <div className={styles.rule_content}>
                                    {tips && <div className={styles.desc}>{tips}</div>}

                                    {rule === ADD_TYPE_ENUM.BY_CATEGORY && (
                                        <Form.Item
                                            name="selectCategory"
                                            rules={[{ required: true, message: '' }]}
                                            label="添加报名项目"
                                            className={styles.show_line}
                                        >
                                            <div className={styles.category}>
                                                <ChoiceCategoryEnroll
                                                    datas={data}
                                                    fixPreviewList={stores.fixPreviewList}
                                                    text="点击添加"
                                                />
                                            </div>
                                        </Form.Item>
                                    )}
                                    {rule === ADD_TYPE_ENUM.BY_ENROLL && (
                                        <>
                                            <Form.Item
                                                name="custom"
                                                rules={[{ required: true }]}
                                                noStyle
                                            >
                                                <AddCard
                                                    label="添加报名"
                                                    disabled={false}
                                                    isUpload={false}
                                                    onChange={() => {
                                                        setEnrollCustomOpen(true)
                                                    }}
                                                >
                                                    <MoveContainer
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
                                                            return enrollCardRender(item)
                                                        }}
                                                    </MoveContainer>
                                                </AddCard>
                                            </Form.Item>
                                        </>
                                    )}
                                </div>
                            )
                        }}
                    </Form.Item>
                    {value !== ADD_TYPE_ENUM.BY_ENROLL && (
                        <Form.Item
                            name="showLine"
                            label="当前页展示"
                            rules={[{ required: true }]}
                            className={styles.show_line}
                        >
                            <InputNumber
                                addonBefore="最多"
                                addonAfter={'行'}
                                max={4}
                                min={1}
                                precision={0}
                                value={data?.showLine || 2}
                                onChange={e => {
                                    stores.fixPreviewList({
                                        ...data,
                                        showLine: e || 2,
                                    })
                                }}
                            />
                        </Form.Item>
                    )}
                </Form>
                <SetMicroComponentStyle
                    style={{ paddingLeft: 24, paddingRight: 24 }}
                    styleData={data}
                    onStyleChange={stores.fixPreviewList}
                    mode="mobile"
                />
                {enrollCustomOpen && (
                    <EnrollModal
                        type="checkbox"
                        visible={enrollCustomOpen}
                        contentType="details"
                        onOk={e => {
                            onEnrollModalOk(e)
                        }}
                        onCancel={() => setEnrollCustomOpen(false)}
                        choiceData={data.codes || []}
                        statusList={[1, 2, 3]}
                    />
                )}
            </div>
        </div>
    )
}

export default observer(EnrollCard)
