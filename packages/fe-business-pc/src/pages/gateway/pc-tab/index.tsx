import React, { useEffect, useState } from 'react'
import { useLocalObservable, observer } from 'mobx-react'
import { Form, Tabs } from 'antd'
// import GlobalUpload from '../components/CustomUpload'
import CustomTitle from '@/components/CustomTitle'
import BlockBox from '@/components/BlockBox'
import styles from './index.module.less'
import Store from './store'
import { getNowSelectOrgCode } from '@/utils/parseValue'
import type { IRoute } from 'umi'
import NavigationSettings from './components/NavigationSettings'
import FooterSettings from './components/FooterSettings'
import FloatingWindowSettings from './components/FloatingWindowSettings'
import { TABS_ENUM } from './const'
import getCustomLinkList from '@/utils/getCustomLinkList'

function PcTab() {
    const store = useLocalObservable(() => new Store())
    const [form] = Form.useForm()
    const [active, setActive] = useState(TABS_ENUM.NAV)

    useEffect(() => {
        ;(async () => {
            let list = await getCustomLinkList('pc')
            store.getLinkList(list)
        })()
    }, [])

    useEffect(() => {
        document.title = '导航管理'
        store.getNavData(getNowSelectOrgCode())
        store.getGatewayData().then(res => {
            form.setFieldValue('navigationImgType', res.navigationImgType)
            if (res.naviLogo) {
                form.setFieldValue('naviLogo', [
                    {
                        url: res.naviLogo,
                        id: '-1',
                        status: 'done',
                        response: { url: res.naviLogo },
                    },
                ])
            }
        })
    }, [])

    /**  item tabs  */
    const itemTabs = [
        {
            label: `导航设置`,
            key: TABS_ENUM.NAV,
            children: NavigationSettings(store, form),
        },
        {
            label: `页脚设置`,
            key: TABS_ENUM.FOOTER,
            children: <FooterSettings store={store} />,
        },
        {
            label: `悬浮窗设置`,
            key: TABS_ENUM.SUS,
            children: <FloatingWindowSettings store={store} />,
        },
    ]

    useEffect(() => {
        if (active === TABS_ENUM.FOOTER) {
            /**  页脚设置  */
            store.findFooterConfig()
        } else if (active === TABS_ENUM.SUS) {
            /**  悬浮窗设置  */
            store.getSuspendedWindowList()
        }
    }, [active])

    return (
        <div className={styles.pc_tab}>
            <BlockBox>
                <CustomTitle title="门户设置" marginBottom={0} />
                <Tabs activeKey={active} onChange={setActive} items={itemTabs} />
            </BlockBox>
        </div>
    )
}

const Component: IRoute = observer(PcTab)
Component.title = '导航管理'

export default Component
