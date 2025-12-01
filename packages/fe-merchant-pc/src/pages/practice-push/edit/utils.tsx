import styles from './index.module.less'
import { SuperTimePicker } from '../components/UsageTimeLimitModal'
import MoreSelect from '@/components/MoreSelect'
import { Button, Empty, Modal, message } from 'antd'
import { history } from 'umi'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import type Store from './store'
import { getCookie } from '@/storage'

interface IPushEditFooterProps {
    onFinish: () => void
    btnLoading: boolean
    form: any
    initFormData: string
}

export const formItemConfig = (code: string) => {
    return [
        {
            name: 'sids',
            label: '站点',
            rules: [
                {
                    required: true,
                    message: '请选择',
                },
            ],
            render: () => (
                <MoreSelect
                    all={false}
                    placeholder="请选择"
                    valueKey={'id'}
                    requestUrl={'/auth/backend/site/name_page'}
                    allowClear={true}
                    mode={!code && ('multiple' as any)}
                    selectProps={{
                        disabled: code ? true : false,
                        notFoundContent: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
                    }}
                />
            ),
        },
        {
            name: 'practiceCodes',
            label: '练习',
            rules: [
                {
                    required: true,
                    message: '请选择',
                },
            ],
            render: () => (
                <MoreSelect
                    all={false}
                    placeholder="请选择"
                    valueKey={'code'}
                    requestUrl={'/question/front/practice/page_merchant'}
                    allowClear={true}
                    nameKey={'title'}
                    mode={!code && ('multiple' as any)}
                    selectProps={{
                        disabled: code ? true : false,
                        notFoundContent: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
                    }}
                    requestParams={{
                        organizationCode: getCookie('SELECT_ORG_CODE'),
                        publishStatus: 1,
                        publishOtherStatus: 0,
                    }}
                    searchKey="titleLike"
                />
            ),
        },
        {
            name: 'time',
            label: '使用时效',
            className: styles.time_of_use,
            render: () => <SuperTimePicker />,
        },
    ]
}

export function PushEditFooter(props: IPushEditFooterProps) {
    const { onFinish, btnLoading, form, initFormData } = props

    return (
        <div className={styles.footer_btn}>
            <Button
                className={styles.btn}
                onClick={() => {
                    let newFormData = JSON.stringify(form.getFieldsValue())

                    if (newFormData === initFormData) {
                        history.goBack()
                    } else {
                        Modal.confirm({
                            type: 'confirm',
                            content: '修改后将不会保留已编辑的内容，是否确定修改？',
                            icon: <ExclamationCircleOutlined />,
                            okText: '确认',
                            cancelText: '取消',
                            onOk: () => {
                                history.goBack()
                            },
                        })
                    }
                }}
            >
                取消
            </Button>
            <Button
                type="primary"
                className={styles.submit}
                loading={btnLoading}
                onClick={onFinish}
            >
                推送
            </Button>
        </div>
    )
}

/**  新建推送  */
export async function addPush(value: any, store: Store, setBtnLoading: any) {
    let { time = [] } = value || {}
    if (time[0]) {
        value.startTime = +dayjs(time[0]).startOf('day').format('x')
    }
    if (time[1]) {
        value.endTime = +dayjs(time[1]).endOf('day').format('x')
    }

    let pushResult = await store.CreatePush(value)
    setBtnLoading(false)

    let sidsLen = value.sids?.length || 0
    let practiceCodesLen = value.practiceCodes?.length || 0
    let len = sidsLen * practiceCodesLen

    let flag = len - Number(pushResult)

    if (flag > 0) {
        Modal.warning({
            content: <div>{`成功推送${pushResult}个练习，存在${flag}个练习未发布无法推送`}</div>,
            onOk() {
                history.goBack()
            },
            okText: '知道了',
        })
    } else {
        message.success('新建成功')
        history.goBack()
    }
}

/**  重新推送  */
export async function editPush(value: any, store: Store, setBtnLoading: any) {
    let { time = [] } = value || {}
    if (time[0]) {
        value.startTime = +dayjs(time[0]).startOf('day').format('x')
    }
    if (time[1]) {
        value.endTime = +dayjs(time[1]).endOf('day').format('x')
    }
    value.sid = value.sids?.value || undefined
    value.practiceCode = value.practiceCodes?.value || undefined
    delete value.sids
    delete value.practiceCodes

    await store.EditPush(value)
    setBtnLoading(false)
    message.success('操作成功')
    history.goBack()
}
