import { Breadcrumb } from 'antd'
import React from 'react'
import { Link } from 'umi'
import styles from './index.module.less'

interface BreadcrumbsProps {
    crumbData: {
        link?: string
        name: string
    }[]
}

const Breadcrumbs = (props: BreadcrumbsProps) => {
    const { crumbData = [] } = props || {}
    return (
        <div className={styles.bread_crumb}>
            <Breadcrumb separator=">">
                {crumbData.map(item => {
                    const { name, link } = item || {}
                    return (
                        <Breadcrumb.Item key={link}>
                            {link ? <Link to={link}>{name}</Link> : name}
                        </Breadcrumb.Item>
                    )
                })}
            </Breadcrumb>
        </div>
    )
}

export default Breadcrumbs
