import PaperExamineList from '@/components/PaperExamine/list'
import { PaperExamineListContext } from '@/components/PaperExamine/list/context'
import useCommonParams from '@/hooks/useCommonParams'

const ExamineList = () => {
    const { subject } = useCommonParams()

    return (
        <PaperExamineListContext.Provider value={{ subject }}>
            <PaperExamineList />
        </PaperExamineListContext.Provider>
    )
}

export default ExamineList
