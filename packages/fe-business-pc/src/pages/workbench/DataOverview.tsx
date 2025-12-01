import React from 'react'
import { observer } from 'mobx-react'
import { PTMiniHeader, PTBlockBox, PTGroup, PTDataCard } from '@wotu/pt-components'
/**
 * @name 数据概览组件
 * @param props
 * @param props.dataList 数据列表
 * @param props.hide 是否隐藏
 * @param props.title 标题
 * @returns
 */
const DataOverview = (props: { dataList?: any[]; hide?: boolean; title?: string }) => {
    let { dataList = [], hide = false, title = '数据概览' } = props
    return (
        <PTGroup dataSource={dataList || []} hide={hide}>
            {({ dataSource, isEmpty }: { dataSource?: any[] | undefined; isEmpty: boolean }) => {
                return (
                    <>
                        <PTBlockBox style={{ padding: '24px 0' }}>
                            <PTMiniHeader
                                title={title}
                                isEmpty={isEmpty}
                                emptyText="暂无数据"
                                style={{ padding: '0 24px' }}
                            />
                            {isEmpty ? (
                                <> </>
                            ) : (
                                <>
                                    <PTDataCard dataSource={dataSource || []} />
                                </>
                            )}
                        </PTBlockBox>
                    </>
                )
            }}
        </PTGroup>
    )
}

export default observer(DataOverview)
