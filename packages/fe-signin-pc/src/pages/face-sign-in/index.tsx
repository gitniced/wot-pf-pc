import styles from './index.module.less'
import { observer, useLocalStore } from 'mobx-react'
import type { IRoute } from 'umi'
import useHook from './store'
import { useEffect } from 'react'

import CandidateList from './components/CandidateList'
import SignTask from './components/SignTask'
import FaceRecognition from './components/FaceRecognition'
import { SIGN_TYPE } from './const'

const Index: React.FC = () => {
    const Hooks = useLocalStore(() => new useHook())

    const init = async () => {
        document.title = '签到'
        Hooks.setSignStatus('')
        await Hooks.getTabCounts()
        await Hooks.getTaskSignTable()
    }

    useEffect(() => {
        Hooks.getTaskRule()
    }, [])

    useEffect(() => {
        if (Hooks.signType) {
            init()
        }
    }, [Hooks.signType])

    return (
        <div className={styles.face_sign_in}>
            <div className={styles.left}>
                <div className={styles.top}>
                    <div className={styles.text}>名单</div>

                    <div
                        className={[
                            styles.sign_tab,
                            Hooks.showSignTypeToggle ? '' : styles.hide_tab,
                        ].join(' ')}
                    >
                        <div
                            className={[
                                styles.sign_tab_item,
                                Hooks.signType === SIGN_TYPE.SIGN_IN ? styles.active : '',
                            ].join(' ')}
                            onClick={() => {
                                Hooks.toggleSignType(1)
                                Hooks.setSignStatus('')
                            }}
                        >
                            签到
                        </div>
                        <div
                            className={[
                                styles.sign_tab_item,
                                Hooks.signType === SIGN_TYPE.SIGN_OUT ? styles.active : '',
                            ].join(' ')}
                            onClick={() => {
                                Hooks.toggleSignType(2)
                                Hooks.setSignStatus('')
                            }}
                        >
                            签退
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <CandidateList myHooks={Hooks} />
                </div>
            </div>
            <div className={styles.right}>
                <SignTask
                    showSignTypeToggle={Hooks.showSignTypeToggle}
                    signType={Hooks.signType!}
                    taskRule={Hooks.taskRule}
                />
                <FaceRecognition
                    signType={Hooks.signType!}
                    signTimeType={Hooks.signTimeType}
                    taskRule={Hooks.taskRule}
                    signStore={Hooks}
                    // refreshTable={Hooks.}
                />
            </div>
        </div>
    )
}

const Page: IRoute = observer(Index)

export default Page
