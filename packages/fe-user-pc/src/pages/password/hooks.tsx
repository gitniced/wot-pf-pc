import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import api from './api'
import { message, Modal } from 'antd'
import { getPublicKey, SM2_ERROR_CODE } from '@/utils/getPublicKey'
import { sm2Encrypt } from '@wotu/wotu-components'
import { history } from 'umi'
import { ExclamationCircleFilled } from '@ant-design/icons'

export default class baseHooks {
    constructor() {
        makeAutoObservable(this)
    }
    /**
     * 修改密码
     *
     * @param {*} value
     * @param {*} form
     * @param {() => void} callback
     * @param {boolean} [skipSm2] 是否使用明文登录
     * @memberof baseHooks
     */
    fixPassword = async (value: any, form: any, callback: () => void, skipSm2?: boolean) => {

        // 获取公钥，对用户输入的密码加密 避免明文传输
        let passwordObj = {
            oldPassword: value.oldPassword,
            password: value.password,
            passwordRepeat: value.passwordRepeat
        }
        let sm2Result = skipSm2 ? passwordObj : await sm2Encrypt?.(getPublicKey, passwordObj)

        return Http(api.fixPassword, 'post', { ...value, ...sm2Result }, { form: true })
            .then(res => {
                const { success, messageCode } = res || {}
                const getFieldErrors = () => {
                    const fieldErrors = res.message?.split?.('/^wt~/')
                    if (Array.isArray(fieldErrors)) {
                        fieldErrors.map(errItem => {
                            let errKey = errItem.substr(0, errItem.indexOf(':'))
                            let errMsg = errItem
                                .substr(errItem.indexOf(':') + 1, errItem.length)
                                .trim()
                            if (errKey) {
                                form.setFields([{ name: errKey, errors: [errMsg] }])
                            }
                        })
                    }
                }

                if (!success) {
                    switch (messageCode) {
                        case '0013':
                            message.error(res.message)
                            break;
                        case 'NO_BIND_MOBILE':
                            Modal.confirm({
                                content: '您还未绑定手机，请先绑定手机再修改密码。',
                                icon: <ExclamationCircleFilled />,
                                onOk: () => {
                                    history.push('/bind/phone?type=create')
                                },
                            })
                            break
                        case SM2_ERROR_CODE:
                            // 加密错误 使用明文登录
                            !skipSm2 ? this.fixPassword(value, form, callback, true) : getFieldErrors()
                            break;
                        default:
                            getFieldErrors()
                            break;
                    }

                } else {
                    form.resetFields()
                    callback()
                    message.success('修改成功')
                }
            })
            .catch(() => { })
    }
}
