import React from 'react'
import type { ModalProps, IFormData } from './interface'
import type { FormInstance } from 'antd'
import api from './api'
import Http from '@/servers/http'

export default function () {
    const [codeImg, setCodeImg] = React.useState('')
    const [data, setData] = React.useState<IFormData>({
        code: '',
    })

    /**
     * 重置数据
     * @param form
     */
    const _resetData = (form: FormInstance) => {
        setData({
            ...data,
            code: '',
        })
        form.resetFields()
    }

    /**
     * 处理 获取 数字验证码
     * @param uniKey
     */
    const handleGetNumberCode = (uniKey: string) => {
        // setCodeImg(`${kingUrl}${api.numberCode}?key=${uniKey}`)
        Http(api.numberCode, 'get', { key: uniKey, seq: 1 }, { noMsg: true, responseType: 'blob' })
            .then(res => {
                let reader = new FileReader()
                reader.readAsDataURL(res)
                reader.onloadend = function () {
                    //输出结果
                    setCodeImg(reader.result)
                }
            })
            .catch(() => {})
    }

    /**
     * 处理 输入框内容更新
     * @param e
     */
    const handleChangeCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            code: e.target.value,
        })
    }

    /**
     * 处理 弹窗确认
     * @param form
     * @param props
     */
    const handleConfirmModal = (form: FormInstance, props: ModalProps) => {
        // 数字验证码 校验
        form.validateFields(['code'])
            .then(async () => {
                try {
                    await Http(api.verifyCode, 'post', {
                        key: props.uniKey,
                        seq: 1,
                        text: data.code,
                    })
                    props.onConfirm()
                    _resetData(form)
                } catch (error) {
                    console.log(error)
                }
            })
            .catch(() => {})
    }

    /**
     * 处理 弹窗取消
     * @param form
     */
    const handleCancelModal = (form: FormInstance) => {
        _resetData(form)
    }

    return {
        codeImg,
        data,
        handleGetNumberCode,
        handleChangeCodeInput,
        handleConfirmModal,
        handleCancelModal,
    }
}
