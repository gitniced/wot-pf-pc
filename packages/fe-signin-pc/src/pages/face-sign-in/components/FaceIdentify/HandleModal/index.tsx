import { Modal, Image, Divider, Select, Form } from 'antd'
import styles from './index.module.less'
import type { HandleModalProps } from './interface'
import { useState } from 'react'
import type { TaskSignTable } from '../../../interface'

const { Option } = Select

const HandleModal: React.FC<HandleModalProps> = ({
    visible,
    imgData,
    handleCancel,
    handleOk,
    dataList,
    signText,
}) => {
    const [form] = Form.useForm()
    const [userData, setUserData] = useState<TaskSignTable>()

    /** 选择学员 */
    const handleSelect = (e: string) => {
        setUserData(dataList.find(item => item.code === e))
    }

    /** 确认按钮 */
    const onOK = () => {
        form.validateFields().then(() => {
            handleOk(userData as TaskSignTable)
        })
    }

    return (
        <Modal title="手动签到" width={415} open={visible} onOk={onOK} onCancel={handleCancel}>
            <div className={styles.handle_modal}>
                <div className={styles.img_wrap}>
                    <div className={styles.img_item}>
                        {userData?.signUserImg ? (
                            <Image src={userData.signUserImg} className={styles.img} />
                        ) : (
                            <div className={styles.no_img}>暂无照片</div>
                        )}
                        <div className={styles.margin_top}>系统照片</div>
                    </div>
                    <div className={styles.img_item}>
                        {imgData ? (
                            <Image src={imgData} className={styles.img} />
                        ) : (
                            <div className={styles.no_img}>暂无照片</div>
                        )}
                        <div className={styles.margin_top}>{signText}照片</div>
                    </div>
                </div>
                <Divider />
                <Form className={styles.select} form={form}>
                    <Form.Item
                        label="选择学员："
                        name="username"
                        rules={[{ required: true, message: '请选择学员' }]}
                    >
                        <Select
                            placeholder="请选择"
                            showSearch
                            optionFilterProp="children"
                            onChange={handleSelect}
                            filterOption={(input, option) =>
                                option?.children?.toLowerCase()?.includes(input.toLowerCase())
                            }
                        >
                            {dataList.map(({ name, code }) => (
                                <Option key={code} value={code}>
                                    {name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default HandleModal
