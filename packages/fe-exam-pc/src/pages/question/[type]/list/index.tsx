// 题库列表
import type { MenuProps } from 'antd'
import {
    Button,
    DatePicker,
    Dropdown,
    Modal,
    Select,
    Space,
    Switch,
    Tooltip,
    Typography,
    message,
} from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { history, useParams } from 'umi'

import TitleBlock from '@/components/TitleBlock'
import { findSiteData, getCookie, usePageListConfig } from '@wotu/wotu-components'
import type { ColumnsTypeItem, FormRef } from '@wotu/wotu-components/dist/esm/SuperTable/interface'

import {
    BELONG_TYPE_ENUM,
    DISCRIMINATION_OPTIONS,
    IMPORT_TEMPLATE,
    QUESTION_LEVEL_OPTIONS,
    QUESTION_LEVEL_TEXT,
    QUESTION_TYPE_OPTIONS,
    QUESTION_TYPE_TEXT,
    SKILL_TYPE_ENUM,
    STATUS_ENUM,
    STATUS_OPTIONS,
    SUBJECT_TYPE_ENUM,
    TEMPLATE_DESCRIPTION,
    TEMPLATE_TITLE,
} from '../constants'
import PreviewModal from './components/PreviewModal'

import styles from './index.module.less'
import { useEffect, useMemo, useRef, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react'

import QuestionStore from '../store'
import type { ModalData } from './components/interface'
import type { QuestionListItem, QuestionListParams, RouteQuery } from '../interface'
import BatchImport from '@/components/BatchImport'
import { includes, isEmpty, omit } from 'lodash'
import { IMPORT_TYPE_ENUM } from '@/components/BatchImport/constant'

import type { Timeout } from 'ahooks/lib/useRequest/src/types'
import { getLocalStorage } from '@/storage'
import classNames from 'classnames'
import { QuestionKnowledgeContext } from '@wotu/pt-components/dist/esm/PTQuestionKnowledge/context'
import { PTQuestionKnowledge } from '@wotu/pt-components'
import useUserStore from '@/hooks/useUserStore'
import useSiteStore from '@/hooks/useSiteStore'
import type { QuestionRouteType } from '@/hooks/useCommonParams'
import BusinessTable from '@/components/BusinessTable'
import useCommonParams from '@/hooks/useCommonParams'
import { getTitleByType, handlerAuthenticatePoint } from '../utils'
import AuthenticateCascade from '@/components/AuthenticateCascade'
import type { DefaultOptionType } from 'antd/lib/select'
import ProfessionCascade from '@/components/ProfessionCascade'
import usePageParams from '@/hooks/usePageParams'
import { DownOutlined, ExclamationCircleFilled, InfoCircleOutlined } from '@ant-design/icons'
import { allDelete, checkData, getAuthenticateDetail, updateStatusApi } from '../api'
import DropdownBox from '@/components/DropdownBox'
import { recommendStatusOptions, referStatusOptions } from '@/components/DropdownBox/const'
import { reviewStatusOptions } from '@/pages/paper-library/examine-composition/list/components/SearchForm/const'
import { mapJobName } from '@/pages/paper-library/[type]/utils'
import AnalysisModal from './components/AnalysisModal'
import MoreSelect from '@/components/MoreSelect'
import { authenticateChildrenName, handlerData } from '@/components/AuthenticateCascade/constant'

const QuestionList = () => {
    const userStore = useUserStore()
    const siteStore = useSiteStore()

    const store = useLocalObservable(() => QuestionStore)
    const routeQuery = history.location.query as unknown as RouteQuery

    const urlParams = usePageParams()

    const [previewData, setPreviewData] = useState<ModalData>({ visible: false })

    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    // 展开收起试题分类组件
    const [collapsed, setCollapsed] = useState(false)
    const [knowledgePointCode, setKnowledgePointCode] = useState<React.Key>()
    const [commonJobCode, setCommonJobCode] = useState<number>(-1)
    const [analysisCode, setAnalysisCode] = useState<string>()

    // 模板导入类型，默认系统标准啊
    const [templateType, setTemplateType] = useState<string>('default')

    const { type } = useParams() as { type: QuestionRouteType }
    const commonParams = useCommonParams()
    const { subject, skill } = commonParams
    // 是否是理论知识真题
    const isRealAndTheory =
        subject &&
        [SUBJECT_TYPE_ENUM.REAL, SUBJECT_TYPE_ENUM.COMPETITION].includes(subject) &&
        skill === SKILL_TYPE_ENUM.THEORY

    const pageTitle = getTitleByType(commonParams)

    const { getPageListConfig } = usePageListConfig()

    const actionRef = useRef({
        reload: () => { }, // 添加 reload 方法
    })

    let inputEvent: Timeout[] = []

    const questionKnowledgeRef = useRef<{ onLoad: () => void }>()
    const searchFormRef = useRef<FormRef>({})

    const [selectedCommonJob, setSelectedCommonJob] = useState<any>(mapJobName(routeQuery)?.map(i => i?.value))
    const [authenticateList, setAuthenticateList] = useState(undefined)

    useEffect(() => {
        document.title = pageTitle

        // 列表和编辑用的是同一份职业/工种/等级数据，避免从编辑页面回到列表页面，数据缓存的问题，需要在页面初始化的时候重置数据
        store.commonJobList = []
        store.commonJobParams = store.defaultCommonJobParams

        return () => {
            inputEvent.map((i: Timeout) => {
                clearTimeout(i)
                inputEvent = []
            })
        }
    }, [])

    // 批量导入弹窗
    const [visible, setVisible] = useState<boolean>(false)

    // 预览
    const handlePreview = (data: QuestionListItem) => {
        setPreviewData({ visible: true, data })
    }

    // 评价
    const handleAnalysis = (data: QuestionListItem) => {
        setAnalysisCode(data.code)
    }

    const handleEdit = (questionCode?: string) => {
        history.push(`/question/${type}/edit?code=${questionCode}&${urlParams}`)
    }

    const handleCreate = (questionCode?: string) => {
        history.push(`/question/${type}/edit?code=${questionCode}&${urlParams}&isNewVersion=true`)
    }

    // 删除/批量删除
    const handleDelete = (codeList: string[]) => {
        Modal.confirm({
            centered: true,
            title: '试题删除后无法找回，确认删除该试题',
            onOk: () => {
                store.deleteQuestion(codeList).then((res: any) => {
                    if (res?.failCount > 0) {
                        message.error(`存在${res?.failCount}条试题数据被练习引用删除失败`)
                    } else {
                        message.success('删除成功')
                        // 更新试题分类数据
                        questionKnowledgeRef.current?.onLoad()
                    }
                    actionRef.current.reload()
                    setSelectedKeys([])
                })
            },
        })
    }

    const handleImportManually = () => {
        // 手动清空职业/工种/等级数据
        store.commonJobList = []
        store.commonJobParams = store.defaultCommonJobParams
        history.push(`/question/${type}/edit?${urlParams}`)
    }

    // 批量导入
    const handleImportBatch = () => {
        setVisible(!visible)
    }

    // 批量导入完成
    const handleImportDone = () => {
        // 更新试题分类数据
        questionKnowledgeRef.current?.onLoad()
        // 更新试题列表数据
        actionRef.current?.reload()
    }

    // 启用/禁用
    const handleChangeStatus = (code: string) => {
        updateStatusApi(code).then(() => {
            actionRef.current?.reload()
        })
    }

    const rowSelection = {
        selectedRowKeys: selectedKeys,
        // @ts-ignore
        onChange: _selectedKeys => {
            setSelectedKeys(_selectedKeys)
        },
        preserveSelectedRowKeys: true,
    }

    const beforeSearchSubmit = (params: any) => {
        const { commonJob = [], storageTime, updateTime, ...rest } = params

        const [work = {}, type, level] = commonJob

        const { hasWorkType } = work

        const [storageStartTime, storageEndTime] = !isEmpty(storageTime) ? storageTime : []

        const { point = [] } = params

        const _params: QuestionListParams = {
            ...rest,
            workNameCode: work?.value,
        }

        if (hasWorkType) {
            _params.workTypeCode = type?.value
            _params.workLevelCode = level?.value
        } else {
            _params.workLevelCode = type?.value
        }

        const levelCode = hasWorkType ? level?.value : type?.value
        setCommonJobCode(levelCode)

        _params.storageStartTime = storageStartTime
            ? dayjs(storageStartTime).startOf('day').valueOf()
            : null
        _params.storageEndTime = storageEndTime
            ? dayjs(storageEndTime).endOf('day').valueOf()
            : null

        _params.point = point
            .filter((item: any) => Boolean(item))
            .map((item: { value: number }) => item?.value || item)

        _params.pointCode = point[point.length - 1]?.value

        return _params
    }

    const getExtraInitParams = () => {
        const pageParams = getPageListConfig('save_params')
        const { storageEndTime, storageStartTime, point } = pageParams
        console.log(point, ' point2')

        const storageTime: (Dayjs | null)[] = [
            storageStartTime ? dayjs(storageStartTime) : null,
            storageEndTime ? dayjs(storageEndTime) : null,
        ]
        return { storageTime, commonJob: mapJobName(routeQuery), point }
    }

    // 试题查重
    const handleLinkToCheck = () => {
        history.push(`/question/${type}/check?${urlParams}`)
    }

    const getQuestionTypeOptions = () => {
        // 职培试题放开9种类型
        // if (subject === SUBJECT_TYPE_ENUM.TRAIN) {
        //     return [{ label: '全部', value: null }, ...QUESTION_TYPE_OPTIONS.slice(0, 3)]
        // }
        return [{ label: '全部', value: null }, ...QUESTION_TYPE_OPTIONS]
    }

    // 批量导入下拉菜单（上海站点定制）
    const items: MenuProps['items'] = [
        {
            label: '系统标准模板（Excel）',
            key: 'default',
            onClick: () => {
                handleImportBatch()
                setTemplateType('default')
            },
        },
        {
            label: '鉴定中心指定模板（Excel）',
            key: 'authenticates',
            onClick: () => {
                handleImportBatch()
                setTemplateType('authenticates')
            },
        },
    ]

    // action: 手动导入、上传导入、word智能导入
    const renderOptionBar = () => {
        return (
            <Space size={8}>
                <Button type="primary" onClick={handleImportManually}>
                    手动录入
                </Button>
                {[SUBJECT_TYPE_ENUM.SIMULATION, SUBJECT_TYPE_ENUM.TRAIN].includes(
                    subject as SUBJECT_TYPE_ENUM,
                ) ? (
                    <Button type="primary" onClick={handleImportBatch}>
                        批量导入
                    </Button>
                ) : (
                    <Dropdown menu={{ items }}>
                        <Button type="primary">
                            <Space size={0}>
                                批量导入 <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                )}
                <Button
                    type="primary"
                    onClick={() => history.push(`/question/${type}/word-import?${urlParams}`)}
                >
                    Word智能录入
                </Button>

                <Button type="primary" onClick={handleLinkToCheck}>
                    试题查重
                </Button>
            </Space>
        )
    }

    //  全部删除
    const handleDeleteAll = () => {
        const values = searchFormRef.current?.getFieldsValue()
        const params = beforeSearchSubmit({
            ...values,
            ...commonParams,
            knowledgePointCode,
            // 无用参数后端用
            pageSize: 1,
            pageNo: 1,
        })
        params.workLevel = params.workLevelCode
        params.workName = params.workNameCode
        params.workType = params.workTypeCode

        const _params = omit(params, ['workNameCode', 'workLevelCode', 'workTypeCode', 'point'])
        console.log(_params)
        checkData(_params).then((result) => {
            if (result) {

                Modal.confirm({
                    centered: true,
                    title: '正在删除当前查询结果下的全部试题，删除后不可找回，是否确定删除？',
                    icon: <ExclamationCircleFilled />,
                    onOk: async () => {
                        allDelete(_params).then(res => {
                            message.success('删除成功')
                            actionRef.current.reload()
                        })
                    },
                    cancelText: '取消',
                })
            } else {
                message.error('当前查询结果下无试题，无需操作删除')
            }
        })
    }

    const renderFooterBar = () => {
        const selectedLength = selectedKeys.length

        return (
            <div className={styles.footer_bar}>
                <Space align="center" size={8}>
                    <Typography>已选 {selectedLength} 项</Typography>
                    <Button
                        type="primary"
                        disabled={selectedLength <= 0}
                        onClick={() => handleDelete(selectedKeys)}
                    >
                        批量删除
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => handleDeleteAll()}
                    >
                        全部删除
                    </Button>
                </Space>
            </div>
        )
    }

    const columns = useMemo(
        () =>
            [
                {
                    title: '职业',
                    dataIndex: 'jobName',
                    search: true,
                    formItemProps: {
                        label: '职业/工种/等级',
                        name: 'commonJob',
                        labelCol: { span: 10 },
                        wrapperCol: { span: 14 },
                    },
                    order: 3,
                    formOrder: 1,
                    width: 200,
                    ellipsis: true,
                    labelTooltip: false,
                    renderFormItem: () => {
                        return (
                            <ProfessionCascade
                                onChange={(selectOptionList: DefaultOptionType[]) => {
                                    const [work, type, level] = selectOptionList
                                    const { hasWorkType } = work

                                    // 有工种判断是否有等级，取等级code
                                    // 无工种判断是否有等级（此时等级为工种这个字段），取等级code
                                    const levelCode = hasWorkType ? level?.value : type?.value
                                    levelCode && setCommonJobCode(levelCode as number)
                                    setSelectedCommonJob(selectOptionList.map(i => i.value))
                                    searchFormRef?.current?.resetFields(['authenticateCode', 'point'])
                                    setAuthenticateList([])
                                }}
                            />
                        )
                    },
                    render: (_, { customContent }) => (
                        <Tooltip title={customContent?.commonJob?.jobName}>
                            {customContent?.commonJob?.jobName || '--'}
                        </Tooltip>
                    ),
                },
                {
                    title: '工种',
                    dataIndex: 'jobType',
                    order: 4,
                    search: false,
                    width: 140,
                    ellipsis: true,
                    render: (_, { customContent }) => (
                        <Tooltip title={customContent?.commonJob?.jobType}>
                            {customContent?.commonJob?.jobType || '--'}
                        </Tooltip>
                    ),
                },
                {
                    title: '等级',
                    dataIndex: 'jobLevel',
                    order: 5,
                    search: false,
                    width: 140,
                    render: (_, { customContent }) => customContent?.commonJob?.jobLevel || '--',
                },
                {
                    title: '题目/题干',
                    dataIndex: 'title',
                    formItemProps: {
                        name: 'titleLike',
                    },
                    width: 240,
                    order: 1,
                    formOrder: 2,
                    search: true,
                    render: val => <div dangerouslySetInnerHTML={{ __html: val }} />,
                },
                {
                    title: '题型',
                    dataIndex: 'type',
                    valueType: 'select',
                    search: true,
                    width: 120,
                    order: 2,
                    formOrder: 3,
                    formItemProps: {
                        initialValue: null,
                        name: 'questionType',
                    },
                    renderFormItem: () => {
                        return <Select options={getQuestionTypeOptions()} />
                    },
                    render: val => QUESTION_TYPE_TEXT[val],
                },
                {
                    title: '难易程度',
                    dataIndex: 'level',
                    formItemProps: {
                        initialValue: null,
                        name: 'questionLevel',
                    },
                    search: true,
                    width: 120,
                    order: 6,
                    formOrder: 4,
                    renderFormItem: () => {
                        return <Select options={QUESTION_LEVEL_OPTIONS} />
                    },
                    render: val => QUESTION_LEVEL_TEXT[val],
                },
                {
                    title: '要素细目表',
                    dataIndex: 'authenticateCode',
                    formItemProps: {
                        initialValue: null,
                        name: 'authenticateCode',
                        labelCol: { span: 7 },
                        wrapperCol: { span: 17 },
                    },
                    width: 120,
                    order: 6,
                    formOrder: 4,
                    hide: true,
                    renderFormItem: isRealAndTheory
                        ? () => {
                            const [workCode, typeCode, levelCode] = selectedCommonJob.map((item: any) => item ?? null)
                            const params = {
                                ...commonParams,
                                workCode, typeCode, levelCode,
                                status: 1,
                                pageSize: 999
                            }
                            return <MoreSelect
                                all={false}
                                placeholder="请选择"
                                valueKey={'code'}
                                requestUrl={'/question/front/authenticate/page_authenticates'}
                                requestParams={params}
                                fomatterResposeBody={res => {
                                    const { data } = res || {}
                                    return data.map((item: any) => ({ label: `${item.name}(${item.programName})`, value: item.code }))
                                }}
                                onChange={(val: any) => {
                                    searchFormRef.current?.resetFields(['point'])
                                    getAuthenticateDetail(val).then((res: any) => {
                                        const data: any = handlerData(res?.range, 1, authenticateChildrenName, 'code')
                                        setAuthenticateList(data || [])
                                    })
                                }}
                                allowClear
                                selectProps={{
                                    onClear: () => {
                                        setAuthenticateList([])
                                        searchFormRef.current?.resetFields(['point', 'authenticateCode'])
                                    }
                                }}
                            />
                        } : null,
                },
                {
                    title: '考评点',
                    dataIndex: 'point',
                    key: 'point',
                    width: 300,
                    order: 7,
                    formOrder: 5,
                    search: isRealAndTheory,
                    hide: !isRealAndTheory,
                    formItemProps: isRealAndTheory ? {} : false,
                    renderFormItem: isRealAndTheory
                        ? () => {
                            return (
                                <AuthenticateCascade
                                    changeOnSelect
                                    commonJobCode={commonJobCode}
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    options={authenticateList}
                                    beforeSearch={() => {
                                        return false
                                    }}
                                    onFocus={() => {
                                        const v = searchFormRef.current?.getFieldValue('authenticateCode')
                                        if (!v) {
                                            message.info('请先查询要素细目表')
                                        }
                                    }}
                                />
                            )
                        }
                        : null,
                    render: (_, { customContent }: any) =>
                        handlerAuthenticatePoint(customContent) || '--',
                },
                {
                    title: '区分度',
                    dataIndex: 'discrimination',
                    key: 'discrimination',
                    width: 140,
                    order: 8,
                    formOrder: 6,
                    search: isRealAndTheory,
                    hide: !isRealAndTheory,
                    formItemProps: isRealAndTheory ? { initialValue: null } : false,
                    renderFormItem: isRealAndTheory
                        ? () => <Select options={DISCRIMINATION_OPTIONS} />
                        : null,
                    render: (_, { customContent }: any) => (
                        <>
                            {DISCRIMINATION_OPTIONS.find(
                                item => item.value === customContent?.discrimination,
                            )?.label || '--'}
                        </>
                    ),
                },
                {
                    title: '入库时间',
                    dataIndex: 'storageTime',
                    search: true,
                    width: 240,
                    order: 9,
                    formOrder: 7,
                    renderFormItem: () => {
                        return <DatePicker.RangePicker placeholder={['开始日期', '结束日期']} />
                    },
                    render: val => dayjs(val).format('YYYY-MM-DD HH:mm'),
                },
                {
                    title: '更新时间',
                    dataIndex: 'updateTime',
                    search: true,
                    width: 240,
                    order: 10,
                    formOrder: 8,
                    renderFormItem: () => {
                        return <DatePicker.RangePicker placeholder={['开始日期', '结束日期']} />
                    },
                    render: val => dayjs(val).format('YYYY-MM-DD HH:mm'),
                },
                {
                    title: '引用状态',
                    dataIndex: 'referenceStatus',
                    key: 'referenceStatus',
                    search: subject !== SUBJECT_TYPE_ENUM.SIMULATION,
                    width: 120,
                    order: 11,
                    formOrder: 9,
                    formItemProps:
                        subject !== SUBJECT_TYPE_ENUM.SIMULATION
                            ? { name: 'referStatus', initialValue: 0 }
                            : false,
                    renderFormItem:
                        subject !== SUBJECT_TYPE_ENUM.SIMULATION
                            ? () => <DropdownBox isOptionAll={true} type="referStatus" />
                            : null,
                    render: (referenceStatus: number) => (
                        <>
                            {referStatusOptions.find(item => item.value === referenceStatus)?.label}
                        </>
                    ),
                    hide: subject === SUBJECT_TYPE_ENUM.SIMULATION,
                },
                {
                    title: '引用次数',
                    dataIndex: 'referenceCount',
                    key: 'referenceCount',
                    order: 12,
                    width: 120,
                    hide: subject === SUBJECT_TYPE_ENUM.SIMULATION,
                },
                {
                    title: '推荐状态',
                    dataIndex: 'recommendStatus',
                    key: 'recommendStatus',
                    search: subject !== SUBJECT_TYPE_ENUM.SIMULATION,
                    width: 140,
                    order: 13,
                    formOrder: 10,
                    formItemProps:
                        subject !== SUBJECT_TYPE_ENUM.SIMULATION
                            ? { name: 'recommendStatus', initialValue: 0 }
                            : false,
                    renderFormItem:
                        subject !== SUBJECT_TYPE_ENUM.SIMULATION
                            ? () => <DropdownBox isOptionAll={true} type="recommendStatus" />
                            : null,
                    render: (_, { customContent }) => (
                        <>
                            {recommendStatusOptions.find(
                                item => item.value === customContent?.recommendStatus,
                            )?.label || '未推荐'}
                        </>
                    ),
                    hide: subject === SUBJECT_TYPE_ENUM.SIMULATION,
                },
                {
                    title: '评审状态',
                    dataIndex: 'reviewStatus',
                    key: 'reviewStatus',
                    search: subject !== SUBJECT_TYPE_ENUM.SIMULATION,
                    width: 140,
                    order: 14,
                    formOrder: 11,
                    formItemProps:
                        subject !== SUBJECT_TYPE_ENUM.SIMULATION
                            ? { name: 'reviewStatus', initialValue: null }
                            : false,
                    renderFormItem:
                        subject !== SUBJECT_TYPE_ENUM.SIMULATION
                            ? () => <DropdownBox type="reviewStatus" />
                            : null,
                    render: (_, { reviewStatus }) => (
                        <>
                            {reviewStatusOptions.find(item => item.value === reviewStatus)?.label ||
                                '未提交'}
                        </>
                    ),
                    hide: subject === SUBJECT_TYPE_ENUM.SIMULATION,
                },
                {
                    title: '版本号',
                    dataIndex: 'version',
                    width: 150,
                    order: 16,
                    search: false,
                    hide: getCookie('ALIAS') !== 'esh' && skill === 20,
                    render: (val) => val || '--',
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
                    order: 17,
                    formOrder: 12,
                    formItemProps: { label: '启用/禁用', initialValue: null },
                    renderFormItem: () => <Select options={STATUS_OPTIONS} />,
                    render: (val, { code }) => (
                        <Switch
                            checkedChildren="启用"
                            unCheckedChildren="禁用"
                            checked={val === STATUS_ENUM.unDisabled}
                            onChange={() => handleChangeStatus(code!)}
                        />
                    ),
                    fixed: 'right',
                },
                {
                    title: '操作',
                    dataIndex: 'operate',
                    width: 210,
                    order: 18,
                    fixed: 'right',
                    render: (_, record: any) => (
                        <Space size={8} wrap>
                            <Typography.Link onClick={() => handlePreview(record)}>
                                预览
                            </Typography.Link>
                            {
                                record?.referenceCount > 0 && [SUBJECT_TYPE_ENUM.REAL].includes(subject!) && <Typography.Link onClick={() => handleAnalysis(record)}>
                                    分析
                                </Typography.Link>
                            }
                            <Typography.Link onClick={() => handleEdit(record.code)}>
                                编辑
                            </Typography.Link>
                            <Typography.Link onClick={() => handleDelete([record.code!])}>
                                删除
                            </Typography.Link>
                            {
                                getCookie('ALIAS') === 'esh' && record.reviewStatus === 2 && <Typography.Link onClick={() => handleCreate(record.code)}>
                                    新建版本
                                </Typography.Link>
                            }
                        </Space>
                    ),
                },
            ] as ColumnsTypeItem<QuestionListItem>[],
        [commonJobCode, selectedCommonJob, authenticateList],
    )

    const getThemeColor = () => {
        const themeColor = findSiteData(siteStore?.siteData, 'theme_color')?.value

        return themeColor
    }

    return (
        <div className={styles.page_question_list}>
            <TitleBlock title={pageTitle} />

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
                        skill={commonParams.skill!}
                        subject={commonParams.subject!}
                        belongType={BELONG_TYPE_ENUM.ORGANIZE}
                        organizationCode={userStore?.selectedOrganization}
                        sid={getLocalStorage('SID')}
                        collapsed={collapsed}
                        onCollapsed={(value: boolean) => setCollapsed(value)}
                        onSelect={(code?: React.Key) => {
                            setKnowledgePointCode(code)
                        }}
                        ref={questionKnowledgeRef}
                    />
                </QuestionKnowledgeContext.Provider>

                <div className={styles.list_wrapper}>
                    {/* 试题列表 */}
                    <BusinessTable
                        actionRef={actionRef}
                        formRef={searchFormRef}
                        params={{
                            ...commonParams,
                            knowledgePointCode,
                            organizationCode: userStore?.selectedOrganization,
                        }}
                        rowKey="code"
                        columns={columns}
                        // @ts-ignore
                        request={store.getQuestionList}
                        renderOptionBar={() => renderOptionBar()}
                        renderFooter={() => renderFooterBar()}
                        rowSelection={rowSelection}
                        beforeSearchSubmit={beforeSearchSubmit}
                        extraInitParams={getExtraInitParams()}
                        toolBar={true}
                        onReset={() => {
                            setAuthenticateList([])
                            history.push({})
                        }}
                    />
                </div>
            </div>

            {/* 预览 */}
            <PreviewModal
                previewData={previewData}
                onCancel={() => setPreviewData({ visible: false })}
            />

            {/* 预览 */}
            <AnalysisModal
                open={!!analysisCode}
                code={analysisCode}
                onCancel={() => setAnalysisCode(undefined)}
                onOk={() => setAnalysisCode(undefined)}
            />

            {/* 批量导入 */}
            <BatchImport
                {...commonParams}
                title={TEMPLATE_TITLE[templateType]}
                description={TEMPLATE_DESCRIPTION[templateType]}
                importTemplate={IMPORT_TEMPLATE[templateType]}
                importApi="/question/front/excel/import"
                open={visible}
                onCancel={handleImportBatch}
                onOk={handleImportDone}
                businessType={IMPORT_TYPE_ENUM.QUESTION_EXCEL}
                templateType={templateType}
            />
        </div>
    )
}

export default observer(QuestionList)
