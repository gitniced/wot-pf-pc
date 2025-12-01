import styles from './index.modules.less'

export const IDCARD = 1
export const PASSPORT = 2
export const OTHER = 3

/**签到类型 */
export const SIGN_IN = 1
/**签退类型 */
export const SIGN_OUT = 2

/**未打卡 */
export const UN_SIGN = 0
/**已打卡 */
export const SIGN_ED = 1
/**外勤 */
export const SIGN_OVER_ED = 2

/**人脸识别未通过 */
export const FACE_PASS_FAIL = 0
/**人脸识别通过 */
export const FACE_PASS_SUCCESS = 1

/**自动打卡方式 */
export const AUTO = 1
/**手动打卡方式 */
export const CUSTOM = 2
/**  补卡  */
export const REPLACE = 4

/**签到状态枚举 */
export const SIGN_IN_STATUS_TEXT_MAP = {
    [UN_SIGN]: '未签到',
    [SIGN_ED]: '已签到',
    [SIGN_OVER_ED]: '外勤',
}

/**签退状态枚举 */
export const SIGN_OUT_STATUS_TEXT_MAP = {
    [UN_SIGN]: '未签退',
    [SIGN_ED]: '已签退',
    [SIGN_OVER_ED]: '外勤',
}

/**证件类型枚举 */
export const CERTIFICATE_TYPE_TEXT_MAP = {
    [IDCARD]: '居民身份证',
    [PASSPORT]: '护照',
    [OTHER]: '其他',
}

/**人脸识别状态枚举 */
export const FACE_PASS_TEXT_MAP = {
    [FACE_PASS_FAIL]: '未通过',
    [FACE_PASS_SUCCESS]: '通过',
}

/**打卡方式类型枚举 */
export const CHECK_TYPE_TEXT_MAP = {
    [AUTO]: '手动',
    [CUSTOM]: '自动',
    [REPLACE]: '补卡',
}

export const getClassName: Record<string, string> = {
    [AUTO]: styles.sign_normal_tag,
    [CUSTOM]: styles.sign_warring_tag,
    [REPLACE]: styles.sign_blue_tag,
}
