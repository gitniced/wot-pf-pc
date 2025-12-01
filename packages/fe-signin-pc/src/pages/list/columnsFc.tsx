import styles from './index.module.less'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { history } from 'umi'
import { Select, Space, Tag, Tooltip } from 'antd'
import MoreSelect from '@/components/MoreSelect'
import dayjs from 'dayjs'
import { getCookie } from '@wotu/wotu-components'

export function columnsFc(): ColumnsType<any> {

    const organizationCode = getCookie('SELECT_ORG_CODE')

    const userTypeList = [
        { label: '全部', value: '' },
        { label: '学员', value: 1 },
        { label: '讲师', value: 2 },
        { label: '考务人员', value: 3 },
    ]

    const taskStatusList = [
        { label: '全部', value: '' },
        { label: '未开始', value: 0 },
        { label: '进行中', value: 1 },
        { label: '已结束', value: 2 },
    ]

    const typeList = [
        { label: '全部', value: '' },
        { label: '分散打卡', value: 1 },
        { label: '集中打卡', value: 2 },
    ]

    const punchinList = [
        { label: '全部', value: '' },
        { label: '仅签到', value: 0 },
        { label: '签到+签退', value: 1 },
    ]

    const distanceList = [
        { label: '全部', value: '' },
        { label: '开启', value: 1 },
        { label: '关闭', value: 0 },
    ]

    const signOutIntervalList = [
        { label: '全部', value: '' },
        { label: '开启', value: 1 },
        { label: '关闭', value: 0 },
    ]
    const outworkList = [
        { label: '全部', value: '' },
        { label: '开启', value: 1 },
        { label: '关闭', value: 0 },
    ]

    const signStatus = [
        '未开始', '进行中', '已结束']

    return [
        {
            search: true,
            title: '任务名称',
            dataIndex: 'title',
            formOrder: 0,
            width: 200,
            render: (_, { title }) => <>{title || '-'}</>,
            renderFormItem: () => {
                return (
                    <MoreSelect
                        all={true}
                        placeholder="请输入"
                        valueKey={'code'}
                        labelKey='title'
                        searchKey='title'
                        requestUrl={'/sign_in/front/task/list_organization_task'}
                        requestParams={{organizationCode}}
                        labelInValue
                    />
                )
            },
        },
        {
            formOrder: 1,
            title: '关联业务编号',
            dataIndex: 'bizCode',
            search: true,
            width: 240,
            render: (_, record) => {
                return <div>{record.bizCode || '-'}</div>
            },
        },
        {
            search: false,
            title: '打卡用户',
            formOrder: 2,
            width: 180,
            dataIndex: 'userType',
            render: (type) => {
                return userTypeList.filter(item => item.value === type)?.[0]?.label || '-'
            },
            formItemProps: {
                initialValue: ''
            },
            renderFormItem: () => {
                return <Select placeholder='请选择' style={{ width: '100%' }} options={userTypeList} />
            },
        },
        {
            search: false,
            title: '人数',
            formOrder: 3,
            width: 150,
            dataIndex: 'userCount',
        },
        {
            search: false,
            title: '已签到/已签退',
            formOrder: 6,
            width: 150,
            dataIndex: 'signInCount',
            render: (_, { signInCount, signOutCount, signEnd }) => {
                return `${signInCount ?? '-'}/${signEnd ? signOutCount : '-'}`
            }
        },
        {
            search: false,
            title: '打卡模式',
            formOrder: 6,
            width: 150,
            dataIndex: 'type',
            render: (type) => {
                return typeList.filter(item => item.value === type)?.[0]?.label || '-'
            },
            formItemProps: {
                initialValue: ''
            },
            renderFormItem: () => {
                return <Select placeholder='请选择' style={{ width: '100%' }} options={typeList} />
            },
        },
        {
            search: false,
            title: '打卡项',
            formOrder: 6,
            width: 150,
            dataIndex: 'punchIn',
            render: (_, { signEnd }) => {
                return `${signEnd ? '' : '仅'}签到${signEnd ? '+签退' : ''}`
            },
            formItemProps: {
                initialValue: ''
            },
            renderFormItem: () => {
                return <Select placeholder='请选择' style={{ width: '100%' }} options={punchinList} />
            },
        },
        {
            search: false,
            title: '签退时间间隔',
            formOrder: 6,
            width: 180,
            dataIndex: 'signOutInterval',
            render: (signOutInterval,) => {
                return <div>
                    <div>
                        {signOutInterval ? '开启' : '关闭'}
                    </div>
                    <div className={styles.tips}>{`${signOutInterval ? `距离实际签到时间满${signOutInterval}分钟` : ''}`}</div>
                </div>
            },
            formItemProps: {
                initialValue: ''
            },
            renderFormItem: () => {
                return <Select placeholder='请选择' style={{ width: '100%' }} options={signOutIntervalList} />
            },
        },
        {
            search: false,
            title: '打卡有效距离',
            formOrder: 6,
            width: 150,
            dataIndex: 'distance',
            render: (_, { distance }) => {
                return <div>
                    <div>
                        {distance ? '开启' : '关闭'}
                    </div>
                    <div className={styles.tips}>{`${distance ? `${distance}米` : ''}`}</div>
                </div>
            },
            formItemProps: {
                initialValue: ''
            },
            renderFormItem: () => {
                return <Select placeholder='请选择' style={{ width: '100%' }} options={distanceList} />
            },
        },
        {
            search: false,
            title: '外勤打卡',
            formOrder: 6,
            width: 120,
            dataIndex: 'outwork',
            render: (type) => {
                return outworkList.filter(item => item.value === type)?.[0]?.label || '-'
            },
            formItemProps: {
                initialValue: ''
            },
            renderFormItem: () => {
                return <Select placeholder='请选择' style={{ width: '100%' }} options={outworkList} />
            },
        },
        {
            search: false,
            title: '任务状态',
            formOrder: 6,
            width: 240,
            fixed: "right",
            dataIndex: 'taskStatus',
            render: (type, { signEnd, signInStatus, signOutStatus, signInStartTime, signInEndTime, signOutStartTime, signOutEndTime }) => {
                return <Space>
                    <span>签到</span>
                    <Tooltip title={`签到时间范围：${dayjs(signInStartTime).format('YYYY-MM-DD HH:mm')}  至 ${dayjs(signInEndTime).format('YYYY-MM-DD HH:mm')}`}>
                        <Tag color={Number(signInStatus) === 1 ? 'success' : 'default'}>{signStatus[signInStatus]}</Tag>
                    </Tooltip>
                    {!!signEnd && <>
                        <span>签退</span>
                        <Tooltip title={`签退时间范围：${dayjs(signOutStartTime).format('YYYY-MM-DD HH:mm')}  至 ${dayjs(signOutEndTime).format('YYYY-MM-DD HH:mm')}`}>
                            <Tag color={Number(signOutStatus) === 1 ? 'success' : 'default'}>{signStatus[signOutStatus]}</Tag>
                        </Tooltip>
                    </>}
                </Space>
            },
            formItemProps: {
                initialValue: ''
            },
            renderFormItem: () => {
                return <Select placeholder='请选择' style={{ width: '100%' }} options={taskStatusList} />
            },
        },
        {
            search: false,
            title: '操作',
            width: 200,
            fixed: "right",
            dataIndex: 'operation',
            key: 'operation',
            render: (_, { type, code }: any) => {
                const toSkipRecord = () => {
                    if (Number(type) === 2) {
                        history.push(`/attendance-record?taskCode=${code}`)
                    } else {
                        history.push(`/attendance-standard-record?taskCode=${code}`)
                    }
                }
                return (
                    <Space className={styles.operation}>
                        <a onClick={() => {
                            history.push(`/sign-user?taskCode=${code}`)
                        }}>名单</a>
                        <a onClick={toSkipRecord}>打卡记录</a>
                    </Space>
                )
            },
        },
    ]
}
