import type { IdentificationBoxProps } from './interface'
import styles from './index.module.less'
import { IDENTIFY_TYPE } from '../../const'

/** 识别状态 */
const IdentificationBox: React.FC<IdentificationBoxProps> = ({ signInStatus, signInName }) => {
    /** 识别状态对象 */
    const IdentificationObj: Record<IDENTIFY_TYPE, () => JSX.Element | null> = {
        [IDENTIFY_TYPE.WAIT]: () => null,
        [IDENTIFY_TYPE.START]: () => (
            <div className={`${styles.status} ${styles.status_error}`}>识别中</div>
        ),
        [IDENTIFY_TYPE.SUCCESS]: () => (
            <div className={`${styles.status} ${styles.status_success}`}>识别成功</div>
        ),
        [IDENTIFY_TYPE.ERROR]: () => (
            <div className={`${styles.status} ${styles.status_error}`}>识别失败</div>
        ),
    }

    return (
        <div
            className={[
                styles.mask,
                signInStatus === IDENTIFY_TYPE.SUCCESS ? styles.success_mask : '',
            ].join(' ')}
        >
            {signInStatus === IDENTIFY_TYPE.SUCCESS ? (
                <div className={styles.face_name}>{signInName}</div>
            ) : null}
            <div className={styles.face_mask} />
            {IdentificationObj[signInStatus]()}
        </div>
    )
}

export default IdentificationBox
