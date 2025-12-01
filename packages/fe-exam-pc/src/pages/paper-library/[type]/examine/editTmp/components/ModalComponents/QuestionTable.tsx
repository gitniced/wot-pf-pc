import type { FC } from 'react'
import type { TableDataType, UseTableSearchType } from '../../interface'
import { questionLevelEnum, questionTypeEnum, questionTypeList } from '../../enums'
import styles from './index.module.less'
import { SuperTable } from '@wotu/wotu-components'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { useRef } from 'react'
import { Select, Space, Typography } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import { useParams } from 'umi'
import type { QuestionRouteType } from '@/hooks/useCommonParams'
import { DISCRIMINATION_OPTIONS } from '@/pages/question/[type]/constants'
import { handlerAuthenticatePoint } from '@/pages/question/[type]/utils'

interface QuestionTableType {
    hooks: UseTableSearchType
}

const QuestionTable: FC<QuestionTableType> = props => {
    const { hooks } = props
    const { type: routeType } = useParams() as { type: QuestionRouteType }

    const columns: ColumnsTypeItem<TableDataType>[] = [
        {
            title: '题目/题干',
            dataIndex: 'title',
            ellipsis: true,
            search: true,
            width: 252,
            formItemProps: {
                name: 'titleLike',
            },
            render: (title: string) => (
                // 富文本图片转文字
                <div
                    className={styles.editor_text}
                    dangerouslySetInnerHTML={{
                        // @ts-ignore
                        __html: title.replaceAll(/<img.*?(?:>|\/>)/gi, '（图）'),
                    }}
                />
            ),
        },
        {
            title: '题型',
            dataIndex: 'type',
            key: 'type',
            ellipsis: true,
            search: true,
            width: 110,
            formItemProps: {
                name: 'questionType',
            },
            renderFormItem: () => (
                <Select
                    placeholder="请选择"
                    optionFilterProp="children"
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    options={questionTypeList}
                />
            ),
            render: t => (t ? (questionTypeEnum as any)[t] : '--'),
        },
        {
            title: '难易程度',
            dataIndex: 'level',
            search: true,
            width: 100,
            formItemProps: {
                name: 'questionLevel',
            },
            render: t => (t ? (questionLevelEnum as any)[t] : '--'),
        },
        {
            title: '区分度',
            dataIndex: 'distinction',
            search: true,
            width: 100,
            formItemProps: {
                name: 'discrimination',
            },
            renderFormItem: (_v, { fieldProps }) => (
                <Select options={DISCRIMINATION_OPTIONS} {...fieldProps} />
            ),
            render: (_, { customContent }: any) => (
                <>
                    {DISCRIMINATION_OPTIONS.find(
                        item => item.value === customContent?.discrimination,
                    )?.label || '--'}
                </>
            ),
        },
        {
            title: '考评点',
            dataIndex: 'authPoint',
            search: false,
            width: 300,
            render: (_, { customContent }: any) => handlerAuthenticatePoint(customContent) || '--',
        },
    ]

    const actionRef = useRef({
        reload: () => {}, // 添加 reload 方法
    })

    return (
        <SuperTable
            actionRef={actionRef}
            rowKey="code"
            columns={columns}
            className={styles.question_table}
            request={hooks.getTableData}
            rowSelection={hooks.rowSelection}
            renderOptionBar={() => (
                <Space size={10} style={{ margin: '8px 0 16px' }}>
                    <Space size={0}>
                        没有想添加的试题，
                        <Typography.Link
                            href={`/exam-center/question/${routeType}/edit`}
                            target="_blank"
                        >
                            去新建
                        </Typography.Link>
                    </Space>
                    <SyncOutlined
                        onClick={() => actionRef.current.reload()}
                        className={styles.icon_hover}
                    />
                </Space>
            )}
            formProps={{
                labelCol: { span: 6 },
                wrapperCol: { span: 18 },
            }}
        />
    )
}

export default QuestionTable
