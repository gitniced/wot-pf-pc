import { Space, Switch, Tooltip, Typography } from 'antd'
import getColumns from '../../columns'
import type { RouteQuery, TableDataType } from '../../interface'
import type { UseTableSearchType } from '../../hooks/useTableSearch'
import { InfoCircleOutlined } from '@ant-design/icons'
import useMasterHistory from '@/hooks/userMasterHistory'
import BusinessTable from '@/components/BusinessTable'
import { useRef, useState } from 'react'
import { history } from 'umi'
import { mapJobName } from '@/pages/paper-library/[type]/utils'
import { publishMapList } from '../../enums'
import InformationModal from '../InformationModal'
import usePageParams from '@/hooks/usePageParams'
import { omit } from 'lodash'
export interface TableListType {
    hooks: UseTableSearchType
    handlePublish: (checked: boolean, data: TableDataType, reload: any) => void
    handleDownload: (data: TableDataType) => void
    handlePreview: (data: TableDataType) => void
    handleDelete: (data: TableDataType, reload: any) => void
    optionBar: () => JSX.Element
}

const TableList = (props: TableListType) => {
    const { hooks, handlePublish, handleDownload, handlePreview, handleDelete } = props
    const actionRef = useRef<any>()
    const masterHistory = useMasterHistory()
    const urlParams = usePageParams()

    const routeQuery = history.location.query as unknown as RouteQuery

    const [showInformation, setShowInformation] = useState<boolean>(false)
    const [currentCode, setCurrentCode] = useState<string>()

    const columns = getColumns().concat([
        {
            title: (
                <Tooltip title="草稿状态下不可被引用">
                    <Space size={4}>
                        发布状态
                        <InfoCircleOutlined />
                    </Space>
                </Tooltip>
            ) as any,
            key: 'publishState',
            dataIndex: 'publishState',
            ellipsis: true,
            search: true,
            formOrder: 5,
            valueType: 'select',
            fieldProps: {
                options: publishMapList,
            },
            formItemProps: {
                label: '发布状态',
                name: 'publishState_form',
                initialValue: 'all',
            },
            width: 150,
            fixed: 'right',
            render: (t, r) => {
                return (
                    <Switch
                        checkedChildren="发布"
                        unCheckedChildren="草稿"
                        onChange={v => handlePublish(v, r, actionRef.current.reload)}
                        checked={t === '1'}
                    />
                )
            },
        },
        {
            title: '操作',
            dataIndex: 'options',
            key: 'option',
            width: 300,
            fixed: 'right',
            render: (t, r) => {
                const { publishState, code, composition } = r || {}
                return (
                    <Space>
                        <Typography.Link key="download" onClick={() => handleDownload(r)}>
                            下载
                        </Typography.Link>
                        <Typography.Link key="preview" onClick={() => handlePreview(r)}>
                            预览
                        </Typography.Link>
                        {/* 草稿状态下支持删除、重新生成、编辑操作 */}
                        {publishState === '0' ? (
                            <>
                                <Typography.Link
                                    key="delete"
                                    onClick={() => handleDelete(r, actionRef.current.reload)}
                                >
                                    删除
                                </Typography.Link>
                                <Typography.Link
                                    onClick={() =>
                                        masterHistory.push(`./create?code=${r.code}&${urlParams}`)
                                    }
                                    key="edit"
                                >
                                    重新生成
                                </Typography.Link>
                                <Typography.Link
                                    onClick={() =>
                                        masterHistory.push(`./edit?code=${r.code}&${urlParams}`)
                                    }
                                    key="editable"
                                >
                                    编辑
                                </Typography.Link>
                            </>
                        ) : (
                            <>
                                <Typography.Link
                                    onClick={() =>
                                        masterHistory.push(`./detail?code=${r.code}&${urlParams}`)
                                    }
                                    key="view"
                                >
                                    查看试卷结构
                                </Typography.Link>
                                {/* 组卷方式为套题组卷显示命题信息 */}
                                {composition === 'fromfile' && (
                                    <Typography.Link
                                        onClick={() => {
                                            setShowInformation(true)
                                            setCurrentCode(code)
                                        }}
                                        key="information"
                                    >
                                        命题信息
                                    </Typography.Link>
                                )}
                            </>
                        )}
                    </Space>
                )
            },
        },
    ])

    const getData = (data: string | number) => {
        return data === 'all' ? [0, 1] : [Number(data)]
    }

    const getExtraInitParams = () => {
        return {
            jobName: mapJobName(routeQuery),
        }
    }

    const beforeSearchSubmit = (params: any) => {
        const {
            title,
            jobName,
            composition_form = 'all',
            publishState_form = 'all',
            referenceState_form = 'all',
        } = params || []

        const [work = {}, job, level] = jobName ?? []
        const { hasWorkType } = work

        const commonJob: any = {
            jobName: work?.label,
            jobNameCode: work?.value,
        }

        if (hasWorkType) {
            commonJob.jobType = job?.label
            commonJob.jobTypeCode = job?.value
            commonJob.jobLevel = level?.label
            commonJob.jobLevelCode = level?.value
        } else {
            commonJob.jobLevel = job?.label
            commonJob.jobLevelCode = job?.value
        }

        const newParams = {
            ...params,
            title,
            composition:
                composition_form === 'all'
                    ? ['authenticate', 'questiontype', 'fromfile']
                    : [composition_form],
            publishState: getData(publishState_form),
            referenceState: getData(referenceState_form),
            customContent: {
                commonJob,
            },
        }

        const omitParams = omit(newParams, ['jobName'])

        return omitParams
    }
    return (
        <>
            <BusinessTable
                rowKey="code"
                bordered={false}
                renderOptionBar={{ top: props.optionBar }}
                actionRef={actionRef}
                request={hooks.getTableData}
                columns={columns}
                beforeSearchSubmit={beforeSearchSubmit}
                extraInitParams={getExtraInitParams()}
                onReset={() => history.push({})}
            />

            {showInformation && (
                <InformationModal
                    open={showInformation}
                    code={currentCode}
                    onCancel={() => setShowInformation(false)}
                />
            )}
        </>
    )
}

export default TableList
