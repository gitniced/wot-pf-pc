import { useLocalObservable } from 'mobx-react'
import { Divider } from 'antd'
import { useState } from 'react'
import type { PreviewItem } from '../../../../../components/utils/interface'
import { getViewStore } from './../../../store'
import styles from './index.module.less'

const layoutStyleArr = [
    { icon: 'icon_saas_shuxiangyihangwuge', name: '竖向一行5个' },
    { icon: 'icon_saas_shuxiagnyihangsige', name: '竖向一行4个' },
    { icon: 'icon_hengxiangyihangerge', name: '横向一行2个' },
    { icon: 'icon_saas_hengxiangyihangsange', name: '横向一行3个' },
]

const Index = (props: { data: PreviewItem }) => {
    // 设置组件布局方式
    const [active, setActive] = useState(-1)
    // 获取全局唯一的store
    const stores = useLocalObservable(() => getViewStore())
    const { data } = props

    return (
        <div className={styles.container}>
            <h2>
                课程
                {console.log('-----action', stores, data)}
            </h2>
            <Divider />
            <div className={styles.content}>
                <div>展示样式</div>
                <div className={styles.layout_change_wrap}>
                    {layoutStyleArr.map((item, i) => (
                        <div onClick={() => setActive(i)} className={styles.layout_change} key={i}>
                            <div
                                className={
                                    active === i ? styles.icon_wrap_active : styles.icon_wrap
                                }
                            >
                                <svg className={styles.icon} aria-hidden="true">
                                    <use xlinkHref={`#${item.icon}`} />
                                </svg>
                            </div>
                            <span style={active === i ? { color: '#1678ff' } : {}}>
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
                <Divider />
                <div>添加内容</div>
            </div>
        </div>
    )
}

export default Index
