/* eslint-disable*/

/**
 * Created by cgl on 2020/9/22.
 * Theme：
 */
import cls from 'classnames'
import React, { useState } from 'react'
import styles from './index.module.less'
import { ReactSVG } from 'react-svg'

const Index = (props: any) => {
    const { className, title, icon, hoverIcon, isRenderReactSvg = false, src } = props
    const [hover, setHover] = useState(false)

    const mouseEnter = () => {
        setHover(true)
    }

    const mouseLeave = () => {
        setHover(false)
    }

    const renderContent = () => {
        if (isRenderReactSvg) {
            return (
                <ReactSVG
                    className={styles.svg}
                    src={src}
                    beforeInjection={svg => {
                        svg.setAttribute('style', `fill: #888888;width:30px;height: 30px;`)
                    }}
                />
            )
        }

        return title === '返回顶部' ? (
            <img
                src={
                    hover
                        ? 'https://static.zpimg.cn/public/career/jiangsu/icon/icon_zhiding_s@2x.png'
                        : 'https://static.zpimg.cn/public/career/jiangsu/icon/icon_zhiding@2x.png'
                }
                className={cls(styles.icon, {
                    [styles.default_color]: !hover,
                })}
            />
        ) : (
            <svg
                className={cls(styles.icon, {
                    [styles.default_color]: !hover,
                })}
                aria-hidden="true"
            >
                <use xlinkHref={hover ? hoverIcon : icon} />
            </svg>
        )
    }

    return (
        <div
            className={cls(styles.item, className)}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onClick={props.onClick}
        >
            {renderContent()}
            <p>{title}</p>
        </div>
    )
}

export default Index
