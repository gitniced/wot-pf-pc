import type { ColumnsType } from 'antd/es/table'
import type { ItemType } from '@/pages/gateway/components/utils/interface'
import styles from './index.module.less'
import {
    STATUS_RELEASE,
    statusMap,
    statusEnum,
    readonlyEnum,
} from '@/pages/gateway/components/utils/const'
import { Power } from '@wotu/wotu-pro-components'
import { Badge, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { SuperLink } from '@wotu/wotu-components'

//不同默认的选择不同的图标
const iconDom = (edit: number) => {
    /* 
        isEdit 是否可以编辑
        首页不能删除 但是可以编辑
        我的页面 不能编辑 也不能删除
     */
    switch (Number(edit)) {
        case 1:
            return (
                <>
                    <Tooltip title="默认首页">
                        <svg className={styles.svg_icon} aria-hidden="true">
                            <use xlinkHref={`#icon_shouye_n`}> </use>
                        </svg>
                    </Tooltip>
                </>
            )
        case 0:
            return (
                <>
                    <Tooltip title="我的">
                        <svg className={styles.svg_icon} aria-hidden="true">
                            <use xlinkHref={`#icon_wode_n1`}> </use>
                        </svg>
                    </Tooltip>
                </>
            )
    }
}

interface getColumnsListType {
    editClick: (v: ItemType) => void
    deleteClick: (v: ItemType) => void
    publishClick: (v: ItemType) => void
    viewClick: (v: ItemType) => void
    editHref?: (v: ItemType) => string
    viewHref?: (v: ItemType) => string
    powerId?: {
        edit: number
        preview: number
        delete: number
        release: number
    }
}

/**
 *  生成col
 * @param param0
 * @returns
 */
export const getColumnsList = ({
    editClick,
    editHref,
    deleteClick,
    publishClick,
    viewClick,
    viewHref,
    powerId,
}: Partial<getColumnsListType>) => {
    const columns: ColumnsType<ItemType> = [
        {
            title: '页面名称',
            align: 'center',
            dataIndex: 'name',
            width: '20%',
            render(col: string, record: ItemType) {
                return (
                    <>
                        {col ? (
                            <div className={styles.operaName}>
                                {col}
                                {record.readonly === readonlyEnum.readOnly &&
                                    iconDom(record.isEdit)}
                            </div>
                        ) : (
                            '-'
                        )}
                    </>
                )
            },
        },
        {
            title: '状态',
            align: 'center',
            dataIndex: 'status',
            width: '20%',
            render(col: number) {
                return (
                    <>
                        <Badge status={statusMap[col] || 'default'} />
                        &nbsp;
                        {STATUS_RELEASE[col] || '-'}
                    </>
                )
            },
        },
        {
            title: '发布时间',
            align: 'center',
            dataIndex: 'publishTime',
            width: '20%',
            render(col: number) {
                return <>{col ? dayjs(col).format('YYYY-MM-DD HH:mm:ss') : '-'}</>
            },
        },
        {
            title: '操作',
            // align: 'center',
            onHeaderCell: () => ({
                style: {
                    textAlign: 'center',
                },
            }),
            dataIndex: 'code',
            width: '20%',
            render(_: any, recode: ItemType) {
                return (
                    <div className={styles.opera}>
                        <div className={styles.opera_edit_list}>
                            {!recode.isEdit && recode?.readonly ? null : (
                                <Power powerId={powerId?.edit}>
                                    <SuperLink
                                        href={editHref?.(recode) || undefined}
                                        onClick={() => editClick?.(recode)}
                                    >
                                        编辑
                                    </SuperLink>
                                </Power>
                            )}
                            {recode.status === statusEnum.draft && (
                                <Power powerId={powerId?.release}>
                                    <a onClick={() => publishClick?.(recode)}>发布</a>
                                </Power>
                            )}
                            <Power powerId={powerId?.preview}>
                                {viewHref?.(recode) ? (
                                    <SuperLink
                                        href={viewHref?.(recode) || ''}
                                        onClick={() => viewClick?.(recode)}
                                    >
                                        预览
                                    </SuperLink>
                                ) : (
                                    <a onClick={() => viewClick?.(recode)}>预览</a>
                                )}
                            </Power>
                            {recode.readonly === readonlyEnum.delete && (
                                <Power powerId={powerId?.delete}>
                                    <a onClick={() => deleteClick?.(recode)}>删除</a>
                                </Power>
                            )}
                        </div>
                    </div>
                )
            },
        },
    ]

    return columns
}
