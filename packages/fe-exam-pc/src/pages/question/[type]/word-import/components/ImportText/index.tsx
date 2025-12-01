import React from 'react'
import { Input, Button, Modal } from 'antd'
import { observer } from 'mobx-react'
import WordImportStore from '../../store'
import { history, useParams } from 'umi'
import styles from '../../index.module.less'
import type { QuestionRouteType } from '@/hooks/useCommonParams'

const ImportText = (props: { onOk: () => void }) => {
    const { type } = useParams() as { type: QuestionRouteType }
    const { onOk } = props

    const changeTextArea = (e: any) => {
        WordImportStore.updateTextValue(e.target.value)
    }

    const handleCancel = () => {
        if (WordImportStore.textValue) {
            Modal.confirm({
                centered: true,
                title: '取消后将直接返回试题列表，已填写的内容将不会保存，是否确定取消？',
                onOk: () => history.goBack(),
            })
        } else {
            history.goBack()
        }
    }

    return (
        <div className={styles.word_import_text}>
            <div className={styles.word_import_preview_title}>智能录入:</div>
            <Input.TextArea
                className={styles.textArea}
                value={WordImportStore.textValue}
                onChange={changeTextArea}
                placeholder={'请复制试题内容， 粘贴到此处'}
            />
            <div className={styles.word_import_text_footer}>
                <Button onClick={handleCancel}>取消</Button>
                <Button type="primary" onClick={onOk}>
                    完成并继续
                </Button>
            </div>
        </div>
    )
}

export default observer(ImportText)
