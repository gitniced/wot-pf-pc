import React from 'react'
import styles from './index.module.less'
import type { LearningTaskDto } from '../../task/interface'
import TaskDesItem from '../TaskDesItem'
import { CustomMarkdown } from '@/components/AIComp/components/CustomMarkdown'

const Index = (props: { isTeacher: boolean } & LearningTaskDto) => {
    const {
        name = '',
        period,
        scenario,
        materials,
        requirements,
        knowledgePoints = [],
        suggestion,
        isTeacher = false,
    } = props

    const taskDesValue = [
        <>
            <p>【任务情景】</p>
            <CustomMarkdown>{scenario}</CustomMarkdown>
        </>,
        <>
            <p>【任务资料】</p>
            <CustomMarkdown>{materials}</CustomMarkdown>
        </>,
        <>
            <p>【任务要求】</p>
            <CustomMarkdown>{requirements}</CustomMarkdown>
        </>,
    ]

    const knowledgeDom = knowledgePoints
        .map((item, index) => {
            const { knowledgePointName = '' } = item
            return `${knowledgePointName}${index !== knowledgePoints.length - 1 ? ' | ' : ''}`
        })
        .join('')

    return (
        <div className={styles.content}>
            <TaskDesItem label="任务名称：" value={name} />
            <TaskDesItem label="任务学时：" value={period} />
            <TaskDesItem label="任务描述：" value={taskDesValue} />
            {knowledgeDom ? <TaskDesItem label="知识点：" value={knowledgeDom} /> : null}
            {isTeacher && suggestion ? (
                <TaskDesItem label="教学实施建议：" value={suggestion} />
            ) : null}
        </div>
    )
}

export default Index
