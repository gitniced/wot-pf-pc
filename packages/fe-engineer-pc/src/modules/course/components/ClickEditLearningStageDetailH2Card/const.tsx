import ClickEditInput from '@/components/ClickEditInput'
import ClickEditInputNumber from '@/components/ClickEditInputNumber'
import type { TableColumnsType } from 'antd'
import type { ICourseStylistic9RequestItem } from '../../types/stylistic9'

/**
 * 学习要求表格列配置
 */
export const getRequestListColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<ICourseStylistic9RequestItem> => [
    {
        title: '序号',
        key: 'index',
        width: 120,
        align: 'center',
        render: (_value, _record, index) => <span>{index + 1}</span>,
    },
    {
        title: '学习步骤',
        dataIndex: 'name',
        key: 'name',
        width: 300,
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入学习步骤"
                onChange={val => onDataChange?.(index, 'name', val)}
                onChangeBlur={val => onDataChange?.(index, 'name', val)}
                disabled={true}
            />
        ),
    },
    {
        title: '学习内容',
        dataIndex: 'learningContent',
        key: 'learningContent',
        align: 'left',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入学习内容"
                onChange={val => onDataChange?.(index, 'learningContent', val)}
                onChangeBlur={val => onDataChange?.(index, 'learningContent', val)}
                disabled={true}
            />
        ),
    },
    {
        title: '学时',
        dataIndex: 'period',
        key: 'period',
        width: 120,
        align: 'center',
        render: (value: number, _record, index) => (
            <ClickEditInputNumber
                defaultValue={Number(value)}
                active={active}
                setActive={setActive}
                placeholder="请输入学时"
                onChange={val => onDataChange?.(index, 'period', val)}
                onChangeBlur={val => onDataChange?.(index, 'period', val)}
                disabled={true}
            />
        ),
    },
    {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: 300,
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入备注"
                onChange={val => onDataChange?.(index, 'remark', val)}
                onChangeBlur={val => onDataChange?.(index, 'remark', val)}
            />
        ),
    },
]
