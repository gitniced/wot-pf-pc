import React from 'react'
import { QUESTION_TYPE } from '../../const'
import type { FillQuesCompProps } from '../../types'
import FillQuestion from '../FillQuestion'
import ObjectiveQuestion from '../ObjectiveQuestion'
import SubjectQuesFill from '../SubjectQuesFill'
import ComplexQuesFill from '../ComplexQuesFill'

/**
 * 题型切换组件
 * 根据题型动态渲染对应的问题组件
 */
const SwitchQuesFill: React.FC<FillQuesCompProps> = props => {
    const { data } = props

    switch (data.type) {
        case QUESTION_TYPE.single:
        case QUESTION_TYPE.multiple:
        case QUESTION_TYPE.judgment:
            return <ObjectiveQuestion {...props} />
        case QUESTION_TYPE.fill:
            return <FillQuestion {...props} />
        case QUESTION_TYPE.essay:
        case QUESTION_TYPE.calculation:
        case QUESTION_TYPE.discussion:
            return <SubjectQuesFill {...props} />

        case QUESTION_TYPE.case:
        case QUESTION_TYPE.combination:
            return <ComplexQuesFill {...props} />
        default:
            return null
    }
}

export default React.memo(SwitchQuesFill)
