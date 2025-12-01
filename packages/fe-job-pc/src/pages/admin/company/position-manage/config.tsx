import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { ProfessionListFrontDto } from '@/@types/profession'
import { Popconfirm, Space } from 'antd'
import styles from './index.module.less'

const salaryTypes: Record<number, string> = {
    0: 'k',
    1: '元/时',
    2: '元/天',
    3: '元/周',
    4: '元/月',
}

const uintTypes: Record<number, string> = {
    0: '',
    1: 'K',
    2: 'W',
}

interface Iparams extends ProfessionListFrontDto {
    deleteFunc: (code: string) => void
    editFunc: (code: string) => void
    publishFunc: (code: string) => void
    closeFunc: (code: string) => void
    store: any
    salaryMonth?: number
    professionName?: string
}

const statusCollect = ['待发布', '招聘中', '已关闭']

export const tableColumns = ({
    store,
    deleteFunc,
    editFunc,
    closeFunc,
    publishFunc,
}: Iparams): ColumnsType<Iparams> => {
    return [
        {
            title: '职位名称',
            dataIndex: 'professionName',
            search: true,
            width: 160,
            formItemProps: {
                labelCol: { span: 7 },
            },
        },
        {
            title: '招聘单位',
            width: 150,
            dataIndex: 'recruitmentCompanyName',
            formItemProps: {
                labelCol: { span: 7 },
            },
        },
        {
            title: '工作城市',
            width: 150,
            dataIndex: 'cityName',
            key: 'cityName',
        },
        {
            title: '薪资范围',
            width: 220,
            dataIndex: 'salary',
            render: (_, { salaryMin, salaryMax, salaryType, salaryMonth, uint = 0 }) => {
                if (salaryMin && salaryMax) {
                    const unitText: string = uintTypes[uint] ?? ''
                    const salaryText: string = salaryTypes[salaryType!] ?? ''
                    const salaryMonthText: string = salaryMonth ? '* ' + salaryMonth + '薪' : ''
                    return `${salaryMin} - ${salaryMax}${unitText}${salaryText}${salaryMonthText}`
                } else {
                    return '--'
                }
            },
        },
        {
            title: '学历要求',
            width: 150,
            dataIndex: 'education',
            render: (_, { education }) => {
                const edu = store.educationOption.find(
                    (item: { code: number | undefined }) => item.code === education,
                )
                return edu?.desc
            },
        },
        {
            title: '经验要求',
            width: 150,
            dataIndex: 'experience',
            render: (_, { experience }) => {
                const exp = store.experienceOption.find(
                    (item: { code: number | undefined }) => item.code === experience,
                )
                return exp?.desc
            },
        },
        {
            title: '状态',
            width: 150,
            dataIndex: 'status',
            key: 'name',
            render: (_, { status }) => {
                const arr = [
                    <div className={styles.ready} />,
                    <div className={styles.public} />,
                    <div className={styles.close} />,
                ]

                return (
                    <div className={styles.status}>
                        {arr[status!]} <span>{statusCollect[status!]}</span>
                    </div>
                )
            },
        },
        {
            title: '操作',
            fixed: 'right',
            width: 160,
            render: (_, { code, status, professionName }) => {
                return (
                    // @ts-ignore
                    <Space size={16}>
                        <span
                            className={styles.operate_btn}
                            onClick={() => editFunc(code as string)}
                        >
                            编辑
                        </span>
                        {status !== 1 && (
                            <Popconfirm
                                placement="topRight"
                                title={`是否确认要发布${professionName}职位?`}
                                onConfirm={() => publishFunc(code as string)}
                                okText="确认"
                                cancelText="取消"
                            >
                                <span className={styles.operate_btn}>发布</span>
                            </Popconfirm>
                        )}
                        {status === 1 && (
                            <Popconfirm
                                placement="topRight"
                                title={`是否确认要关闭${professionName}职位?`}
                                onConfirm={() => closeFunc(code as string)}
                                okText="确认"
                                cancelText="取消"
                            >
                                <span className={styles.operate_btn}>关闭</span>
                            </Popconfirm>
                        )}
                        <Popconfirm
                            placement="topRight"
                            title={`是否确认要删除${professionName}职位?`}
                            onConfirm={() => deleteFunc(code as string)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <span className={styles.operate_btn}>删除</span>
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ]
}
