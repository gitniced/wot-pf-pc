import React, { useEffect, useState } from 'react'
import { useLocalObservable } from 'mobx-react'
import { getViewStore } from './../../../store'
import type { ContentItem, PreviewItem } from '../../../../../components/utils/interface'
import styles from './index.module.less'
import { Radio, Form, Modal, Input, message } from 'antd'
import AddCard from '@/pages/gateway/components/AddCard'
import type { RadioChangeEvent } from 'antd'
import MoveContainer from '@/pages/gateway/components/MoveContainer'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { renderData } from '@/utils/parseValue'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
// import 'antd/dist/antd.variable.css'
import { getPlanDataList, getPlayTypeListData, getPlanTypeCategoryList } from './api'
import { getCookie } from '@/storage'
import { CloseCircleFilled } from '@ant-design/icons'
// import PlanPublicModal from './components/PlanPublicModal'
import PlanPublicModal from '@/pages/gateway/components/PlanFormulaModal'
import { ADD_RULE, MODE_OPTIONS, CONTENT_TEXT } from './const'
import SetMicroComponentStyle from '@/pages/gateway/components/SetMicroComponentStyle'

// 数据的ts类型定义
interface Item {}

function PlanContent(props: { data: PreviewItem }) {
    // 获取全局唯一的store
    const stores = useLocalObservable(() => getViewStore())
    const [planTypeList, setPlanTypeList] = useState([])
    const { data } = props

    const columns: ColumnsType<Item> = [
        {
            title: '计划名称',
            dataIndex: 'planName',
            ellipsis: true,
            search: true,
            formItemProps: {
                labelCol: { span: 6 },
            },
            render: (_, record) => {
                return record?.appraise?.name
            },
        },
        {
            title: '分类',
            dataIndex: 'planType',
            ellipsis: true,
            valueType: 'select',
            search: true,
            render: (_, record) => {
                return record?.planTypeCategory?.name
            },
            valueEnum: Object.fromEntries(
                planTypeList.map(item => [item.key, { text: item.name }]) || [],
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            render: text => {
                return dayjs(text).format('YYYY-MM-DD hh:mm:ss')
            },
        },
    ]

    const sortColumns: ColumnsType<Item> = [
        {
            title: '分类名称',
            dataIndex: 'planType',
            ellipsis: true,
            render: (_, record) => {
                // console.log(record,'record')
                return record?.planTypeCategory?.name
            },
        },
        {
            title: '计划数量',
            dataIndex: 'planCount',
        },
    ]

    const [value, setValue] = useState(ADD_RULE.ALL) //radio的值
    const [visible, setVisible] = useState<boolean>(false) //控制显示隐藏
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox') //根据传是多选还是单选

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [selectedRow, setSelectedRow] = useState<any[]>([])
    const [planTypeName, setPlanTypeName] = useState('')

    const getRequest = async (pageSize: number, pageNo: number, params: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const res: any =
            (await getPlanDataList({
                orgCode: organizationCode,
                pageSize,
                currentPage: pageNo,
                type: 'plan_formula',
                ...params,
                planType: Number(params.planType) || 0,
            })) || {}
        let { records = [], total, success } = res
        return {
            data: records,
            totalCount: total,
            success,
        }
    }

    const getSortRequest = async (pageSize: number, pageNo: number, params: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const res: any =
            (await getPlayTypeListData({
                orgCode: organizationCode,
                pageSize,
                currentPage: pageNo,
                type: 'plan_formula',
                ...params,
            })) || {}
        let { records, total, success } = res
        return {
            data: records,
            totalCount: total,
            success,
        }
    }

    const [modalData, setModalData] = useState({
        title: '添加内容',
        columns,
        rowKey: 'id',
        getRequest,
        search: true,
    })

    /**
     * 计划公示组件 获取默认评价计划
     */
    const getPlanData = async (rule = 'default') => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const res: any =
            (await getPlanDataList({
                orgCode: organizationCode,
                pageSize: 10,
                currentPage: 1,
                type: 'plan_formula',
            })) || {}
        let { records = [] } = res
        const tempContent = records?.slice(0, 4) || []
        tempContent?.length &&
            stores.fixPreviewList({
                ...data,
                codes: tempContent,
                rule,
                selectCategory: [],
            })
    }

    /**
     * 计划公示组件 获取默认分类
     */
    const getPlanTypeCategory = async () => {
        const res: any = (await getPlanTypeCategoryList()) || {}
        setPlanTypeList(res)
    }

    useEffect(() => {
        const { codes = [], rule, selectCategory = [] } = data
        setValue(rule as ADD_RULE)
        rule === ADD_RULE.ALL && getPlanData()
        getPlanTypeCategory()
        if (rule === ADD_RULE.CATEGORY) {
            setSelectionType('radio')
            setPlanTypeName(selectCategory.map((item: any) => item.name).join(' '))
            setSelectedRowKeys(selectCategory.map((item: any) => item.id))
            setSelectedRow(
                selectCategory.map((item: any) => {
                    return {
                        planType: item.id,
                        planTypeCategory: { key: item.id, name: item.name },
                    }
                }),
            )
        }
        if (rule === ADD_RULE.MANUAL) {
            setSelectedRowKeys(codes.map((item: any) => item?.id))
            setSelectedRow(codes)
        }

        console.log(data, '回显数据')
    }, [])

    useEffect(() => {
        modalData.title === '添加分类' && setVisible(true)
    }, [modalData])

    const changeSelectData = (
        valueText: ADD_RULE,
        selectType: 'checkbox' | 'radio',
        rowKey: string,
    ) => {
        setValue(valueText)
        setModalData({
            title: '添加内容',
            columns,
            getRequest,
            rowKey,
            search: true,
        })
        setPlanTypeName('')
        setSelectedRowKeys([])
        setSelectedRow([])
        setSelectionType(selectType)
    }

    //添加方式选择框改变
    const onChangeType = (e: RadioChangeEvent) => {
        const codes = data.codes || []
        const changeSelAllData = () => {
            changeSelectData(e.target.value, 'checkbox', 'id')
            getPlanData()
        }
        const changeSelManualData = () => {
            changeSelectData(e.target.value, 'checkbox', 'id')
            stores.fixPreviewList({
                ...data,
                codes: [],
                rule: 'custom_rule',
            })
        }
        const changeSelCategoryData = () => {
            changeSelectData(e.target.value, 'radio', 'planType')
            stores.fixPreviewList({
                ...data,
                codes: [],
                rule: 'by_category',
            })
        }
        const showSelTips = (title: string, okCallback: () => void) => {
            Modal.confirm({
                title,
                icon: <ExclamationCircleOutlined />,
                centered: true,
                okText: '继续',
                cancelText: '取消',
                onOk: () => {
                    okCallback()
                },
            })
        }
        if (e.target.value === ADD_RULE.ALL && selectedRowKeys.length !== 0) {
            showSelTips('切换为默认规则将清空您已选择的评价计划,确定要继续吗?', changeSelAllData)
        } else if (e.target.value === ADD_RULE.ALL && selectedRowKeys.length === 0) {
            changeSelAllData()
        } else if (e.target.value === ADD_RULE.MANUAL) {
            if (codes.length) {
                showSelTips(
                    '切换为手动选择将清空您已选择的评价计划,确定要继续吗?',
                    changeSelManualData,
                )
            } else {
                changeSelManualData()
            }
        } else {
            if (codes.length) {
                showSelTips(
                    '切换为分类将清空您已选择的评价计划,确定要继续吗?',
                    changeSelCategoryData,
                )
            } else {
                changeSelCategoryData()
            }
        }
    }

    // //添加内容的选择
    const getContentTitle = (val: string) => {
        return CONTENT_TEXT[val]
    }
    //默认的时候禁止添加导航
    const addPlanText = (val: string) => {
        if (val === ADD_RULE.ALL) return false
        setModalData({
            title: '添加内容',
            columns,
            getRequest,
            rowKey: 'id',
            search: true,
        })
        setVisible(true)
        // setSelectionType('checkbox')
    }

    //点击分类
    const clickSort = () => {
        setModalData({
            title: '添加分类',
            columns: sortColumns,
            getRequest: getSortRequest,
            rowKey: 'planType',
            search: false,
        })
    }

    const onConfirmSel = async (rows: any[] = [], keys: any[] = []) => {
        let selList = []
        let res: any = {}
        let copyData = []
        let selectCategory = []
        const organizationCode = getCookie('SELECT_ORG_CODE')
        setSelectedRowKeys(keys)
        setSelectedRow(rows)
        switch (modalData.rowKey) {
            case 'id':
                selList = [...rows]
                copyData = [...selList]
                if (keys.length > 10) {
                    message.warn('最多选择10条')
                    return
                }
                break
            case 'planType':
                if (!keys.length) {
                    message.warn('至少选择一条')
                    return
                }
                res =
                    (await getPlanDataList({
                        orgCode: organizationCode,
                        pageSize: 10,
                        currentPage: 1,
                        type: 'plan_formula',
                        planType: keys[0],
                    })) || {}
                selList = res?.records?.slice(0, 4) || []
                copyData = selList
                rows.length &&
                    selectCategory.push({ id: keys[0], name: rows[0]?.planTypeCategory?.name })
                setPlanTypeName(rows[0]?.planTypeCategory?.name || '')
                break
        }
        const newArr = []
        const arrId = []
        for (let item of copyData) {
            if (arrId.indexOf(item.id) === -1) {
                arrId.push(item.id)
                newArr.push(item)
            }
        }
        setVisible(false)
        stores.fixPreviewList({
            ...data,
            codes: newArr,
            selectCategory,
        })
    }

    const onCancel = () => {
        setVisible(false)
    }

    // // 删除
    const clickDelete = (key: number) => {
        const _arr = data?.codes || data?.content
        const arr = _arr?.filter(item => {
            return item?.id !== key
        })
        let selectKeysArr = selectedRowKeys.filter(_key => _key !== key) || []
        let selectRowsArr = selectedRow.filter(item => item.id !== key) || []
        setSelectedRowKeys(selectKeysArr)
        setSelectedRow(selectRowsArr)
        stores.fixPreviewList({
            ...data,
            codes: arr,
        })
    }

    // // 元素排序
    const sortChange = (codes: any[]) => {
        stores.fixPreviewList({
            ...data,
            codes,
        })
    }

    // //获取数据
    const CardRender = (contentItemData: ContentItem) => {
        let { appraise, planTypeCategory, publicityContent, id } = contentItemData || {}
        let planTypeNameText = planTypeCategory.name
        return (
            <div className={styles.planItem}>
                <div className={[styles.name, styles.textOverflow].join(' ')}>{appraise.name}</div>
                <div className={[styles.textContent, styles.textOverflow].join(' ')}>
                    {publicityContent}
                </div>
                <div className={styles.level}>{planTypeNameText}</div>
                {value === ADD_RULE.MANUAL && (
                    <CloseCircleFilled
                        className={styles.review_item_close}
                        onClick={() => clickDelete(id)}
                    />
                )}
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.title}>计划公示</div>
            <div className={styles.radio}>
                <div className={styles.radioTitle}>添加方式</div>
                <div className={styles.radios}>
                    <Form.Item initialValue={ADD_RULE.ALL}>
                        <Radio.Group options={MODE_OPTIONS} value={value} onChange={onChangeType} />
                    </Form.Item>
                </div>
            </div>
            <div className={styles.content}>
                <h3>添加内容</h3>
                <div className={styles.contentTitle}>{getContentTitle(value)}</div>
                {value === ADD_RULE.CATEGORY ? (
                    <>
                        <div className={styles.sortSel}>
                            <span className={styles.requiredDot}>*</span>选择分类：
                        </div>
                        {!planTypeName ? (
                            <div
                                className={styles.sortBtn}
                                onClick={() => {
                                    clickSort()
                                }}
                            >
                                点击选择
                            </div>
                        ) : null}
                        {planTypeName ? (
                            <div className={styles.sortTypeText}>
                                <Input
                                    className={styles.sortTypeInput}
                                    allowClear
                                    disabled
                                    value={planTypeName || ''}
                                />
                                <span className={styles.modifyBtn} onClick={() => clickSort()}>
                                    修改
                                </span>
                            </div>
                        ) : null}
                    </>
                ) : (
                    <AddCard
                        label="添加内容"
                        disabled={value === ADD_RULE.ALL || data?.codes?.length >= 10}
                        isUpload={false}
                        onChange={() => {
                            addPlanText(value)
                        }}
                    >
                        <MoveContainer
                            isDragDisabled={value === ADD_RULE.ALL}
                            datasource={renderData(data, () => {
                                stores.fixPreviewList({
                                    ...data,
                                    codes: [],
                                })
                            })}
                            rowKey="code"
                            onChange={result => {
                                sortChange(result)
                            }}
                        >
                            {item => {
                                return CardRender(item)
                            }}
                        </MoveContainer>
                    </AddCard>
                )}
            </div>
            <SetMicroComponentStyle
                styleData={data}
                onStyleChange={stores.fixPreviewList}
                mode="mobile"
            />

            {visible && (
                <PlanPublicModal
                    visible={visible}
                    onCancel={onCancel}
                    onConfirmSel={onConfirmSel}
                    title={modalData.title}
                    selectType={selectionType}
                    tableOptions={modalData}
                    selectedRowKeys={selectedRowKeys}
                    _selectedRows={selectedRow}
                />
            )}
        </div>
    )
}

export default PlanContent
