//  签到状态
export enum SignInStatus {
    NOT_START, // 签到还未开始
    ONGOING, // 签到进行中
    FINISHED, // 签到已经结束
}

//  签到状态说明文案
export const SignInStatusText: Record<number, string> = {
    [SignInStatus.NOT_START]: '签到尚未开始, 请耐心等待',
    [SignInStatus.ONGOING]:
        '考生尚未签到，请您即刻前往考场服务终端处完成签到！未完成签到不能开始考试',
    [SignInStatus.FINISHED]: '考生未按时完成签到, 本场考试视为缺考',
}
