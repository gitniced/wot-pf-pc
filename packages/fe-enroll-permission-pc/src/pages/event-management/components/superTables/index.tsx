/* eslint-disable @typescript-eslint/no-use-before-define */
import { useRef, useState } from 'react'
import { Power } from '@wotu/wotu-pro-components'
import { usePageListConfig } from '@wotu/wotu-components'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import {
    Badge,
    Button,
    Dropdown,
    message,
    Modal,
    Select,
    Space,
    Switch,
    Tabs,
    Tooltip,
    Typography,
} from 'antd'
import {
    RELEASE_OPTIONS,
    // RELEASE_STATUS_ACTIVE,
    // RELEASE_STATUS_MAP,
    RELEASE_TYPE,
    STATUS_ACTIVE,
    STATUS_RELEASE,
    TYPE_TAG,
    // TYPE_TIME,
    statusActive,
    statusMap,
    TYPE_TAG_TRANSFORMED,
    STATUS_TYPE_ENUM,
    // RELEASE_STATUS,
    StatusTypeNum,
} from './const'
import styles from './index.modules.less'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { DatePicker } from '@/components/Picker'
// import EventModal from '../EventModal/eventModal'
// import CloseEnrollModal from '../CloseEnrollModal/CloseEnrollModal'
// @ts-ignore
import { history } from 'umi'
import { STATUSENUM } from '../../const'
import api from '../../api'
import Http from '@/servers/http'
import { getCookie, getLocalStorage } from '@/storage'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import BusinessTable from '@/components/BusinessTable'
import { isEmpty } from 'lodash'
import MoreSelect from '@/components/NewMoreSelect'
import ProfessionCascade from '@/components/ProfessionCascade'
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'

interface TabItem {
    tab: JSX.Element
    key: STATUSENUM
}

interface SuperTableProps {
    tabKey: string //当前选中的key
    tabList: TabItem[]
    onChange: (tabKey: string) => void
    handleChangeStatus: (params: any) => Promise<any>
    deleteActive: (params: any) => Promise<any>
    store: any
}

interface CustomAProps {
    clickHandler: () => void
    right: boolean
    title: string
    label?: React.ReactNode
    key?: number
}

const SuperTables: React.FC<SuperTableProps> = ({
    store,
    tabKey,
    tabList,
    onChange,
    handleChangeStatus,
    deleteActive,
}) => {
    const { getPageListConfig } = usePageListConfig()

    const tableRef = useRef(null)
    const actionRef = useRef({
        reload: () => {}, // 添加 reload 方法
    })

    const [columns] = useState([
        {
            title: '标题',
            dataIndex: 'name',
            search: true,
            width: 260,
            ellipsis: true,
            render: (_, record: any) => (
                <Typography.Link
                    onClick={() => history.push(`/event-management/details?code=${record.code}`)}
                >
                    {record.name}
                </Typography.Link>
            ),
        },
        {
            title: '报名项目',
            dataIndex: 'project',
            search: false,
            width: 150,
            render: (_, records: any) => renderEnrollActivity(records),
        },
        {
            title: '分类/课程',
            dataIndex: 'categoryCodes',
            width: 260,
            ellipsis: true,
            labelTooltip: true,
            formItemProps: {
                label: '分类',
            },
            render: (_, { categoryName, courseName }) => (
                <Tooltip
                    placement="topLeft"
                    title={courseName || categoryName?.join('、') || undefined}
                >
                    {courseName || categoryName?.join('、') || '-'}
                </Tooltip>
            ),
            renderFormItem: () => <ProfessionCascade />,
        },
        {
            title: '课程',
            dataIndex: 'courseCode',
            hide: true,
            renderFormItem: () => {
                return (
                    <MoreSelect
                        placeholder="请选择"
                        labelKey="name"
                        valueKey={'id'}
                        requestUrl={'/apply/front/list_course_type'}
                        requestMethod="post"
                        requestParams={{ sid: getLocalStorage('SID') }}
                        all
                        labelInValue
                    />
                )
            },
            search: true,
        },
        {
            title: '已报人数/最大报名人数',
            dataIndex: 'appliedNum',
            width: 200,
            render: (_, { appliedNum, quota }) => {
                return renderPeople(appliedNum, quota)
            },
        },
        {
            title: '报名起止时间',
            dataIndex: 'time',
            width: 340,
            search: true,
            formItemProps: {
                label: '报名时间',
            },
            renderFormItem: () => {
                return <DatePicker.RangePicker />
            },
            render: (_, { applyStartTime, applyEndTime }) => {
                if (!applyStartTime && !applyEndTime) {
                    return '不限'
                }
                return (
                    <>
                        {applyStartTime
                            ? dayjs(applyStartTime).format('YYYY-MM-DD HH:mm')
                            : '开始时间不限，'}
                        {applyEndTime ? ' 至 ' : ''}
                        {applyEndTime
                            ? dayjs(applyEndTime).format('YYYY-MM-DD HH:mm')
                            : '开始，结束时间不限'}
                        {applyStartTime ? '' : '结束'}
                    </>
                )
            },
        },
        {
            search: false,
            title: '报名审核',
            dataIndex: 'openAudit',
            width: 100,
            render: (_, { openAudit }) => {
                return (
                    <>
                        <Badge status={statusMap[openAudit] || 'default'} />{' '}
                        {STATUS_RELEASE[openAudit] || '-'}
                    </>
                )
            },
        },
        {
            search: false,
            title: '报名缴费',
            dataIndex: 'openPay',
            width: 100,
            render: (_, { openPay }) => {
                return (
                    <>
                        <Badge status={statusMap[openPay] || 'default'} />{' '}
                        {STATUS_RELEASE[openPay] || '-'}
                    </>
                )
            },
        },
        {
            search: false,
            title: '报名费用',
            dataIndex: 'price',
            width: 100,
            render: (_, { price }) => {
                return (
                    <>
                        <span style={{ color: 'var(--primary-color)' }}>￥{price || '-'}元</span>
                    </>
                )
            },
        },
        {
            search: false,
            title: '缴费截止时间',
            dataIndex: 'payEndTime',
            width: 150,
            render: (_, { payEndTime }) => {
                return <>{payEndTime ? dayjs(payEndTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</>
            },
        },
        {
            search: false,
            title: '创建时间',
            dataIndex: 'createdAt',
            width: 150,
            render: (_, { createdAt }) => {
                return <>{createdAt ? dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss') : '-'}</>
            },
        },
        {
            search: false,
            title: '报名状态',
            dataIndex: 'status',
            width: 140,
            fixed: 'right',
            render: (_, { status }) => {
                return (
                    <Space>
                        <Badge status={statusActive[status] || 'default'} />
                        {STATUS_ACTIVE[status] || '-'}
                        {status === StatusTypeNum.close && (
                            <Tooltip title="活动已关闭，用户端不可查看、不可报名">
                                <InfoCircleOutlined />
                            </Tooltip>
                        )}
                    </Space>
                )
            },
        },
        {
            search: true,
            title: (
                <Tooltip title="发布后，用户端可见">
                    发布状态&nbsp;
                    <InfoCircleOutlined />
                </Tooltip>
            ),
            dataIndex: 'publishStatus',
            width: 120,
            fixed: 'right',
            formItemProps: {
                label: '发布状态',
            },
            render: (val, { code }) => (
                <Switch
                    checkedChildren="启用"
                    unCheckedChildren="禁用"
                    checked={val === RELEASE_TYPE.RELEASE}
                    onChange={() =>
                        handleChangeStatus({
                            flag: val === RELEASE_TYPE.RELEASE ? 0 : 1,
                            code,
                        }).then(() => {
                            actionRef?.current?.reload()
                            store.getActivityStatusCount()
                        })
                    }
                />
            ),
            renderFormItem: () => {
                return (
                    <Select
                        options={RELEASE_OPTIONS}
                        placeholder={'请选择'}
                        style={{ width: '100%' }}
                    />
                )
            },
        },
        {
            search: false,
            title: '操作',
            key: 'operation',
            dataIndex: 'operation',
            width: 260,
            fixed: 'right',
            render: (_, record: any) => {
                return getActions(record)
            },
        },
    ] as ColumnsTypeItem<any>[])

    const eventTableRequest = async (params: any) => {
        // tabs 0 代表全部 去除字段
        if (params?.status === STATUSENUM.ALL_STATUS) {
            delete params.status
        }
        const organizationCode: string = getCookie('SELECT_ORG_CODE')

        // 时间处理成时间戳
        return await Http(api.eventPage, 'post', {
            ...params,
            organizationCode,
        })
    }

    /**
     * 渲染报名活动
     * @param rowData  每行的数据
     * @returns {*}
     */
    const renderEnrollActivity = (rowData: any) => {
        return (
            <div className={styles.activity}>
                <div>
                    <span className={styles.activity_type}>
                        {TYPE_TAG[TYPE_TAG_TRANSFORMED[rowData.entryCode]]}
                    </span>
                    {/* <span>：</span>
                    <span className={styles.itemName}>{rowData.name}</span> */}
                </div>
                {/* {
                    <span className={styles.time}>
                        {TYPE_TIME[TYPE_TAG_TRANSFORMED[rowData.entryCode]]}：
                        {rowData?.activityStart
                            ? dayjs(rowData?.activityStart).format('YYYY-MM-DD HH:mm')
                            : '-'}
                        {''}
                        {rowData?.activityEnd
                            ? ` 至 ${dayjs(rowData?.activityEnd).format('YYYY-MM-DD HH:mm')}`
                            : ' 至 待定 '}
                    </span>
                } */}
            </div>
        )
    }

    /**
     * 点击发布 或者取消发布
     * flag   0取消发布     1 发布
     * record  当前行的数据
     */
    // const onCLickRelease = (flag: number, record: any) => {
    //     EventModal({
    //         flag,
    //         record,
    //         actionRef,
    //     })
    // }
    /**
     * 关闭报名modal
     * @param data  当前行的数据
     */
    // const onClickCloseEnrollModal = (data: any) => {
    //     CloseEnrollModal({
    //         data,
    //         actionRef,
    //     })
    // }
    /**
     * 获取操作按钮
     * @param data  当前行的数据
     */
    const getActions = (record: any) => {
        const { status } = record
        let nodeList: any = []

        let actionMap: Record<string, CustomAProps> = {
            edit: {
                clickHandler: () => {
                    history.push(`/enroll-setting?code=${record.code}`)
                },
                right: true,
                title: '编辑',
            },
            delete: {
                clickHandler: () => {
                    Modal.confirm({
                        title: '确定要删除该页面吗，该操作不可逆。',
                        icon: <ExclamationCircleOutlined />,
                        centered: true,
                        okText: '确认',
                        cancelText: '取消',
                        onOk: () => {
                            deleteActive(record?.code).then(() => {
                                message.success('删除成功')
                                actionRef?.current?.reload()
                                store.getActivityStatusCount()
                            })
                        },
                    })
                },
                title: '删除',
                right: true,
            },
            name: {
                clickHandler: () => {
                    history.push(`/enroll-management?enrollCode=${record.code}`)
                },
                right: true,
                title: '名单',
            },
            popular: {
                clickHandler: () => {
                    history.push(
                        `/event-management/generalization?code=${record.code}&type=${
                            TYPE_TAG_TRANSFORMED[record.entryCode]
                        }`,
                    )
                },
                right: true,
                title: '推广',
            },

            // publish: {
            //     clickHandler: () => {
            //         onCLickRelease(RELEASE_TYPE.RELEASE, record)
            //     },
            //     right: true,
            //     title: '发布',
            // },
            // unPublish: {
            //     clickHandler: () => {
            //         onCLickRelease(RELEASE_TYPE.CANCEL, record)
            //     },
            //     right: true,
            //     title: '取消发布',
            // },
            // close: {
            //     clickHandler: () => {
            //         onClickCloseEnrollModal(record)
            //     },
            //     right: false,
            //     title: '关闭报名',
            // },
        }

        const CustomA = ({ clickHandler, right, title }: CustomAProps) => {
            return (
                <Typography.Link
                    onClick={clickHandler}
                    style={right ? { marginRight: '16px' } : {}}
                >
                    {title}
                </Typography.Link>
            )
        }

        const CustomPop = ({ title, clickHandler }: CustomAProps) => {
            return (
                <div className={styles.event_management_more_item} onClick={clickHandler}>
                    {title}
                </div>
            )
        }

        /* 报名项目为【评价计划】或【班级报名】，活动为【未开始】/【进行中】可编辑 */
        // if (
        //     status === STATUS_TYPE_ENUM.DRAFT ||
        //     (status === STATUS_TYPE_ENUM.RELEASE && permissionIdList.includes(10948))
        // ) {
        //     nodeList.push(actionMap.edit)
        // }

        /** 编辑 */
        nodeList.push(actionMap.edit)
        /* 删除 */
        nodeList.push(actionMap.delete)
        /* 展示名单*/
        nodeList.push(actionMap.name)
        /* 活动为 未关闭 可推广 */
        if (status !== STATUS_TYPE_ENUM.CLOSE) {
            nodeList.push(actionMap.popular)
        }

        /* 活动为【已结束】*/
        // if (status !== STATUS_TYPE_ENUM.END) {
        //     /* 活动发布状态为【未发布】展示发布*/
        //     if (publishStatus === RELEASE_TYPE.CANCEL) {
        //         nodeList.push(actionMap.publish)
        //     } else {
        //         /* 活动发布状态为【已发布】展示取消发布*/
        //         nodeList.push(actionMap.unPublish)
        //     }
        // }

        /* 活动为【未开始】/【进行中】可编辑 */
        // if (status === STATUS_TYPE_ENUM.DRAFT || status === STATUS_TYPE_ENUM.RELEASE) {
        //     nodeList.push(actionMap.close)
        // }

        if (nodeList.length > 4) {
            const defaultList = nodeList.splice(0, 3)
            let moreList: CustomAProps[] = nodeList
            moreList.map((item, index) => {
                item.key = index
                item.label = CustomPop(item)
            })
            return (
                <div className={styles.event_management_more}>
                    {defaultList.map((item: CustomAProps, index: number) => {
                        index === 2 ? (item.right = true) : ''
                        return <CustomA {...item} />
                    })}
                    <Dropdown
                        menu={{ items: moreList as ItemType[] }}
                        placement="bottom"
                        arrow
                        getPopupContainer={() => tableRef.current!}
                    >
                        <a className={styles.event_management_more_btn_inline}>
                            更多
                            <svg
                                className={['icon', styles.event_management_more_btn_sign].join(
                                    ' ',
                                )}
                                aria-hidden="true"
                            >
                                <use xlinkHref="#icon_zhankai" />
                            </svg>
                        </a>
                    </Dropdown>
                </div>
            )
        } else {
            return (
                <>
                    {nodeList.map((item: CustomAProps) => (
                        <CustomA {...item} />
                    ))}
                </>
            )
        }
    }

    /**  渲染报名人数  */
    const renderPeople = (person: number, max: number) => {
        if (person && max !== -1) {
            return (
                <>
                    <span style={{ color: 'var(--primary-color)' }}>{person || '0'}</span>/
                    <span>{max}</span>
                </>
            )
        }

        if (person && max === -1) {
            return <span style={{ color: 'var(--primary-color)' }}>{person || '0'}</span>
        }

        if (!person && max !== -1) {
            return (
                <>
                    <span style={{ color: 'var(--primary-color)' }}>0</span>/<span>{max}</span>
                </>
            )
        }
        if (!person && max === -1) {
            return '-'
        }
    }

    const beforeSearchSubmit = (params: any) => {
        const { publishTime, time, categoryCodes, courseCode, ...rest } = params

        const _params = { ...rest }
        if (publishTime) {
            //转为时间戳
            _params.publishTime = dayjs(publishTime).valueOf()
        }
        console.log(categoryCodes)

        const [applyStartDate, applyEndDate] = !isEmpty(time) ? time : []
        const [careerId, workId, levelRelationId] = !isEmpty(categoryCodes) ? categoryCodes : []

        _params.applyStartDate = applyStartDate
            ? dayjs(applyStartDate).startOf('day').valueOf()
            : null
        _params.applyEndDate = applyEndDate ? dayjs(applyEndDate).endOf('day').valueOf() : null

        _params.careerId = careerId?.value
        _params.workId = workId?.value
        _params.levelRelationId = levelRelationId?.value
        _params.courseCode = courseCode?.value

        return _params
    }

    const getExtraInitParams = () => {
        const pageParams = getPageListConfig('save_params')
        const { applyStartDate, applyEndDate } = pageParams

        const time: (Dayjs | null)[] = [
            applyStartDate ? dayjs(applyStartDate) : null,
            applyEndDate ? dayjs(applyEndDate) : null,
        ]

        return { time }
    }

    return (
        <div ref={tableRef} className={styles.enroll_management_main}>
            <BusinessTable
                formItemsStyle={{
                    width: '397px',
                }}
                actionRef={actionRef}
                params={{ status: tabKey }}
                columns={columns}
                // @ts-ignore
                request={eventTableRequest}
                renderOptionBar={{
                    top: () => {
                        return (
                            // @ts-ignore
                            <Power powerId={10949}>
                                <Button
                                    key="primary"
                                    onClick={() => {
                                        history.push(`/enroll-setting`)
                                    }}
                                    type="primary"
                                >
                                    新建
                                </Button>
                            </Power>
                        )
                    },
                    center: () => (
                        <Tabs onChange={onChange} activeKey={tabKey}>
                            {tabList.map(item => (
                                <Tabs.TabPane tab={item.tab} key={item.key} />
                            ))}
                        </Tabs>
                    ),
                }}
                beforeSearchSubmit={beforeSearchSubmit}
                extraInitParams={getExtraInitParams()}
            />
        </div>
    )
}

export default SuperTables
