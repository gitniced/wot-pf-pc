// 单选和多选题答案
import { Form, Radio } from 'antd'
import { useState, useEffect } from 'react'
import EditorInput from '../EditorInput'
import styles from './index.module.less'
import filterLetters from '@/utils/filterLetters'

interface PriceValue {
    title?: string
    isAnswer?: boolean
    radioValue?: number
    sort?: number
}
interface PriceInputProps {
    value?: PriceValue
    onChange?: (value: PriceValue) => void
    index: number
    radioValue?: string
}

const EditorRadioItem: React.FC<PriceInputProps> = ({
    value = {},
    onChange,
    index,
    radioValue,
}) => {
    const [titleValue, setTitle] = useState<string>()
    const [isAnswer, setAnswer] = useState<boolean>()

    const triggerChange = (changedValue: { title?: string; isAnswer?: boolean }) => {

        onChange?.({ title: titleValue, isAnswer, ...value, ...changedValue, sort: index + 1 })
    }

    const onStatusChange = (currentValue: string | undefined) => {
        if (currentValue === undefined) return

        if (currentValue === String(index)) {
            setAnswer(true)
            triggerChange({ isAnswer: true })
        } else {
            setAnswer(false)
            triggerChange({ isAnswer: false })
        }
    }

    const onTitleChange = (e: string) => {
        onStatusChange(radioValue)
        setTitle(e)
        triggerChange({ title: e })
    }

    // 监听radio.group的value 是否和当前radio的值一致，一致设为true，否则false
    useEffect(() => {
        if (radioValue !== undefined) {
            onStatusChange(radioValue)
        }
    }, [radioValue])

    return (
        <div className={styles.editor_radio_item}>
            <Radio
                checked={value?.isAnswer || isAnswer}
                id="name"
                value={String(index)}
            >
                {filterLetters(index)}
            </Radio>

            <EditorInput value={value?.title || titleValue} onChange={onTitleChange} />
        </div>
    )
}

const EditRadio = () => {
    const [radioValue, setRadioValue] = useState<string>()

    return (
        <div className={styles.form_list}>
            <Form.List
                name="optionList"
                initialValue={[{}, {}, {}, {}]}
            >
                {(fields, { add, remove }) => (
                    <Radio.Group
                        name="radiogroup"
                        value={radioValue}
                        onChange={e => setRadioValue(e.target.value)}
                    >
                        {fields.map((field, index: number) => (
                            <div className={styles.form_list_item} key={field.key}>
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    noStyle
                                >
                                    <EditorRadioItem index={index} radioValue={radioValue} />
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
                    </Radio.Group>
                )}
            </Form.List>
        </div>
    )
}

export default EditRadio
