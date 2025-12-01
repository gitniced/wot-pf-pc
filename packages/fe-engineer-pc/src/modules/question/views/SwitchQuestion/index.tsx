import React from 'react'
import { QUESTION_TYPE } from '../../const'
import type { QuestionComponentProps } from '../../types'
import SingleQuestion from '../SingleQuestion'
import MultipleQuestion from '../MultipleQuestion'
import JudgmentQuestion from '../JudgmentQuestion'
import FillQuestion from '../FillQuestion'
import EssayQuestion from '../EssayQuestion'
import CalculationQuestion from '../CalculationQuestion'
import DiscussionQuestion from '../DiscussionQuestion'
import CaseQuestion from '../CaseQuestion'
import CombinationQuestion from '../CombinationQuestion'

interface SwitchQuestionProps extends QuestionComponentProps {
    questionType: QUESTION_TYPE
}

/**
 * 题型切换组件
 * 根据题型动态渲染对应的问题组件
 */
const SwitchQuestion: React.FC<SwitchQuestionProps> = ({
    questionType,
    value,
    onChange,
    form,
    formNamespace,
    ...props
}) => {
    const commonProps = {
        questionType,
        value,
        onChange,
        form,
        formNamespace,
        ...props,
    }

    switch (questionType) {
        case QUESTION_TYPE.single:
            return <SingleQuestion {...commonProps} />
        case QUESTION_TYPE.multiple:
            return <MultipleQuestion {...commonProps} />
        case QUESTION_TYPE.judgment:
            return <JudgmentQuestion {...commonProps} />
        case QUESTION_TYPE.fill:
            return <FillQuestion {...commonProps} />
        case QUESTION_TYPE.essay:
            return <EssayQuestion {...commonProps} />
        case QUESTION_TYPE.calculation:
            return <CalculationQuestion {...commonProps} />
        case QUESTION_TYPE.discussion:
            return <DiscussionQuestion {...commonProps} />
        case QUESTION_TYPE.case:
            return <CaseQuestion {...commonProps} />
        case QUESTION_TYPE.combination:
            return <CombinationQuestion {...commonProps} />
        default:
            return <SingleQuestion {...commonProps} />
    }
}

export default React.memo(SwitchQuestion)
