import { Form } from 'antd'
import styles from './index.module.less'
import { PushEditFooter, addPush, editPush, formItemConfig } from './utils'
import { useEffect, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import type { IRoute } from 'umi'
import { history } from 'umi'
import dayjs from 'dayjs'
import Breadcrumbs from '@/components/Breadcrumbs'

/**   新建推送  重新推送 */
const PracticeEdit = () => {
    const store = useLocalObservable(() => new Store())
    const { code = '' } = history.location.query || {}

    useEffect(() => {
        document.title = code ? '重新推送' : '新建推送'
    }, [])

    const [form] = Form.useForm()
    const [btnLoading, setBtnLoading] = useState(false)

    useEffect(() => {
        store.getInitFormData(JSON.stringify(form.getFieldsValue()))

        if (code) {
            store.getPushDetail(code).then((res: any) => {
                let sids = {
                    label: res?.sidName || '',
                    value: res.sid || '',
                }
                let practiceCodes = {
                    label: res?.practiceTitle || '',
                    value: res.practiceCode || '',
                }
                let time = [
                    res?.startTime ? dayjs(res?.startTime) : null,
                    res?.endTime ? dayjs(res?.endTime) : null,
                ]

                form.setFieldsValue({
                    sids: sids,
                    practiceCodes: practiceCodes,
                    time,
                })
            })
        }
    }, [])

    const onFinish = async () => {
        setBtnLoading(true)

        try {
            let value = await form.validateFields()

            if (code) {
                await editPush(value, store, setBtnLoading)
            } else {
                await addPush(value, store, setBtnLoading)
            }
        } catch (error) {
            setBtnLoading(false)
        }
    }

    return (
        <div className={styles.page_practice_push_edit_box}>
            <Breadcrumbs
                crumbData={[
                    { link: '/practice-push', name: '练习推送' },
                    { link: '', name: code ? '编辑' : '新建' },
                ]}
            />
            <div className={styles.page_practice_push_edit}>
                <Form
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                    validateTrigger="onBlur"
                >
                    {formItemConfig(code as any).map(item => (
                        <Form.Item
                            key={item.name}
                            name={item.name}
                            label={item.label}
                            className={item.className}
                            rules={item.rules}
                        >
                            {item.render()}
                        </Form.Item>
                    ))}
                </Form>
                <PushEditFooter
                    onFinish={onFinish}
                    btnLoading={btnLoading}
                    form={form}
                    initFormData={store.initFormData}
                />
            </div>
        </div>
    )
}

const OverdueObserverPage: IRoute = observer(PracticeEdit)
OverdueObserverPage.title = '推送'
export default OverdueObserverPage
