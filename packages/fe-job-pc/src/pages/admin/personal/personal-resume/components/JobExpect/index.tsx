import styles from './index.module.less'
import { Divider, Space, Popconfirm, Tooltip } from 'antd'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'

const jobType = ['', '全职', '兼职', '实习', '校招']

const Index = ({
    capacityName,
    industryName,
    cityName,
    minSalary,
    maxSalary,
    type,
    editData,
    deleteData,
    showDelete,
    showEdit,
    onSelect,
}: any) => {
    return (
        <div className={styles.job_expect_container} onClick={() => onSelect?.()}>
            <div className={styles.position_name}>
                <span>{capacityName}</span>
                <Space>
                    {showEdit && (
                        <Tooltip placement="top" title={'编辑'}>
                            <FormOutlined onClick={editData} className={styles.icon} />
                        </Tooltip>
                    )}
                    {showDelete && (
                        <Tooltip placement="top" title={'删除'}>
                            <Popconfirm
                                placement="topRight"
                                title={'确认要删除该工作期望吗？'}
                                onConfirm={deleteData}
                                okText="删除"
                                cancelText="取消"
                            >
                                <DeleteOutlined className={styles.icon} />
                            </Popconfirm>
                        </Tooltip>
                    )}
                </Space>
            </div>
            <div className={styles.position_address}>
                {jobType[Number(type)]}
                {jobType[Number(type)] && cityName && <Divider type="vertical" />} {cityName}
            </div>
            <div className={styles.position_salary}>
                {industryName}
                {industryName && minSalary && maxSalary ? <Divider type="vertical" /> : null}
                {minSalary > 0 &&
                    maxSalary > 0 &&
                    `${String(minSalary).replace(/000$/, 'k')}~${String(maxSalary).replace(
                        /000$/,
                        'k',
                    )}`}
            </div>
        </div>
    )
}

export default Index
