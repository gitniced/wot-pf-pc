import { Observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import recodeHooks from './hooks'
// import type { PageProps } from '@/types'
// import type { IRoute } from 'umi'
import CustomTitle from '@/components/Global/CustomTitle'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import type { ColumnsType } from 'antd/es/table'
import { Table } from 'antd'

interface DataType {
    loginType: string
    ip: string
    device: string
    loginTime: string
}

const getType = (type: number) => {
    let str = ''
    switch (type) {
        case 1:
            str = '账号登录'
            break
        case 2:
            str = '手机验证码'
            break
        default:
            str = '账号登录'
    }
    return str
}
const getDevice = (type: number) => {
    let str = ''
    switch (type) {
        case 1:
            str = 'PC网页'
            break
        case 2:
            str = '小程序'
            break
        default:
            str = 'PC网页'
    }
    return str
}

const columns: ColumnsType<DataType> = [
    {
        title: '登录方式',
        dataIndex: 'type',
        align: 'center',
        width: '25%',
        render: _ => getType(_),
    },
    {
        title: '登录IP',
        dataIndex: 'ip',
        align: 'center',
        width: '25%',
        render: _ => _ ?? '-',
    },
    {
        title: '终端',
        dataIndex: 'terminal',
        align: 'center',
        width: '25%',
        render: _ => getDevice(_),
    },
    {
        title: '登录时间',
        dataIndex: 'loginTime',
        align: 'center',
        width: '25%',
        render: _ => dayjs(_).format('YYYY-MM-DD HH:mm:ss'),
    },
]

const Recode = () => {
    const hooks = useLocalObservable(() => new recodeHooks())

    useEffect(() => {
        if (window.page_size) {
            hooks.pageHandelr(1, window.page_size)
        } else {
            hooks.getAccountLog()
        }
    }, [])

    return (
        <Observer>
            {() => {
                return (
                    <div className={styles.page}>
                        <div className={styles.content}>
                            <CustomTitle title="登录记录" />

                            <Table
                                columns={columns}
                                dataSource={hooks.accountLog}
                                className={styles.form}
                                pagination={{
                                    current: hooks.pageParma.pageNo,
                                    total: hooks.pageParma.totalCount,
                                    pageSize: hooks.pageParma.pageSize,
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    onChange: hooks.pageHandelr,
                                }}
                            />
                        </div>
                    </div>
                )
            }}
        </Observer>
    )
}

Recode.title = '登录记录'
export default Recode
