import CommonTitle from '@/components/CommonTitle'
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Space, Popconfirm, Divider } from 'antd'
import React, { useRef, useState } from 'react'
import styles from './index.module.less'

const Index = ({ title, children, isShow = true, type = 'add', deleteInstance, id }: any) => {
    const ref = useRef({
        addFunc: () => {},
        editInstance: () => {},
    })

    const [status, setStatus] = useState('')

    const addInstance = () => {
        ref?.current?.addFunc()
    }

    const editInstance = () => {
        ref?.current?.editInstance()
    }

    return (
        <div className={styles.module_container} id={id}>
            <Divider />
            <div className={styles.top}>
                <CommonTitle>
                    {status}
                    {title}
                </CommonTitle>
                {type === 'add' && isShow && (
                    <Button onClick={addInstance} icon={<PlusOutlined />} type="link">
                        添加
                    </Button>
                )}
                {type === 'edit' && (
                    <Button onClick={editInstance} icon={<FormOutlined />} type="link">
                        编辑
                    </Button>
                )}
                {type === 'ed' && (
                    <Space size={16}>
                        <Button onClick={editInstance} icon={<FormOutlined />} type="link">
                            编辑
                        </Button>
                        <Popconfirm
                            placement="topRight"
                            title={'确认删除该模块么?'}
                            onConfirm={deleteInstance}
                            okText="删除"
                            cancelText="取消"
                        >
                            <Button icon={<DeleteOutlined />} type="link">
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                )}
            </div>

            {React.cloneElement(children, { ref, setStatus })}
        </div>
    )
}

export default Index
