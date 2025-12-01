import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.modules.less'
import type { IRoute } from 'umi'
import useStore from './store'
import type { Datum } from './interface'
import { Button, message, Tabs } from 'antd'
import { ENROLL_STATUS, EVENT_KIND_ENUM, STATUSENUM, TYPE_ENUM, TYPE_TAG, TYPE_TIME } from './const'
import { useEffect, useRef, useState } from 'react'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { ManOutlined, WomanOutlined } from '@ant-design/icons'
import Clipboard from 'clipboard'
import { usePageListConfig } from '@wotu/wotu-components'
import CustomTitle from '@/components/CustomTitle'
import { useModel } from 'umi'
import { TYPE_TAG_TRANSFORMED } from '../event-management/components/superTables/const'
import { getCookie, getSessionStorage } from '@/storage'
import { enrollMananementColumns } from './columns'
import { renderEnroll } from './utils'
import BusinessTable from '@/components/BusinessTable'
import { isEmpty } from 'lodash'
import BatchExport from '@/components/BatchExport'
import api from './api'
import ExportModal from './components/exportModal'
import { ExportEnum } from './components/exportModal/const'

/**  活动报名  */
const EnrollManagement = (props: IRoute) => {
    const { masterStore, gatewayUserStore } = useModel('@@qiankunStateFromMaster')

    const { getPageListConfig, setPageListConfig } = usePageListConfig()

    const {
        location: { query },
    } = props

    const { enrollCode, enrollStatus = 'all' } = query || {}
    /**
     *  当前选中的key
     */
    const [currentKey, setCurrentKey] = useState<string>(getPageListConfig('save_listTab', ''))
    /**
     *  默认的活动code
     */
    const [defaultCode, setDefaultCode] = useState<string>(
        enrollCode ? JSON.parse(decodeURIComponent(enrollCode)) : '',
    )

    const store = useLocalObservable(() => new useStore())
    const platform = getSessionStorage('PLATFORM')
    let lastOrganizationCode: string = ''
    let selectedOrganizationDetail: any = {}
    platform === 'workbench'
        ? (lastOrganizationCode = masterStore?.userStore?.selectedOrganization || '')
        : ''
    platform === 'workbench'
        ? (selectedOrganizationDetail = masterStore?.userStore?.selectedOrganizationDetail || '')
        : ''
    platform === 'portal' ? (lastOrganizationCode = gatewayUserStore?.currentOrgCode || '') : ''
    platform === 'portal'
        ? (selectedOrganizationDetail = gatewayUserStore?.selectedOrganizationDetail || '')
        : ''

    const organizationCode: string = getCookie('SELECT_ORG_CODE') || ''

    const formRef = useRef<any>(null)

    const actionRef = useRef<any>(null)
    // 导出前置条件弹窗
    const [visible, setVisible] = useState(false)
    // 导出参数
    const [exportParams, setExportParams] = useState<any>(null)

    useEffect(() => {
        if (enrollCode) {
            setDefaultCode(enrollCode)
        }
        if (enrollStatus) {
            setCurrentKey(ENROLL_STATUS[enrollStatus])
            setPageListConfig(ENROLL_STATUS[enrollStatus], 'save_listTab', true)
        }
    }, [enrollCode, enrollStatus])

    useEffect(() => {
        store.getEntityCode(lastOrganizationCode)
    }, [lastOrganizationCode])

    useEffect(() => {
        const copy = new Clipboard('#user_mobile')

        copy.on('success', function () {
            message.success('复制成功')
        })
        copy.on('error', function () {
            message.success('复制失败')
        })
        store.getRecordStatusCount()
        return () => {
            copy.destroy()
        }
    }, [])

    useEffect(() => {
        const { name: organizationName } = selectedOrganizationDetail || {}
        setTimeout(() => {
            document.title = organizationName ? `活动报名-${organizationName}` : '活动报名'
        }, 1000)
    }, [selectedOrganizationDetail])

    const genderIcon: Record<string, React.ReactElement> = {
        1: <ManOutlined style={{ color: '#1678ff' }} />, //男
        2: <WomanOutlined style={{ color: '#FF4D4F' }} />, //女
    }

    /**
     * tab 切换
     */
    const onChange = (key: string) => {
        setPageListConfig(key, 'save_listTab', true)
        setCurrentKey(key)
    }

    /**
     * tab 列表
     */
    const TabsList = () => [
        {
            tab: (
                <span>
                    全部
                    <span>
                        （{store.recordStatusCount?.reduce((prev, cur) => prev + cur.value, 0)}）
                    </span>
                </span>
            ),
            key: STATUSENUM.ALL_STATUS,
        },
        {
            tab: (
                <span>
                    待审核
                    <span>
                        （
                        {store.recordStatusCount[Number(STATUSENUM.PENDING_REVIEW) - 1]?.value ?? 0}
                        ）
                    </span>
                </span>
            ),
            key: STATUSENUM.PENDING_REVIEW,
        },

        {
            tab: (
                <span>
                    未缴费
                    <span>
                        （{store.recordStatusCount[Number(STATUSENUM.UNPAID_FEES) - 1]?.value ?? 0}
                        ）
                    </span>
                </span>
            ),
            key: STATUSENUM.UNPAID_FEES,
        },
        {
            tab: (
                <span>
                    报名成功
                    <span>
                        （{store.recordStatusCount[Number(STATUSENUM.SUCCESS) - 1]?.value ?? 0}）
                    </span>
                </span>
            ),
            key: STATUSENUM.SUCCESS,
        },
        {
            tab: (
                <span>
                    报名失败
                    <span>
                        （{store.recordStatusCount[Number(STATUSENUM.FAIL) - 1]?.value ?? 0}）
                    </span>
                </span>
            ),
            key: STATUSENUM.FAIL,
        },
        {
            tab: (
                <span>
                    过期未缴费
                    <span>
                        （
                        {store.recordStatusCount[Number(STATUSENUM.OVERDUE_UNPAID_FEES) - 1]
                            ?.value ?? 0}
                        ）
                    </span>
                </span>
            ),
            key: STATUSENUM.OVERDUE_UNPAID_FEES,
        },
        {
            tab: (
                <span>
                    已取消
                    <span>
                        （{store.recordStatusCount[Number(STATUSENUM.REFUNDED) - 1]?.value ?? 0}）
                    </span>
                </span>
            ),
            key: STATUSENUM.REFUNDED,
        },
    ]

    /**
     * 渲染报名活动
     * @param rowData  每行的数据
     * @returns {*}
     */
    const renderEnrollActivity = (rowData: Datum) => {
        /**  机构的话 只展示机构名称  */
        if (Number(rowData.type) === EVENT_KIND_ENUM.ORGANIZATION) {
            return (
                <>
                    <span className={styles.activity_type}>机构报名</span>
                    <span>：</span>
                    <span className={styles.itemName}>{rowData?.organizationName || '-'}</span>
                </>
            )
        }
        /**  职业  */
        if (Number(rowData.type) === EVENT_KIND_ENUM.CAREER) {
            return (
                <>
                    <span className={styles.activity_type}>职业</span>
                    <span>：</span>
                    <span className={styles.itemName}>{rowData?.title || '-'}</span>
                </>
            )
        }

        return (
            <div className={styles.activity}>
                <div>
                    <span className={styles.activity_type}>
                        {TYPE_TAG[TYPE_TAG_TRANSFORMED[rowData?.entryCode]]}
                    </span>
                    <span>：</span>
                    <span className={styles.itemName}>{rowData?.activityName}</span>
                </div>
                {TYPE_TAG_TRANSFORMED[rowData?.entryCode] === TYPE_ENUM.ORG ? null : (
                    <span className={styles.time}>
                        {TYPE_TIME[TYPE_TAG_TRANSFORMED[rowData.entryCode]]}：
                        {rowData?.activityStart
                            ? dayjs(rowData?.activityStart).format('YYYY-MM-DD HH:mm')
                            : '-'}{' '}
                        {rowData?.activityEnd
                            ? `至 ${dayjs(rowData?.activityEnd).format('YYYY-MM-DD HH:mm')}`
                            : ''}
                    </span>
                )}
            </div>
        )
    }

    /**
     *   渲染报名状态
     */
    const renderEnrollStatus = renderEnroll()

    /**  列表columns  */
    const [tableColumns] = useState(
        enrollMananementColumns(
            genderIcon,
            renderEnrollActivity,
            organizationCode,
            formRef,
            renderEnrollStatus,
            e => store.cancelRegistration(e, actionRef),
            actionRef,
        ),
    )

    /**  导出  */
    // const onExport = async () => {
    //     let params = formRef.current?.getFieldsValue()
    //     /**
    //      * createdEnd  createdStart
    //      */
    //     let { createdAt } = params || {}
    //     if (!createdAt || createdAt?.filter(Boolean)?.length < 2) {
    //         emptyTime()
    //         return
    //     } else {
    //         params.createdStart = +dayjs(createdAt?.[0].$d).startOf('day').format('x')
    //         params.createdEnd = +dayjs(createdAt?.[1].$d).endOf('day').format('x')
    //         delete params.createdAt
    //     }

    //     let res: any =
    //         (await store.getTableData({ ...params, pageNo: 1, pageSize: store.currentPageSize })) ||
    //         []
    //     if (res?.data?.length === 0) {
    //         emptyList()
    //         return
    //     }
    //     setExportParams({
    //         param: JSON.stringify({
    //             ...params,
    //             organizationCode: getCookie('SELECT_ORG_CODE'),
    //         }),
    //         organizationCode: getCookie('SELECT_ORG_CODE'),
    //         type: 9,
    //         fileName: '活动报名导出.xlsx',
    //     })
    //     // await store.exportEnrollExcel({ ...params, pageNo: 1, pageSize: store.currentPageSize })
    //     // message.success('导出成功,请在“批量操作”中查看进度')
    // }

    const beforeSeaerchSubmit = (params: any) => {
        const { createdAt, ...rest } = params
        const _params = { ...rest }

        const [createdStart, createdEnd] = !isEmpty(createdAt) ? createdAt : []

        _params.createdStart = createdStart ? dayjs(createdStart).startOf('day').valueOf() : null
        _params.createdEnd = createdEnd ? dayjs(createdEnd).endOf('day').valueOf() : null

        return _params
    }

    const getExtraInitParams = () => {
        const pageParams = getPageListConfig('save_params')
        const { createdStart, createdEnd } = pageParams

        const createdAt: (Dayjs | null)[] = [
            createdStart ? dayjs(createdStart) : null,
            createdEnd ? dayjs(createdEnd) : null,
        ]

        return { createdAt, activityCode: defaultCode || '' }
    }

    const desensitizationList = [
        {
            key: 'userName',
            type: '1',
            sign: true,
        },
        {
            key: 'userIdentify',
            type: '4',
        },
        {
            key: 'userMobile',
            type: '2',
        },
    ]

    return (
        <div className={styles.enroll_management}>
            <div className={styles.main}>
                <CustomTitle title="活动报名" marginBottom={0} />
                <BusinessTable
                    rowKey={'code'}
                    // @ts-ignore
                    desensitizationList={desensitizationList}
                    formItemsStyle={{
                        width: '398px',
                    }}
                    formRef={formRef}
                    actionRef={actionRef}
                    columns={tableColumns}
                    params={{
                        organizationCode: store.organizationCode,
                        status: currentKey,
                    }}
                    // @ts-expect-error
                    request={store.getTableData}
                    beforeSearchSubmit={beforeSeaerchSubmit}
                    extraInitParams={getExtraInitParams()}
                    onReset={() => {
                        const url = new URL(location.href)
                        if (url.searchParams.has('activityCode')) {
                            url.searchParams.delete('activityCode')
                        }
                        if (url.searchParams.has('enrollCode')) {
                            url.searchParams.delete('enrollCode')
                        }
                        window.history.replaceState({}, '', url)
                    }}
                    renderOptionBar={{
                        top: () => {
                            return (
                                <>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setVisible(true)
                                        }}
                                    >
                                        导出
                                    </Button>
                                    <ExportModal
                                        visible={visible}
                                        onCancel={() => {
                                            setVisible(false)
                                        }}
                                        onSubmit={data => {
                                            const createdAt = data?.date
                                            if (createdAt?.length > 0) {
                                                data.createdStart = +dayjs(createdAt?.[0].$d)
                                                    .startOf('day')
                                                    .format('x')
                                                data.createdEnd = +dayjs(createdAt?.[1].$d)
                                                    .endOf('day')
                                                    .format('x')
                                            }

                                            if (data.exportType === ExportEnum.USER) {
                                                setExportParams({
                                                    param: JSON.stringify({
                                                        ...data,
                                                        organizationCode:
                                                            getCookie('SELECT_ORG_CODE'),
                                                    }),
                                                    organizationCode: getCookie('SELECT_ORG_CODE'),
                                                    type: 9,
                                                    fileName: `用户报名信息汇总表-${dayjs().format(
                                                        'YYYYMMDDHHmmss',
                                                    )}.xlsx`,
                                                })
                                            } else {
                                                setExportParams({
                                                    ...data,
                                                    organizationCode: getCookie('SELECT_ORG_CODE'),
                                                })
                                            }

                                            setVisible(false)
                                        }}
                                    />
                                    <BatchExport
                                        open={!!exportParams}
                                        api={
                                            exportParams?.type === 9
                                                ? api.getImportTask
                                                : api.exportApplyInfo
                                        }
                                        progressApi={api.getImportDetail}
                                        params={exportParams}
                                        onClose={() => setExportParams(null)}
                                    />
                                </>
                            )
                        },
                        center: () => (
                            <Tabs activeKey={currentKey} onChange={onChange}>
                                {TabsList().map(item => (
                                    <Tabs.TabPane tab={item.tab} key={item.key} />
                                ))}
                            </Tabs>
                        ),
                    }}
                    toolBar={true}
                />
            </div>
        </div>
    )
}
const ObserverPassword: IRoute = inject('userStore', 'siteStore')(observer(EnrollManagement))

ObserverPassword.title = '活动报名'

export default ObserverPassword
