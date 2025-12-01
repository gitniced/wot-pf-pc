import React, { useState } from 'react'
import styles from './index.module.less'
import { GenerateModal } from '../GenerateModal'
import classNames from 'classnames'
import { observer, useLocalObservable } from 'mobx-react'
import { Store } from './store'
import { useDeepCompareEffect } from 'ahooks'

interface GenerateProps {
    /** 需要包含一剑生成的参数和生成历史的参数 */
    params?: any
    title?: string
    onOptionsClick?: (type: string) => Promise<void>
}

export default observer((props: GenerateProps) => {
    const { params, title, onOptionsClick } = props
    const store = useLocalObservable(() => new Store())
    const { historyList, isGenerating } = store

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    useDeepCompareEffect(() => {
        store.setParams(params)
        store.getListSession()
    }, [params])

    return (
        <>
            <div className={styles.record} onClick={handleOpen}>
                生成记录({historyList.length})
            </div>
            <div
                className={classNames(styles.one_click_ai, {
                    [styles.one_click_ai_disabled]: isGenerating,
                })}
                onClick={() => {
                    store.generate(() => setOpen(true))
                }}
            >
                <img src="https://static.zpimg.cn/public/fe-engineer-pc/images/button_ai_small.png" />
                {!isGenerating ? '一键生成' : '生成中，请稍候...'}
            </div>
            {open && (
                <GenerateModal
                    getHistory={store.getListSession}
                    title={title}
                    params={params}
                    historyList={historyList}
                    onCancel={() => setOpen(false)}
                    onOptionsClick={(...args) => {
                        onOptionsClick?.(...args)
                        setOpen(false)
                    }}
                    sseData={store.customGeneratedData}
                    open
                />
            )}
        </>
    )
})
