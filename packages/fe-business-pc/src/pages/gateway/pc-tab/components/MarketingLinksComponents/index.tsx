import GlobalUpload from '@/components/GlobalUpload'
import styles from './index.module.less'
import { PlusOutlined } from '@ant-design/icons'
import { Checkbox, Form, Input } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { observer } from 'mobx-react'
import type store from '../../store'

interface IMarketingLinksComponentsProps {
    store: store
}

/**  营销链接  */
const MarketingLinksComponent: React.FC<IMarketingLinksComponentsProps> = ({ store }) => {
    const options = [
        {
            label: '移动端',
            value: 'mobile',
            extra: '建议尺寸1:1，小于10M，支持jpg、jpeg、png格式',
            components: (
                <Form.Item name="mobile">
                    <GlobalUpload
                        onChange={event => {
                            const e = event || []
                            // 有数据表示所有状态都已完成
                            if (e[0]?.status === 'done' && e[0]?.response?.url) {
                                store?.upDataMarketingLinksList('mobile', e[0]?.response?.url)
                            }
                            // 数组是空的 就表示删除了
                            if (!e?.length) {
                                store?.upDataMarketingLinksList('mobile', '')
                            }
                        }}
                        amount={1}
                        otherProps={{
                            listType: 'picture-card',
                        }}
                        drag={false}
                        size={1}
                        type={11}
                        accept={'image'}
                        className={styles.mark_upload}
                    >
                        <div
                            className={styles.mark_upload_placeholder}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <PlusOutlined />
                            上传二维码
                        </div>
                    </GlobalUpload>
                </Form.Item>
            ),
        },
        {
            label: '微信公众号',
            value: 'weChat',
            extra: '建议尺寸1:1，小于10M，支持jpg、jpeg、png格式',
            components: (
                <Form.Item name="weChat">
                    <GlobalUpload
                        onChange={event => {
                            const e = event || []
                            // 有数据表示所有状态都已完成
                            if (e[0]?.status === 'done' && e[0]?.response?.url) {
                                store?.upDataMarketingLinksList('weChat', e[0]?.response?.url)
                            }
                            // 数组是空的 就表示删除了
                            if (!e?.length) {
                                store?.upDataMarketingLinksList('weChat', '')
                            }
                        }}
                        amount={1}
                        otherProps={{
                            listType: 'picture-card',
                        }}
                        drag={false}
                        size={10}
                        type={11}
                        accept={'image'}
                        className={styles.mark_upload}
                    >
                        <div
                            className={styles.mark_upload_placeholder}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <PlusOutlined />
                            上传二维码
                        </div>
                    </GlobalUpload>
                </Form.Item>
            ),
        },
        {
            label: '官方微博',
            value: 'weibo',
            components: (
                <Form.Item
                    name="weibo"
                    rules={[
                        {
                            pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                            message: '请输入正确的链接地址',
                        },
                    ]}
                >
                    <Input
                        style={{ width: '480px', marginTop: '12px', marginLeft: '16px' }}
                        onChange={e => store?.upDataMarketingLinksList('weibo', e.target.value)}
                        placeholder="请输入"
                    />
                </Form.Item>
            ),
        },
    ]

    const onChange = (checkedValues: CheckboxValueType[]) => {
        // store.upDataMarketingLinksList('checkbox', checkedValues)
        store?.upDataMarketingLinksList('checkbox', checkedValues)
    }

    return (
        <div className={styles.marketing_links_component}>
            <Form.Item name="checkbox">
                <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                    {options?.map(i => {
                        return (
                            <div key={i.value}>
                                <Checkbox value={i.value} />
                                &nbsp;
                                {i.label}
                                <br />
                                {i.components}
                                <div className={styles.extra}>{i?.extra}</div>
                            </div>
                        )
                    })}
                </Checkbox.Group>
            </Form.Item>
        </div>
    )
}

export default observer(MarketingLinksComponent)
