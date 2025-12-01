import QuestionEdit from '@/components/QuestionEdit'
import { QuestionEditWrapperContext } from '@/components/QuestionEdit/context'
import useCommonParams from '@/hooks/useCommonParams'

const RealQuestionEdit = () => {
    const commonParams = useCommonParams()

    return (
        <QuestionEditWrapperContext.Provider value={{ ...commonParams }}>
            <QuestionEdit />
        </QuestionEditWrapperContext.Provider>
    )
}

export default RealQuestionEdit
