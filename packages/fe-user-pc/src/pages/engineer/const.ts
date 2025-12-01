/**
 * 工学登录身份
 */
export enum ENGINEER_LOGIN_IDENTITY {
    /**
     * 学生
     */
    student = '15',
    /**
     * 教师
     */
    teacher = '14',
}

export enum Role {
    User = '1', // 个人（学生和教师都是个人）
    Origin = '2', // 机构（工学一体登录专题页不使用）
}

export const ENGINEER_LOGIN_IDENTITY_LABEL = {
    [ENGINEER_LOGIN_IDENTITY.student]: '学生',
    [ENGINEER_LOGIN_IDENTITY.teacher]: '教师',
}

export const engineerLoginIdentityItems = [
    {
        key: ENGINEER_LOGIN_IDENTITY.student,
        label: `${ENGINEER_LOGIN_IDENTITY_LABEL[ENGINEER_LOGIN_IDENTITY.student]}登录`,
    },
    {
        key: ENGINEER_LOGIN_IDENTITY.teacher,
        label: `${ENGINEER_LOGIN_IDENTITY_LABEL[ENGINEER_LOGIN_IDENTITY.teacher]}登录`,
    },
]
