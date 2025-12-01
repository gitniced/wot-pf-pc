import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { history } from 'umi'
import MoreSelect from '@/components/MoreSelect'
import { Divider, Modal, Select, Space, Typography, message } from 'antd'
import {
    IS_USE_MAP,
    PUSH_STATUS_OPTIONS,
    PUSH_TYPE_STATUS,
    PUSH_TYPE_STATUS_MAP,
    TIME_OF_USE_OPTIONS,
} from './const'
import { ALL_STATE } from '../practice/constants'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import UsageTimeLimitModal from './components/UsageTimeLimitModal'
import dayjs from 'dayjs'
import type PracticePushStore from './store'

/**  重新推送
 *   发布状态 0 草稿 1发布
 */
const rePush = (code: number, status: number) => {
    if (status && Number(status) === 1) {
        history.push(`/practice-push/edit?code=${code}`)
    } else {
        message.warning('请先发布练习后再推送')
    }
}
/**  下架  */
const removeFromShelves = (code: string, practicePushDown: any, actionRef: any) => {
    Modal.confirm({
        centered: true,
        content: '下架后，站点将无法继续使用该练习，是否确定下架？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
            await practicePushDown(code)
            actionRef.current?.reload()
            message.success('下架成功')
        },
    })
}
/**  修改使用时限  */
const editTimeOfUse = (record: any, actionRef: any) => {
    UsageTimeLimitModal({
        startTime: record.startTime,
        endTime: record.endTime,
        sid: record.sid,
        practiceCode: record.practiceCode,
        actionRef,
    })
}

/**  
     *  1、开始时间、结束时间均已设置： 开始时间年月日 至 结束时间年月日
        2、已设置开始时间、未设置结束时间： 开始时间年月日 至 永久
        3、未设置开始时间、已设置结束时间： 截至 结束时间年月日
        4、开始时间、结束时间均未设置：  永久
     * 
*/
const timeOfUse = (s: number, e: number) => {
    if (s && e) {
        return dayjs(s).format('YYYY-MM-DD') + ' 至 ' + dayjs(e).format('YYYY-MM-DD')
    }
    if (s && !e) {
        return dayjs(s).format('YYYY-MM-DD') + ' 至 永久'
    }
    if (!s && e) {
        return '截至 ' + dayjs(e).format('YYYY-MM-DD')
    }
    return '永久'
}

export function columnsFc(store: PracticePushStore, actionRef: any): ColumnsType<any> {
    return [
        {
            search: true,
            width: 200,
            title: '练习标题',
            dataIndex: 'title',
            render: (_, { title }) => <>{title || '-'}</>,
        },
        {
            search: true,
            title: '站点',
            dataIndex: 'sid',
            width: 200,
            render: (_, { sidName }) => <>{sidName || '-'}</>,
            renderFormItem: () => {
                return (
                    <MoreSelect
                        all={false}
                        placeholder="请选择站点"
                        valueKey={'id'}
                        requestUrl={'/auth/backend/site/name_page'}
                        allowClear={true}
                        labelInValue
                    />
                )
            },
        },
        {
            width: 120,
            title: '试题数量',
            dataIndex: 'questionCount',
            render: (_, { questionCount }) => <>{questionCount ?? '-'}</>,
        },
        {
            search: true,
            width: 300,
            title: '使用时效',
            dataIndex: 'timeStatus',
            render: (_, { startTime, endTime }) => <>{timeOfUse(startTime, endTime)}</>,
            renderFormItem: () => {
                return (
                    <Select
                        options={TIME_OF_USE_OPTIONS}
                        style={{
                            width: '100%',
                        }}
                        placeholder={'请选择'}
                        allowClear={true}
                        defaultValue={ALL_STATE.value}
                    />
                )
            },
        },
        {
            width: 120,
            title: '是否使用',
            dataIndex: 'isUsed',
            render: (_, { isUsed }) => <>{IS_USE_MAP?.[isUsed] ?? '-'}</>,
        },
        {
            search: true,
            width: 120,
            title: '推送状态',
            dataIndex: 'status',
            render: (_, { status }) => <>{PUSH_TYPE_STATUS_MAP?.[status] ?? '-'}</>,
            renderFormItem: () => {
                return (
                    <Select
                        options={PUSH_STATUS_OPTIONS}
                        style={{
                            width: '100%',
                        }}
                        placeholder={'请选择'}
                        allowClear={true}
                        defaultValue={ALL_STATE.value}
                    />
                )
            },
        },
        {
            width: 200,
            title: '操作',
            dataIndex: 'operation',
            fixed: 'right',
            render: (_, record: any) => {
                const { status, code, practicePublishStatus } = record
                return (
                    <>
                        {status === PUSH_TYPE_STATUS.UP ? (
                            <Space>
                                <Typography.Link
                                    onClick={() =>
                                        removeFromShelves(code, store.practicePushDown, actionRef)
                                    }
                                >
                                    下架
                                </Typography.Link>
                                <Typography.Link onClick={() => editTimeOfUse(record, actionRef)}>
                                    修改使用时限
                                </Typography.Link>
                            </Space>
                        ) : (
                            <Typography.Link onClick={() => rePush(code, practicePublishStatus)}>
                                重新推送
                            </Typography.Link>
                        )}
                    </>
                )
            },
        },
    ]
}

/**  新建推送  */
export const handleAddPracticePush = () => {
    history.push('/practice-push/edit')
}
