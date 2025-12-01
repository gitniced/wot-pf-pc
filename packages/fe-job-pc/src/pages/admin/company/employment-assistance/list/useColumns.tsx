import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { DatePicker, Select, Space, Tooltip, Typography } from 'antd'
import {
    ServiceStateText,
    JobStateOptions,
    ObjectCategoryTypeOptions,
    SERVICE_STATE,
    CERTIFICATE_TYPE_TEXT,
    JobStateText,
    ObjectCategoryTypeText,
} from './consts'
import dayjs from 'dayjs'
import { history } from 'umi'

import type { AssistanceItem, StaffItem } from './interface'
import { InfoCircleOutlined } from '@ant-design/icons'

import 'dayjs/locale/zh-cn'

import type Store from './store'
import { isEmpty } from 'lodash'
import { getDecodeInfo } from '@wotu/wotu-components'

dayjs.locale('zh-cn')
const { RangePicker } = DatePicker

const useColumns = (store: typeof Store, formRef: any, tabRef: any) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'code',
            search: true,
            width: 200,
        },
        {
            title: '姓名',
            dataIndex: 'candidateName',
            search: true,
            width: 120,
            // render: val => <EyeShowCom fullStr={val} type='name' />,
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            search: true,
            width: 160,
            // render: val => <EyeShowCom fullStr={val} type='phone' />,
        },
        {
            title: '证件号码',
            dataIndex: 'idCard',
            search: true,
            width: 220,
            render: (val, { certificateType, isHideMsg }) => (
                <>
                    <Typography>{CERTIFICATE_TYPE_TEXT[certificateType]}</Typography>
                    <Typography>
                        {isHideMsg ? getDecodeInfo(val || '', '4') : getDecodeInfo(val || '')}
                    </Typography>
                </>
            ),
        },
        {
            title: '服务人员',
            dataIndex: 'serviceStaffs',
            search: true,
            width: 200,
            formItemProps: {
                name: 'serviceStaffUserCode',
                initialValue: null,
            },
            renderFormItem: () => <Select placeholder="请选择" options={store.listRecordUser} />,
            render: val => (
                <Space split="、" size={0} wrap>
                    {!isEmpty(val)
                        ? val?.map((item: StaffItem) =>
                              item.canJump ? (
                                  <Typography.Link
                                      key={item.userCode}
                                      onClick={() => {
                                          formRef.current?.setFieldsValue({
                                              serviceStaffUserCode: item.userCode,
                                          })
                                          tabRef.current.reload(formRef.current?.getFieldsValue)
                                      }}
                                  >
                                      {item.name}
                                  </Typography.Link>
                              ) : (
                                  <Typography key={item.userCode}>{item.name}</Typography>
                              ),
                          )
                        : '-'}
                </Space>
            ),
        },
        {
            title: '对象类别',
            dataIndex: 'objectCategoryType',
            search: true,
            width: 150,
            formItemProps: {
                initialValue: null,
            },
            renderFormItem: () => (
                <Select placeholder="请选择" options={ObjectCategoryTypeOptions} />
            ),
            render: val => ObjectCategoryTypeText[val],
        },
        {
            title: '就业状态',
            dataIndex: 'jobState',
            search: true,
            width: 120,
            formItemProps: {
                initialValue: null,
            },
            render: val => JobStateText[val],
            renderFormItem: () => <Select placeholder="请选择" options={JobStateOptions} />,
        },
        {
            title: '服务记录',
            dataIndex: 'serviceNum',
            width: 150,
        },
        {
            title: '服务时间',
            dataIndex: 'serviceTime',
            search: true,
            hide: true,
            renderFormItem: () => <RangePicker allowClear />,
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            width: 150,
            render: (startTime: number) => <>{dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')}</>,
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
            width: 150,
            render: (endTime: number) => (
                <>{endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</>
            ),
        },
        {
            title: '服务状态',
            dataIndex: 'state',
            width: 120,
            fixed: 'right',
            render: (val, { jobState, remark }) => {
                if (val === SERVICE_STATE.Completed && [2, 3, 4].includes(jobState)) {
                    return (
                        <Tooltip title={remark}>
                            <span>{ServiceStateText[val]}</span>&nbsp;
                            <InfoCircleOutlined />
                        </Tooltip>
                    )
                }

                // 其他情况显示服务状态
                return ServiceStateText[val]
            },
        },
        {
            title: '操作',
            width: 120,
            fixed: 'right',
            render: (_, { code }) => (
                <Typography.Link onClick={() => history.push(`./detail?code=${code}`)}>
                    详情
                </Typography.Link>
            ),
        },
    ] as ColumnsTypeItem<AssistanceItem>[]

    return columns
}

export default useColumns
