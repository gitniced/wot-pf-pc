import React from 'react'
import { QUESTION_TYPE } from '../../const'
import type { QuestionComponentProps, IQuestion } from '../../types'
import ObjectiveQues from '../ObjectiveQues'
import SubjectQues from '../SubjectQues'
import ComplexQues from '../ComplexQues'
import FillQues from '../FillQues'

interface SwitchQuestionProps extends QuestionComponentProps {
    data: IQuestion & { sort?: number }
    answerData?: { value: any; subAnswer?: any[] }
    correct?: any
    showAnalysis?: boolean
    showType?: boolean
    // 题目容器渲染fn
    wrapperRender?: (child: React.ReactElement, index?: number) => React.ReactElement
}

/**
 * 题型切换组件
 * 根据题型动态渲染对应的问题组件
 */
const SwitchQuesRender: React.FC<SwitchQuestionProps> = ({
    data,
    showType,
    answerData,
    showAnalysis,
    correct,
    wrapperRender = child => child,
}) => {
    switch (data.type) {
        case QUESTION_TYPE.single:
        case QUESTION_TYPE.multiple:
        case QUESTION_TYPE.judgment:
            return wrapperRender(
                <ObjectiveQues
                    data={data}
                    answerData={answerData?.value}
                    showType={showType}
                    showAnalysis={showAnalysis}
                    correct={correct}
                />,
            )
        case QUESTION_TYPE.fill:
            return wrapperRender(
                <FillQues
                    data={data}
                    answerData={answerData?.value}
                    showType={showType}
                    showAnalysis={showAnalysis}
                />,
            )
        case QUESTION_TYPE.essay:
        case QUESTION_TYPE.calculation:
        case QUESTION_TYPE.discussion:
            return wrapperRender(
                <SubjectQues
                    data={data}
                    answerData={answerData?.value}
                    showType={showType}
                    showAnalysis={showAnalysis}
                    correct={correct}
                />,
            )
        case QUESTION_TYPE.case:
        case QUESTION_TYPE.combination:
            return (
                <ComplexQues
                    data={data}
                    showType={showType}
                    answerData={answerData}
                    wrapperRender={wrapperRender}
                    showAnalysis={showAnalysis}
                    correct={correct}
                />
            )
        default:
            return null
    }
}

export default React.memo(SwitchQuesRender)
