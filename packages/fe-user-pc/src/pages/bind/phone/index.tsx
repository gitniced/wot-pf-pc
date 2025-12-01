import { inject, Observer } from 'mobx-react'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
// @ts-ignore
import { history } from 'umi'
import type { IRoute } from 'umi'
import type { PageProps } from '@/types'
import MyBreadcrumbs from '@/components/Global/MyBreadcrumbs'
import Create from '@/components/Pages/Bind/Phone/Create'
import Edit from '@/components/Pages/Bind/Phone/Edit'
import Email from '@/components/Pages/Bind/Phone/Email'
import Password from '@/components/Pages/Bind/Phone/Password'

const Bind = (props: PageProps) => {
    let { userStore } = props

    const [bindType, setBindType] = useState<string>('create')
    const { type } = history.location.query as { type: string }

    useEffect(() => {
        setBindType(type)
    }, [])

    return (
        <Observer>
            {() => {
                return (
                    <div className={styles.page}>
                        <MyBreadcrumbs />
                        <div className={styles.content}>
                            {bindType === 'create' ? <Create userStore={userStore} /> : null}
                            {bindType === 'edit' ? <Edit {...props} /> : null}
                            {bindType === 'email' ? <Email {...props} /> : null}
                            {bindType === 'password' ? <Password {...props} /> : null}
                        </div>
                    </div>
                )
            }}
        </Observer>
    )
}
const ObserverBind: IRoute = inject('userStore')(Bind)

ObserverBind.title = '手机号码换绑'

export default ObserverBind
