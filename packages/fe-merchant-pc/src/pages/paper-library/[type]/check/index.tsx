import PaperExamineCheck from '@/components/PaperCheck'
import { PaperExamineCheckContext } from '@/components/PaperCheck/context'
import useCommonParams from '@/hooks/useCommonParams'

const ExamineCheck = () => {
    const { subject } = useCommonParams()

    return (
        <PaperExamineCheckContext.Provider
            value={{
                subject: Number(subject),
            }}
        >
            <PaperExamineCheck />
        </PaperExamineCheckContext.Provider>
    )
}

export default ExamineCheck
