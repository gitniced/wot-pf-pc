import React, { useMemo } from 'react'
import { Menu } from 'antd'
import { SnippetsOutlined } from '@ant-design/icons'
import styles from './index.module.less'

export interface ContextMenuProps {
    visible: boolean
    x: number
    y: number
    type: 'node' | 'canvas' | ''
    currentNode: any
    operationStates?: {
        canCopy: boolean
        canCut: boolean
        canPaste: boolean
        canAddChild: boolean
        canAddSibling: boolean
        canAddParent: boolean
        canDelete: boolean
        canMoveUp: boolean
        canMoveDown: boolean
    }
    onHide: () => void
    onCopy: () => void
    onCut: () => void
    onPaste: () => void
    onAddChild: () => void
    onAddSibling: () => void
    onDelete: () => void
    onMoveUp: () => void
    onMoveDown: () => void
    onAddParent: () => void
}

const ContextMenu: React.FC<ContextMenuProps> = ({
    visible,
    x,
    y,
    type,
    currentNode,
    operationStates,
    onHide,
    onCopy,
    onCut,
    onPaste,
    onAddChild,
    onAddSibling,
    onDelete,
    onMoveUp,
    onMoveDown,
    onAddParent,
}) => {
    // 判断是否是根节点（兼容原有逻辑）
    const isRoot = currentNode?.isRoot || false

    // 判断是否是第一个子节点（兼容原有逻辑）
    const isFirstChild = currentNode?.parent && currentNode?.parent.children?.[0] === currentNode

    // 判断是否是最后一个子节点（兼容原有逻辑）
    const isLastChild =
        currentNode?.parent &&
        currentNode?.parent.children?.[currentNode.parent.children.length - 1] === currentNode

    const getMenuItemRender = (label: string, keyboard: string) => {
        return (
            <div className={styles.menu_item_render}>
                <span className={styles.menu_item_render_label}>{label}</span>
                <span className={styles.menu_item_render_keyboard}>{keyboard}</span>
            </div>
        )
    }

    const getNodeMenuItems = () => [
        {
            key: 'copy' as const,
            label: getMenuItemRender('复制', 'Ctrl + C'),
            onClick: onCopy,
            disabled: operationStates ? !operationStates.canCopy : isRoot, // 优先使用 operationStates
        },
        {
            key: 'cut' as const,
            label: getMenuItemRender('剪切', 'Ctrl + X'),
            onClick: onCut,
            disabled: operationStates ? !operationStates.canCut : isRoot, // 优先使用 operationStates
        },
        {
            key: 'paste' as const,
            label: getMenuItemRender('粘贴', 'Ctrl + V'),
            onClick: onPaste,
            disabled: operationStates ? !operationStates.canPaste : false, // 检查剪贴板状态
        },
        {
            type: 'divider' as const,
        },
        {
            key: 'addChild' as const,
            label: getMenuItemRender('添加子节点', 'Tab'),
            onClick: onAddChild,
            disabled: operationStates ? !operationStates.canAddChild : false,
        },
        {
            key: 'addSibling' as const,
            label: getMenuItemRender('添加同级节点', 'Enter'),
            onClick: onAddSibling,
            disabled: operationStates ? !operationStates.canAddSibling : isRoot, // 优先使用 operationStates
        },
        {
            key: 'addParent' as const,
            label: getMenuItemRender('添加父节点', 'Shift + Tab'),
            onClick: onAddParent,
            disabled: operationStates ? !operationStates.canAddParent : isRoot, // 优先使用 operationStates
        },
        {
            type: 'divider' as const,
        },
        {
            key: 'moveUp' as const,
            label: getMenuItemRender('上移', 'Ctrl + ↑'),
            onClick: onMoveUp,
            disabled: operationStates ? !operationStates.canMoveUp : isRoot || isFirstChild, // 优先使用 operationStates
        },
        {
            key: 'moveDown' as const,
            label: getMenuItemRender('下移', 'Ctrl + ↓'),
            onClick: onMoveDown,
            disabled: operationStates ? !operationStates.canMoveDown : isRoot || isLastChild, // 优先使用 operationStates
        },
        {
            type: 'divider' as const,
        },
        {
            key: 'delete' as const,
            label: getMenuItemRender('删除', 'Delete'),
            onClick: onDelete,
            disabled: operationStates ? !operationStates.canDelete : isRoot, // 优先使用 operationStates
            danger: true,
        },
    ]

    const getCanvasMenuItems = () => [
        {
            key: 'paste' as const,
            icon: <SnippetsOutlined />,
            label: '粘贴',
            onClick: onPaste,
            disabled: operationStates ? !operationStates.canPaste : false, // 检查剪贴板状态
        },
    ]

    const menuItems = useMemo(
        () => (type === 'node' ? getNodeMenuItems() : getCanvasMenuItems()),
        [type, operationStates, isRoot, isFirstChild, isLastChild],
    )

    return (
        <div
            className={styles.context_menu}
            style={{
                position: 'fixed',
                left: x,
                top: y,
                zIndex: 1000,
                display: visible ? 'block' : 'none',
                pointerEvents: visible ? 'auto' : 'none',
            }}
            onClick={e => e.stopPropagation()}
            onMouseDown={e => {
                e.stopPropagation()
                e.preventDefault()
            }}
            onMouseMove={e => e.stopPropagation()}
            onMouseEnter={e => e.stopPropagation()}
            onMouseUp={e => e.stopPropagation()}
            onMouseLeave={e => e.stopPropagation()}
            onDragStart={e => e.preventDefault()}
        >
            <Menu
                key={visible ? 'visible' : 'hidden'}
                items={menuItems}
                style={{ border: 'none' }}
                onClick={() => {
                    setTimeout(() => onHide(), 0)
                }}
            />
        </div>
    )
}

export default ContextMenu
