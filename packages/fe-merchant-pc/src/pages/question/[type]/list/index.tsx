import QuestionList from '@/components/QuestionList'
import { QuestionListWrapperContext } from '@/components/QuestionList/context'
import useCommonParams from '@/hooks/useCommonParams'

const RealQuestionList = () => {
    const commonParams = useCommonParams()

    return (
        <QuestionListWrapperContext.Provider value={{ ...commonParams }}>
            <QuestionList />
        </QuestionListWrapperContext.Provider>
    )
}

export default RealQuestionList
