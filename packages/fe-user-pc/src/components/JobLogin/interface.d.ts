import type { CURRENT_LOGIN_URL_TYPE_ENUM } from "@/types"
import type { MERCHANT_LOGIN_TYPE } from "@wotu/wotu-components/dist/esm/Types"

export interface JobComponentProps {
    // 身份
    sourceType?: CURRENT_LOGIN_URL_TYPE_ENUM.SCHOOL | MERCHANT_LOGIN_TYPE.COMPANY
}

export interface LoginFormProps {
    // 身份
    sourceType: CURRENT_LOGIN_URL_TYPE_ENUM | MERCHANT_LOGIN_TYPE
    // 登陆的方法
    loginHandler: (form: any, formRef: any) => void
    // 登录按钮的loading状态
    btnLoading: boolean
}
