import React, { useEffect, useMemo, useRef, useState } from 'react'
// import html2canvas from 'html2canvas'
import type { EdgeData, NodeData, TreeData } from '@antv/g6'
import { treeToGraphData, register, ExtensionCategory, Graph } from '@antv/g6'
import { ReactNode } from '@antv/g6-extension-react'
import styles from './index.module.less'
import type { LearningPathTreeDto } from '@/pages/mine-lesson/[scheduleCode]/study/roadmap/interface'
import { getCookie } from '@/storage'
import striptags from 'striptags'

register(ExtensionCategory.NODE, 'react-node', ReactNode)

export type RoadmapGraphProps = {
    initialData: LearningPathTreeDto
    width?: number
    height?: number
    // 节点样式配置（用于在代码中直接控制矩形与文本等大小样式）
    nodeStyleConfig?: Partial<NodeStyleConfig>
    // 自定义节点 HTML 渲染（可完全接管节点内容结构与样式）
    renderNodeInnerHTML?: (d: any, cfg: NodeStyleConfig) => string
    // 主题色
    tempThemeColor?: string
}

export type NodeStyleConfig = {
    nodeWidth: number
    rootHeight: number
    childHeight: number
    borderRadius: number
    rootBackgroundColor: string
    childBackgroundColor: string
    rootTextColor: string
    childTextColor: string
    fontSize: number
    lineHeight: number
    paddingX: number
    paddingY: number
    boxShadow?: string
    border?: string
}

const DEFAULT_NODE_STYLE: NodeStyleConfig = {
    nodeWidth: 160,
    rootHeight: 56,
    childHeight: 80,
    borderRadius: 8,
    rootBackgroundColor: 'var(--primary-color)',
    childBackgroundColor: '#F5F5F5',
    rootTextColor: 'rgba(255,255,255,0.85)',
    childTextColor: 'rgba(0,0,0,0.65)',
    fontSize: 16,
    lineHeight: 24,
    paddingX: 12,
    paddingY: 8,
    boxShadow: undefined,
    border: undefined,
}

const GraphItem = ({
    itemData,
    currentIdentity,
}: {
    itemData: TreeData
    currentIdentity: string
}) => {
    const { children = [], depth, lightUp, name, learnedRate = 0 } = itemData || {}

    const learnedRateStr = useMemo(() => {
        if (learnedRate < 10) {
            if (String(learnedRate) === '0') {
                return '#f5f5f5'
            } else {
                return `var(--primary-color-01)`
            }
        } else {
            if (String(learnedRate) === '100') {
                return `var(--primary-color-100)`
            } else {
                return `var(--primary-color-0${learnedRate})`
            }
        }
    }, [learnedRate])

    switch (depth) {
        case 0:
            return <div className={styles.root_item}>{striptags(name)}</div>
        case 1:
            return (
                <div className={[styles.task_item_content].join(' ')}>
                    <div className={[styles.task_item, lightUp > 0 ? styles.light : ''].join(' ')}>
                        <div className={[styles.task_item_name].join(' ')}>{striptags(name)}</div>
                        {/* {children?.length ? (
                            <div className={[styles.line_content].join(' ')}>
                                <div className={[styles.line].join(' ')} />
                                <div className={[styles.round].join(' ')}>{children?.length}</div>
                            </div>
                        ) : null} */}
                    </div>
                    {children?.length ? (
                        <div className={[styles.line_content].join(' ')}>
                            <div className={[styles.line].join(' ')} />
                            <div className={[styles.round].join(' ')}>{children?.length}</div>
                        </div>
                    ) : null}
                </div>
            )
        default:
            return (
                <div
                    className={[styles.point_item].join(' ')}
                    style={
                        currentIdentity === '14'
                            ? {
                                  background: learnedRateStr,
                                  color: learnedRate > 50 ? '#fff' : 'rgba(0, 0, 0, 0.65)',
                              }
                            : lightUp > 0
                            ? {
                                  background: 'var(--primary-color-02)',
                                  color: 'var(--primary-color)',
                              }
                            : {}
                    }
                >
                    {striptags(name) || ''}
                </div>
            )
    }
}

const RoadmapGraph: React.FC<RoadmapGraphProps> = ({ initialData, width = 900, height = 724 }) => {
    /**
     * 当前身份code
     * 教师身份 14
     * 学生身份 15
     */
    const identityCode = getCookie('SELECT_IDENTITY_CODE')
    const currentIdentity = identityCode ? identityCode.toString() : ''
    const containerRef = useRef<HTMLDivElement | null>(null)
    const graphRef = useRef<Graph | null>(null)
    const [treeData, setTreeData] = useState<LearningPathTreeDto>(initialData)

    const size = useMemo(() => ({ width, height }), [width, height])

    // 基于当前可见元素进行自适应，遵循 G6 内置 fitView 行为
    const fitVisible = async (duration = 0) => {
        const graph = graphRef.current
        if (!graph) return
        await graph.fitView(
            { when: 'always', direction: 'both' },
            duration ? { duration } : undefined,
        )
    }

    // 过滤重复节点
    const filterEdges = (edges: EdgeData[]) => {
        let tempEdges: EdgeData[] = []
        const tempMap = new Map()
        edges.map(i => {
            if (!tempMap.has(i.target)) {
                tempMap.set(i.target, '')
                tempEdges.push(i)
            }
        })
        return tempEdges
    }

    // 过滤重复节点
    const filterNodes = (nodes: NodeData[]) => {
        let tempNodes: NodeData[] = []
        const tempMap = new Map()
        nodes.map(i => {
            if (!tempMap.has(i.id)) {
                tempMap.set(i.id, '')
                tempNodes.push(i)
            }
        })
        return tempNodes
    }

    // 同步外部数据变化
    useEffect(() => {
        setTreeData(initialData)
    }, [initialData])

    useEffect(() => {
        const newGraph = new Graph({ container: containerRef.current! })
        graphRef.current = newGraph
        return () => {
            if (graphRef.current) {
                graphRef.current.destroy()
                graphRef.current = undefined
            }
        }
    }, [])

    useEffect(() => {
        if (size.height && size.width && treeData && currentIdentity && graphRef.current) {
            let graphData = treeToGraphData(treeData as unknown as TreeData)
            console.log('graphData', graphData)
            let { edges = [], nodes = [] } = graphData
            const newEdges = filterEdges(edges)
            const newNodes = filterNodes(nodes)
            graphData = { edges: newEdges, nodes: newNodes }
            const horizontalGap = DEFAULT_NODE_STYLE.nodeWidth + 64 // 左右矩形实际间距：节点宽度 + 期望空隙
            const verticalGap = DEFAULT_NODE_STYLE.childHeight + 16 // 上下同父级最小间距：节点高度 + 期望空隙

            graphRef.current.setOptions({
                container: containerRef.current,
                width: size.width,
                height: size.height,
                padding: 24,
                autoFit: 'center',
                data: graphData,
                zoom: 1, // 确保初始缩放为1
                animation: { duration: 300 }, // 设置节点显示/隐藏动画时长为0.3秒
                node: {
                    type: 'react-node',
                    style: {
                        ports: [
                            { key: 'left', placement: 'left', lineWidth: 10 },
                            { key: 'right', placement: 'right', lineWidth: 10 },
                        ],
                        size: (datum: any) => {
                            const { depth, name, children = [] } = datum
                            const isWrap = name.length > 8
                            const hasChild = children.length > 0
                            switch (depth) {
                                case 0:
                                    return isWrap ? [160, 80] : [160, 56]
                                case 1:
                                    return hasChild
                                        ? isWrap
                                            ? [184, 80]
                                            : [184, 56]
                                        : isWrap
                                        ? [160, 80]
                                        : [160, 56]
                                default:
                                    return [0, 32]
                            }
                        },
                        component: (data: TreeData) => (
                            <GraphItem itemData={data} currentIdentity={currentIdentity} />
                        ),
                    },
                },
                edge: {
                    type: 'line',
                    style: {
                        stroke: '#E0EBF9',
                        lineWidth: 3,
                        strokeOpacity: 1,
                        endArrow: false,
                    },
                    state: {
                        selected: {
                            strokeOpacity: 1,
                        },
                        hover: {
                            strokeOpacity: 1,
                        },
                    },
                },
                layout: {
                    type: 'dendrogram',
                    direction: 'LR',
                    nodeSep: verticalGap,
                    rankSep: horizontalGap,
                },
                plugins:
                    currentIdentity === '14'
                        ? [
                              {
                                  type: 'tooltip',
                                  // 只对节点启用，边不显示tooltip
                                  // 只有当目标是节点类型时才启用展开/收起功能
                                  enable: (event: any) => {
                                      const currentNode = graph.getNodeData(event.target.id)
                                      const { depth } = currentNode || {}
                                      return (
                                          event.targetType === 'node' && depth !== 0 && depth !== 1
                                      )
                                  },
                                  getContent: (event: any) => {
                                      const currentNode = graph.getNodeData(event.target.id)
                                      const { unlearnedCount, learnedCount, learnedRate } =
                                          currentNode || {}
                                      return `<div class='${styles.hover_info}'>
                        <div class='${styles.hover_info_item}'>
                            <span>已学</span>
                            <span>${learnedCount}人</span>
                        </div>
                        <div class='${styles.hover_info_item}'>
                            <span>未学</span>
                            <span>${unlearnedCount}人</span>
                        </div>
                        <div class='${styles.hover_info_item}'>
                            <span>完成率</span>
                            <span>${learnedRate}%</span>
                        </div>
                    </div>`
                                  },
                              },
                          ]
                        : [],
                // v5 默认支持 drag/zoom 的内置行为名称如下
                behaviors: [
                    'drag-canvas',
                    'zoom-canvas',
                    // 'drag-element',
                    {
                        type: 'collapse-expand',
                        trigger: 'click',
                        // 只有当目标是节点类型时才启用展开/收起功能
                        enable: (event: any) => {
                            graphRef.current?.getNodeData(event.target.id)
                            const currentNode = graphRef.current?.getNodeData(event.target.id)
                            const { depth } = currentNode || {}
                            return event.targetType === 'node' && depth !== 0
                        },
                    },
                ],
            })

            console.log('开始渲染图谱...')

            graphRef.current
                .render()
                .then(() => {
                    console.log('渲染图谱完成...')
                    console.log('适配视图(仅可见元素)...')
                    fitVisible()
                })
                .catch(err => {
                    console.log('渲染图谱失败...', err)
                })
        }
    }, [size.height, size.width, treeData, currentIdentity])

    return (
        <div className={styles.roadmap_graph} style={{ width: size.width, height: size.height }}>
            <div ref={containerRef} className={styles.graph_container} />
        </div>
    )
}

export default RoadmapGraph
