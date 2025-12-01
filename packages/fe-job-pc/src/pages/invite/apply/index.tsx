import { useEffect } from 'react'
import styles from './index.module.less'
import { Space, Input, Button, Form } from 'antd'
import { useLocation } from 'umi'
import { useLocalStore, observer } from 'mobx-react'
import ApplyStore from './store'

const { TextArea } = Input

const Index = () => {
    const store = useLocalStore(() => new ApplyStore())

    const { query }: any = useLocation()
    const { code } = query || {}

    const submitApply = async (value: object) => {
        const _resp = await store.saveConfirm(value)
    }

    useEffect(() => {
        if (code) {
            ;(async () => {
                const _resp = await store.getInfo(code)
            })()
        }
    }, [code])

    return (
        <div className={styles.invite_apply_container}>
            <div className={styles.wrap}>
                <div className={styles.title}>校企合作申请</div>
                <div>合作的组织</div>
                <Form onFinish={submitApply}>
                    <div className={styles.apply_person}>
                        <Space>
                            <span>申请人:</span>
                            <span>{store.applyInfo.applyUserName}</span>
                        </Space>
                    </div>
                    <div className={styles.apply_reason}>
                        <div className={styles.label}>申请理由:</div>
                        <Form.Item noStyle name="remark">
                            <TextArea maxLength={300} />
                        </Form.Item>
                    </div>
                    <div className={styles.submit_apply}>
                        <Button htmlType="submit" type="primary">
                            确认申请
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default observer(Index)
