import { Descriptions } from 'antd'
import type { IClass } from '../../class/types'
import React from 'react'
import { START_POINT_MAP, TRAIN_LEVEL_MAP } from '../../class/const'

interface IClassInfoCardProps {
    classInfo: IClass
}

const ClassInfoCard: React.FC<IClassInfoCardProps> = ({ classInfo }) => {
    if (!classInfo) return null

    return (
        <Descriptions column={3}>
            <Descriptions.Item label="班级">{classInfo.name}</Descriptions.Item>
            <Descriptions.Item label="专业">
                {classInfo.majorName} (代码：{classInfo.majorNum})
            </Descriptions.Item>
            <Descriptions.Item label="培养层级">
                {TRAIN_LEVEL_MAP[classInfo.trainLevel!] || '-'} (代码：{classInfo.trainLevelNum})
            </Descriptions.Item>
            <Descriptions.Item label="学制">
                {START_POINT_MAP[classInfo.startPoint!] || '-'}
                {classInfo.eduLen}年
            </Descriptions.Item>
            <Descriptions.Item label="入学年份">{classInfo.enrollYear}</Descriptions.Item>
            <Descriptions.Item label="毕业年份">{classInfo.graduateYear}</Descriptions.Item>
        </Descriptions>
    )
}

export default React.memo(ClassInfoCard)
