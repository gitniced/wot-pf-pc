import { Button, Popconfirm } from 'antd'
import styles from './index.module.less'

export const tableColumns = ({
    terminateCooperation,
    setAutoIncrement,
    autoIncrement,
}: {
    terminateCooperation: (params: any) => void
    setAutoIncrement: (params: number) => void
    autoIncrement: number
}) => [
    {
        title: '院校名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '操作',
        render: (_: string, { code }: { code: string }) => {
            return (
                <Popconfirm
                    placement="topRight"
                    title={'确认要解除合作关系么?'}
                    onConfirm={async () => {
                        await terminateCooperation([code] as string[])
                        setAutoIncrement(autoIncrement + 1)
                    }}
                    okText="解除"
                    cancelText="取消"
                >
                    <span className={styles.terminate_cooperation}>解除合作</span>
                </Popconfirm>
            )
        },
    },
]
