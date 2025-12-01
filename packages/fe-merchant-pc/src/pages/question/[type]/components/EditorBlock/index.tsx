// 填空题答案
import { Form } from 'antd'
import React, { useState } from 'react'
import EditorInput from '../EditorInput'
import styles from './index.module.less'

export default function Index() {
    const BLOCK_TEXT: Record<string, string> = {
        '0': '第一空',
        '1': '第二空',
        '2': '第三空',
        '3': '第四空',
        '4': '第五空',
    }

    const EditorItem: React.FC<any> = ({ value = {}, onChange, index }) => {
        const [titleValue, setTitle] = useState<string>()

        const triggerChange = (changedValue: { answer?: string }) => {
            onChange?.({ answer: titleValue, ...value, ...changedValue, isAnswer: true })
        }

        const onTitleChange = (e: string) => {
            setTitle(e)
            triggerChange({ answer: e })
        }

        return (
            <EditorInput
                hasBlock={true}
                value={value?.title || titleValue}
                onChange={onTitleChange}
                BlockText={BLOCK_TEXT?.[String(index)]}
            />
        )
    }
    return (
        <div className={styles.form_list}>
            <Form.List name="optionList" initialValue={[{}]}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field, index: number) => {
                            return (
                                <div className={styles.form_list_item} key={field.key}>
                                    <Form.Item
                                        {...field}
                                        // name={index}
                                        noStyle
                                    >
                                        <EditorItem index={index} />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <span
                                            className={styles.delete_button}
                                            onClick={() => remove(field.name)}
                                        >
                                            <span>删</span>
                                        </span>
                                    ) : null}
                                </div>
                            )
                        })}
                        {fields?.length <= 20 ? (
                            <Form.Item>
                                <div className={styles.add} onClick={add}>
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
