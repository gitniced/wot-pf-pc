import QuestionList from './QuestionList'
import TypeTitle from './TypeTitle'
import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'

import GradingDetailStore from '../../store'


const TopicList = () => {
    
    const store = useLocalObservable(() => GradingDetailStore)
    const { questionList = [], answerList = [] } = store.gradingDetail

    return (
        <div className={styles.component_topic_list} id="component_topic_list">
            {questionList.map(item => (
                <div className={styles.topic_item} key={item.questionType}>
                    <TypeTitle {...item} />
                    <QuestionList questionList={item.questionList} answerList={answerList} />
                </div>
            ))}
        </div>
    )
}

export default observer(TopicList)
