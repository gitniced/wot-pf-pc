import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { TableDataType } from './interface'
import ProfessionCascade from '@/components/ProfessionCascade'
import {
    compositionMap,
    referenceStateMap,
    referenceStateMapList,
    templateStateMapList,
} from './enums'
import { Badge, Select, Space, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { InfoCircleOutlined } from '@ant-design/icons'

const columns = () => {
    const columns: ColumnsTypeItem<TableDataType>[] = [
        {
            title: '职业/工种/等级',
            dataIndex: 'jobName',
            formItemProps: {
                // @ts-ignore
                tooltipSliceLen: 10,
                name: 'jobName',
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
            },
            width: 200,
            renderFormItem: () => <ProfessionCascade />,
            search: true,
            hide: true,
            formOrder: 1,
        },
        {
            title: '试卷名称',
            dataIndex: 'title',
            formItemProps: {
                name: 'title',
            },
            search: true,
            formOrder: 2,
            ellipsis: true,
            width: 130,
            render: t => t || '--',
        },
        {
            title: '组卷方式',
            dataIndex: 'composition',
            ellipsis: true,
            search: true,
            formOrder: 3,
            width: 110,
            formItemProps: {
                name: 'composition_form',
                initialValue: 'all',
            },
            render: t => compositionMap[t] || '--',
            renderFormItem: () => (
                <Select placeholder="请选择">
                    {Object.keys(compositionMap).map((v: string) => (
                        <Select.Option value={v} key={v}>
                            {(compositionMap as any)[v]}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            title: '试卷来源',
            dataIndex: 'createBy',
            ellipsis: true,
            width: 100,
            render: t => t || '--',
        },
        {
            title: '组卷模板',
            dataIndex: 'templateName',
            search: true,
            formOrder: 6,
            valueType: 'select',
            fieldProps: {
                options: templateStateMapList,
            },
            width: 100,
            formItemProps: {
                name: 'templateState',
                initialValue: 0,
            },
            render: val => val || '--',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            ellipsis: true,
            width: 200,
            render: t => (t ? dayjs(t).format('YYYY-MM-DD HH:mm') : '--'),
        },
        {
            title: '引用状态',
            dataIndex: 'referenceState',
            ellipsis: true,
            search: true,
            formOrder: 4,
            valueType: 'select',
            fieldProps: {
                options: referenceStateMapList,
            },
            formItemProps: {
                initialValue: 'all',
                name: 'referenceState_form',
            },
            width: 100,
            render: t => (
                <Space size={4}>
                    <Badge status={t === '0' ? 'default' : 'success'} />
                    {(referenceStateMap as any)[t]}
                </Space>
            ),
        },
        {
            // @ts-ignore
            title: (
                <Tooltip title="实际应用于考试的次数">
                    <Space size={4}>
                        实际引用次数
                        <InfoCircleOutlined />
                    </Space>
                </Tooltip>
            ),
            dataIndex: 'referenceNum',
            ellipsis: true,
            width: 150,
            align: 'center',
        },
    ]
    return columns
}

export default columns
