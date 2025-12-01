import TitleBlock from '@/components/TitleBlock'
import styles from './index.module.less'
import { observer } from 'mobx-react'
import type { IRoute } from 'umi'
import { SuperTable } from '@wotu/wotu-components'
import { PTBrushQuestionsCard } from '@wotu/pt-components'
import getMasterProps from '@/stores/masterStore'
import { message } from 'antd'
import { LinkEnum } from './const'
import HTTP from '@/servers/http'
import { useEffect } from 'react'

const API = {
    getList: '/question/front/practice/person_page',
}
/**   我的刷题 我的练习  */

const PracticeList = () => {
    const { gatewayUserStore = {}, microLinkHandler, getOrganizationCode } = getMasterProps()

    useEffect(() => {
        document.title = '我的练习'
    }, [])

    const getPracticeList = async (params: any) => {
        const organizationCode = getOrganizationCode()

        let res = await HTTP(API.getList, 'POST', { ...params, organizationCode })

        return res
    }

    return (
        <div className={styles.practice_list_pages}>
            <TitleBlock title="我的练习" marginBottom={24} />
            <SuperTable
                className={styles.background}
                headerItemRender={() => <></>}
                request={getPracticeList as any}
                search={false}
                rowKey={'practiceCode'}
                rowItemRender={item => {
                    return (
                        // @ts-ignore
                        <PTBrushQuestionsCard
                            // @ts-ignore
                            layoutStyle={2}
                            item={item}
                            mode="pc"
                            practicedForNumber={true}
                            onClick={i => {
                                if (!i?.practiceCode) {
                                    message.info('暂无数据')
                                    return
                                }
                                return microLinkHandler(
                                    {
                                        code: i?.practiceCode,
                                        type: LinkEnum.PRACTICE_LIST,
                                    },
                                    gatewayUserStore,
                                )
                            }}
                            rowKey={'practiceCode'}
                        />
                    )
                }}
            />
        </div>
    )
}

const ObserverPracticeListPage: IRoute = observer(PracticeList)
ObserverPracticeListPage.title = '我的练习'
export default ObserverPracticeListPage
