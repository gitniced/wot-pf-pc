import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'

/**
 * 本次导出
 * 1 用户报名信息汇总表
 * 2 活动报名信息导出
 */
export enum ExportEnum {
    USER = 1,
    ACTIVITY = 2,
}

export const ExportTextList = [
    {
        value: ExportEnum.USER,
        label: (
            <>
                用户报名信息汇总表{' '}
                <Tooltip title="支持分析报名用户的来源信息，包括报名项目、报名活动、报名渠道等">
                    <ExclamationCircleOutlined />
                </Tooltip>
            </>
        ),
    },
    {
        value: ExportEnum.ACTIVITY,
        label: (
            <>
                活动报名信息导出{' '}
                <Tooltip title="支持按报名活动导出用户报名表单全部字段信息">
                    <ExclamationCircleOutlined />
                </Tooltip>
            </>
        ),
    },
]
