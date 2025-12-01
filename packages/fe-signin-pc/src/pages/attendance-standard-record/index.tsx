import { useRef, useState, useEffect } from 'react'
import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.modules.less'
import type { IRoute } from 'umi'
import { history, useModel } from 'umi'
import useStore from './store'
import { getSessionStorage } from '@/storage'
import BusinessTable from '@/components/BusinessTable'
// import CustomTitle from '@/components/CustomTitle'
import type { ColumnsType } from 'antd/lib/table'
import { getDecodeInfo, usePageListConfig } from '@wotu/wotu-components'
import type { Rule, TableData } from './interface'
import {
    CERTIFICATE_TYPE_TEXT_MAP,
    SIGN_IN,
    SIGN_OUT,
    FACE_PASS_TEXT_MAP,
    SIGN_ED,
    UN_SIGN,
    SIGN_OVER_ED,
    OTHER,
    SIGN_OUT_STATUS_TEXT_MAP,
    SIGN_IN_STATUS_TEXT_MAP,
    CHECK_TYPE_TEXT_MAP,
    FACE_PASS_SUCCESS,
    getClassName,
} from './const'
import dayjs from 'dayjs'
import {
    Tabs,
    Select,
    Spin,
    Badge,
    Modal,
    Descriptions,
    Image,
    Tooltip,
    Space,
    Typography,
} from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'

const EventManagement: React.FC = () => {
    const { query = {} } = history.location
    const formRef = useRef<any>(null)
    const actionRef = useRef<any>(null)
    const store = useLocalObservable(() => new useStore())
    const { taskRule } = store || {}
    const {
        /**签到规则 */
        rule = {},
        /**签到最后面时间 */
        signInEndTime,
        /**签到最前面时间 */
        signInStartTime,
        /**签退最后面时间 */
        signOutEndTime,
        /**签退最前面时间 */
        signOutStartTime,
    } = taskRule || {}

    const desensitizationList = [
        {
            key: 'name',
            type: '1',
        },
        {
            key: 'certificate',
            type: '4',
        },
    ]

    const { getPageListConfig, setPageListConfig } = usePageListConfig()

    const { workUserStore, gatewayUserStore } = useModel('@@qiankunStateFromMaster') || {}
    const platform = getSessionStorage('PLATFORM')
    let selectedOrganizationDetail: any = {}
    if (platform === 'workbench') {
        selectedOrganizationDetail = workUserStore?.selectedOrganizationDetail
    }
    if (platform === 'portal') {
        selectedOrganizationDetail = gatewayUserStore?.selectedOrganizationDetail
    }
    /**
     *  当前选中的key
     */
    const [currentKey, setCurrentKey] = useState<string>(getPageListConfig('save_listTab', ''))

    /**
     *  是否展示外勤信息
     */
    const [showSignInfo, setShowSignInfo] = useState<boolean>(false)

    /**
     *  是否展示外勤信息
     */
    const [currentSignInfo, setCurrentSignInfo] = useState<TableData | null>(null)

    useEffect(() => {
        store.getTaskRule(setCurrentKey)
    }, [])

    useEffect(() => {
        const { name: organizationName } = selectedOrganizationDetail || {}
        setTimeout(() => {
            document.title = organizationName ? `打卡记录-${organizationName}` : '打卡记录'
        }, 1000)
    }, [selectedOrganizationDetail])

    /**
     * tab 切换
     */
    const onChange = (key: string) => {
        setPageListConfig(key, 'save_listTab', true)
        setCurrentKey(key)
    }

    const getTableColumns = (): ColumnsType<TableData>[] => {
        const { type, checkFace, distance } = (rule || {}) as unknown as Rule
        const baseColumns: ColumnsType<TableData>[] = [
            {
                //@ts-ignore
                search: false,
                title: '用户',
                dataIndex: 'name',
                width: '15%',
                render: (_: string, item: TableData) => {
                    const { name, mobile, isHideMsg, isHideBtn } = item
                    return (
                        <Space>
                            <Typography.Text>
                                <div className={styles.sign_table_two_row}>
                                    <div className={styles.sign_table_two_row_item}>
                                        {isHideMsg
                                            ? getDecodeInfo(name || '', '1')
                                            : getDecodeInfo(name || '')}
                                    </div>
                                    <div className={styles.sign_table_two_row_item}>
                                        {isHideMsg
                                            ? getDecodeInfo(mobile || '', '2')
                                            : getDecodeInfo(mobile || '')}
                                    </div>
                                </div>
                            </Typography.Text>
                            {/* @ts-ignore */}
                            {!isHideBtn ? (
                                <Typography.Text
                                    onClick={(e: any) => {
                                        e.stopPropagation()
                                        actionRef.current.toggleRowHideMsg(item)
                                    }}
                                >
                                    <div
                                        style={{ cursor: 'pointer', width: '16px', height: '100%' }}
                                    >
                                        {/* @ts-ignore */}
                                        {isHideMsg ? (
                                            <EyeFilled style={{ color: 'var(--primary-color)' }} />
                                        ) : (
                                            <EyeInvisibleFilled
                                                style={{ color: 'var(--primary-color)' }}
                                            />
                                        )}
                                    </div>
                                </Typography.Text>
                            ) : null}
                        </Space>
                    )
                },
            },
            {
                //@ts-ignore
                search: true,
                hide: true,
                title: '',
                dataIndex: 'name',
                width: '0',
                formOrder: 1,
                formItemProps: {
                    label: '姓名',
                },
                render: () => null,
            },
            {
                //@ts-ignore
                search: true,
                hide: true,
                title: '',
                dataIndex: 'mobile',
                width: '0',
                formOrder: 2,
                formItemProps: {
                    label: '手机号',
                },
                render: () => null,
            },
            {
                //@ts-ignore
                search: true,
                title: '证件号码',
                dataIndex: 'certificate',
                width: '15%',
                formOrder: 3,
                render: (_: string, { certificate, certificateType, isHideMsg }: TableData) => {
                    return (
                        <div className={styles.sign_table_two_row}>
                            <div className={styles.sign_table_two_row_item}>
                                {/* @ts-ignore */}
                                {isNaN(certificateType)
                                    ? CERTIFICATE_TYPE_TEXT_MAP[OTHER]
                                    : // @ts-ignore
                                      CERTIFICATE_TYPE_TEXT_MAP[Number(certificateType)]}
                            </div>
                            <div className={styles.sign_table_two_row_item}>
                                {isHideMsg
                                    ? getDecodeInfo(certificate || '', '4')
                                    : getDecodeInfo(certificate || '')}
                            </div>
                        </div>
                    )
                },
            },
            {
                //@ts-ignore
                title: `${currentKey.toString() === SIGN_IN.toString() ? '签到' : '签退'}状态`,
                width: '15%',
                dataIndex: `${
                    currentKey.toString() === SIGN_IN.toString() ? 'signStatus' : 'signOutStatus'
                }`,
                formOrder: 4,
                render: (_: string, { signStatus, signOutStatus }: TableData) => {
                    return (
                        <div className={styles.sign_table_two_row}>
                            {currentKey.toString() === SIGN_IN.toString() ? (
                                <div className={styles.sign_table_two_row_item}>
                                    {signStatus.toString() !== '0' ? (
                                        <Badge
                                            status="success"
                                            text={
                                                <div
                                                    className={
                                                        styles.sign_table_two_row_item_status
                                                    }
                                                >
                                                    已签到
                                                </div>
                                            }
                                        />
                                    ) : (
                                        <Badge
                                            status="default"
                                            text={
                                                <div
                                                    className={
                                                        styles.sign_table_two_row_item_status
                                                    }
                                                >
                                                    未签到
                                                </div>
                                            }
                                        />
                                    )}
                                </div>
                            ) : null}
                            {currentKey.toString() === SIGN_OUT.toString() ? (
                                <div className={styles.sign_table_two_row_item}>
                                    {signOutStatus.toString() !== '0' ? (
                                        <Badge
                                            status="success"
                                            text={
                                                <div
                                                    className={
                                                        styles.sign_table_two_row_item_status
                                                    }
                                                >
                                                    已签退
                                                </div>
                                            }
                                        />
                                    ) : (
                                        <Badge
                                            status="default"
                                            text={
                                                <div
                                                    className={
                                                        styles.sign_table_two_row_item_status
                                                    }
                                                >
                                                    未签退
                                                </div>
                                            }
                                        />
                                    )}
                                </div>
                            ) : null}
                        </div>
                    )
                },
                renderFormItem: () => {
                    return (
                        <Select style={{ width: '100%' }} placeholder={'请选择'}>
                            <Select.Option value={UN_SIGN}>{`未${
                                currentKey.toString() === SIGN_IN.toString() ? '签到' : '签退'
                            }`}</Select.Option>
                            <Select.Option value={SIGN_ED}>{`已${
                                currentKey.toString() === SIGN_IN.toString() ? '签到' : '签退'
                            }`}</Select.Option>
                        </Select>
                    )
                },
            },
            {
                // @ts-ignore
                title: `${currentKey.toString() === SIGN_IN.toString() ? '签到' : '签退'}时间`,
                width: '15%',
                dataIndex: `${
                    currentKey.toString() === SIGN_IN.toString() ? 'signInTime' : 'signOutTime'
                }`,
                render: (
                    _: string,
                    { signStatus, signOutStatus, signTime, checkType }: TableData,
                ) => {
                    return (
                        <div className={styles.sign_table_two_row}>
                            {currentKey.toString() === SIGN_IN.toString() ? (
                                <div className={styles.sign_table_two_row_item}>
                                    {signStatus.toString() !== '0' ? (
                                        <>
                                            <div className={styles.sign_table_two_row_item_title}>
                                                <Tooltip
                                                    title={dayjs(signTime).format(
                                                        'YYYY-MM-DD HH:mm:ss',
                                                    )}
                                                >
                                                    {dayjs(signTime).format('YYYY-MM-DD HH:mm:ss')}
                                                </Tooltip>
                                            </div>
                                            {rule?.type?.toString?.() === '2' && checkType ? (
                                                <span
                                                    className={getClassName[checkType.toString()]}
                                                    style={{ marginLeft: '8px' }}
                                                >
                                                    {/* @ts-ignore */}
                                                    {CHECK_TYPE_TEXT_MAP[checkType.toString()]}
                                                </span>
                                            ) : null}
                                        </>
                                    ) : (
                                        '-'
                                    )}
                                </div>
                            ) : null}
                            {currentKey.toString() === SIGN_OUT.toString() ? (
                                <div className={styles.sign_table_two_row_item}>
                                    {signOutStatus.toString() !== '0' ? (
                                        <>
                                            <div className={styles.sign_table_two_row_item_title}>
                                                <Tooltip
                                                    title={dayjs(signTime).format(
                                                        'YYYY-MM-DD HH:mm:ss',
                                                    )}
                                                >
                                                    {dayjs(signTime).format('YYYY-MM-DD HH:mm:ss')}
                                                </Tooltip>
                                            </div>
                                            {rule?.type?.toString?.() === '2' && checkType ? (
                                                <span
                                                    className={getClassName[checkType.toString()]}
                                                    style={{ marginLeft: '8px' }}
                                                >
                                                    {/* @ts-ignore */}
                                                    {CHECK_TYPE_TEXT_MAP[checkType.toString()]}
                                                </span>
                                            ) : null}
                                        </>
                                    ) : (
                                        '-'
                                    )}
                                </div>
                            ) : null}
                        </div>
                    )
                },
            },
        ]
        const locationColumns: ColumnsType<TableData> = {
            // @ts-ignore
            title: `${currentKey.toString() === SIGN_IN.toString() ? '签到' : '签退'}位置`,
            width: '20%',
            dataIndex: 'location',
            render: (_: string, currentData: TableData) => {
                const { signStatus, signOutStatus, signLocation } = currentData || {}
                return (
                    <div className={styles.sign_table_two_row}>
                        {currentKey.toString() === SIGN_IN.toString() ? (
                            <div
                                className={[
                                    styles.sign_table_two_row_item,
                                    signStatus.toString() === SIGN_OVER_ED.toString()
                                        ? styles.can_click
                                        : '',
                                ].join(' ')}
                                onClick={() => {
                                    if (signStatus.toString() === SIGN_OVER_ED.toString()) {
                                        setCurrentSignInfo(currentData)
                                        setShowSignInfo(true)
                                    }
                                }}
                            >
                                {signStatus.toString() !== '0' ? (
                                    signLocation ? (
                                        <>
                                            <div className={styles.sign_table_two_row_item_title}>
                                                <Tooltip title={signLocation}>
                                                    {signLocation}
                                                </Tooltip>
                                            </div>
                                            {signStatus.toString() === SIGN_OVER_ED.toString() ? (
                                                <span
                                                    className={styles.sign_success_tag}
                                                    style={{ marginLeft: '8px' }}
                                                >
                                                    {SIGN_IN_STATUS_TEXT_MAP[SIGN_OVER_ED]}
                                                </span>
                                            ) : null}
                                        </>
                                    ) : (
                                        <Space>
                                            -
                                            {signStatus.toString() === SIGN_OVER_ED.toString() ? (
                                                <span
                                                    className={styles.sign_success_tag}
                                                    style={{ marginLeft: '8px' }}
                                                >
                                                    {SIGN_IN_STATUS_TEXT_MAP[SIGN_OVER_ED]}
                                                </span>
                                            ) : null}
                                        </Space>
                                    )
                                ) : (
                                    '-'
                                )}
                            </div>
                        ) : null}
                        {currentKey.toString() === SIGN_OUT.toString() ? (
                            <div
                                className={[
                                    styles.sign_table_two_row_item,
                                    signOutStatus.toString() === SIGN_OVER_ED.toString()
                                        ? styles.can_click
                                        : '',
                                ].join(' ')}
                                onClick={() => {
                                    if (signOutStatus.toString() === SIGN_OVER_ED.toString()) {
                                        setCurrentSignInfo(currentData)
                                        setShowSignInfo(true)
                                    }
                                }}
                            >
                                {signOutStatus.toString() !== '0' ? (
                                    signLocation ? (
                                        <>
                                            <div className={styles.sign_table_two_row_item_title}>
                                                <Tooltip title={signLocation}>
                                                    {signLocation}
                                                </Tooltip>
                                            </div>
                                            {signOutStatus.toString() ===
                                            SIGN_OVER_ED.toString() ? (
                                                <span
                                                    className={styles.sign_success_tag}
                                                    style={{ marginLeft: '8px' }}
                                                >
                                                    {SIGN_OUT_STATUS_TEXT_MAP[SIGN_OVER_ED]}
                                                </span>
                                            ) : null}
                                        </>
                                    ) : (
                                        <Space>
                                            -
                                            {signOutStatus.toString() ===
                                            SIGN_OVER_ED.toString() ? (
                                                <span
                                                    className={styles.sign_success_tag}
                                                    style={{ marginLeft: '8px' }}
                                                >
                                                    {SIGN_OUT_STATUS_TEXT_MAP[SIGN_OVER_ED]}
                                                </span>
                                            ) : null}
                                        </Space>
                                    )
                                ) : (
                                    '-'
                                )}
                            </div>
                        ) : null}
                    </div>
                )
            },
        }
        const faceColumns: ColumnsType<TableData>[] = [
            {
                //@ts-ignore
                title: '人脸识别记录',
                width: '20%',
                dataIndex: 'faceIdentifyAt',
                render: (
                    _: string,
                    {
                        signStatus,
                        signOutStatus,
                        inFaceIdentifyAt,
                        inFacePass,
                        outFaceIdentifyAt,
                        outFacePass,
                    }: TableData,
                ) => {
                    return (
                        <div className={styles.sign_table_two_row}>
                            {currentKey.toString() === SIGN_IN.toString() ? (
                                <div className={styles.sign_table_two_row_item}>
                                    {signStatus.toString() !== '0' ? (
                                        inFaceIdentifyAt ? (
                                            <>
                                                <div
                                                    className={styles.sign_table_two_row_item_title}
                                                >
                                                    <Tooltip
                                                        title={dayjs(inFaceIdentifyAt).format(
                                                            'YYYY-MM-DD HH:mm:ss',
                                                        )}
                                                    >
                                                        {dayjs(inFaceIdentifyAt).format(
                                                            'YYYY-MM-DD HH:mm:ss',
                                                        )}
                                                    </Tooltip>
                                                </div>
                                                {inFacePass.toString() ===
                                                FACE_PASS_SUCCESS.toString() ? (
                                                    <span
                                                        className={styles.sign_success_tag}
                                                        style={{ marginLeft: '8px' }}
                                                    >
                                                        {/* @ts-ignore */}
                                                        {FACE_PASS_TEXT_MAP[Number(inFacePass)]}
                                                    </span>
                                                ) : null}
                                            </>
                                        ) : (
                                            '-'
                                        )
                                    ) : (
                                        '-'
                                    )}
                                </div>
                            ) : null}
                            {currentKey.toString() === SIGN_OUT.toString() ? (
                                <div className={styles.sign_table_two_row_item}>
                                    {signOutStatus.toString() !== '0' ? (
                                        outFaceIdentifyAt ? (
                                            <>
                                                <div
                                                    className={styles.sign_table_two_row_item_title}
                                                >
                                                    <Tooltip
                                                        title={dayjs(outFaceIdentifyAt).format(
                                                            'YYYY-MM-DD HH:mm:ss',
                                                        )}
                                                    >
                                                        {dayjs(outFaceIdentifyAt).format(
                                                            'YYYY-MM-DD HH:mm:ss',
                                                        )}
                                                    </Tooltip>
                                                </div>
                                                {outFacePass.toString() ===
                                                FACE_PASS_SUCCESS.toString() ? (
                                                    <span
                                                        className={styles.sign_success_tag}
                                                        style={{ marginLeft: '8px' }}
                                                    >
                                                        {/* @ts-ignore */}
                                                        {FACE_PASS_TEXT_MAP[Number(outFacePass)]}
                                                    </span>
                                                ) : null}
                                            </>
                                        ) : (
                                            '-'
                                        )
                                    ) : (
                                        '-'
                                    )}
                                </div>
                            ) : null}
                        </div>
                    )
                },
            },
        ]
        let tableColumns: ColumnsType<TableData>[] = []
        if (type.toString() === '1') {
            if (distance) {
                baseColumns.push(locationColumns)
            }
            if (checkFace.toString() === '1') {
                tableColumns = baseColumns.concat(faceColumns)
            } else {
                tableColumns = baseColumns
            }
        } else {
            tableColumns = baseColumns.concat(faceColumns)
        }

        return tableColumns
    }

    const getRuleItemVisible = (signType: 'signStart' | 'signEnd') => {
        const vis = store.taskRule?.rule?.[signType]?.toString?.() === '1'
        return vis
    }

    const getRuleDom = () => {
        return (
            <>
                {getRuleItemVisible('signStart') ? (
                    <div className={styles.task_info_content_time_item}>
                        签到时间范围：
                        <span className={styles.task_info_content_time_item_time}>
                            {`${dayjs(signInStartTime).format('YYYY-MM-DD HH:mm:ss')} 至 ${dayjs(
                                signInEndTime,
                            ).format('YYYY-MM-DD HH:mm:ss')}`}
                        </span>
                    </div>
                ) : null}
                {getRuleItemVisible('signEnd') ? (
                    <div className={styles.task_info_content_time_item}>
                        签退时间范围：
                        <span className={styles.task_info_content_time_item_time}>
                            {`${dayjs(signOutStartTime).format('YYYY-MM-DD HH:mm:ss')} 至 ${dayjs(
                                signOutEndTime,
                            ).format('YYYY-MM-DD HH:mm:ss')}`}
                        </span>
                    </div>
                ) : null}
            </>
        )
    }

    const onOk = () => {
        setShowSignInfo(false)
        setCurrentSignInfo(null)
    }
    const onCancel = () => {
        setShowSignInfo(false)
        setCurrentSignInfo(null)
    }

    return (
        <div className={styles.task_info_page}>
            <div className={styles.task_info_content}>
                <div className={styles.task_info_content_title_content}>
                    <div className={styles.task_info_content_title}>{store.taskRule.title}</div>
                    {rule?.type?.toString?.() === '1' ? (
                        <span className={styles.sign_normal_tag}>分散打卡</span>
                    ) : null}
                    {rule?.type?.toString?.() === '2' ? (
                        <span className={styles.sign_warring_tag}>集中打卡</span>
                    ) : null}
                </div>

                <div className={styles.task_info_content_time}>{getRuleDom()}</div>
            </div>
            <div className={styles.task_info_member}>
                <Tabs activeKey={currentKey.toString()} onChange={onChange}>
                    {store.signTypeTab.map(item => (
                        <Tabs.TabPane tab={item.tab} key={item.key} />
                    ))}
                </Tabs>

                {store.signTypeTab.length > 0 ? (
                    <BusinessTable
                        //@ts-ignore
                        desensitizationList={desensitizationList}
                        rowKey={'userCode'}
                        formItemsStyle={{
                            width: '398px',
                        }}
                        formRef={formRef}
                        actionRef={actionRef}
                        columns={getTableColumns()}
                        params={{
                            taskCode: query.taskCode,
                            type: currentKey,
                        }}
                        // @ts-expect-error
                        request={store.getTableData}
                        onReset={() => {
                            const url = new URL(location.href)
                            if (url.searchParams.has('activityCode')) {
                                url.searchParams.delete('activityCode')
                            }
                            window.history.replaceState({}, '', url)
                        }}
                        toolBar={false}
                        formProps={{ labelCol: { span: 5 }, wrapperCol: { flex: 'auto' } }}
                    />
                ) : (
                    <div className={styles.spin}>
                        <Spin size="large" />
                    </div>
                )}
            </div>

            <Modal
                title={'外勤详情'}
                open={showSignInfo}
                onCancel={onCancel}
                onOk={onOk}
                centered
                destroyOnClose={true}
            >
                <Descriptions column={1} labelStyle={{ width: '100px' }}>
                    <Descriptions.Item label="姓名">{currentSignInfo?.name}</Descriptions.Item>
                    <Descriptions.Item
                        label={`${
                            currentKey.toString() === SIGN_IN.toString() ? '签到' : '签退'
                        }时间`}
                    >
                        {currentSignInfo?.signTime
                            ? dayjs(currentSignInfo.signTime).format('YYYY-MM-DD HH:mm:ss')
                            : ''}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={`${
                            currentKey.toString() === SIGN_IN.toString() ? '签到' : '签退'
                        }位置`}
                    >
                        {currentSignInfo?.signLocation}
                    </Descriptions.Item>
                    <Descriptions.Item label="外勤图片">
                        <Image src={currentSignInfo?.signImage} />
                    </Descriptions.Item>
                    <Descriptions.Item label="外勤备注">
                        {currentSignInfo?.signRemark}
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </div>
    )
}

const ObserverPage: IRoute = inject('userStore')(observer(EventManagement))
ObserverPage.title = '打卡记录'
export default ObserverPage
