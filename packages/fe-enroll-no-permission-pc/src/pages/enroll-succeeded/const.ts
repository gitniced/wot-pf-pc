export enum EnrollStatus {
    SUCCESS, // 成功
    SUBMITTED, // 已经提交
}

export const enrollStatusData = {
    [EnrollStatus.SUCCESS]: {
        title: '报名成功',
        info: '恭喜您报名成功',
    },
    [EnrollStatus.SUBMITTED]: {
        title: '报名已提交',
        info: '您的报名已提交，待机构审核，可在“我的报名”中查看审核结果',
    },
}

//  活动状态，1未开始、2报名中、3已结束
export enum ACTIVITY_STATUS {
    NOT_START = 1,
    ENROLLING = 2,
    END = 3,
}
