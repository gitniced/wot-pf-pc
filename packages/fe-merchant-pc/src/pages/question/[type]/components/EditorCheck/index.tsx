// 单选和多选题答案
import { Checkbox, Form } from 'antd'
import { useState } from 'react'
import EditorInput from '../EditorInput'
import styles from './index.module.less'
import filterLetters from '@/utils/filterLetters'

interface PriceValue {
    answer?: string
    isAnswer?: boolean
    sort?: string | number
}
interface PriceInputProps {
    value?: PriceValue
    onChange?: (value: PriceValue) => void
    index: number
}

const EditorRadioItem: React.FC<PriceInputProps> = ({ value = {}, onChange, index }) => {
    const [answer, setAnswer] = useState<string>()
    const [isAnswer, setIsAnswer] = useState<boolean>(false)

    const triggerChange = (changedValue: { answer?: string; isAnswer?: boolean }) => {
        onChange?.({ answer, isAnswer, ...value, ...changedValue, sort: index + 1 })
    }

    const onTitleChange = (e: string) => {
        setAnswer(e)
        triggerChange({ answer: e })
    }

    const onCheckChange = (e: any) => {
        setIsAnswer(e.target.checked)
        triggerChange({ isAnswer: e.target.checked })
    }

    return (
        <div className={styles.editor_radio_item}>
            <Checkbox
                checked={value?.isAnswer || isAnswer}
                onChange={onCheckChange}
                id="name"
                value={index}
            >
                {filterLetters(index)}
            </Checkbox>

            <EditorInput value={value?.answer || answer} onChange={onTitleChange} />
        </div>
    )
}

const EditRadio = () => {
    const selfValidator = (names: PriceValue[]) => {
        // return Promise.reject(new Error('单选题只能设置一个答案'))
        let titleCount = 0
        let answerCount = 0
        names.filter(name => {
            if (name?.answer) titleCount++
            if (name?.isAnswer) answerCount++
        })
    }

    return (
        <div className={styles.form_list}>
            <Form.List
                name="optionList"
                initialValue={[{}, {}, {}, {}]}
                rules={[
                    {
                        validator: async (_, names) => {
                            selfValidator(names)
                        },
                    },
                ]}
            >
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field, index: number) => (
                            <div className={styles.form_list_item} key={field.key}>
                                <Form.Item
                                    {...field}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    noStyle
                                >
                                    <EditorRadioItem index={index} />
                                </Form.Item>
                                {fields.length > 2 ? (
                                    <span
                                        className={styles.delete_button}
                                        onClick={() => remove(field.name)}
                                    >
                                        <span>删</span>
                                    </span>
                                ) : null}
                            </div>
                        ))}
                        {fields?.length <= 20 ? (
                            <Form.Item>
                                <div className={styles.add} onClick={() => add()}>
                                    添加选项
                                </div>
                            </Form.Item>
                        ) : null}
                    </>
                )}
            </Form.List>
        </div>
    )
}

export default EditRadio
