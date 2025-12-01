

enum RULES {
    CHINESE = '^[\u4e00-\u9fa5]+$',
    NOSPECIAL = '^[A-Za-z0-9\u4e00-\u9fa5]+$',
    MOBILE = '^1\\d{10}$',
    // eslint-disable-next-line no-useless-escape
    PASSWORD = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-=\\\\[\\];,.`'\/~!@#$%^&*()_+|{}:?<>]).{8,20}$",
    IP = '^(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])$',
    COLOR = '^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$',
    // eslint-disable-next-line no-useless-escape
    IDCARD = "^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$"
}

type ValidateRuleProps = {
    max?: number | undefined
    message: string
    noEmpty?: boolean | undefined
    noEmptyMessage?: string | undefined
    rule: keyof typeof RULES
}

/**
 * 公共校验规则
 * @param max 最大长度 非必选
 * @param message 校验失败返回文案 必选
 * @param noEmpty 必填校验 非必选
 * @param noEmptyMessage 必填校验文案 非必选
 * @param rule 校验类型 必选
 */
const validateRule = (props: ValidateRuleProps) => {
    const { max, message, noEmpty = false, noEmptyMessage = '不能为空', rule } = props
    return {
        validator: (_: any, value: any) => {
            const reg = new RegExp(RULES[rule])
            
            if (value) {
                if (!reg.test(value)) {
                    return Promise.reject(new Error(message))
                } else {
                    if (max) {
                        if (value.length > max) {
                            return Promise.reject(new Error(`最多只能输入${max}个字符`))
                        } else {
                            return Promise.resolve()
                        }
                    } else {
                        return Promise.resolve()
                    }
                }
            } else {
                if (noEmpty) {
                    return Promise.reject(new Error(noEmptyMessage))
                } else {
                    return Promise.resolve()
                }
            }
        },
    }
}


export default validateRule
