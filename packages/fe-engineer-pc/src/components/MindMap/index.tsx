import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import SimpleMindMap from 'simple-mind-map'
import Drag from 'simple-mind-map/src/plugins/Drag.js'
import Select from 'simple-mind-map/src/plugins/Select.js'
import Export from 'simple-mind-map/src/plugins/Export.js'
import ExportXMind from 'simple-mind-map/src/plugins/ExportXMind.js'
import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine.js'
import xmind from 'simple-mind-map/src/parse/xmind.js'
import type { ContextMenuProps } from '@/components/MindMap/components/ContentMenu'
import ContextMenu from '@/components/MindMap/components/ContentMenu'
import styles from './index.module.less'
import { Button, Input, Modal } from 'antd'
import { downloadFileByUrl, readBlob } from '@/utils/file'

/* eslint-disable react-hooks/rules-of-hooks */
SimpleMindMap.usePlugin(Drag)
SimpleMindMap.usePlugin(Select)
SimpleMindMap.usePlugin(Export)
SimpleMindMap.usePlugin(AssociativeLine)
SimpleMindMap.usePlugin(ExportXMind)
;(SimpleMindMap as any).xmind = xmind
/* eslint-enable react-hooks/rules-of-hooks */

interface IMindMapProps {
    name?: string
    preview?: boolean
}

export interface IMindMapRef {
    init: (content?: string, preview?: boolean) => void
    export: () => Promise<string>
}

const MindMap = forwardRef<IMindMapRef, IMindMapProps>((props, ref) => {
    const refContainer = useRef<HTMLDivElement>(null)
    const mindMapRef = useRef<SimpleMindMap | null>(null)
    const activeNodesRef = useRef<any[]>([])
    const noteRef = useRef<string>('')
    const [zoom, setZoom] = useState(100)
    const cleanupRef = useRef<(() => void) | null>(null)

    // 操作状态管理
    const [operationStates, setOperationStates] = useState({
        canBack: false, // 初始时无历史记录，不能回退
        canForward: false, // 初始时无历史记录，不能前进
        canCopy: false,
        canCut: false,
        canPaste: false, // 初始时无剪贴板数据，不能粘贴
        canAddChild: true, // 默认允许添加子节点
        canAddSibling: false,
        canAddParent: false,
        canDelete: false,
        canMoveUp: false,
        canMoveDown: false,
        hasActiveNodes: false,
        hasRootNode: false,
    })

    // 右键菜单状态
    const [contextMenu, setContextMenu] = useState<
        Pick<ContextMenuProps, 'visible' | 'x' | 'y' | 'type' | 'currentNode'>
    >({
        visible: false,
        x: 0,
        y: 0,
        type: '',
        currentNode: null,
    })

    // 鼠标按下的位置记录
    const mousedownPos = useRef({ x: 0, y: 0, isMousedown: false })

    // 拖拽状态
    const [isDragging, setIsDragging] = useState(false)

    // 更新操作状态
    const updateOperationStates = () => {
        if (!mindMapRef.current) return

        const mindMap = mindMapRef.current
        const activeNodes = activeNodesRef.current || []
        const hasActiveNodes = activeNodes.length > 0
        const hasRootNode = activeNodes.some(node => node.isRoot)

        // 检查历史记录状态 - 使用实际的 API
        let canBack = false
        let canForward = false
        try {
            const command = (mindMap as any).command
            if (command && command.history && Array.isArray(command.history)) {
                // 实际的 API：activeHistoryIndex 是当前历史记录的索引
                const activeHistoryIndex = command.activeHistoryIndex
                const historyLength = command.history.length

                // 如果有索引，使用索引判断；否则假设在最新位置
                if (activeHistoryIndex !== undefined) {
                    canBack = activeHistoryIndex > 0
                    canForward = activeHistoryIndex < historyLength - 1
                } else {
                    // 如果没有索引信息，根据历史长度判断
                    canBack = historyLength > 1 // 有历史记录就能回退
                    canForward = false // 假设在最新位置，不能前进
                }
            }
        } catch (e) {
            console.warn('无法获取历史记录状态:', e)
        }

        // 检查剪贴板状态 - 使用实际的 API
        let hasClipboardData = false
        try {
            const renderer = (mindMap as any).renderer
            if (renderer) {
                // 实际的 API：beingCopyData 包含复制的数据
                if (renderer.beingCopyData && renderer.beingCopyData.length > 0) {
                    hasClipboardData = true
                }
                // 备用检查：检查是否有复制相关的数据
                else if (renderer.copyData && renderer.copyData.length > 0) {
                    hasClipboardData = true
                }
            }
        } catch (e) {
            console.warn('无法获取剪贴板状态:', e)
        }

        // 判断移动操作
        let canMoveUp = false
        let canMoveDown = false
        if (hasActiveNodes && !hasRootNode && activeNodes.length === 1) {
            const node = activeNodes[0]
            const parent = node.parent
            if (parent && parent.children) {
                const index = parent.children.indexOf(node)
                canMoveUp = index > 0
                canMoveDown = index < parent.children.length - 1
            }
        }

        const newStates = {
            canBack,
            canForward,
            canCopy: hasActiveNodes && !hasRootNode,
            canCut: hasActiveNodes && !hasRootNode,
            canPaste: hasClipboardData,
            canAddChild: true, // 总是可以添加子节点（到根节点或选中节点）
            canAddSibling: hasActiveNodes && !hasRootNode,
            canAddParent: hasActiveNodes && !hasRootNode,
            canDelete: hasActiveNodes && !hasRootNode,
            canMoveUp,
            canMoveDown,
            hasActiveNodes,
            hasRootNode,
        }

        setOperationStates(newStates)
    }

    // 隐藏右键菜单
    const hideContextMenu = () => {
        setContextMenu({
            visible: false,
            x: 0,
            y: 0,
            type: '',
            currentNode: null,
        })
    }

    const handleBack = () => {
        if (mindMapRef.current && operationStates.canBack) {
            mindMapRef.current.execCommand('BACK')
            updateOperationStates()
        }
    }

    const handleForward = () => {
        if (mindMapRef.current && operationStates.canForward) {
            mindMapRef.current.execCommand('FORWARD')
            updateOperationStates()
        }
    }

    // 复制节点
    const handleCopy = () => {
        if (mindMapRef.current && operationStates.canCopy) {
            mindMapRef.current.renderer.copy()
            // 复制后延迟更新状态，确保 beingCopyData 已经设置
            setTimeout(() => {
                updateOperationStates()
            }, 50)
        }
    }

    // 剪切节点
    const handleCut = () => {
        if (mindMapRef.current && operationStates.canCut) {
            mindMapRef.current.renderer.cut()
            // 剪切后延迟更新状态，确保 beingCopyData 已经设置
            setTimeout(() => {
                updateOperationStates()
            }, 50)
        }
    }

    // 粘贴节点
    const handlePaste = () => {
        if (mindMapRef.current && operationStates.canPaste) {
            mindMapRef.current.renderer.paste()
            updateOperationStates()
        }
    }

    // 添加子节点
    const handleAddChild = () => {
        if (mindMapRef.current && operationStates.canAddChild) {
            // 如果没有选中节点，先选中根节点
            if (activeNodesRef.current.length === 0) {
                const rootNode = (mindMapRef.current as any).renderer?.root
                if (rootNode) {
                    ;(mindMapRef.current as any).renderer.addActiveNode(rootNode)
                }
            }
            mindMapRef.current.execCommand('INSERT_CHILD_NODE', true, [], {
                text: '新节点',
            })
            updateOperationStates()
        }
    }

    // 添加同级节点
    const handleAddSibling = () => {
        if (mindMapRef.current && operationStates.canAddSibling) {
            mindMapRef.current.execCommand('INSERT_NODE', true, [], {
                text: '新节点',
            })
            updateOperationStates()
        }
    }

    // 添加父节点
    const handleAddParent = () => {
        if (mindMapRef.current && operationStates.canAddParent) {
            mindMapRef.current.execCommand('INSERT_PARENT_NODE', true, [], {
                text: '新节点',
            })
            updateOperationStates()
        }
    }

    // 删除节点
    const handleDelete = () => {
        if (mindMapRef.current && operationStates.canDelete) {
            mindMapRef.current.execCommand('REMOVE_NODE')
            updateOperationStates()
        }
    }

    // 上移节点
    const handleMoveUp = () => {
        if (mindMapRef.current && operationStates.canMoveUp) {
            mindMapRef.current.execCommand('UP_NODE')
            updateOperationStates()
        }
    }

    // 下移节点
    const handleMoveDown = () => {
        if (mindMapRef.current && operationStates.canMoveDown) {
            mindMapRef.current.execCommand('DOWN_NODE')
            updateOperationStates()
        }
    }

    const handleNote = () => {
        noteRef.current = ''
        Modal.confirm({
            title: '备注',
            content: (
                <Input.TextArea
                    rows={4}
                    defaultValue={activeNodesRef.current[0].getData('note') || ''}
                    onChange={e => {
                        noteRef.current = e.target.value
                    }}
                />
            ),
            onOk: () => {
                activeNodesRef.current.forEach((node: any) => {
                    node.setNote(noteRef.current)
                })
            },
        })
    }

    const handleAssociativeLine = () => {
        if (mindMapRef.current) {
            ;(mindMapRef.current as any).associativeLine.createLineFromActiveNode()
        }
    }

    const handleImportXMind = async () => {
        if (mindMapRef.current) {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '*'
            input.onchange = async event => {
                const target = event.target as HTMLInputElement
                if (target.files && target.files[0]) {
                    const file = target.files[0]
                    const json = await (SimpleMindMap as any).xmind.parseXmindFile(file)
                    mindMapRef.current?.setData(json)
                }
            }
            input.click()
        }
    }

    const handleExportXMind = async () => {
        if (mindMapRef.current) {
            const blob = await (mindMapRef.current as any).doExportXMind.xmind(
                mindMapRef.current.getData(false),
                props.name,
            )

            const base64 = (await readBlob(blob)) as string
            downloadFileByUrl(base64, `${props.name}.xmind`)
        }
    }

    const handleZoomIn = () => {
        if (mindMapRef.current) {
            const cx = mindMapRef.current.width / 2
            const cy = mindMapRef.current.height / 2
            ;(mindMapRef.current as any).view.enlarge(cx, cy)
        }
    }

    const handleZoomOut = () => {
        if (mindMapRef.current) {
            const cx = mindMapRef.current.width / 2
            const cy = mindMapRef.current.height / 2
            ;(mindMapRef.current as any).view.narrow(cx, cy)
        }
    }

    useImperativeHandle(ref, () => ({
        init: (content?: string, _preview?: boolean) => {
            if (!refContainer.current) return

            // 清理之前的实例
            if (cleanupRef.current) {
                cleanupRef.current()
            }

            const mindMap = new SimpleMindMap({
                el: refContainer.current,
                data: {
                    data: {
                        text: '中心主题',
                    },
                    children: [
                        {
                            data: {
                                text: '分支主题 1',
                            },
                        },
                        {
                            data: {
                                text: '分支主题 2',
                            },
                        },
                        {
                            data: {
                                text: '分支主题 3',
                            },
                        },
                        {
                            data: {
                                text: '分支主题 4',
                            },
                        },
                    ],
                },
                scaleRatio: 0.1,
                minZoomRatio: 20,
                maxZoomRatio: 400,
                mousewheelAction: 'zoom',
                mousewheelZoomActionReverse: false,
                mouseScaleCenterUseMousePosition: true,
                fitPadding: 50,
                themeConfig: {
                    paddingX: 16,
                    paddingY: 16,
                    backgroundColor: '#fff',
                    lineColor: '#e0ebf9',
                    lineWidth: 3,
                    lineStyle: 'direct',
                    root: {
                        color: 'rgba(255,255,255,0.85)',
                        fontSize: 16,
                        fontWeight: 400,
                        fillColor: '#1678ff',
                        borderRadius: 8,
                    },
                    second: {
                        color: 'rgba(0,0,0,0.65)',
                        fontSize: 16,
                        fontWeight: 400,
                        fillColor: '#F5F5F5',
                        borderRadius: 8,
                        borderWidth: 0,
                    },
                    node: {
                        color: 'rgba(0,0,0,0.65)',
                        fontSize: 14,
                        fontWeight: 400,
                        fillColor: '#F5F5F5',
                        borderRadius: 8,
                        borderWidth: 0,
                        paddingX: 12,
                        paddingY: 8,
                    },
                },
                createNewNodeBehavior: 'activeOnly',
            } as any)

            mindMapRef.current = mindMap

            if (_preview) {
                mindMap.setMode('readonly')
            }

            if (content) {
                const json = JSON.parse(content)
                mindMap.setFullData(json)
            }

            // 初始化后更新操作状态
            setTimeout(() => {
                updateOperationStates()
            }, 100)

            // 监听节点右键菜单事件
            mindMap.on('node_contextmenu', (e: MouseEvent, node: any) => {
                e.preventDefault()
                setContextMenu({
                    visible: true,
                    x: e.clientX + 10,
                    y: e.clientY + 10,
                    type: 'node',
                    currentNode: node,
                })
            })

            // 监听画布鼠标按下事件
            mindMap.on('svg_mousedown', (e: MouseEvent) => {
                // 如果不是右键点击直接返回
                if (e.which !== 3) {
                    return
                }
                mousedownPos.current = {
                    x: e.clientX,
                    y: e.clientY,
                    isMousedown: true,
                }
            })

            // 监听鼠标松开事件
            mindMap.on('mouseup', (e: MouseEvent) => {
                if (!mousedownPos.current.isMousedown) {
                    return
                }
                mousedownPos.current.isMousedown = false

                // 如果鼠标松开和按下的距离大于3，则不认为是点击事件
                if (
                    Math.abs(mousedownPos.current.x - e.clientX) > 3 ||
                    Math.abs(mousedownPos.current.y - e.clientY) > 3
                ) {
                    hideContextMenu()
                    return
                }

                return
                // setContextMenu({
                //     visible: true,
                //     x: e.clientX + 10,
                //     y: e.clientY + 10,
                //     type: 'canvas',
                //     currentNode: null,
                // })
            })

            // 同步缩放比例
            mindMap.on('scale', (scale: number) => {
                setZoom(Math.round(scale * 100))
            })

            // 适配/平移等场景下，transform 发生但不一定触发 scale，这里兜底更新显示
            mindMap.on('view_data_change', () => {
                const currentScale = (mindMap as any).view?.scale || 1
                setZoom(Math.round(currentScale * 100))
            })

            // 监听节点点击、画布点击、展开收起按钮点击时隐藏右键菜单
            mindMap.on('node_click', hideContextMenu)
            mindMap.on('node_active', (e: MouseEvent, nodes: any) => {
                activeNodesRef.current = nodes
                updateOperationStates()
            })
            mindMap.on('draw_click', hideContextMenu)
            mindMap.on('expand_btn_click', () => {
                hideContextMenu()
                updateOperationStates()
            })

            // 监听历史记录变化
            mindMap.on('back', updateOperationStates)
            mindMap.on('forward', updateOperationStates)

            // 监听节点操作和数据变化
            mindMap.on('node_tree_render_end', () => {
                updateOperationStates()
                if (props.preview) {
                    // @ts-ignore
                    mindMap.view.fit()
                }
            })
            mindMap.on('data_change', updateOperationStates)

            // 监听剪贴板变化 - 官方实现
            mindMap.on('clipboard_change', updateOperationStates)

            // 拖拽状态管理
            let dragTimer: NodeJS.Timeout | null = null

            // 监听节点拖拽事件
            mindMap.on('node_dragging', () => {
                setIsDragging(true)
                // 清除之前的定时器
                if (dragTimer) {
                    clearTimeout(dragTimer)
                    dragTimer = null
                }
            })

            mindMap.on('node_dragend', () => {
                setIsDragging(false)
                if (dragTimer) {
                    clearTimeout(dragTimer)
                    dragTimer = null
                }
            })

            // 监听画布拖拽事件（可能包括根节点拖拽）
            mindMap.on('drag', () => {
                setIsDragging(true)
                // 清除之前的定时器
                if (dragTimer) {
                    clearTimeout(dragTimer)
                    dragTimer = null
                }
                // 设置延迟重置，避免频繁切换状态
                dragTimer = setTimeout(() => {
                    setIsDragging(false)
                    dragTimer = null
                }, 100)
            })

            // 添加全局点击事件监听器
            const handleWindowClick = () => hideContextMenu()
            window.addEventListener('click', handleWindowClick)

            // 设置清理函数
            cleanupRef.current = () => {
                window.removeEventListener('click', handleWindowClick)
                mindMap.destroy()
                mindMapRef.current = null
            }
        },
        export: async () => {
            const base64 = await mindMapRef.current?.export('json', false, undefined, true)
            const base64Data = base64.replace(/^data:application\/octet-stream;base64,/, '')
            const jsonStr = decodeURIComponent(escape(atob(base64Data)))

            const json = JSON.parse(jsonStr)

            delete json.theme

            return JSON.stringify(json)
        },
    }))

    // 组件卸载时清理资源
    useEffect(() => {
        return () => {
            if (cleanupRef.current) {
                cleanupRef.current()
            }
        }
    }, [])

    return (
        <div className={`${styles.mind_wrapper} ${isDragging ? styles.dragging : ''}`}>
            <div ref={refContainer} className={styles.mind_container} onClick={hideContextMenu} />

            {props.preview ? null : (
                <>
                    <div
                        className={styles.mind_content_operation}
                        onClick={e => e.stopPropagation()}
                        onMouseEnter={e => e.stopPropagation()}
                        onMouseDown={e => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}
                        onMouseMove={e => e.stopPropagation()}
                        onMouseUp={e => e.stopPropagation()}
                        onMouseLeave={e => e.stopPropagation()}
                        onDragStart={e => e.preventDefault()}
                    >
                        <div>
                            <Button onClick={handleBack} disabled={!operationStates.canBack}>
                                回退
                            </Button>
                            <Button onClick={handleForward} disabled={!operationStates.canForward}>
                                前进
                            </Button>
                            <Button
                                onClick={handleAddSibling}
                                disabled={!operationStates.canAddSibling}
                            >
                                同级节点
                            </Button>
                            <Button
                                onClick={handleAddChild}
                                disabled={!operationStates.canAddChild}
                            >
                                子节点
                            </Button>
                            <Button onClick={handleDelete} disabled={!operationStates.canDelete}>
                                删除节点
                            </Button>
                            <Button onClick={handleNote} disabled={!operationStates.hasActiveNodes}>
                                备注
                            </Button>
                            <Button
                                onClick={handleAssociativeLine}
                                disabled={!operationStates.hasActiveNodes}
                            >
                                关联线
                            </Button>
                        </div>
                        <div>
                            <Button onClick={handleImportXMind}>导入</Button>
                            <Button onClick={handleExportXMind}>导出</Button>
                        </div>
                    </div>
                    <div
                        className={styles.mind_content_footer}
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
                        <span style={{ marginRight: 8 }}>{zoom}%</span>
                        <Button onClick={handleZoomIn} style={{ marginRight: 8 }}>
                            放大
                        </Button>
                        <Button onClick={handleZoomOut} style={{ marginRight: 8 }}>
                            缩小
                        </Button>
                    </div>
                </>
            )}

            <ContextMenu
                visible={contextMenu.visible}
                x={contextMenu.x}
                y={contextMenu.y}
                type={contextMenu.type}
                currentNode={contextMenu.currentNode}
                operationStates={operationStates}
                onHide={hideContextMenu}
                onCopy={handleCopy}
                onCut={handleCut}
                onPaste={handlePaste}
                onAddChild={handleAddChild}
                onAddSibling={handleAddSibling}
                onAddParent={handleAddParent}
                onDelete={handleDelete}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
            />
        </div>
    )
})

export default MindMap

// 添加组件清理
MindMap.displayName = 'MindMap'
