import React, { useRef, useCallback, useState } from 'react'
import { type } from './const'
import { useDrag, useDrop } from 'react-dnd'
import type { DraggableBodyRowProps } from './interface'
import { message, Image } from 'antd'
import update from 'immutability-helper'
import { v4 as uuidv4 } from 'uuid'
import type { UrlItem } from './interface'
import { getCookie } from '@/storage'

export const Hook = props => {
    const [currentNavId, setNavId] = useState<number | string>() //手机高亮显示的逻辑
    const [iconType, setIconType] = useState<number>(0) // 0默认icon   1选中icon
    const [clickNavIndex, setNavIndex] = useState<number>(0) //当前弹出icon选择框的第几行下标
    const [saveIconKey, setSaveIconKey] = useState<string>('') //点击图标回显的加边框
    const [visible, setVisible] = useState<boolean>(false) //modal的显示隐藏

    const orgCode = getCookie('SELECT_ORG_CODE') //获取机构Code

    //操作导航名字的输入框
    const operateNav = (columnKey: string, idx: number) => {
        const arr = JSON.parse(JSON.stringify(props.gloablNav))
        if (!arr[idx].operateCode.includes(columnKey)) {
            arr[idx].operateCode.push(columnKey)
        } else {
            const filterCode = arr[idx]?.operateCode.filter((i: string) => i !== columnKey)
            arr[idx].operateCode = filterCode
        }
        props.gloablNav = arr
    }
    //输入完后更新导航名字的值
    const updateNavMessage = (e: any, idx: number, columnKey: string) => {
        const value = e.target.value
        const arr = JSON.parse(JSON.stringify(props.gloablNav))
        arr[idx][columnKey] = value
        props.gloablNav = arr
    }
    //添加导航
    const addNav = () => {
        if (props.gloablNav.length === 5) {
            return false
        }
        const newNav = {
            organizationCode: orgCode,
            id: uuidv4(),
            key: uuidv4(),
            name: '新导航',
            linkType: 0,
            linkUrl: '',
            linkName: '',
            icon: '',
            selectedIcon: '',
            operateCode: [],
            sort: 0,
            readonly: 0,
        }
        const arr = JSON.parse(JSON.stringify(props.gloablNav))
        arr.splice(1, 0, newNav)
        props.gloablNav = arr
        props.rowLength = props.rowLength + 1
    }

    // 删除导航
    const deleteNav = (idx: number, delCode: string) => {
        props.deleteArr.push(delCode)
        const arr = JSON.parse(JSON.stringify(props.gloablNav))
        arr.splice(idx, 1)
        props.gloablNav = arr

        const idArr: unknown[] = []
        props.gloablNav.map((item: { id: string }) => {
            idArr.push(item.id)
        })
        if (!idArr.includes(currentNavId)) {
            setNavId(props?.gloablNav?.[0]?.id)
        }
    }
    // 保存的时候拿到table数据
    const onSaveData = () => {
        props.saveAllData(JSON.parse(JSON.stringify(props.gloablNav)))
    }

    // 链接选择的改变
    const onLinkChange = (urlItem: UrlItem, id: string | number) => {
        const obj = {
            key: id,
            value: urlItem,
        }
        props.linkObjArr.push(obj)
        props.gloablNav.forEach((item: { id: string; linkName: string }) => {
            if (item.id === obj.key) {
                item.linkName = obj.value.label as string
            }
        })
    }

    const DraggableBodyRow = ({
        index,
        moveRow,
        className,
        style,
        ...restProps
    }: DraggableBodyRowProps) => {
        const ref = useRef<HTMLTableRowElement>(null)
        const [{ isOver, dropClassName }, drop] = useDrop({
            accept: type,
            collect: monitor => {
                const { index: dragIndex } = monitor.getItem() || {}
                if (dragIndex === index) {
                    return {}
                }
                return {
                    isOver: monitor.isOver(),
                    dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
                }
            },
            drop: (item: { index: number }) => {
                moveRow(item.index, index)
            },
        })
        const [, drag] = useDrag({
            type,
            item: { index },
            collect: monitor => ({
                isDragging: monitor.isDragging(),
            }),
        })
        drop(drag(ref))

        return (
            <tr
                ref={ref}
                className={`${className}${isOver ? dropClassName : ''}`}
                style={{ cursor: 'move', ...style }}
                {...restProps}
            />
        )
    }

    const components = {
        body: {
            row: DraggableBodyRow,
        },
    }
    // 拖拽移动
    const moveRow = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const dragRow = props.gloablNav[dragIndex]
            // 第一行置顶  倒数第一行置底
            if (
                dragIndex === 0 ||
                hoverIndex === 0 ||
                dragIndex === props?.gloablNav?.length - 1 ||
                hoverIndex === props?.gloablNav?.length - 1
            ) {
                message.error('首页和我的禁止移动')
                return false
            }

            props.gloablNav = update(props.gloablNav, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragRow],
                ],
            })
        },
        [props.gloablNav],
    )

    //打开选择图标的modal
    const openIcon = (types: number, idx: number, iconUrl: string) => {
        setVisible(true)
        setIconType(types)
        setNavIndex(idx)
        setSaveIconKey(iconUrl)
    }

    // //手机高亮显示的逻辑
    const isCurrentNav = (id: number) => {
        return id === currentNavId
    }
    //图标modal的确认按钮
    const onSubmit = (iconKey: string) => {
        const arr = JSON.parse(JSON.stringify(props.gloablNav))
        arr[clickNavIndex][iconType === 0 ? 'icon' : 'selectedIcon'] = iconKey
        props.gloablNav = arr
        setVisible(false)
    }

    //判断是图片还是icon
    const getContent = (s: { id: any; icon: string; selectedIcon: string }) => {
        const imgDom = <Image src={isCurrentNav(s.id) ? s.selectedIcon : s.icon} preview={false} />
        const svgDom = (
            <svg
                className="icon"
                aria-hidden="true"
                style={isCurrentNav(s.id) ? { fill: props.themeColor } : {}}
            >
                <use xlinkHref={`#${isCurrentNav(s.id) ? s.selectedIcon : s.icon}`} />
            </svg>
        )

        if (currentNavId === s.id) {
            if (s.selectedIcon.includes('https://')) {
                return imgDom
            } else if (!s.selectedIcon.includes('https://')) {
                return svgDom
            }
        } else {
            if (s.icon.includes('https://')) {
                return imgDom
            } else {
                return svgDom
            }
        }
    }

    return {
        operateNav,
        updateNavMessage,
        addNav,
        deleteNav,
        onSaveData,
        onLinkChange,
        components,
        moveRow,
        currentNavId,
        setNavId,
        iconType,
        setIconType,
        clickNavIndex,
        setNavIndex,
        saveIconKey,
        setSaveIconKey,
        visible,
        setVisible,
        openIcon,
        isCurrentNav,
        onSubmit,
        getContent,
    }
}
