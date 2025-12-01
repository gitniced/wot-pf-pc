import React from 'react'
import style from './index.module.less'

interface WarpMenuType {
    items: menuDataType[]
    activeKeys: string
    onSelect: (k: string, menuDataType: menuDataType) => void
}

function WarpMenu({ items = [], activeKeys = '', onSelect }: WarpMenuType) {
    const getIsnow = (key: string) => key === activeKeys
    const getIsshowActive = (key: string) => {
        // if(active=== void 0) return ''

        if (key === activeKeys) return style.menu_inner_show
        else return ''
    }

    return (
        <div className={style.warp_menu}>
            {items.map(item => {
                return (
                    <div className={style.menu_item} key={item.key}>
                        <div className={style.menu_top}>
                            <div
                                className={[
                                    style.menu_top_inner,
                                    getIsnow(item.key) && style.menu_top_anime,
                                ].join(' ')}
                            >
                                {/*  */}
                            </div>
                        </div>
                        <div
                            className={[style.menu_inner, getIsshowActive(item.key)].join(' ')}
                            onClick={() => onSelect?.(item.key, item)}
                        >
                            <svg
                                className={[
                                    style.menu_icon,
                                    getIsnow(item.key) && style.menu_icon_active,
                                ].join(' ')}
                            >
                                <use xlinkHref={`#${item.icon}`} />
                            </svg>
                            <div
                                className={[
                                    style.menu_text,
                                    getIsnow(item.key) && style.menu_text_active,
                                ].join(' ')}
                            >
                                {item.label || ''}
                            </div>
                        </div>
                        <div className={style.menu_bottom}>
                            <div
                                className={[
                                    style.menu_bottom_inner,
                                    getIsnow(item.key) && style.menu_bottom_anime,
                                ].join(' ')}
                            >
                                {/*  */}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default WarpMenu
