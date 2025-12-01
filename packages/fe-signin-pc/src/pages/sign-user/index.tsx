import { useRef, useEffect } from 'react'
import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.modules.less'
import type { IRoute } from 'umi'
import { history, useModel } from 'umi'
import useStore from './store'
import { getSessionStorage } from '@/storage'
import BusinessTable from '@/components/BusinessTable'
import type { ColumnsType } from 'antd/lib/table'
import type { TableData } from './interface'
import { CERTIFICATE_TYPE_TEXT_MAP, OTHER } from './const'
import { Button, message, Select, Space, Typography } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import CustomTitle from '@/components/CustomTitle'
import PreviewImage from '@/components/PreviewImage'
import GlobalUpload from '@/components/GlobalUpload'
import { getDecodeInfo } from '@wotu/wotu-components'

export const userTypeList = [
    { label: '全部', value: '' },
    { label: '学员', value: 1 },
    { label: '讲师', value: 2 },
    { label: '考务人员', value: 3 },
]

const EventManagement: React.FC = () => {
    const { query = {} } = history.location
    const formRef = useRef<any>(null)
    const actionRef = useRef<any>(null)
    const store = useLocalObservable(() => new useStore())
    const { taskRule } = store || {}
    const {
        /**签到规则 */
        rule = {},
        userCodeList,
        userType,
    } = taskRule || {}

    const { workUserStore, gatewayUserStore } = useModel('@@qiankunStateFromMaster') || {}
    const platform = getSessionStorage('PLATFORM')
    let selectedOrganizationDetail: any = {}
    if (platform === 'workbench') {
        selectedOrganizationDetail = workUserStore?.selectedOrganizationDetail
    }
    if (platform === 'portal') {
        selectedOrganizationDetail = gatewayUserStore?.selectedOrganizationDetail
    }
    console.log(selectedOrganizationDetail)

    useEffect(() => {
        store.getTaskRule()
        document.title = '打卡用户名单'
    }, [])

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

    const columnsFc = (): ColumnsType<any> => {
        const typeList = [
            { label: '全部', value: '' },
            { label: '有', value: true },
            { label: '无', value: false },
        ]

        const userImgTypeList = [
            { label: '全部', value: '' },
            { label: '手动上传', value: 0 },
            { label: '关联业务', value: 1 },
        ]

        const statusInText = [
            { label: '全部', value: '' },
            { label: '未签到', value: 0 },
            { label: '已签到', value: 1 },
            { label: '缺卡', value: 2 },
        ]

        const statusOutText = [
            { label: '全部', value: '' },
            { label: '未签退', value: 0 },
            { label: '已签退', value: 1 },
            { label: '缺卡', value: 2 },
            { label: '无需签退', value: 3 },
        ]

        return [
            {
                //@ts-ignore
                search: true,
                formItemProps: {
                    label: '姓名',
                },
                title: '用户',
                dataIndex: 'name',
                formOrder: 0,
                width: 200,

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
                width: 220,
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
                search: true,
                hide: true,
                title: '',
                dataIndex: 'signStatus',
                width: '0',
                formOrder: 4,
                formItemProps: {
                    label: '签到状态',
                    initialValue: '',
                },
                renderFormItem: () => {
                    return (
                        <Select
                            placeholder="请选择"
                            style={{ width: '100%' }}
                            options={statusInText.map(({ label, value }) => ({ label, value }))}
                        />
                    )
                },
            },
            {
                //@ts-ignore
                search: true,
                hide: true,
                title: '',
                dataIndex: 'signOutStatus',
                width: '0',
                formOrder: 5,
                formItemProps: {
                    label: '签退状态',
                    initialValue: '',
                },
                renderFormItem: () => {
                    return (
                        <Select
                            placeholder="请选择"
                            style={{ width: '100%' }}
                            options={statusOutText.map(({ label, value }) => ({ label, value }))}
                        />
                    )
                },
            },
            {
                dataIndex: 'signinStatus',
                title: '打卡状态',
                width: 180,
                render: (_, { signStatus, signOutStatus }) => {
                    return (
                        <>
                            <span style={{ color: signStatus === 3 ? 'red' : undefined }}>
                                {`${statusInText[signStatus + 1]?.label || ''}`}
                            </span>
                            {!!rule?.signEnd && <>&nbsp;&nbsp;| &nbsp;</>}
                            <span style={{ color: signStatus === 3 ? 'red' : undefined }}>
                                {`${
                                    rule?.signEnd ? `${statusOutText[signOutStatus + 1].label}` : ''
                                }`}
                            </span>
                        </>
                    )
                },
            },
            {
                search: false,
                title: '基准照',
                formOrder: 6,
                width: 150,
                dataIndex: 'hasUserImg',
                render: (_, { signUserImg }) => {
                    return signUserImg ? '有' : '无'
                },
                formItemProps: {
                    initialValue: '',
                },
                renderFormItem: () => {
                    return (
                        <Select placeholder="请选择" style={{ width: '100%' }} options={typeList} />
                    )
                },
            },
            {
                search: false,
                title: '基准照来源',
                formOrder: 6,
                width: 150,
                dataIndex: 'userImgType',
                render: userImgType => {
                    return (
                        userImgTypeList.filter(item => item.value === userImgType)?.[0]?.label ||
                        '-'
                    )
                },
                formItemProps: {
                    initialValue: '',
                },
                renderFormItem: () => {
                    return (
                        <Select
                            placeholder="请选择"
                            style={{ width: '100%' }}
                            options={userImgTypeList}
                        />
                    )
                },
            },
            {
                search: false,
                title: '操作',
                width: 250,
                fixed: 'right',
                dataIndex: 'operation',
                key: 'operation',
                render: (_, { signUserImg, code, signStatus, signOutStatus }: any) => {
                    return (
                        <Space className={styles.operation}>
                            <PreviewImage src={signUserImg} disabled={!signUserImg}>
                                <Button type="link" disabled={!signUserImg}>
                                    查看基准照
                                </Button>
                            </PreviewImage>
                            {signStatus === 0 || signOutStatus === 0 ? (
                                <GlobalUpload
                                    drag={false}
                                    type={27}
                                    size={10}
                                    accept={'image'}
                                    otherProps={{ showUploadList: false }}
                                    onCustomRequestEnd={url => {
                                        store
                                            .updatePhoto({
                                                userImgUrl: url,
                                                code,
                                                taskCode: query.taskCode,
                                            })
                                            .then(() => {
                                                message.success(
                                                    `${!signUserImg ? '上传' : '更换'}基准照成功！`,
                                                )
                                                actionRef.current.reload()
                                            })
                                    }}
                                >
                                    <Button type="link">
                                        {!signUserImg ? '上传' : '更换'}基准照
                                    </Button>
                                </GlobalUpload>
                            ) : (
                                <Button type="link" disabled>
                                    {!signUserImg ? '上传' : '更换'}基准照
                                </Button>
                            )}
                        </Space>
                    )
                },
            },
        ]
    }

    const getRuleDom = () => {
        return (
            <>
                <div className={styles.task_info_content_time_item}>
                    打卡用户：
                    <span className={styles.task_info_content_time_item_time}>
                        {userTypeList.filter(item => item.value === userType)?.[0]?.label}
                    </span>
                </div>
                <div className={styles.task_info_content_time_item}>
                    人数：
                    <span className={styles.task_info_content_time_item_time}>
                        {userCodeList?.length}
                    </span>
                </div>
                <div className={styles.task_info_content_time_item}>
                    打卡项：
                    <span className={styles.task_info_content_time_item_time}>
                        {`${rule?.signEnd ? '' : '仅'}签到${rule?.signEnd ? '+签退' : ''}`}
                    </span>
                </div>
            </>
        )
    }

    return (
        <div className={styles.task_info_page}>
            <div className={styles.task_info_content}>
                <CustomTitle title="打卡用户名单" />
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
                <BusinessTable
                    rowKey={'code'}
                    // @ts-ignore
                    desensitizationList={desensitizationList}
                    formItemsStyle={{
                        width: '398px',
                    }}
                    formRef={formRef}
                    actionRef={actionRef}
                    columns={columnsFc()}
                    params={{
                        taskCode: query.taskCode,
                    }}
                    // @ts-expect-error
                    request={store.getTableData}
                    toolBar={false}
                    inTableParamsChange={() => {}}
                    formProps={{ labelCol: { span: 7 }, wrapperCol: { span: 15 } }}
                />
            </div>
        </div>
    )
}

const ObserverPage: IRoute = inject('userStore')(observer(EventManagement))
ObserverPage.title = '打卡用户名单'
export default ObserverPage
