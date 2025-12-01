import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { Space, Button, Popconfirm } from 'antd'
import styles from './index.module.less'

const Index = ({ editFunc, delFunc }: any) => {
    return (
        <div className={styles.operate_container}>
            <Space size={16}>
                <Button onClick={editFunc} icon={<FormOutlined />} type="link">
                    编辑
                </Button>
                <Popconfirm
                    placement="topRight"
                    title={'是否删除'}
                    onConfirm={delFunc}
                    okText="删除"
                    cancelText="取消"
                >
                    <Button icon={<DeleteOutlined />} type="link">
                        删除
                    </Button>
                </Popconfirm>
            </Space>
        </div>
    )
}

export default Index
