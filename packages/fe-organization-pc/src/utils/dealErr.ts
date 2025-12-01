import { message } from 'antd'

/**
 *
 * @param errMsg string 错误信息
 * @param formRef any 表单ref
 */
const dealErrMsg = (errMsg: string, formRef: any) => {
    if (errMsg.includes(':')) {
        const fieldErrors = errMsg.split('/^wt~/')
        fieldErrors.map(errItem => {
            let errKey = errItem.substring(0, errItem.indexOf(':'))
            let currentErrMsg = errItem.substring(errItem.indexOf(':') + 1, errItem.length).trim()
            if (errKey) {
                formRef.setFields([{ name: errKey, errors: [currentErrMsg] }])
            }
        })
    } else {
        message.error(errMsg)
    }
}

export default dealErrMsg
