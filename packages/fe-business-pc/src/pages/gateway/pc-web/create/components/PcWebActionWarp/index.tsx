import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { getPageConfig, getPcSectionComponents } from '../Mytools/generatorFn'
import type { PreviewItem } from '../../../../components/utils/interface'
import { useLocalObservable } from 'mobx-react'
import { getViewStore } from '../../store'
import styles from './index.module.less'

enum STATE {
    /** 页面设置 */
    PAGE = 1,
    /** 组件从操作 */
    ACTION = 2,
}

function PcWebActionWarp() {
    const stores = useLocalObservable(() => getViewStore())
    const [actionState, setActionState] = useState(STATE.PAGE)
    useEffect(() => {
        if (stores.getNowActive()) {
            setActionState(STATE.ACTION)
        } else {
            setActionState(STATE.PAGE)
        }
    }, [stores.getNowActive()?.id])
    return (
        <div>
            <div className={styles.action_warp_title}>
                <div className={styles.action_warp_inner}>
                    <div
                        className={
                            actionState === STATE.PAGE ? styles.action_warp_inner_active : ''
                        }
                        onClick={() => {
                            setActionState(STATE.PAGE)
                        }}
                    >
                        页面设置
                    </div>
                    <div
                        className={
                            actionState === STATE.ACTION ? styles.action_warp_inner_active : ''
                        }
                        onClick={() => {
                            setActionState(STATE.ACTION)
                        }}
                    >
                        组件设置
                    </div>
                </div>
            </div>
            {actionState === STATE.PAGE
                ? getPageConfig()
                : getPcSectionComponents(stores.getNowActive() as PreviewItem)}
        </div>
    )
}

export default observer(PcWebActionWarp)
