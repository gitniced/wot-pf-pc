import React, { useEffect } from 'react'
import { history } from 'umi'
import type { IRoute } from 'umi'
import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import { PTPcNav, FooterDefaultPreview } from '@wotu/pt-components'
import { Button, Space } from 'antd'
import Store from './store'
import { findSiteData } from '@wotu/wotu-components'
import { getLocalStorage } from '@/storage'
import { getViewComponents } from '@/pages/gateway/pc-web/create/components/Mytools/generatorFn'
function PcView() {
    const store = useLocalObservable(() => new Store())
    const siteData = getLocalStorage('SITE_STORE')
    useEffect(() => {
        store.getNavData()
        store.getGatewayData()
        store.getPreviewData(history.location?.query?.code as string)?.then((res: any) => {
            store.setPageColor(res.summaryMicropageRespDto.backgroundColor || '#fff')
            document.title = res.summaryMicropageRespDto?.name
                ? `预览-${res.summaryMicropageRespDto?.name}`
                : '预览'
        })
    }, [])

    // 公安备案号
    const PoliceObj = {
        // icp备案号
        policeCode: findSiteData(siteData, 'icp_code')?.value,
        // 备案号链接
        linkPoliceCode: findSiteData(siteData, 'link_police_code')?.value,
    }

    return (
        <div className={styles.pc_view} style={{ backgroundColor: store.pageColor }}>
            <div className={styles.view_block}>正在预览中...</div>
            <PTPcNav
                logo={store.getawayData.naviLogo}
                title={
                    store.getawayData.navigationImgType === 0 &&
                    (store.getawayData.shortName || store.getawayData.organizationName)
                }
                dataList={store.navList}
                onItemClick={() => {}}
                rightNode={
                    <Space>
                        <Button type="text" className={styles.registry}>
                            注册
                        </Button>
                        <Button type="primary" className={styles.login}>
                            登录
                        </Button>
                    </Space>
                }
            />
            <div>
                {store.previewList.map((item, index) => {
                    return (
                        <div key={index} className={styles.preview_item}>
                            {getViewComponents(item)}
                        </div>
                    )
                })}
            </div>
            <FooterDefaultPreview {...PoliceObj} />
        </div>
    )
}
const Component: IRoute = observer(PcView)
Component.title = 'pc微页面预览'
export default Component
