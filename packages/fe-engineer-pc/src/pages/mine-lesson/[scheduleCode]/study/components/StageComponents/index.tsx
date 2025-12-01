import React from 'react'
import styles from './index.module.less'
import type { LearningStageDto } from '../../task/interface'
import TaskDesItem from '../TaskDesItem'
import { CustomMarkdown } from '@/components/AIComp/components/CustomMarkdown'

const Index = (props: { isTeacher: boolean } & LearningStageDto) => {
    const { name = '', period, learningGoal, knowledgePoints = [] } = props

    const knowledgeDom = knowledgePoints
        .map((item, index) => {
            const { knowledgePointName = '' } = item
            return `${knowledgePointName}${index !== knowledgePoints.length - 1 ? ' | ' : ''}`
        })
        .join('')

    return (
        <div className={styles.content}>
            <TaskDesItem label="环节名称：" value={name} />
            <TaskDesItem label="环节学时：" value={period} />
            <TaskDesItem
                label="学习目标："
                value={<CustomMarkdown>{learningGoal}</CustomMarkdown>}
            />
            {knowledgeDom ? <TaskDesItem label="知识点：" value={knowledgeDom} /> : null}
        </div>
    )
}

export default Index
