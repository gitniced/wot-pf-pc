// 选项
import { cloneDeep } from 'lodash'
import { DeleteOutlined } from '@ant-design/icons'
import { useLocalObservable } from 'mobx-react'
import EditorInput from '../EditorInput'
import styles from './index.module.less'
import type { DEFAULT_QUESTION_ITEM_TYPE } from '@/components/QuestionEdit/const'
import { getDefaultQuestionItem } from '@/components/QuestionEdit/const'
import QuestionItem from '../QuestionItem'
import { getDetailStore } from '@/components/QuestionEdit/store'
import { QUESTION_TYPE_ENUM, QUESTION_TYPE_TEXT } from '@/constants'

type QuestionProps = {
    value: DEFAULT_QUESTION_ITEM_TYPE
    onChange: any
}

const addSubQuestionMap: Record<any, any> = {
    [QUESTION_TYPE_ENUM.COMPOSE]: [
        {
            type: QUESTION_TYPE_ENUM.SINGLE,
            name: '单选题',
        },
        {
            type: QUESTION_TYPE_ENUM.MULTIPLE,
            name: '多选题',
        },
        {
            type: QUESTION_TYPE_ENUM.JUDGEMENT,
            name: '判断题',
        },
        {
            type: QUESTION_TYPE_ENUM.BLANK,
            name: '填空题',
        },
        {
            type: QUESTION_TYPE_ENUM.SHORT,
            name: '简答题',
        },
    ],
    [QUESTION_TYPE_ENUM.ANALYSIS]: [
        {
            type: QUESTION_TYPE_ENUM.SHORT,
            name: '简答题',
        },
    ],
}

const Question: React.FC<QuestionProps> = ({ value, onChange }) => {
    const store = useLocalObservable(() => getDetailStore())
    let { title = { content: '' }, childList } = value || {}
    childList = childList || []

    const onTitleChange = (e: string) => {
        const nowValue = store.nowquestion
        let { title: oldTitle } = nowValue

        const newTitle = { ...oldTitle, content: e }
        onChange?.({ ...nowValue, title: { ...newTitle } })
    }

    /**更新childList */
    const updateChildren = (data: DEFAULT_QUESTION_ITEM_TYPE) => {
        const nowValue = store.nowquestion

        let tempChildList = cloneDeep(nowValue.childList)
        // @ts-ignore
        tempChildList[tempChildList?.findIndex(i => i.code === data.code)] = data

        onChange?.({ ...nowValue, childList: tempChildList })
    }

    /**更新childList */
    const addChildren = (type: QUESTION_TYPE_ENUM) => {
        let tempChildList = cloneDeep(childList)
        let tempQuestion = getDefaultQuestionItem(type)
        // 组合题不需要 小题的题干，答案的title
        // 分析题需要
        if (value.type === QUESTION_TYPE_ENUM.ANALYSIS) {
            tempQuestion.noSign = false
        } else {
            tempQuestion.noSign = true
        }
        tempChildList?.push(tempQuestion)
        onChange?.({ ...value, childList: tempChildList })
    }
    const deleteChildrenItem = (code: string) => {
        onChange?.({ ...value, childList: childList?.filter(i => i.code !== code) })
    }
    // const
    let label = value.type === QUESTION_TYPE_ENUM.ANALYSIS ? '题干案例' : '主题干'
    return (
        <div className={styles.question_item}>
            <div className={styles.question_item_title_content}>
                <div className={styles.title_content}>{label}</div>
                <EditorInput
                    placeholder="点击编辑 (必填)"
                    value={title?.content}
                    onChange={onTitleChange}
                />
            </div>
            {childList?.map((item: DEFAULT_QUESTION_ITEM_TYPE, index) => {
                return (
                    <div className={styles.question_item_option_content} key={item.code || index}>
                        <div className={styles.title_content}>子试题</div>
                        <div className={styles.option_content}>
                            <div className={styles.inner_title}>
                                {value.type === QUESTION_TYPE_ENUM.ANALYSIS ? (
                                    <span> 子试题 {index + 1} </span>
                                ) : (
                                    <span>
                                        {' '}
                                        {index + 1}.{QUESTION_TYPE_TEXT[item.type!]}{' '}
                                    </span>
                                )}

                                <DeleteOutlined
                                    className={styles.remove_item_icon}
                                    onClick={() => {
                                        deleteChildrenItem(item.code!)
                                    }}
                                />
                            </div>
                            <div className={styles.inner_content}>
                                <QuestionItem
                                    noSign={item.noSign}
                                    key={item.code}
                                    value={item}
                                    onChange={updateChildren}
                                    placeholder={{
                                        question: '子题干，点击编辑（必填）',
                                        analysis: '解析，点击编辑',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )
            })}

            <div className={styles.question_add_content}>
                <div className={styles.question_add_content_title}>添加子试题</div>
                <div className={styles.question_add_content_list}>
                    {(addSubQuestionMap[value.type as number] || []).map((item: any) => {
                        return (
                            <div
                                key={item.type}
                                onClick={() => {
                                    addChildren(item.type)
                                }}
                            >
                                {item.name}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default Question
