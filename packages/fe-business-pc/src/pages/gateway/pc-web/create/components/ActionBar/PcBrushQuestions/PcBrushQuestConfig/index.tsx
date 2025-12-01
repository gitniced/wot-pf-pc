import { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Divider } from 'antd'
import type { PreviewItem } from '@/pages/gateway/components/utils/interface'

interface IPcBrushQuestConfigProps {
    data: PreviewItem
    stores: any
}

const styleArr = [
    { icon: 'icon_shuati1', name: '一行2个' },
    { icon: 'icon_shuati2', name: '一行3个' },
    { icon: 'icon_shuati3', name: '一行4个' },
]

/**  练习展示样式   */
const PcBrushQuestConfig: React.FC<IPcBrushQuestConfigProps> = ({ data, stores }) => {
    // 设置组件布局方式
    const [active, setActive] = useState(1)

    useEffect(() => {
        data?.layoutStyle && setActive(data.layoutStyle)
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.title}>展示样式</div>
                <div className={styles.layout_change_wrap}>
                    {styleArr.map((item, i) => (
                        <div
                            onClick={() => {
                                setActive(i + 2)

                                /**  一行几个   */
                                const layoutCalculations: Record<number, any> = {
                                    2: (length: number) => Math.ceil(length / 2),
                                    3: (length: number) => Math.ceil(length / 3),
                                    4: (length: number) => Math.ceil(length / 4),
                                }

                                const layoutStyle = i + 2
                                const length = data?.codes?.length || 0
                                const numberRow = layoutCalculations[layoutStyle as number]
                                    ? layoutCalculations[layoutStyle as number](length)
                                    : 1
                                stores.fixPreviewList({
                                    ...data,
                                    layoutStyle: i + 2,
                                    showLine: numberRow || 1,
                                })
                            }}
                            className={styles.layout_change}
                            key={i}
                        >
                            <div
                                className={
                                    active === i + 2 ? styles.icon_wrap_active : styles.icon_wrap
                                }
                            >
                                <svg className={styles.icon} aria-hidden="true">
                                    <use xlinkHref={`#${item.icon}`} />
                                </svg>
                            </div>
                            <span style={active === i + 2 ? { color: '#1678ff' } : {}}>
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
                <Divider />
            </div>
        </div>
    )
}

export default PcBrushQuestConfig
