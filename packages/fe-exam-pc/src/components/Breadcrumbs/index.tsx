import React from 'react'
import { Breadcrumb, Typography } from 'antd'
import { history } from 'umi'
import styles from './index.module.less'

type BreadcrumbsType = 'son' | 'father'
interface BreadcrumbsProps {
    crumbData: {
        link?: string
        name: string
        isDynamic?: boolean // 是否是动态路由
        type?: BreadcrumbsType
    }[]
    onClick?: (_i: any) => void
}

const Breadcrumbs = (props: BreadcrumbsProps) => {
    const { crumbData = [], onClick } = props || {}

    const handleClick = (link?: string, type?: BreadcrumbsType) => {
        if (link) {
            if (type === 'son') {
                location.href = window.location.origin + link
            } else {
                history.push(link)
            }
        }
        onClick?.(link)
    }

    return (
        <div className={styles.bread_crumb}>
            <Breadcrumb separator=">">
                {crumbData.map(item => {
                    const { name, link, isDynamic, type: linkType } = item || {}
                    return (
                        <Breadcrumb.Item key={link}>
                            {link || isDynamic ? (
                                <Typography.Text
                                    type="secondary"
                                    onClick={() => handleClick(link, linkType)}
                                >
                                    {name}
                                </Typography.Text>
                            ) : (
                                name
                            )}
                        </Breadcrumb.Item>
                    )
                })}
            </Breadcrumb>
        </div>
    )
}

export default Breadcrumbs
