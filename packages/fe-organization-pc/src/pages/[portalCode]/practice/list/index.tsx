import { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.less'
import type { IRoute } from 'umi'
import { useHistory } from 'umi'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import { SuperTable } from '@wotu/wotu-components'
import { PTBrushQuestionsCard } from '@wotu/pt-components'
import HTTP from '@/servers/http'
import { microLinkHandler } from '@/utils/microLink'
import { LinkEnum } from '../../micro/interface.d'
import { message } from 'antd'

const API = {
    // 获取练习列表
    getPracticeList: '/question/front/practice/page',
}

/**  练习列表  */
const PracticeList = (props: IRoute) => {
    const { siteStore, userStore } = props
    let currentAlias = getPortalCodeFromUrl()
    const { portalData } = siteStore
    let currentPortalData = portalData?.[currentAlias] || {}

    let { location } = useHistory()
    let { query } = location || {}
    let { code } = query || {}

    useEffect(() => {
        const { organizationName = '', shortName = '' } = currentPortalData || {}
        let orgName = shortName || organizationName
        orgName ? (document.title = `练习列表-${orgName}`) : (document.title = '练习列表')
    }, [currentPortalData, code])

    const getPracticeList = async params => {
        let res = await HTTP(API.getPracticeList, 'post', {
            ...params,
            organizationCode: currentAlias,
            publishStatus: 1,
        })
        return res
    }

    return (
        <div className={styles.practice_list}>
            <div className={styles.global_padding}>
                <div className={styles.content}>
                    <SuperTable
                        className={styles.background}
                        headerItemRender={() => <></>}
                        request={getPracticeList as any}
                        search={false}
                        rowKey={'code'}
                        rowItemRender={item => {
                            return (
                                <PTBrushQuestionsCard
                                    layoutStyle={2}
                                    item={item}
                                    mode="pc"
                                    onClick={i => {
                                        if (!i?.code) {
                                            message.info('暂无数据')
                                            return
                                        }
                                        return microLinkHandler(
                                            {
                                                code: i?.code || '',
                                                type: LinkEnum.PRACTICE_LIST,
                                            },
                                            userStore,
                                        )
                                    }}
                                />
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(PracticeList))
