import { Badge, Select, message } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import dayjs from 'dayjs'
import Http from '@/servers/http'
import { cloneDeep } from 'lodash'
import { API } from '.'
import { BADGE_STATUS, BRUSH_QUESTION_STATUS_MAP, BRUSH_QUESTION_STATUS_OPTIONS } from './const'
import { getNowSelectOrgCode } from '@/utils/parseValue'

export function utils(
    selectRows: any,
    setOkButton: any,
    onOk: (e: any) => void,
    setSelectRows: any,
) {
    /**  ok确定事件  */
    const finish = () => {
        const selectLength = selectRows?.length || 0
        if (selectLength > 10) {
            setOkButton(true)
            message.error(`最多选择10个, 已选择${selectLength}个`)
            return
        } else {
            onOk(selectRows)
        }
    }

    /**  列 columns  */
    const columns: ColumnsType<any> = [
        {
            search: true,
            title: '练习名称',
            dataIndex: 'titleLike',
            render: (_, { title }) => <>{title || '-'}</>,
        },
        {
            search: false,
            title: '开始日期',
            dataIndex: 'startTime',
            render: (_, { startTime }) => (
                <>{startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '未设置'}</>
            ),
        },
        {
            search: false,
            title: '结束日期',
            dataIndex: 'endTime',
            render: (_, { endTime }) => (
                <>{endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : '未设置'}</>
            ),
        },
        {
            search: true,
            title: '练习状态',
            dataIndex: 'practiceStatus',
            render: (_, { status }) => (
                <>
                    <Badge status={BADGE_STATUS[status] || 'default'} />{' '}
                    {BRUSH_QUESTION_STATUS_MAP[status] || '-'}
                </>
            ),
            renderFormItem: () => {
                return (
                    <Select
                        options={BRUSH_QUESTION_STATUS_OPTIONS}
                        placeholder="请选择"
                        style={{ width: '100%' }}
                    />
                )
            },
        },
    ]

    /**  table 列表数据请求
     *   publishStatus 1 已发布
     */

    const tableRequest = async (params: any) => {
        let res = await Http(
            API.getBrhQstData,
            'post',
            { ...params, organizationCode: getNowSelectOrgCode(), publishStatus: 1 },

            { repeatFilter: false },
        )
        return res
    }

    /**  添加选择的行  */
    const addSelectRow = (record: any, type?: 'radio' | 'checkbox') => {
        let newSelectData = cloneDeep(selectRows)
        if (type === 'radio') {
            newSelectData = [record]
        } else {
            newSelectData = newSelectData.concat(record)
        }
        setSelectRows(newSelectData)
    }

    /**  删除选择的行  */
    const delSelectRow = (code: string) => {
        setSelectRows((prevSelectRows: any[]) => {
            const newSelectData = prevSelectRows.filter((item: any) => item.code !== code)
            return newSelectData
        })
    }

    /**  多选的框操作  */
    const rowSelection = (type: 'radio' | 'checkbox') => {
        return {
            selectedRowKeys: selectRows?.map((item: any) => item?.code),
            checkStrictly: false,
            onSelect: (record: any, selected: boolean) => {
                if (selected) {
                    addSelectRow(record, type)
                } else {
                    delSelectRow(record.code!)
                }
            },
            onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
                if (selected) {
                    addSelectRow(changeRows)
                } else {
                    changeRows.forEach(item => {
                        delSelectRow(item.code!)
                    })
                }
            },
        }
    }
    return {
        /**  ok确定事件  */
        finish,
        columns,
        tableRequest,
        rowSelection,
    }
}
