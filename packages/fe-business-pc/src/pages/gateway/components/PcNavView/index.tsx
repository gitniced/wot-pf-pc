import React, { useState } from 'react'
import { Popover } from 'antd'
import styles from './index.module.less'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

interface PcNavViewType {
    rightNode: React.ReactNode
    logo: string
    dataList: any[]
    onItemClick: (params: any) => void
}

function PcNavView({ rightNode, logo, dataList, onItemClick }: PcNavViewType) {
    const [hoverId, setHoverId] = useState<number | null>(null)

    const assertChildren = (item: { childNaviList: any[] }) => {
        return item.childNaviList && item.childNaviList.length
    }
    return (
        <div className={styles.pc_nav_view}>
            <div className={styles.pc_nav_view_left}>
                {logo ? (
                    <img src={logo} alt="" className={styles.pc_nav_view_logo_img} />
                ) : (
                    <div className={styles.pc_nav_view_logo_placeholder}>请配置导航栏LOGO</div>
                )}

                <div className={styles.pc_nav_view_list} id="nav_hover_item_warp">
                    <div className={styles.nav_hover_item_warp}>
                        <div
                            className={styles.pc_nav_view_item}
                            onClick={() => {
                                onItemClick(dataList?.[0])
                            }}
                        >
                            首页
                        </div>
                    </div>
                    {dataList?.slice(1).map(item => {
                        if (assertChildren(item)) {
                            return (
                                <div className={styles.nav_hover_item_warp} key={item.code}>
                                    <Popover
                                        placement="bottom"
                                        trigger="hover"
                                        getPopupContainer={() =>
                                            document.getElementById(
                                                'nav_hover_item_warp',
                                            ) as HTMLElement
                                        }
                                        content={
                                            <>
                                                <div className={styles.nav_hover_item_popver}>
                                                    {item.childNaviList.map((child: any) => {
                                                        return (
                                                            <div
                                                                key={child.code}
                                                                onClick={() => onItemClick(child)}
                                                            >
                                                                {child.name}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </>
                                        }
                                    >
                                        <div
                                            className={styles.pc_nav_view_item}
                                            onMouseEnter={e => {
                                                e.stopPropagation()
                                                setHoverId(0)
                                            }}
                                            onMouseLeave={e => {
                                                e.stopPropagation()
                                                setHoverId(null)
                                            }}
                                        >
                                            {item.name}
                                            <div>
                                                {hoverId === 0 ? (
                                                    <DownOutlined className={styles.nav_icon} />
                                                ) : (
                                                    <UpOutlined className={styles.nav_icon} />
                                                )}
                                            </div>
                                        </div>
                                    </Popover>
                                </div>
                            )
                        } else {
                            return (
                                <div className={styles.nav_hover_item_warp} key={item?.code}>
                                    <div
                                        className={styles.pc_nav_view_item}
                                        onClick={() => onItemClick(item)}
                                    >
                                        {item.name}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <div>{rightNode}</div>
        </div>
    )
}

export default PcNavView
