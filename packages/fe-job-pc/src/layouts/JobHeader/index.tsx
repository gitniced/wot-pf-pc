import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { findSiteData } from '@wotu/wotu-components'
import { inject, observer } from 'mobx-react'

const Index = ({ data, siteStore }: { data: any; siteStore: any }) => {
    const [list, setList] = useState([])
    const [aiUrl, setAiUrl] = useState('https://static.zpimg.cn/public/career/qz/ai_icon.png')
    const [hotUrl, setHotUrl] = useState('https://static.zpimg.cn/public/career/qz/hot_icon.png')
    const [open, setOpen] = useState(false)
    const midDomain = findSiteData(siteStore.siteData, 'midDomain', { findKey: 'baseInfo' }) || ''
    const pcDomain = findSiteData(siteStore.siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''

    const aiList = [
        {
            id: '1',
            text: 'AI+智能简历',
        },
        {
            id: '2',
            text: 'AI+模拟面试',
        },
        {
            id: '3',
            text: 'AI+求职助手',
        },
        {
            id: '4',
            text: 'AI+职业导师',
        },
    ]

    useEffect(() => {
        setList(data?.menu)
    }, [data])

    return (
        <div className={styles.job_header}>
            <div className={styles.top}>
                <div className={styles.logo}>
                    <img
                        src="https://static.zpimg.cn/public/career/qz/png_logo_qiuzhi.png"
                        alt=""
                    />
                </div>
                <div className={styles.login} />
            </div>
            <div className={styles.nav}>
                {list?.map((item: any, index: number) => (
                    <div
                        key={item?.id}
                        className={[
                            styles.nav_item,
                            item.title === '就业服务' && styles.active,
                        ].join(' ')}
                        onMouseEnter={() => {
                            if (index == 2) {
                                setAiUrl(
                                    'https://static.zpimg.cn/public/career/qz/ai_icon_select.png',
                                )
                                setOpen(true)
                            }
                            if (index == 6) {
                                setHotUrl(
                                    'https://static.zpimg.cn/public/career/qz/hot_icon_select.png',
                                )
                            }
                        }}
                        onMouseLeave={() => {
                            if (index == 2) {
                                setAiUrl('https://static.zpimg.cn/public/career/qz/ai_icon.png')
                                setOpen(false)
                            }
                            if (index == 6) {
                                setHotUrl('https://static.zpimg.cn/public/career/qz/hot_icon.png')
                            }
                        }}
                        onClick={() => {
                            if (item.url.includes('/job-center')) {
                                return
                            } else if (item.url.includes('/train-center')) {
                                location.href = `${midDomain}${item.url}`
                            } else {
                                location.href = `${pcDomain}${item.url}`
                            }
                        }}
                    >
                        {index === 2 && <img src={aiUrl} className={styles.ai} />}
                        {index === 6 && <img src={hotUrl} className={styles.hot} />}
                        {item?.title}

                        {index == 2 && open && (
                            <div className={styles.dropdown}>
                                <div>
                                    {aiList?.map((ele: any) => (
                                        <div
                                            key={ele?.id}
                                            onClick={e => {
                                                e.stopPropagation()
                                            }}
                                        >
                                            {ele?.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default inject('siteStore')(observer(Index))
