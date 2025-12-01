import TitleBlock from '@/components/TitleBlock'
import styles from './index.module.less'
import { Button } from 'antd'
import { SuperProvider } from '@wotu/wotu-components'
import { columnsFc, handleAddPracticePush } from './utils'
import Store from './store'
import { observer, useLocalObservable } from 'mobx-react'
import type { IRoute } from 'umi'
import { useEffect, useRef, useState } from 'react'
import useUserStore from '@/hooks/useUserStore'
import useUserColumns from '@/hooks/useUserColumns'
import type { ColumnsSetting } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import BusinessTable from '@/components/BusinessTable'

/**  练习推送   */
const PracticePush = () => {
    const userStore = useUserStore()

    const store = useLocalObservable(() => new Store())

    const { columnsSettings } = useUserColumns(userStore)

    const actionRef = useRef()

    useEffect(() => {
        document.title = '练习推送'
    }, [])

    /** 处理 columns */
    const columnsInStore = (colItem: any) => {
        const column = columnsSettings.find(
            (item: ColumnsSetting) => item.key === (colItem.dataIndex as string),
        )
        return {
            ...column,
            hide: column?.hide || colItem.hide,
            order: column?.order,
        }
    }

    const [columns] = useState(
        columnsFc(store, actionRef).map(item => ({
            ...item,
            ...columnsInStore(item),
        })),
    )

    return (
        <div className={styles.page_practice_push}>
            <TitleBlock title="练习推送" />
            <SuperProvider value={{ prefixCls: 'merchant-center' }}>
                <BusinessTable
                    params={{
                        organizationCode: userStore?.selectedOrganization,
                    }}
                    actionRef={actionRef as any}
                    formProps={{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
                    request={store.practicePushTableRequest as any}
                    layout="inline"
                    columns={columns}
                    renderOptionBar={() => (
                        <Button type="primary" onClick={handleAddPracticePush}>
                            新建推送
                        </Button>
                    )}
                />
            </SuperProvider>
        </div>
    )
}

const OverdueObserverPage: IRoute = observer(PracticePush)
OverdueObserverPage.title = '练习推送'
export default OverdueObserverPage
