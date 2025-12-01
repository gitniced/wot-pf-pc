import { ExclamationCircleFilled } from "@ant-design/icons";
import styles from './index.module.less'

// 审核状态
export enum APPROVE_STATUS_TYPE {
    // 待审核
    WAIT = 0,
    // 审核通过
    PASS = 1,
    // 审核不通过
    FAIL = 2,
}

// 审核状态
export const APPROVE_STATUS_OBJ: Record<number, any> = {
    [APPROVE_STATUS_TYPE.WAIT]: <><ExclamationCircleFilled className={styles.approve_icon} />审核中</>,
    [APPROVE_STATUS_TYPE.PASS]: '已认证',
    [APPROVE_STATUS_TYPE.FAIL]: '去认证',
}

// 实名认证结合审核的终极状态的的枚举
export enum AUDIT_STATUS_TYPE {
    // 待审核 
    WAIT = 0,
    // 已认证
    PASS = 1,
    // 未认证
    FAIL = 2,
}
