import React, { useState, useEffect, useContext, useRef, useMemo } from 'react'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
// @ts-ignore
import { history, useParams } from 'umi'
import { observer, useLocalObservable } from 'mobx-react'
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Button, Row, Space, Modal, message, Typography, Tooltip, Select, Switch } from 'antd'
import { getLocalStorage } from '@/storage/localStorage'

import styles from './index.modules.less'
import ProfessionCascade from '@/components/ProfessionCascade'
import DropdownBox from '@/components/DropdownBox'
import TitleBlock from '@/components/TitleBlock'
import { DatePicker } from '@/components/Picker'
import {
    typeOptions,
    levelOptions,
    discriminationOptions,
    recommendStatusOptions,
    referStatusOptions,
} from '@/components/DropdownBox/const'
import { handerAuthenticatePoint, STATUS_ENUM, STATUS_OPTIONS } from './const'

import { SUBJECT_TYPE_ENUM, BELONG_TYPE_ENUM, SKILL_TYPE_ENUM } from '@/constants'
import useHook from './store'

import BulkImport from './components/BulkImport'
import { ImportStatus } from './const'
import Preview from './components/Preview'
import type { TableItem } from './interface'

import { findSiteData } from '@/utils/valueGet'
import API, { updateStatusApi } from './api'
import http from '@/servers/http'
import { QuestionListWrapperContext } from './context'
import classNames from 'classnames'

import { QuestionKnowledgeContext } from '@wotu/pt-components/dist/esm/PTQuestionKnowledge/context'
import { PTQuestionKnowledge } from '@wotu/pt-components'
import useSiteStore from '@/hooks/useSiteStore'
import useUserStore from '@/hooks/useUserStore'
import type { QuestionRouteType } from '@/hooks/useCommonParams'
import useCommonParams from '@/hooks/useCommonParams'
import type {
    ColumnsSetting,
    ColumnsTypeItem,
} from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import BusinessTable from '../BusinessTable'
import { usePageListConfig } from '@wotu/wotu-components'
import useUserColumns from '@/hooks/useUserColumns'
import { useUpdateEffect } from 'ahooks'
import { getCookie } from '@/storage'
import { isEmpty } from 'lodash'
const { RangePicker } = DatePicker

const List = () => {
    const siteStore = useSiteStore()
    const userStore = useUserStore()

    const organizationCode = getCookie('SELECT_ORG_CODE')
    const commonParams = useCommonParams()
    const { getPageListConfig } = usePageListConfig()
    const { columnsSettings } = useUserColumns(userStore)

    // context注入的上下文
    const { subject } = useContext(QuestionListWrapperContext)
    const { type } = useParams() as { type: QuestionRouteType }

    const Hook = useLocalObservable(() => new useHook())

    const [isBatchDel, setIsBatchDel] = useState(false)
    const [deleteRowKeys, setDeleteRowKeys] = useState<React.Key[]>([])
    const [importStatus, setImportStatus] = useState<ImportStatus>(ImportStatus.none)
    // 展开收起试题分类组件
    const [collapsed, setCollapsed] = useState(false)
    const [knowledgePointCode, setKnowledgePointCode] = useState<React.Key>()
    // 路由是否修改
    const [currentSubject, setCurrentSubject] = useState<number>()

    const questionKnowledgeRef = useRef<{ onLoad: () => void }>()
    const actionRef = useRef({
        reload: () => {}, // 添加 reload 方法
    })

    useEffect(() => {
        Hook.updateLastOrganizationCode(organizationCode)

        const siteName = findSiteData(siteStore?.siteData, 'name', { findKey: 'baseInfo' }) || ''
        document.title = `${subject === SUBJECT_TYPE_ENUM.REAL ? '理论' : '模拟'}试题-${siteName}`

        setCurrentSubject(subject)
    }, [subject])

    // 删除
    const delTableItem = (code: string) => {
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            centered: true,
            content: '你确定要删除此数据',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                await Hook.deleteTableItem(code)
                message.success('删除成功')
                actionRef.current.reload()
                // 更新试题分类数据
                questionKnowledgeRef.current?.onLoad()
            },
        })
    }

    const getIsHot = (firstNo: number, lastNo: number) => {
        if (firstNo === 20 || lastNo === 20) {
            return true
        }
        return false
    }

    // 批量删除
    const onBatchDelete = () => {
        Modal.confirm({
            title: '仅可删除未被引用和推荐的试题，删除后将无法恢复，是否确定删除？',
            icon: <ExclamationCircleOutlined />,
            async onOk() {
                const res = (await http(API.batchDelete, 'post', {
                    codeList: deleteRowKeys,
                })) as unknown as { failCount: number }

                setDeleteRowKeys([])
                setIsBatchDel(false)
                if (res?.failCount > 0) {
                    const errorMsg =
                        subject === SUBJECT_TYPE_ENUM.REAL
                            ? `存在${res.failCount}条试题数据删除失败，请至列表查看最新试题状态`
                            : `存在${res.failCount}条试题数据被练习引用删除失败`
                    message.error(errorMsg)
                } else {
                    message.success('删除成功')
                }
                actionRef.current.reload()
                // 更新试题分类数据
                questionKnowledgeRef.current?.onLoad()
            },
            onCancel() {},
        })
    }

    const handleLinkToEdit = (code: string) => {
        history.push(`/question/${type}/edit?code=${code}`)
    }

    // 启用/禁用
    const handleChangeStatus = (code: string) => {
        updateStatusApi(code).then(() => {
            actionRef.current?.reload()
        })
    }

    const rowSelection = {
        selectedRowKeys: deleteRowKeys,
        onChange: (selectedRowKeys: React.Key[]) => {
            setDeleteRowKeys(selectedRowKeys)
            selectedRowKeys.length > 0 ? setIsBatchDel(true) : setIsBatchDel(false)
        },
    }

    /** 处理 columns */
    const columnsInStore = (colItem: any) => {
        const column = columnsSettings.find(
            (item: ColumnsSetting) => item.key === (colItem.dataIndex as string),
        )
        return {
            ...column,
            hide: column?.hide || colItem.hide,
            order: column?.order,
        }
    }

    const defaultColumns = useMemo(() => {
        const isReal = subject === SUBJECT_TYPE_ENUM.REAL
        return [
            {
                title: '题目/题干',
                dataIndex: 'title',
                key: 'title',
                order: 1,
                formOrder: 2,
                width: 292,
                search: true,
                formItemProps: { labelCol: { span: 8 } },
                render: (title: string) => (
                    // 富文本图片转文字
                    <div
                        style={{ whiteSpace: 'break-spaces' }}
                        className={styles.editor_text}
                        dangerouslySetInnerHTML={{
                            // @ts-ignore
                            __html: title.replaceAll(/<img.*?(?:>|\/>)/gi, '（图）'),
                        }}
                    />
                ),
            },
            {
                title: '题型',
                dataIndex: 'type',
                key: 'type',
                width: 140,
                order: 2,
                formOrder: 3,
                search: true,
                formItemProps: {
                    initialValue: 0,
                    name: 'questionType',
                    labelCol: { span: 8 },
                },
                renderFormItem: () => <DropdownBox isOptionAll={true} type="questionType" />,
                render: (type: number) => (
                    <>{typeOptions.find(item => item.value === type)?.label}</>
                ),
            },
            {
                title: '职业',
                dataIndex: 'workName',
                key: 'workName',
                width: 247,
                order: 3,
                formOrder: 1,
                search: true,
                formItemProps: {
                    label: '职业/工种/等级',
                    name: 'workLike',
                    labelCol: { span: 8 },
                },
                renderFormItem: () => <ProfessionCascade type="JOB" />,
                render: (_, { customContent }: any) => (
                    <>{customContent?.commonJob?.jobName || '--'}</>
                ),
            },
            {
                title: '工种',
                dataIndex: 'workType',
                key: 'workType',
                width: 206,
                order: 4,
                search: false,
                render: (_, { customContent }: any) => (
                    <>{customContent?.commonJob?.jobType || '--'}</>
                ),
            },
            {
                title: '等级',
                dataIndex: 'workLevel',
                key: 'workLevel',
                width: 130,
                order: 5,
                search: false,
                render: (_, { customContent }: any) => (
                    <>{customContent?.commonJob?.jobLevel || '--'}</>
                ),
            },
            {
                title: '自有鉴定点',
                dataIndex: 'point',
                key: 'point',
                width: 300,
                order: 6,
                formOrder: 4,
                search: false,
                render: (_, { customContent }: any) => (
                    <>{handerAuthenticatePoint(customContent) || '-'}</>
                ),
                hide: !isReal,
            },
            {
                title: '难易程度',
                dataIndex: 'level',
                key: 'level',
                order: 7,
                formOrder: 5,
                width: 140,
                search: true,
                formItemProps: {
                    initialValue: 0,
                    name: 'questionLevel',
                    labelCol: { span: 8 },
                    id: 'questionLevel',
                },
                renderFormItem: () => <DropdownBox isOptionAll={true} type="questionLevel" />,
                render: (level: number) => (
                    <>{levelOptions.find(item => item.value === level)?.label}</>
                ),
            },
            {
                title: '区分度',
                dataIndex: 'discrimination',
                key: 'discrimination',
                order: 8,
                formOrder: 6,
                width: 140,
                search: isReal,
                formItemProps: isReal ? { initialValue: 0, labelCol: { span: 8 } } : false,
                renderFormItem: isReal
                    ? () => <DropdownBox isOptionAll={true} type="discrimination" />
                    : null,
                render: (_, { customContent }: any) => (
                    <>
                        {discriminationOptions.find(
                            item => item.value === customContent?.discrimination,
                        )?.label || '-'}
                    </>
                ),
                hide: !isReal,
            },
            {
                title: '入库时间',
                dataIndex: 'storageTime',
                key: 'storageTime',
                width: 240,
                order: 9,
                formOrder: 7,
                search: true,
                formItemProps: { name: 'warehousingTime', labelCol: { span: 8 } },
                renderFormItem: () => <RangePicker />,
                render: (storageTime: number) => (
                    <>{dayjs(storageTime).format('YYYY-MM-DD HH:mm:ss')}</>
                ),
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                search: true,
                width: 240,
                order: 10,
                formOrder: 8,
                formItemProps: { name: 'updateTime', labelCol: { span: 8 } },
                renderFormItem: () => {
                    return <DatePicker.RangePicker placeholder={['开始日期', '结束日期']} />
                },
                render: val => dayjs(val).format('YYYY-MM-DD HH:mm'),
            },

            {
                title: '引用状态',
                dataIndex: 'referenceStatus',
                key: 'referenceStatus',
                search: isReal,
                width: 120,
                order: 11,
                formOrder: 9,
                formItemProps: isReal
                    ? { name: 'referStatus', initialValue: 0, labelCol: { span: 8 } }
                    : false,
                renderFormItem: isReal
                    ? () => <DropdownBox isOptionAll={true} type="referStatus" />
                    : null,
                render: (referenceStatus: number) => (
                    <>{referStatusOptions.find(item => item.value === referenceStatus)?.label}</>
                ),
                hide: !isReal,
            },
            {
                title: '引用次数',
                dataIndex: 'referenceCount',
                key: 'referenceCount',
                order: 12,
                width: 120,
                hide: !isReal,
            },
            {
                title: '推荐状态',
                dataIndex: 'recommendStatus',
                key: 'recommendStatus',
                search: isReal,
                width: 140,
                order: 13,
                formOrder: 10,
                formItemProps: isReal
                    ? { name: 'recommendStatus', initialValue: 0, labelCol: { span: 8 } }
                    : false,
                renderFormItem: isReal
                    ? () => <DropdownBox isOptionAll={true} type="recommendStatus" />
                    : null,
                render: (_, { customContent }) => (
                    <>
                        {recommendStatusOptions.find(
                            item => item.value === customContent?.recommendStatus,
                        )?.label || '未推荐'}
                    </>
                ),
                hide: !isReal,
            },
            {
                title: (
                    <Tooltip title="禁用状态的试题，不能被引用">
                        启用/禁用
                        <InfoCircleOutlined />
                    </Tooltip>
                ),
                dataIndex: 'status',
                width: 150,
                order: 14,
                formOrder: 11,

                formItemProps: { label: '启用/禁用', initialValue: null, labelCol: { span: 8 } },
                renderFormItem: () => <Select options={STATUS_OPTIONS} />,
                render: (val, { code }) => (
                    <Switch
                        checkedChildren="启用"
                        unCheckedChildren="禁用"
                        checked={val === STATUS_ENUM.unDisabled}
                        onChange={() => handleChangeStatus(code)}
                    />
                ),
                fixed: 'right',
            },
            {
                title: '操作',
                key: 'action',
                dataIndex: 'action',
                fixed: 'right',
                width: 180,
                order: 13,
                render: (_, item: TableItem) => (
                    <Space size="middle">
                        <Typography.Link onClick={() => Hook.updatePreviewData(item)}>
                            预览
                        </Typography.Link>
                        {isReal &&
                        getIsHot(
                            item.customContent?.recommendStatus,
                            item.referenceStatus,
                        ) ? null : (
                            <Typography.Link onClick={() => handleLinkToEdit(item.code)}>
                                编辑
                            </Typography.Link>
                        )}

                        {isReal &&
                        getIsHot(
                            item.customContent?.recommendStatus,
                            item.referenceStatus,
                        ) ? null : (
                            <Typography.Link
                                onClick={() => {
                                    delTableItem(item.code)
                                }}
                            >
                                删除
                            </Typography.Link>
                        )}
                    </Space>
                ),
            },
        ] as ColumnsTypeItem<TableItem>[]
    }, [subject])

    const [columns, setColumns] = useState(() =>
        defaultColumns.map(item => ({
            ...item,
            ...columnsInStore(item),
        })),
    )

    useUpdateEffect(() => {
        // @ts-ignore
        setColumns(() => defaultColumns.map(item => ({ ...item })))
    }, [defaultColumns])

    const getThemeColor = () => {
        const themeColor = findSiteData(siteStore?.siteData, 'theme_color')?.value

        return themeColor
    }

    const beforeSearchSubmit = (params: any) => {
        const { warehousingTime, workLike, updateTime, ...rest } = params
        const [storageStartTime, storageEndTime] = params?.warehousingTime ?? []
        const [updateStartTime, updateEndTime] = !isEmpty(updateTime) ? updateTime : []
        const [workName, workType, workLevel] = params?.workLike ?? []

        const _params = { ...rest }
        _params.storageStartTime = storageStartTime
            ? dayjs(storageStartTime).startOf('day').valueOf()
            : undefined

        _params.storageEndTime = storageStartTime
            ? dayjs(storageEndTime).endOf('day').valueOf()
            : undefined
        _params.updateStartTime = updateStartTime
            ? dayjs(updateStartTime).startOf('day').valueOf()
            : null
        _params.updateEndTime = updateEndTime ? dayjs(updateEndTime).endOf('day').valueOf() : null
        _params.workName = workName?.value
        _params.workType = workType?.value
        _params.workLevel = workLevel?.value

        return _params
    }

    const getExtraInitParams = () => {
        const pageParams = getPageListConfig('save_params')
        const {
            storageEndTime,
            storageStartTime,
            workLevel,
            workName,
            workType,
            questionType,
            questionLevel,
            referStatus,
        } = pageParams

        const warehousingTime: (Dayjs | null)[] = [
            storageStartTime ? dayjs(storageStartTime) : null,
            storageEndTime ? dayjs(storageEndTime) : null,
        ]

        return {
            warehousingTime,
            workLike: workName
                ? [{ value: workName }, { value: workType }, { value: workLevel }]
                : [],
            type: questionType,
            level: questionLevel,
            referenceStatus: referStatus,
        }
    }

    const renderFooterBar = () => {
        const selectedLength = deleteRowKeys.length

        return (
            <div className={styles.batch_delete}>
                <Button onClick={onBatchDelete} disabled={!isBatchDel} type="primary">
                    批量删除
                </Button>
                {selectedLength > 0 && <Typography>已选 {selectedLength} 项</Typography>}
            </div>
        )
    }

    const renderOptionBar = () => {
        const { type } = useParams() as { type: QuestionRouteType }
        // 手动录入
        const handleImportManually = () => {
            return history.push(`/question/${type}/edit`)
        }

        // 试题查重
        const handleLinkToCheck = () => {
            return history.push(`/question/${type}/check`)
        }
        return (
            <Row className={styles.buttons}>
                <Button type="primary" onClick={handleImportManually}>
                    手动录入
                </Button>
                <Button type="primary" onClick={() => setImportStatus(ImportStatus.padding)}>
                    批量导入
                </Button>
                <Button
                    type="primary"
                    onClick={() => history.push(`/question/${type}/word-import`)}
                >
                    Word智能录入
                </Button>
                <Button type="primary" onClick={handleLinkToCheck}>
                    试题查重
                </Button>
            </Row>
        )
    }

    return (
        <>
            {subject === currentSubject && (
                <div className={styles.list}>
                    <TitleBlock
                        title={subject === SUBJECT_TYPE_ENUM.REAL ? '理论试题' : '模拟题库'}
                    />

                    <div
                        className={classNames(styles.page_space_wrapper, {
                            [styles.collapsed]: collapsed,
                        })}
                    >
                        {/* 试题分类 */}
                        <QuestionKnowledgeContext.Provider
                            value={{
                                theme: {
                                    primaryColor: getThemeColor(),
                                },
                            }}
                        >
                            <PTQuestionKnowledge
                                subject={subject!}
                                skill={SKILL_TYPE_ENUM.THEORY}
                                belongType={BELONG_TYPE_ENUM.MERCHANT}
                                organizationCode={organizationCode}
                                sid={getLocalStorage('SID')}
                                collapsed={collapsed}
                                onCollapsed={(value: boolean) => setCollapsed(value)}
                                onSelect={(code?: React.Key) => {
                                    setKnowledgePointCode(code)
                                }}
                                ref={questionKnowledgeRef}
                            />
                        </QuestionKnowledgeContext.Provider>

                        <div className={styles.super_table_wrap}>
                            <BusinessTable
                                actionRef={actionRef}
                                params={{
                                    knowledgePointCode,
                                    merchantCode: organizationCode,
                                    ...commonParams,
                                }}
                                className={styles.table}
                                columns={columns}
                                rowKey="code"
                                request={Hook.getTableData}
                                rowClassName={styles.rowClassName}
                                rowSelection={rowSelection}
                                renderFooter={() => renderFooterBar()}
                                renderOptionBar={() => renderOptionBar()}
                                beforeSearchSubmit={beforeSearchSubmit}
                                extraInitParams={getExtraInitParams()}
                            />
                        </div>
                    </div>

                    {!ImportStatus.none && (
                        <BulkImport
                            subject={subject}
                            importStatus={importStatus}
                            setImportStatus={setImportStatus}
                            Hook={Hook}
                            onLoadKnowledge={questionKnowledgeRef.current?.onLoad}
                            params={{
                                knowledgePointCode,
                                merchantCode: organizationCode,
                                ...commonParams,
                            }}
                        />
                    )}

                    <Preview
                        previewData={Hook.previewData}
                        updatePreviewData={Hook.updatePreviewData}
                    />
                </div>
            )}
        </>
    )
}

const ObserverList = observer(List)

export default ObserverList
