import { Space, Table, Tooltip, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { AuthDetailListType, AuthDetailType } from '../../interface'
import type { FC } from 'react'
import { useContext, useMemo, memo } from 'react'
import { ExamineEditCallbackContext, ExamineTmpWrapperContext } from '../../context'
import { ModalType } from '../../enums'
import styles from '../../index.modules.less'

const pointSharedCell = (record: AuthDetailListType): any => {
    if (record.rowSpan || record.rowSpan === 0) return { rowSpan: record.rowSpan }
}

const AuthTabPane: FC<{ data?: AuthDetailType }> = props => {
    const { data } = props
    // 当前页面是否为详情页
    const { isDetail } = useContext(ExamineTmpWrapperContext)
    const { openModal } = useContext(ExamineEditCallbackContext)

    const dataSource = useMemo(() => {
        const list = data?.detailList || []

        let da = []
        for (let i = 0; i < list.length; i++) {
            const { pointList, ...rest } = list[i]

            if (pointList && pointList.length) {
                // 将所有数据拍平，用于表格渲染
                const childList = pointList.map((v, k) => ({
                    ...v,
                    ...rest,
                    // pointList 数量表示要合并的单元格列的数量，赋值给列表第一项，用于后续渲染
                    rowSpan: k === 0 ? pointList.length : 0,
                }))
                da.push(...childList)

                continue
            }
        }

        return da
    }, [data?.detailList])

    const renderFunc = (text: string) => (
        <span className={styles.keep_original}>{text || '--'}</span>
    )

    const columns: ColumnsType<AuthDetailListType> = [
        {
            title: '考评范围',
            dataIndex: 'range',
            width: 172,
            onCell: pointSharedCell,
            render: t => t || '--',
        },
        {
            title: '考评点',
            dataIndex: 'point',
            width: 240,
            render: t => t || '--',
        },
        {
            title: '重要程度',
            width: 120,
            dataIndex: 'important',
            render: t => t || '--',
        },
        {
            title: '要求比重',
            dataIndex: 'requiredGravity',
            onCell: pointSharedCell,
            width: 120,
            render: t => `${t}%` || '--',
        },
        {
            title: '实际比重',
            dataIndex: 'actualGravity',
            onCell: pointSharedCell,
            width: 120,
            render: t => `${t}%` || '--',
        },
        {
            title: '试题数',
            dataIndex: 'questionTotal',
            width: 120,
        },
        {
            title: '题型',
            dataIndex: 'questionType',
            width: 160,
            render: renderFunc,
        },
        {
            title: '难易程度',
            dataIndex: 'difficulty',
            width: 160,
            render: renderFunc,
        },
        {
            title: '区分度',
            dataIndex: 'distinction',
            width: 140,
            render: renderFunc,
        },
        {
            title: '操作',
            dataIndex: 'opt',
            width: 195,
            fixed: 'right',
            render: (t, r) => {
                return (
                    <Space size={8}>
                        <Typography.Link onClick={() => openModal?.(ModalType.ADD_REQUESTION, r)}>
                            添加试题
                        </Typography.Link>
                        {r.questionTotal > 0 && (
                            <Typography.Link
                                onClick={() => openModal?.(ModalType.REMOVE_REQUESTION, r)}
                            >
                                移除试题
                            </Typography.Link>
                        )}
                    </Space>
                )
            },
        },
    ]

    return (
        <div className={styles.auth_tab_pane}>
            <div className={styles.alert}>
                {data?.statistics && (
                    <Tooltip title="重要程度为 X 的考评点覆盖率">
                        <span className={styles.content}>X ({data?.statistics?.importantX}%)</span>
                    </Tooltip>
                )}
                {data?.statistics && (
                    <Tooltip title="重要程度为 Y 的考评点覆盖率">
                        <span className={styles.content}>Y ({data?.statistics?.importantY}%)</span>
                    </Tooltip>
                )}
                {data?.statistics && (
                    <Tooltip title="重要程度为 Z 的考评点覆盖率">
                        <span className={styles.content}>Z ({data?.statistics?.importantZ}%)</span>
                    </Tooltip>
                )}
            </div>

            <Table
                columns={
                    isDetail
                        ? columns.filter((ele, index, arr) => index !== arr.length - 1)
                        : columns
                }
                rowKey={(record: AuthDetailListType) => record?.point}
                dataSource={(dataSource || []) as unknown as AuthDetailListType[]}
                scroll={{ x: 1200 }}
                pagination={false}
                bordered
            />
        </div>
    )
}

export default memo(AuthTabPane)
