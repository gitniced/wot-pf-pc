import { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Divider } from 'antd'
import type { PreviewItem } from '@/pages/gateway/components/utils/interface'

interface IImageTextConfigProps {
    data: PreviewItem
    stores: any
}

const styleArr = [
    { icon: 'icon_tuwen11', name: '一行一个', style: 1 },
    { icon: 'icon_tuwen21', name: '一行2个', style: 2 },
    { icon: 'icon_tuwen31', name: '左图右标题', style: 'image_title' },
]

/**  图文展示样式   */
const ImageTextConfig: React.FC<IImageTextConfigProps> = ({ data, stores }) => {
    // console.log('🍊 data:', JSON.parse(JSON.stringify(data)))
    // 设置组件布局方式
    const [active, setActive] = useState<any>(1)

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
                                setActive(item.style)
                                stores.fixPreviewList({
                                    ...data,
                                    layoutStyle: item.style,
                                })
                            }}
                            className={styles.layout_change}
                            key={i}
                        >
                            <div
                                className={
                                    active === item.style
                                        ? styles.icon_wrap_active
                                        : styles.icon_wrap
                                }
                            >
                                <svg className={styles.icon} aria-hidden="true">
                                    <use xlinkHref={`#${item.icon}`} />
                                </svg>
                            </div>
                            <span
                                style={
                                    active === item.style ? { color: 'var(--primary-color)' } : {}
                                }
                            >
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

export default ImageTextConfig
