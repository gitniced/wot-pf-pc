import { Button, Form, Input } from 'antd'
import styles from './index.module.less'
import type { SeatProps } from './interface'

const Seat: React.FC<SeatProps> = (props: SeatProps) => {
    const { nextHandler } = props
    const [form] = Form.useForm()
    return (
        <div className={styles.page}>
            <div className={styles.title}>座位号</div>
            <Form
                form={form}
                layout="vertical"
                name="seat_form"
                className={styles.form}
                onFinish={() => {
                    const params = form.getFieldsValue()
                    nextHandler(params)
                }}
            >
                <Form.Item
                    name="seat"
                    rules={[
                        { required: true, message: '请输入本机座位号' },
                        { max: 5, message: '座位号最多只有五位' },
                    ]}
                >
                    <Input className={styles.input} placeholder="请输入本机座位号" />
                </Form.Item>
                <Form.Item noStyle>
                    <Button type={'primary'} htmlType="submit" className={styles.submit}>
                        确定
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Seat
