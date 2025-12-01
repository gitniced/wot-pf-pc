import { DatePicker } from '@/components/Picker'
import { getCookie } from '@/storage'
import wrapper from '@/utils/wrapper'
import { Form, Modal, Space, Typography } from 'antd'
import dayjs from 'dayjs'
import { observer } from 'mobx-react'
import Http from '@/servers/http'
import { useEffect } from 'react'
import { SuperProvider } from '@wotu/wotu-components'
import { omit } from 'lodash'

interface IUsageTimeLimitModalProps {
    closeDialog: () => void
    visible: boolean
    startTime: number
    endTime: number
    sid: number
    practiceCode: string
    actionRef: any
}

interface ISuperTimePickerProps {
    value?: number[]
    onChange?: (value: any[]) => void
}

export const SuperTimePicker = (props: ISuperTimePickerProps) => {
    const { value = [null, null], onChange } = props
    return (
        <Space>
            <DatePicker
                value={value?.[0] ? dayjs(value?.[0]) : undefined}
                onChange={e => {
                    onChange?.([e, value?.[1]])
                }}
            />
            <Typography>至</Typography>
            <DatePicker
                value={value?.[1] ? dayjs(value?.[1]) : undefined}
                onChange={e => {
                    onChange?.([value?.[0], e])
                }}
            />
        </Space>
    )
}

/** 修改使用时效 重新推送   */
const RePushRequest = async (value: any) => {
    let { time = [] } = value || {}
    const [startTime, endTime] = time
    value.startTime = startTime ? +dayjs(time[0]).startOf('day').format('x') : 0
    value.endTime = endTime ? +dayjs(time[1]).endOf('day').format('x') : 0

    const _value = omit(value, ['time'])
    const organizationCode = getCookie('SELECT_ORG_CODE')

    await Http(
        '/question/front/practice/republish_other',
        'post',
        { ..._value, organizationCode },
        { repeatFilter: false },
    )
}

/**  修改使用时效 modal   */
const UsageTimeLimitModal: React.FC<IUsageTimeLimitModalProps> = props => {
    const { closeDialog, visible, startTime, endTime, sid, practiceCode, actionRef } = props
    const [form] = Form.useForm()

    const onUsageTimeLimitModalOk = async () => {
        let res = await form.validateFields()
        await RePushRequest({ ...res, sid, practiceCode })
        actionRef.current?.reload()
        closeDialog()
    }

    useEffect(() => {
        form.setFieldsValue({
            time: [startTime ? dayjs(startTime) : null, endTime ? dayjs(endTime) : null],
        })
    }, [visible])

    return (
        <SuperProvider value={{ prefixCls: 'merchant-center' }}>
            <Modal
                open={visible}
                title="修改使用时效"
                onOk={onUsageTimeLimitModalOk}
                onCancel={closeDialog}
                centered
            >
                <Form form={form} labelCol={{ span: 5 }}>
                    <Form.Item label="使用时效" name="time">
                        <SuperTimePicker />
                    </Form.Item>
                </Form>
            </Modal>
        </SuperProvider>
    )
}

export default wrapper(observer(UsageTimeLimitModal))
