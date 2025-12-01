import React from 'react'
import Hooks from './hooks'
import styles from './index.module.less'
import getColumns from './columns'
import { SuperTable } from '@wotu/wotu-components'
import { toJS } from 'mobx'
const Template = (props: any) => {
    const { dataSource, isDetail } = props || {}
    const hooks = Hooks(props)
    console.log(toJS(dataSource))
    return (
        <div className={styles.table}>
            <SuperTable
                bordered
                columns={getColumns(hooks, isDetail)}
                dataSource={dataSource}
                pagination={false}
                search={false}
            />
        </div>
    )
}
export default Template
