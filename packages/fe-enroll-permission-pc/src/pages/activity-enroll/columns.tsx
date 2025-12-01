import styles from './index.modules.less'
import { NavLink } from 'umi'
import type { Datum } from './interface'
import { Image, Tooltip, Select, Modal, Space, Typography } from 'antd'
import NewMoreSelect from '@/components/NewMoreSelect'
import {
    DEFAULT_IMG,
    ENROLL_CHANNEL,
    ENROLL_CHANNEL_OPTIONS,
    EVENT_KIND_ENUM,
    REGISTRATION_METHOD_MAP,
    REGISTRATION_METHOD_OPTIONS,
} from './const'
import dayjs from 'dayjs'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { AUDIT_STATUS_ENUM } from './audit/const'
import { DatePicker } from '@/components/Picker'
import { ExclamationCircleOutlined, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { getDecodeInfo } from '@wotu/wotu-components'
const { RangePicker } = DatePicker

export function enrollMananementColumns(
    genderIcon: Record<string, React.ReactElement>,
    renderEnrollActivity: (rowData: Datum) => JSX.Element,
    organizationCode: string,
    formRef: any,
    renderEnrollStatus: (rowData: any) => JSX.Element,
    cancelRegistration: (e: string) => void,
    actionRef: any,
): ColumnsType<any> {
    /**  取消报名  */
    const onCancelEnroll = (code: string, s: number, p: number) => {
        /**  status 4 报名成功
         *   openPay  是否开启报名缴费 1是
         */
        const title =
            Number(s) === 4 && p === 1
                ? '取消报名后，报名费用将原路返回，确定取消吗？'
                : '确定取消报名？'

        Modal.confirm({
            title: '取消报名',
            icon: <ExclamationCircleOutlined />,
            content: title,
            okText: '确认',
            cancelText: '取消',
            centered: true,
            onOk: () => {
                cancelRegistration(code)
            },
        })
    }

    return [
        {
            search: true,
            title: '姓名/性别',
            dataIndex: 'userName',
            key: 'userName',
            width: 160,
            render: (userName: string, item: Datum) => (
                <Space>
                    <Typography.Text>
                        <div className={styles.userinfo}>
                            <Image className={styles.image} src={item?.userAvatar || DEFAULT_IMG} />
                            <span className={styles.user_name}>
                                {/* @ts-ignore */}
                                {item.isHideMsg
                                    ? getDecodeInfo(userName || '', '1')
                                    : getDecodeInfo(userName || '')}
                            </span>
                            <span>{genderIcon?.[Number(item?.userGender || 0)]}</span>
                        </div>
                    </Typography.Text>
                    {/* @ts-ignore */}
                    {!item.isHideBtn ? (
                        <Typography.Text
                            onClick={(e: any) => {
                                e.stopPropagation()
                                actionRef.current.toggleRowHideMsg(item)
                            }}
                        >
                            <div style={{ cursor: 'pointer', width: '16px', height: '100%' }}>
                                {/* @ts-ignore */}
                                {item.isHideMsg ? (
                                    <EyeFilled style={{ color: 'var(--primary-color)' }} />
                                ) : (
                                    <EyeInvisibleFilled style={{ color: 'var(--primary-color)' }} />
                                )}
                            </div>
                        </Typography.Text>
                    ) : null}
                </Space>
            ),
            fixed: 'left',
            formItemProps: {
                label: '姓名',
            },
            formOrder: 2,
        },
        {
            search: true,
            title: '证件号码',
            dataIndex: 'userIdentify',
            key: 'userIdentify',
            width: 200,
            formOrder: 2,
        },
        {
            search: true,
            title: '手机号',
            dataIndex: 'userMobile',
            key: 'userMobile',
            width: 160,
            formOrder: 2,
            render: (userMobile: number, record: any) => {
                return (
                    <div
                        className={styles.user_mobile}
                        id="user_mobile"
                        data-clipboard-text={
                            record.isHideMsg
                                ? getDecodeInfo((userMobile as unknown as string) || '', '2')
                                : getDecodeInfo((userMobile as unknown as string) || '')
                        }
                    >
                        {record.isHideMsg
                            ? getDecodeInfo((userMobile as unknown as string) || '', '2')
                            : getDecodeInfo((userMobile as unknown as string) || '')}

                        {record.isHideMsg ? null : (
                            <Tooltip title="复制">
                                <svg
                                    className="icon"
                                    aria-hidden="true"
                                    id="user_mobile"
                                    data-clipboard-text={getDecodeInfo(
                                        (userMobile as unknown as string) || '',
                                    )}
                                >
                                    <use xlinkHref={`#file-copy`} />
                                </svg>
                            </Tooltip>
                        )}
                    </div>
                )
            },
        },
        {
            title: '出生年月',
            dataIndex: 'birthday',
            key: 'birthday',
            width: 120,
            render: (birthday: number) => (
                <>
                    {birthday
                        ? isNaN(birthday)
                            ? birthday
                            : dayjs(Number(birthday)).format('YYYY-MM-DD')
                        : '-'}
                </>
            ),
        },
        {
            search: true,
            title: '报名活动',
            dataIndex: 'activityCode',
            key: 'activityCode',
            formOrder: 2,
            onHeaderCell: () => ({
                style: {
                    textAlign: 'center',
                },
            }),
            width: 360,
            render: (_, records: any) => renderEnrollActivity(records),
            renderFormItem: () => (
                <NewMoreSelect
                    all={false}
                    placeholder="请选择"
                    labelKey="applyName"
                    valueKey={'applyCode'}
                    requestUrl={'/activity/front/activity/apply_name_page'}
                    requestMethod={'post'}
                    requestParams={{ organizationCode }}
                    beforeChange={(value: any) => {
                        formRef.current?.setFieldsValue({ activityCode: value })
                    }}
                    labelInValue
                />
            ),
        },
        {
            search: false,
            title: '报名状态',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (_, records: any) => renderEnrollStatus(records),
        },

        {
            search: true,
            title: '报名时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 187,
            render: (createdAt: number) => <>{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</>,
            renderFormItem: () => {
                return <RangePicker allowClear />
            },
            formOrder: 2,
        },
        {
            search: true,
            title: '报名渠道',
            dataIndex: 'applyChannel',
            key: 'applyChannel',
            width: 120,
            render: (_, records: any) => {
                return <>{records.applyChannel ? ENROLL_CHANNEL[records.applyChannel] : '-'}</>
            },
            formOrder: 2,
            renderFormItem: () => {
                return (
                    <Select
                        options={ENROLL_CHANNEL_OPTIONS}
                        placeholder="请选择"
                        style={{ width: '100%' }}
                    />
                )
            },
        },

        {
            search: true,
            title: '报名方式',
            key: 'method',
            dataIndex: 'method',
            width: 120,
            render: (_, records: any) => {
                return <>{records.method ? REGISTRATION_METHOD_MAP[records.method] : '-'}</>
            },
            formOrder: 2,
            renderFormItem: () => {
                return (
                    <Select
                        options={REGISTRATION_METHOD_OPTIONS}
                        placeholder="请选择"
                        style={{ width: '100%' }}
                    />
                )
            },
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 220,
            fixed: 'right',
            render: (_, records: any) => {
                return (
                    <>
                        {/* 机构没有详情 */}
                        {records.type !== EVENT_KIND_ENUM.ORGANIZATION && (
                            <NavLink
                                to={`/activity-enroll/audit?code=${records.code}`}
                                style={{ marginRight: 5 }}
                            >
                                详情
                            </NavLink>
                        )}
                        {/* 机构没有审核 status 1待审核 */}
                        {records.type !== EVENT_KIND_ENUM.ORGANIZATION &&
                            records.status === AUDIT_STATUS_ENUM.WAIT && (
                                <NavLink
                                    to={`/activity-enroll/audit?code=${records.code}`}
                                    style={{ marginRight: 5 }}
                                >
                                    审核
                                </NavLink>
                            )}
                        {/*cancelFlag 是否允许取消报名：0否，1是  
                        status 报名状态 已取消和报名失败 不显示取消报名
                        */}
                        {records.cancelFlag === 1 &&
                            ![AUDIT_STATUS_ENUM.CANCEL, AUDIT_STATUS_ENUM.FAIL].includes(
                                records.status,
                            ) && (
                                <a
                                    onClick={() =>
                                        onCancelEnroll(
                                            records?.code,
                                            records?.status,
                                            records?.openPay,
                                        )
                                    }
                                >
                                    取消报名
                                </a>
                            )}
                    </>
                )
            },
        },
    ]
}
