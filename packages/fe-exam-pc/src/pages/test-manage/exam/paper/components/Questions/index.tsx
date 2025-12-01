// 题目区

import styles from './index.module.less'

import AnswerCard from './AnswerCard'
import Topics from './Topics'
import { observer, useLocalObservable } from 'mobx-react'
import PaperStore from '@/pages/test-manage/exam/paper/store'
import { useEffect } from 'react'


const Questions = () => {
    // 当前显示的题目
    const store = useLocalObservable(() => PaperStore)

    useEffect(() => {
       
        store.getQuestionList()
    }, [])

    return (
        <div className={styles.component_question_wrapper}>
            {/* 题目区 */}
            <Topics />
            {/* 答题卡 */}
            <AnswerCard />
        </div>
    )
}

export default observer(Questions)
