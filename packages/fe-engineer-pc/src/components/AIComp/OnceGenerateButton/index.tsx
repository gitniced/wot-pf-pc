import React from 'react'
import styles from './index.module.less'
import classNames from 'classnames'
import { observer, useLocalObservable } from 'mobx-react'
import { Store } from './store'
import { isFunction } from 'lodash'

interface OnceGenerateButoonProps {
    url: string
    params?: Record<string, string> | (() => any)
    onStart?: () => void
    onFinish?: (data: any) => void
    onFinally?: () => void
    generateText?: string
    className?: any
    type?: 'normal' | 'link'
    disabled?: boolean
}
export const OnceGenerateButoon = observer(
    ({
        url,
        params,
        onStart,
        onFinish,
        onFinally,
        generateText = '一键生成',
        className,
        type,
        disabled = false,
    }: OnceGenerateButoonProps) => {
        const store = useLocalObservable(() => new Store())
        const { isGenerating, customGenerate } = store

        const isDisabled = isGenerating || disabled

        return (
            <div
                className={classNames(styles.one_click_ai, {
                    [styles.one_click_ai_disabled]: isDisabled,
                    [className || '']: !!className,
                    [styles.link]: type === 'link',
                })}
                onClick={() => {
                    if (isDisabled) return
                    customGenerate(
                        url,
                        isFunction(params) ? params() : params,
                        onStart,
                        onFinish,
                        onFinally,
                    )
                }}
            >
                <img src="https://static.zpimg.cn/public/fe-engineer-pc/images/button_ai_small.png" />
                {!isGenerating ? generateText : '生成中，请稍候...'}
            </div>
        )
    },
)
