import { observer, useLocalObservable } from 'mobx-react'
import { getViewStore } from './../../../store'
import type { PreviewItem } from '../../../../../components/utils/interface'
import styles from './index.module.less'
import SetMicroComponentStyle from '@/pages/gateway/components/SetMicroComponentStyle'

function Class(props: { data: PreviewItem }) {
    // 获取全局唯一的store
    const stores = useLocalObservable(() => getViewStore())
    const { data } = props

    return (
        <div className={styles.page}>
            <div className={styles.title}>
                <span>班级</span>
                <span className={styles.tips}>默认展示学员已加入的班级</span>
            </div>
            <SetMicroComponentStyle
                styleData={data}
                onStyleChange={stores.fixPreviewList as any}
                mode="pc"
            />
        </div>
    )
}

export default observer(Class)
