import QuestionCheck from '@/components/QuestionCheck'
import { QuestionCheckWrapperContext } from '@/components/QuestionCheck/context'

import useCommonParams from '@/hooks/useCommonParams'

const RealQuestionList = () => {
    const commonParams = useCommonParams()
    return (
        <QuestionCheckWrapperContext.Provider value={{ ...commonParams }}>
            <QuestionCheck />
        </QuestionCheckWrapperContext.Provider>
    )
}

export default RealQuestionList
