// 收卷弹窗

import { Button, Form, Input, Space, message } from 'antd'
import { useLocalObservable } from 'mobx-react-lite'
import { forwardRef, useImperativeHandle, useState } from 'react'

import InvigilateStore from '../store'
import { getLocalStorage } from '@/storage'

import { Regs } from '@/utils/regExp'
import useUserStore from '@/hooks/useUserStore'
import type { Timeout } from 'ahooks/lib/useRequest/src/types'

interface WindingModalProps {
    examCode: string
}

const WindingModal = forwardRef(({ examCode }: WindingModalProps, ref) => {
    const userStore = useUserStore()

    const [form] = Form.useForm()

    const store = useLocalObservable(() => InvigilateStore)

    const [active, setActive] = useState<Timeout | undefined>()
    // 倒计时
    const [time, setTime] = useState<number>(60)
    // 计时
    const [showCode, setShowCode] = useState<boolean>(false)

    useImperativeHandle(ref, () => {
        return {
            onValidate: form.validateFields,
            onResetFields: () => {
                form.resetFields()
                setTime(60)
                setShowCode(false)
                clearInterval(active)
                setActive(undefined)
            },
        }
    })

    // 发送验证码
    const handleSendCode = async () => {
        const fields = await form.validateFields(['account'])

        // 随机生成key
        store.getRandomKey()

        store
            .sendForcedSms({
                ...fields,
                type: 0,
                examCode,
                key: store.randomKey,
                sid: getLocalStorage('SID'),
                userCode: userStore?.userData.code,
            })
            .then(() => {
                setShowCode(true)

                const _active = setInterval(() => {
                    setTime(preSecond => {
                        if (preSecond <= 1) {
                            setShowCode(false)
                            clearInterval(active)
                            setActive(undefined)
                            // 重置秒数
                            return 60
                        }

                        return preSecond - 1
                    })
                }, 1000)

                setActive(_active)

                message.success('验证码发送成功')
            })
    }

    return (
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item
                label="巡考人员手机号"
                name="account"
                rules={[
                    {
                        required: true,
                        message: '请输入巡考人员手机号',
                    },
                    () => ({
                        async validator(_, value: string) {
                            if (value && !Regs.PHONE.test(value)) {
                                return Promise.reject(new Error('请输入正确的手机号码'))
                            }
                            return Promise.resolve()
                        },
                    }),
                ]}
            >
                <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="验证码" required style={{ marginBottom: 0 }}>
                <Space size={8}>
                    <Form.Item
                        noStyle
                        name="verifyCode"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>
                    {!showCode ? (
                        <Button type="primary" onClick={handleSendCode}>
                            发送验证码
                        </Button>
                    ) : (
                        <Button type="primary">{time}秒后重新发送</Button>
                    )}
                </Space>
            </Form.Item>
        </Form>
    )
})

export default WindingModal
