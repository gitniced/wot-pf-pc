import { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Space, Input, Button, Form, message } from 'antd'
import { useLocation } from 'umi'
import globalApi from '@/servers/globalApi'
import Http from '@/servers/http'
import { useLocalStore, observer } from 'mobx-react'
import ApplyStore from './store'

const { TextArea } = Input

const Index = () => {
    const [applyInfo, setApplyInfo] = useState('')
    const store = useLocalStore(() => new ApplyStore())

    const { query }: any = useLocation()
    const { inviteCode, applyName } = query || {}

    const submitApply = async (value: object) => {
        const resp = await store.saveConfirm({ ...value, code: inviteCode })
        message.success('申请成功')
        window.location.href = `${window.location.origin}/company/position-manage`
    }

    useEffect(() => {
        document.title = '校企合作申请'
        ;(async () => {
            const resp = await Http(
                globalApi.getUserInfo,
                'get',
                {},
                {
                    repeatFilter: false,
                },
            )

            const { name, nickname, mobile } = resp as unknown as {
                name: string
                nickname: string
                mobile: string
            }
            const value = name || nickname || mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
            setApplyInfo(value)
        })()
    }, [])

    useEffect(() => {
        if (inviteCode) {
            ;(async () => {
                const resp = await store.getInfo(inviteCode)
            })()
        }
    }, [inviteCode, applyName])

    return (
        <div className={styles.invite_apply_container}>
            <div className={styles.wrap}>
                <div className={styles.title}>校企合作申请</div>
                <div>申请合作的组织</div>
                <div className={styles.org}>
                    <Space>
                        <img src={store.orgInfo?.logo} />
                        <span>{store.orgInfo?.name}</span>
                    </Space>
                </div>
                <Form onFinish={submitApply}>
                    <div className={styles.apply_person}>
                        <Space>
                            <span>申请人:</span>
                            <span>{applyInfo}</span>
                        </Space>
                    </div>
                    <div className={styles.apply_reason}>
                        <div className={styles.label}>申请理由:</div>
                        <Form.Item noStyle name="remark">
                            <TextArea
                                style={{ width: '100%' }}
                                placeholder="请输入申请理由"
                                autoSize={{ minRows: 2, maxRows: 4 }}
                                showCount
                                maxLength={50}
                            />
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
