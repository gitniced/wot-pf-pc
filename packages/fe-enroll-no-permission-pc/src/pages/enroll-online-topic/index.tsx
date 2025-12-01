import React, { useEffect } from 'react'
import styles from './index.module.less'
import Enrollcard from '@/components/EnrollCard'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import OrgCard from '@/components/OrgCard'
import { history } from 'umi'
import { Empty, getPortalCodeFromUrl } from '@wotu/wotu-components'
import { setPageTitle } from '@/utils/setDocTitle'

function EnrollOnlineTopic({ siteStore }: any) {
    const store = useLocalObservable(() => new Store())
    const { activeList, orgList } = store
    const sid = siteStore?.siteData?.data?.sid

    useEffect(() => {
        const portalCode = getPortalCodeFromUrl()
        store.updateSelectOrg(siteStore?.portalData?.[portalCode])
        store.getActiveList(sid)
        store.getSelectedPortalOrg(sid)

        setPageTitle('在线报名')
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.enroll_online_topic_container}>
                <div className={styles.options_bar}>
                    <div className={styles.title}>
                        {/* 使用 SVG 线性渐变填充 */}
                        <svg
                            className="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="6630"
                            width="256"
                            height="256"
                        >
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#FF8681" />
                                    <stop offset="100%" stopColor="#FF3335" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M228.208823 293.156571C21.945966 504.246857-5.33632 844.324571 311.59168 1011.565714c26.038857 13.641143 47.798857 5.193143 64.109714-11.702857 53.979429-55.954286 77.385143-138.057143 70.4-246.198857-1.974857-29.878857 11.337143-37.558857 37.814857-17.152 75.190857 57.782857 124.269714 146.797714 124.269715 242.468571 0 32.548571 13.165714 49.737143 43.776 43.849143 202.130286-38.912 448.438857-326.692571 183.04-747.995428-15.981714-21.504-39.460571-21.504-39.021715 8.045714 0.438857 36.096-3.766857 72.192-12.434285 107.337143-6.034286 24.393143-29.257143 24.064-34.669715 0C715.81568 243.931429 623.838537 119.405714 473.017966 16.822857c-40.850286-27.648-55.588571-19.2-65.097143 10.678857-16.054857 51.2-60.123429 143.36-179.565714 265.654857H228.208823z"
                                p-id="6631"
                                fill="url(#grad1)"
                            />
                        </svg>
                        <span>火热报名</span>
                    </div>
                    <div className={styles.more} onClick={() => history.push('/enroll-list')}>
                        查看更多
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#icon_shouqi`} />
                        </svg>
                    </div>
                </div>
                <div className={styles.enroll_card_wrapper}>
                    {activeList?.length ? (
                        activeList?.map(item => {
                            const applyChannel = getPortalCodeFromUrl() ? 'organization' : 'site'
                            return (
                                <div className={styles.card_wrapper}>
                                    <Enrollcard
                                        data={item}
                                        onClick={() => {
                                            history.push(
                                                `/enroll-detail?applyChannel=${applyChannel}&code=${item.code}`,
                                            )
                                        }}
                                    />
                                </div>
                            )
                        })
                    ) : (
                        <Empty className={styles.empty_wrapper} />
                    )}
                </div>
                {orgList.length > 0 && (
                    <>
                        {' '}
                        <div className={styles.options_bar} style={{ marginTop: 68 }}>
                            <div className={styles.title}>精选机构</div>
                            <div className={styles.more} onClick={() => history.push('/org-list')}>
                                查看更多
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#icon_shouqi`} />
                                </svg>
                            </div>
                        </div>
                        <div className={styles.org_card_wrapper}>
                            {orgList.map(item => {
                                console.log(item)
                                return (
                                    <div key={item.code}>
                                        <OrgCard
                                            data={item}
                                            onClick={() => {
                                                history.push(`/admissions?code=${item.code}`)
                                            }}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(EnrollOnlineTopic))
