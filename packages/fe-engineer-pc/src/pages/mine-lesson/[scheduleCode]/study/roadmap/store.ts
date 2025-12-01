import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { LearningPathTreeDto } from './interface'

class store {
    constructor() {
        makeAutoObservable(this)
    }
    /**是否请求成功 */
    public hasRequest: boolean = false

    /**当前课程id */
    public courseCode: string = ''
    /**学习步骤详情 */
    public roadMapDetail: LearningPathTreeDto | null = null

    /**给数据增加id属性 */
    convertTreeToFlatArrayBFS = (tree: LearningPathTreeDto) => {
        const queue = [tree] // 初始化队列，放入根节点
        while (queue.length > 0) {
            const currentNode = queue.shift() // 取出队列头部节点
            // 校验节点有效性
            if (!currentNode || typeof currentNode.code === 'undefined') continue
            currentNode.id = currentNode.code
            // 子节点入队（若有）
            if (currentNode.children && Array.isArray(currentNode.children)) {
                currentNode.children.forEach(child => {
                    queue.push(child)
                })
            }
        }
    }

    /**获取环节详情 */
    getRoadMap = async (scheduleCode: string, isTeacher: boolean) => {
        let finallyUrl = isTeacher ? api.getTeacherRoadMap : api.getRoadMap

        http(finallyUrl, 'get', {
            scheduleCode,
        })
            .then(data => {
                this.convertTreeToFlatArrayBFS(data as unknown as LearningPathTreeDto)
                this.roadMapDetail = data as unknown as LearningPathTreeDto
            })
            .catch(error => {
                console.error('路线图API请求失败:', error)
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
}

export default store
