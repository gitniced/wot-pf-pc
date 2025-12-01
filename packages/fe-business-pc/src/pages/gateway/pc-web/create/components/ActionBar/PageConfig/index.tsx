import type { ChangeEvent } from 'react'
import React from 'react'
import MiniHeader from '@/pages/gateway/components/MiniHeader'
import styles from './index.module.less'
import { getViewStore } from '../../../store'
import { useLocalObservable } from 'mobx-react'
import { CustomColorPicker } from '@wotu/wotu-pro-components'
import { Input } from 'antd'

function PageConfig() {
    const webStore = useLocalObservable(() => getViewStore())

    const inputChange = (e: ChangeEvent) => {
        const {
            //@ts-ignore
            target: { value },
        } = e
        webStore.updatePageTitle(value)
    }

    const colorChange = (e: any) => {
        webStore.updatePageColor(e)
    }
    return (
        <div className={styles.custom_page}>
            <MiniHeader title="页面设置" />

            <div className={styles.page_config}>
                <div className={styles.form_title}>页面标题:</div>
                <Input
                    placeholder="请输入页面标题"
                    className={styles.form_input}
                    maxLength={15}
                    value={webStore.pageTitle}
                    onChange={inputChange}
                />

                <div className={[styles.form_title, styles.margin].join(' ')}>页面背景颜色:</div>

                <CustomColorPicker value={webStore.pageColor} onChange={colorChange} />
            </div>
        </div>
    )
}

export default PageConfig
