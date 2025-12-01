// 认定结果组件
import { useEffect, useState } from 'react'
import { Radio, Form, Modal } from 'antd'
import { observer, useLocalObservable } from 'mobx-react'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { getCookie } from '@/storage'
import MoveContainer from '@/pages/gateway/components/MoveContainer'

import { PlanCard, SelectCategory, PlanListModal } from '@/pages/gateway/components/IdentifyResult'

import type { PlanListByIdsReq, PlanListItem, PlanTypeListItem } from './interface'

import { cloneDeep } from 'lodash'
import { getViewStore } from '../../../store'
import { ADD_RULE, CONTENT_TEXT, MAX_COUNT, MODE_OPTIONS } from './constant'
import { getPlanListByIds } from './api'

import styles from './index.module.less'
import AddCard from '@/pages/gateway/components/AddCard'
import SetMicroComponentStyle from '@/pages/gateway/components/SetMicroComponentStyle'

const IdentifyResult = () => {
    const [form] = Form.useForm()

    const webStore = useLocalObservable(() => getViewStore())
    const nowActive = webStore.getNowActive()!
    const componentData = cloneDeep(nowActive)

    const [openPlanModal, setOpenPlanModal] = useState<boolean>(false)
    const [currentRule, setCurrentRule] = useState<string>(componentData.rule || ADD_RULE.DEFAULT)
    const [selectedCodes, setSelectedCodes] = useState<number[]>([])
    const [selectedPlans, setSelectedPlans] = useState<PlanListItem[]>([])

    // 更新当前的评价计划
    const fixCurrentPlanList = (content: PlanListItem[] = [], _currentRule = currentRule) => {
        const _nowActive = webStore.getNowActive()

        if (_nowActive) {
            const _selectedCodes = content?.map(item => item.id) ?? []
            setSelectedCodes(_selectedCodes)
            setSelectedPlans(content)

            const planTypeCategory = form.getFieldValue('category')
            const previewItem = {
                ..._nowActive,
                content,
                rule: _currentRule,
            }
            if (planTypeCategory) {
                const { key, name } = planTypeCategory
                previewItem.selectCategory = [{ id: key, name }]
            }
            // @ts-ignore
            webStore.fixPreviewList(previewItem)
        }
    }

    // 获取当前的评价计划
    const getCurrentPlanList = (codes: number[] = [], _currentRule = currentRule) => {
        const params: PlanListByIdsReq = {
            codes,
            orgCode: getCookie('SELECT_ORG_CODE'),
            type: 'identification_result',
            rule: _currentRule,
        }

        if (_currentRule === ADD_RULE.DEFAULT) {
            params.limit = 4
        }

        getPlanListByIds(params).then((res: any) => {
            setSelectedPlans(res)
            fixCurrentPlanList(res, _currentRule)
        })
    }

    useEffect(() => {
        if (componentData.rule === ADD_RULE.DEFAULT) {
            getCurrentPlanList([])
        }

        if (componentData.rule === ADD_RULE.CUSTOM) {
            const { content = [] } = componentData
            setSelectedPlans(content as PlanListItem[])
        }

        if (componentData.rule === ADD_RULE.BY_CATEGORY) {
            const { selectCategory } = componentData

            if (selectCategory) {
                // @ts-ignore
                const { id, name } = selectCategory[0] ?? {}

                form.setFieldValue('category', { key: id, name })
            }
        }
    }, [])

    // 切换添加方式
    const handleChangeMethod = (value: string) => {
        const switchDone = () => {
            setCurrentRule(value)
            if (value === ADD_RULE.DEFAULT) {
                getCurrentPlanList([], value)
            } else {
                fixCurrentPlanList([], value)
                setSelectedPlans([])
            }
        }

        if (selectedCodes.length > 0) {
            Modal.confirm({
                title: '切换规则将清空您已选择的评价计划,确定要继续吗?',
                icon: <ExclamationCircleOutlined />,
                centered: true,
                okText: '继续',
                cancelText: '取消',
                onOk: () => {
                    switchDone()
                },
            })
            return
        }
        switchDone()
    }

    // 手动添加内容
    const handleShowPlanModal = () => {
        setOpenPlanModal(true)
    }
    // 确认选择内容
    const handleSelectPlanDone = (planList: PlanListItem[]) => {
        fixCurrentPlanList(planList)
        setSelectedPlans(planList)
        setOpenPlanModal(false)
    }

    // 确认选择分类
    const handleSelectCategoryDone = (selectedCategory: PlanTypeListItem) => {
        const { planIds = [], planTypeCategory } = selectedCategory

        form.setFieldValue('category', planTypeCategory)

        getCurrentPlanList(planIds.slice(0, 4))
    }

    // 删除内容
    const handleDeleteItem = (content: PlanListItem) => {
        const _nowActive = webStore.getNowActive()
        if (_nowActive) {
            const _content = _nowActive?.content?.filter(item => item.id !== content.id)

            fixCurrentPlanList(_content)
        }
    }

    // 内容排序
    const handleSortItem = (from: number, to: number) => {
        const content = cloneDeep(componentData.content || [])
        const [removed] = content.splice(from, 1)
        content.splice(to, 0, removed)
        fixCurrentPlanList(content)
    }

    // 已经选择了的评价计划个数
    const selectedCount = selectedCodes.length
    return (
        <div className={styles.component_identify_result}>
            <div className={styles.module_title}>认定结果</div>
            <div className={styles.add_methods}>
                <div className={styles.title}>添加方式</div>
                <Radio.Group
                    options={MODE_OPTIONS}
                    value={currentRule}
                    onChange={e => handleChangeMethod(e.target.value)}
                />
            </div>
            <div className={styles.add_content}>
                <div className={styles.title}>添加内容</div>
                <div className={styles.tips_text}>{CONTENT_TEXT[currentRule]}</div>

                {/* 按分类选择添加 */}
                {currentRule === ADD_RULE.BY_CATEGORY && (
                    <Form form={form} layout="vertical">
                        <Form.Item
                            label="选择分类"
                            name="category"
                            rules={[{ required: true, message: '请选择分类' }]}
                        >
                            <SelectCategory onChange={handleSelectCategoryDone} />
                        </Form.Item>
                    </Form>
                )}
            </div>

            {/* 默认 && 手动添加 */}
            {currentRule !== ADD_RULE.BY_CATEGORY && (
                <AddCard
                    label="添加内容"
                    disabled={currentRule === ADD_RULE.DEFAULT || selectedCount > MAX_COUNT}
                    isUpload={false}
                    onChange={handleShowPlanModal}
                >
                    {/* 选择默认的时候禁止上移、下移和删除 */}
                    {currentRule === ADD_RULE.DEFAULT ? (
                        <>
                            {componentData?.content?.map(item => (
                                <PlanCard key={item.id} data={item} allowDelete={false} />
                            ))}
                        </>
                    ) : (
                        <MoveContainer
                            datasource={componentData?.content ?? []}
                            onDragEnd={handleSortItem}
                        >
                            {item => (
                                <PlanCard
                                    data={item}
                                    allowDelete={true}
                                    onDelete={() => handleDeleteItem(item)}
                                />
                            )}
                        </MoveContainer>
                    )}
                </AddCard>
            )}
            <SetMicroComponentStyle
                styleData={componentData}
                onStyleChange={webStore.fixPreviewList}
                mode="mobile"
            />

            <PlanListModal
                selectedPlans={selectedPlans}
                open={openPlanModal}
                onCancel={() => setOpenPlanModal(false)}
                onOk={handleSelectPlanDone}
            />
        </div>
    )
}

export default observer(IdentifyResult)
