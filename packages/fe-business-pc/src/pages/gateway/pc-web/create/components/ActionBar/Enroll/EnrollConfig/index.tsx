import { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Divider } from 'antd'
import type { PreviewItem } from '@/pages/gateway/components/utils/interface'

interface IImageTextConfigProps {
    data: PreviewItem
    stores: any
}

const styleArr = [
    { icon: 'icon_tuwen31', name: '一行一个' },
    { icon: 'icon_tuwen21', name: '一行2个' },
    { icon: 'icon_baoming3', name: '一行3个' },
]

/**  图文展示样式   */
const ImageTextConfig: React.FC<IImageTextConfigProps> = ({ data, stores }) => {
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
                                setActive(i + 1)
                                if (data.rule === 'custom') {
                                    stores.fixPreviewList({
                                        ...data,
                                        layoutStyle: i + 1,
                                        showLine: data.codes?.length || 4,
                                    })
                                } else {
                                    stores.fixPreviewList({
                                        ...data,
                                        layoutStyle: i + 1,
                                    })
                                }
                            }}
                            className={styles.layout_change}
                            key={i}
                        >
                            <div
                                className={
                                    active === i + 1 ? styles.icon_wrap_active : styles.icon_wrap
                                }
                            >
                                <svg className={styles.icon} aria-hidden="true">
                                    <use xlinkHref={`#${item.icon}`} />
                                </svg>
                            </div>
                            <span style={active === i + 1 ? { color: 'var(--primary-color)' } : {}}>
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
