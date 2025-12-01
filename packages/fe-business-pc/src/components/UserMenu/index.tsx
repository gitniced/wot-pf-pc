import type { MenuProps } from 'antd'
import { ConfigProvider, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import './index.less'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
    label: React.ReactNode,
    key: React.Key,
    route: string,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        route,
    } as MenuItem
}

interface IUserMenuProps {
    menuList: any[]
    masterHistory?: any // 主应用的history，用来跳转路由
}

/**  个人工作台  */
const UserMenu: React.FC<IUserMenuProps> = ({ menuList, masterHistory }) => {
    /**  当前页面的url 来控制 menu的选中  */
    const currentUrl =
        masterHistory?.location?.pathname === '/' ? '/workbench' : masterHistory?.location?.pathname

    /**  menu items  */
    const [MenuItem, setMenuItem] = useState<MenuItem[]>([])

    /**  menu 数据  */
    const items: MenuItem[] = MenuItem
    useEffect(() => {
        let menuRes = menuList?.map(item => {
            const { title = '', children = [], route = '', icon = '' } = item || {}

            if (children && children.length) {
                return getItem(
                    title,
                    route,
                    route,
                    '',
                    children.map((child: any) => {
                        return getItem(
                            <span className={'child_content'}>
                                <ReactSVG src={child.icon || ''} style={{ width: 14 }} />
                                <span className={'child_title'}>{child.title}</span>
                            </span>,
                            child.route,
                            child.route,
                        )
                    }),
                )
            }

            return getItem(title, route, route, <ReactSVG src={icon || ''} />)
        })
        setMenuItem(menuRes)
    }, [menuList])

    /**  openKeys 全部展开  */
    const menuKeys = items.map(item => item?.key)

    /**
     *  点击菜单
     */
    const handleClickMenuItem = ({ key }: { key: React.Key }) => {
        masterHistory.push(key)
    }

    return (
        <ConfigProvider prefixCls="ant">
            <Menu
                defaultSelectedKeys={[currentUrl || '/workbench']}
                openKeys={menuKeys as any}
                mode="inline"
                items={items}
                className="user_menu"
                onClick={handleClickMenuItem}
            />
        </ConfigProvider>
    )
}

export default UserMenu
