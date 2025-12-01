import React from 'react'
import type { FillQuesCompProps } from '../../types'
import QuesTitle from '../../components/QuesTitleRender'
import styles from './index.module.less'
import { Input } from 'antd'
import EditorInput from '@/components/EditorInput'
import { QUESTION_TYPE } from '../../const'

export default function SubjectQuesFill({ data, showType, value, onChange }: FillQuesCompProps) {
    return (
        <div className={styles.question_wrapper}>
            <QuesTitle {...data} showType={showType} />
            <div className={styles.content}>
                {data?.type === QUESTION_TYPE.calculation ? (
                    <EditorInput
                        placeholder="请输入"
                        initialToolbarKeys={[]}
                        onChange={onChange}
                        value={value}
                    />
                ) : (
                    <Input.TextArea
                        rows={3}
                        placeholder="请输入"
                        onChange={onChange}
                        value={value}
                    />
                )}
            </div>
        </div>
    )
}
