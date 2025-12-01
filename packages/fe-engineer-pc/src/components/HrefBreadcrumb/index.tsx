import { Breadcrumb } from 'antd'
import styles from './index.module.less'
import HrefLink from '../HrefLink'
import classNames from 'classnames'

export interface HrefBreadcrumbProps {
    crumbData: {
        link?: string
        name: string
    }[]
}

const HrefBreadcrumb = (props: HrefBreadcrumbProps) => {
    const { crumbData = [] } = props || {}

    return (
        <Breadcrumb separator=">" className={styles.bread_crumb}>
            {crumbData.map((item, index) => {
                return (
                    <Breadcrumb.Item
                        className={classNames(styles.bread_crumb_item, {
                            [styles.bread_crumb_item_last]: index === crumbData.length - 1,
                        })}
                        key={item.link || `${item.name}-${index}`}
                    >
                        <HrefLink
                            url={item.link}
                            className={styles.bread_crumb_link}
                            disableJump={index === crumbData.length - 1}
                        >
                            {item.name}
                        </HrefLink>
                    </Breadcrumb.Item>
                )
            })}
        </Breadcrumb>
    )
}

export default HrefBreadcrumb
