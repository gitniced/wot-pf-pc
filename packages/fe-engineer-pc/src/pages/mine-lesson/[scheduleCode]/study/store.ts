import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { LearningNodeDto, ComponentType, CourseScheduleInfoDto } from './interface'

import { history } from 'umi'
import { cloneDeep } from 'lodash'
import qs from 'qs'
class store {
    constructor() {
        makeAutoObservable(this)
    }
    /**是否请求成功 */
    public hasRequest: boolean = false

    /**当前课程id */
    public courseCode: string = ''

    /**排课信息 */
    public scheduleInfo: Partial<CourseScheduleInfoDto> = {}

    /**任务页面组件类型 */
    public componentType: ComponentType = 'task'

    /**学习任务节点树 */
    public nodeTree: LearningNodeDto[] = []

    /**获取班级课程信息 */
    getScheduleInfo = async (scheduleCode: string) => {
        http(api.getScheduleInfo, 'get', {
            scheduleCode,
        })
            .then(data => {
                this.scheduleInfo = (data || []) as unknown as CourseScheduleInfoDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }

    /**更新课程code */
    updateCourseCode = (courseCode: string) => {
        this.courseCode = courseCode
    }

    /**获取任务列表 */
    getNodeTree = async (courseCode: string) => {
        const nodeTree = (await http(api.getNodeTree, 'post', {
            courseCode,
            studentCode: '',
        })) as unknown as LearningNodeDto[]
        this.nodeTree = this.dealItemData(nodeTree)
    }

    /**根据路由及query定位菜单 */
    initTaskPage = async (
        courseCode: string,
        { taskCode, stageCode, stepCode }: any,
        active: boolean = true,
    ) => {
        const queryCode = taskCode || stageCode || stepCode
        if (this.nodeTree.length === 0) {
            await this.getNodeTree(courseCode)
        }
        if (active) {
            if (queryCode) {
                let defaultSelects = this.findParentCodesIterative(queryCode)
                const lastSelect = defaultSelects.slice(-1)[0] || {}
                if (lastSelect.code) {
                    this.menuClick(lastSelect, false)
                    defaultSelects = this.findParentCodesIterative(queryCode)
                }
                defaultSelects.map(i => {
                    i.open = true
                })
                const tempNodes = cloneDeep(this.nodeTree)
                this.nodeTree = tempNodes
            } else {
                const findObj = this.nodeTree.find((_item, index) => {
                    if (index === 0) {
                        return true
                    } else {
                        return false
                    }
                })
                if (findObj) {
                    this.menuClick(findObj)
                }
            }
        } else {
            const tempNodes = cloneDeep(this.nodeTree)
            // 递归遍历nodeTree中的所有数据的active设为false
            const setInactive = (nodes: LearningNodeDto[]) => {
                nodes.forEach(node => {
                    node.active = false
                    if (node.children) {
                        setInactive(node.children)
                    }
                })
            }
            setInactive(tempNodes)
            this.nodeTree = tempNodes
        }
    }

    /**任务节点数据处理 */
    dealItemData = (data: LearningNodeDto[], targetCode?: string): LearningNodeDto[] => {
        const newData = data.map((item: LearningNodeDto) => {
            const { children = [] } = item || {}
            if (targetCode) {
                return {
                    ...item,
                    children: this.dealItemData(children, targetCode),
                    active: item.code === targetCode,
                    open: item.code === targetCode ? !item.open : item.open,
                }
            } else {
                return {
                    ...item,
                    children: this.dealItemData(children),
                    active: false,
                    open: false,
                }
            }
        })
        return newData
    }

    /**
     * 更新nodeTree中指定code节点的active和open状态
     * 1. 遍历整棵树，将code相同的节点active设为true，其余为false
     * 2. open状态处理：
     *    a. 如果目标节点open为false，则递归将其所有父节点open设为true，并将该节点open设为true
     *    b. 如果目标节点open为true，则将其open设为false,其父节点open不变,其子节点open不变
     * @param {string} targetCode 需要激活的节点code
     */
    updateNodeTreeActiveAndOpen = (targetCode: string) => {
        if (!targetCode) return

        // 先从原始数据中获取目标节点的当前open状态
        let targetWasOpen = false
        const findTargetInOriginal = (nodes: LearningNodeDto[]): boolean => {
            for (const node of nodes) {
                if (node.code === targetCode) {
                    targetWasOpen = node.open || false
                    return true
                }
                if (node.children && node.children.length > 0) {
                    if (findTargetInOriginal(node.children)) {
                        return true
                    }
                }
            }
            return false
        }

        if (!findTargetInOriginal(this.nodeTree)) {
            console.warn(`未找到code为${targetCode}的节点`)
            return
        }

        // 深拷贝节点树，避免直接修改原数据
        const tempNodes = cloneDeep(this.nodeTree)

        // 1. 递归遍历整棵树，更新active状态
        const updateActiveState = (nodes: LearningNodeDto[]): void => {
            nodes.forEach(node => {
                // 设置active状态：code相同的为true，其余为false
                node.active = node.code === targetCode

                // 递归处理子节点
                if (node.children && node.children.length > 0) {
                    updateActiveState(node.children)
                }
            })
        }

        // 2. 处理open状态
        const updateOpenState = (): void => {
            if (!targetWasOpen) {
                // 如果目标节点原本是关闭的，需要：
                // a. 将目标节点open设为true
                // b. 递归将其所有父节点open设为true

                // 先将目标节点设为open
                const setTargetOpen = (nodes: LearningNodeDto[]): void => {
                    nodes.forEach(node => {
                        if (node.code === targetCode) {
                            node.open = true
                            return
                        }
                        if (node.children && node.children.length > 0) {
                            setTargetOpen(node.children)
                        }
                    })
                }
                setTargetOpen(tempNodes)

                // 再将所有父节点设为open（但不包括目标节点本身）
                const parentPath = this.findParentCodesIterative(targetCode)
                // 从父节点路径中移除目标节点（如果存在）
                const parentNodes = parentPath.filter(node => node.code !== targetCode)
                parentNodes.forEach(parentNode => {
                    parentNode.open = true
                })
            } else {
                // 如果目标节点原本是打开的，只需要：
                // 将目标节点open设为false，父级和子级节点open不变
                const setTargetNodeClosed = (nodes: LearningNodeDto[]): void => {
                    nodes.forEach(node => {
                        if (node.code === targetCode) {
                            node.open = false
                            return
                        }
                        if (node.children && node.children.length > 0) {
                            setTargetNodeClosed(node.children)
                        }
                    })
                }
                setTargetNodeClosed(tempNodes)
            }
        }

        // 执行状态更新
        updateActiveState(tempNodes)
        updateOpenState()
        // 更新节点树
        this.nodeTree = tempNodes
    }

    /**查询code及其上层 */
    findParentCodesIterative = (targetCode: string) => {
        if (!targetCode) return []
        const stack: { node: LearningNodeDto; path: LearningNodeDto[] }[] = [] // 栈元素：{ node: 当前节点, path: 当前路径 }
        stack.push({ node: { children: this.nodeTree }, path: [] }) // 根节点虚拟包装
        while (stack.length > 0) {
            const { node, path } = stack.pop()!
            const { children = [] } = node
            // 遍历当前节点的子节点（注意：栈是后进先出，需反向遍历以保证顺序）
            for (let i = children.length - 1; i >= 0; i--) {
                const child = children[i]
                const { children: childChildren = [], code: childCode } = child
                const newPath: LearningNodeDto[] = [...path, child] // 复制路径并添加当前子节点 code
                if (childCode === targetCode) {
                    // return newPath.slice(0, -1).concat([targetCode]) // 找到目标，返回父级路径
                    return newPath // 找到目标，返回父级路径
                }

                if (childChildren.length > 0) {
                    stack.push({ node: child, path: newPath })
                }
            }
        }

        return [] // 未找到
    }

    /**接收query的key和value，拼接search，返回去重的search */
    dealSearch = (key: string, value: string) => {
        const searchList = ['taskCode', 'stageCode', 'stepCode']
        const searchParams = qs.parse(location.search, { ignoreQueryPrefix: true })
        searchList.map(i => {
            delete searchParams[i]
        })
        searchParams[key] = value
        return qs.stringify(searchParams)
    }

    /**节点点击触发 */
    menuClick = (data: LearningNodeDto, jump: boolean = true) => {
        const { code, type } = data
        let tempMenu = cloneDeep(this.nodeTree)
        tempMenu = this.dealItemData(tempMenu, code)
        this.nodeTree = tempMenu
        if (!jump) return false
        switch (String(type)) {
            case '1':
                history.replace(
                    `/mine-lesson/${this.scheduleInfo.code}/study/task?${this.dealSearch(
                        'taskCode',
                        code!,
                    )}`,
                )
                break
            case '2':
                history.replace(
                    `/mine-lesson/${this.scheduleInfo.code}/study/task?${this.dealSearch(
                        'stageCode',
                        code!,
                    )}`,
                )
                break
            case '3':
                history.replace(
                    `/mine-lesson/${this.scheduleInfo.code}/study/task?${this.dealSearch(
                        'stepCode',
                        code!,
                    )}`,
                )
                break
            default:
                console.log('未知类型', type)
        }
    }

    /**节点点击触发 */
    getMenuLink = (data: LearningNodeDto) => {
        const { code, type } = data
        switch (String(type)) {
            case '1':
                return `/mine-lesson/${this.scheduleInfo.code}/study/task?${this.dealSearch(
                    'taskCode',
                    code!,
                )}`
            case '2':
                return `/mine-lesson/${this.scheduleInfo.code}/study/task?${this.dealSearch(
                    'stageCode',
                    code!,
                )}`
            case '3':
                return `/mine-lesson/${this.scheduleInfo.code}/study/task?${this.dealSearch(
                    'stepCode',
                    code!,
                )}`
            default:
                return ''
        }
    }
}

export default store
