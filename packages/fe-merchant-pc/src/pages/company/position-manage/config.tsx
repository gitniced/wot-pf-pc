import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { ProfessionListFrontDto } from '@/@types/profession'
import { Button, Popconfirm, Space } from 'antd'
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
    professionName: string
    store: any
}

const statusCollect = ['待发布', '招聘中', '已关闭']
const uintCollect = ['', 'K']

export const tableColumns = ({
    store,
    deleteFunc,
    editFunc,
    closeFunc,
    publishFunc,
    keyWord,
}: Iparams): ColumnsType<Iparams> => {
    return [
        {
            title: '职位名称',
            dataIndex: 'professionName',
            render: (_, { professionName }) => {
                if (professionName.indexOf(keyWord) !== -1) {
                    return (
                        <>
                            <span>{professionName.slice(0, professionName.indexOf(keyWord))}</span>
                            <span style={{ color: 'var(--primary-color)' }}>{keyWord}</span>
                            <span>
                                {professionName.slice(
                                    professionName.indexOf(keyWord) + keyWord.length,
                                    professionName.length,
                                )}
                            </span>
                        </>
                    )
                } else {
                    return professionName
                }
            },
        },
        {
            title: '工作城市',
            dataIndex: 'cityName',
            key: 'cityName',
        },
        {
            title: '薪资范围',
            dataIndex: 'salary',
            render: (_, { salaryMin, salaryMax, salaryType, salaryMonth, uint = 0 }) => {
                if (salaryMin && salaryMax) {
                    const unitText: string = uintTypes[uint] ?? ''
                    const salaryText: string = salaryTypes[salaryType] ?? ''
                    const salaryMonthText: string = salaryMonth ? '* ' + salaryMonth + '薪' : ''
                    return `${salaryMin} - ${salaryMax}${unitText}${salaryText}${salaryMonthText}`
                } else {
                    return ''
                }
            },
        },
        {
            title: '学历要求',
            dataIndex: 'education',
            render: (_, { education }) => {
                const edu = store.educationOption.find(item => item.code === education)
                return edu?.desc
            },
        },
        {
            title: '经验要求',
            dataIndex: 'experience',
            render: (_, { experience }) => {
                const exp = store.experienceOption.find(item => item.code === experience)
                return exp?.desc
            },
        },
        {
            title: '状态',
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
                        {' '}
                        {arr[status]} <span>{statusCollect[status]}</span>{' '}
                    </div>
                )
            },
        },
        {
            title: '操作',
            render: (_, { code, status, professionName }) => {
                return (
                    <div>
                       <Space size={16} >
                        <span className={styles.operate_btn} onClick={() => editFunc(code as string)} >
                            编辑
                        </span>
                        {status !== 1 && (
                           <span className={styles.operate_btn} onClick={() => publishFunc(code as string)} >
                                发布
                            </span>
                        )}
                        {status === 1 && (
                            <span className={styles.operate_btn} onClick={() => closeFunc(code as string)} >
                                关闭
                            </span>
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
                    </div>
                )
            },
        },
    ]
}
