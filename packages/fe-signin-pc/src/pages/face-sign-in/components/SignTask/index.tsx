import { Popover } from 'antd'
import type { SignTaskProps } from './interface'
import styles from './index.module.less'
import dayjs from 'dayjs'
// import type { SIGN_TYPE } from '../../const'

/** 头部任务名称 */
const SignTask: React.FC<SignTaskProps> = ({
    // showSignTypeToggle,
    // signType,
    taskRule,
    SearchDom,
}) => {
    const {
        /**规则 */
        rule,
        /**签到最后面时间 */
        signInEndTime,
        /**签到最前面时间 */
        signInStartTime,
        /**签退最后面时间 */
        signOutEndTime,
        /**签退最前面时间 */
        signOutStartTime,
    } = taskRule

    // const {
    //     /**是否需要签到 0否 1是 */
    //     signStart,
    //     /**是否需要签退 0否 1是 */
    //     signEnd,
    // } = rule || {}

    /** 返回 */
    const goBack = () => {
        history.go(-1)
    }

    const getRuleItemVisible = (signType: 'signStart' | 'signEnd') => {
        const vis = rule?.[signType]?.toString?.() === '1'
        return vis
    }

    const getRuleDom = () => {
        return (
            <>
                {getRuleItemVisible('signStart') ? (
                    <div className={styles.rule_item}>
                        <span>{`签到时间范围：${dayjs(signInStartTime).format(
                            'YYYY-MM-DD HH:mm',
                        )}-${dayjs(signInEndTime).format('YYYY-MM-DD HH:mm')}`}</span>
                        {/* <span className={styles.rule_item_btn}>查看规则</span> */}
                    </div>
                ) : null}
                {getRuleItemVisible('signEnd') ? (
                    <div className={styles.rule_item}>
                        <span>{`签退时间范围：${dayjs(signOutStartTime).format(
                            'YYYY-MM-DD HH:mm',
                        )}-${dayjs(signOutEndTime).format('YYYY-MM-DD HH:mm')}`}</span>
                        {/* <span className={styles.rule_item_btn}>查看规则</span> */}
                    </div>
                ) : null}
            </>
        )
    }

    return (
        <div className={styles.sign_task}>
            <span className={styles.subject_box}>{taskRule?.title}</span>

            <Popover
                placement="bottomLeft"
                title={null}
                content={getRuleDom()}
                arrowPointAtCenter={true}
            >
                <svg className={['icon', styles.rule_btn].join(' ')} aria-hidden="true">
                    <use xlinkHref="#Info--Circle-Fill" />
                </svg>
            </Popover>
            <div className={styles.search}>{SearchDom}</div>
            <div className={styles.btn_box}>
                <div className={styles.back_btn} onClick={goBack}>
                    返回
                </div>
            </div>
        </div>
    )
}

export default SignTask
