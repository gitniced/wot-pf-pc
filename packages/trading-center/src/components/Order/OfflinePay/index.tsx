import React from 'react'
import styles from './index.module.less'
import { Form, Input } from 'antd'
import GlobalUpload from '@/components/GlobalUpload'
import { PlusOutlined } from '@ant-design/icons'
import type { SettlementObjectFrontDetailDto } from '@/@types/finance'
const { TextArea } = Input

function OfflinePay({ settlementDetail }: { settlementDetail: SettlementObjectFrontDetailDto }) {
    const itemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    }

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
    }
    const renderSettlementDetail = () => {
        let list = [
            {
                key: settlementDetail.name,
                name: '付款给',
            },
            {
                key: settlementDetail.bank,
                name: '开户行',
            },
            {
                key: settlementDetail.bankAccount,
                name: '账号',
            },
        ]
        return list.map(item => {
            return (
                <div key={item.key} className={styles.settlement_item}>
                    <span>{item.name}：</span>
                    <span>{item.key}</span>
                </div>
            )
        })
    }
    return (
        // <Form form={form} onFinish={onSave}>
        <div className={styles.pay_roof}>
            <div className={styles.info}>{renderSettlementDetail()}</div>
            <div className={styles.form_center}>
                <Form.Item
                    name="proof"
                    label="付款凭证"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: '请上传付款凭证' }]}
                    extra="图片要求：文件大小≤10MB，文件格式JPG、PNG、JPEG"
                    {...itemLayout}
                >
                    <GlobalUpload
                        amount={1}
                        otherProps={{
                            listType: 'picture-card',
                        }}
                        drag={false}
                        size={10}
                        type={11}
                        accept={'image'}
                        className={styles.img_upload}
                    >
                        <div>
                            <PlusOutlined />
                            <div>上传照片</div>
                        </div>
                    </GlobalUpload>
                </Form.Item>

                <Form.Item name="remark" label="备注信息" {...itemLayout}>
                    <TextArea
                        rows={4}
                        showCount
                        placeholder="请输入备注信息"
                        maxLength={150}
                        style={{ minHeight: 100 }}
                    />
                </Form.Item>
            </div>
        </div>
        // </Form>
    )
}

export default OfflinePay
