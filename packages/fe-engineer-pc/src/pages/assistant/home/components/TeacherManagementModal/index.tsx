import { Modal, message } from 'antd'
import styles from './index.module.less'
import { Table } from 'antd'
import { useAntdTable } from 'ahooks'
import { getDecodeInfo } from '@wotu/wotu-components'
import { useEffect, useState } from 'react'
import Desensitization from '../../../../../components/Desensitization'
import api from '@/pages/assistant/home/api'
import http from '@/servers/http'
import { DeleteOutlined } from '@ant-design/icons'
import Empty from '@/components/Empty'

interface Props {
    isModalOpen: boolean
    courseInfo: Record<string, any> | null
    handleOk: () => void
    handleCancel: () => void
    refreshHome: () => void
}

interface Item {
    name: {
        last: string
    }
    email: string
    phone: string
    gender: 'male' | 'female'
}

interface Result {
    total: number
    list: Item[]
}

const Index = (props: Props) => {
    const { isModalOpen, courseInfo, handleOk, handleCancel, refreshHome } = props
    const [dataList, setDataList] = useState<any[]>([])
    const [listCourseTeacher, setListCourseTeacher] = useState<any[]>([])

    const getTableData = ({
        current,
        pageSize,
    }: {
        current: number
        pageSize: number
    }): Promise<Result> => {
        return http(api.pageOtherTeacher, 'post', {
            pageNo: current,
            pageSize,
            code: courseInfo?.code,
        }).then((res: any) => {
            const arr = res.data?.map((item: any) => ({
                ...item,
                decodeInfo: {
                    name: getDecodeInfo(item?.userName, '1'),
                    mobile: getDecodeInfo(item?.mobile, '2'),
                    nameCode: item?.userName,
                    mobileCode: item?.mobile,
                },
            }))

            return {
                total: res?.totalCount || 0,
                list: arr || [],
            }
        })
    }

    const getListCourseTeacher = async () => {
        http(`${api.listCourseTeacher}?code=${courseInfo?.code}`, 'post', {}).then((res: any) => {
            const arr = res?.teacherList?.map((item: any) => ({
                ...item,
                decodeInfo: {
                    name: getDecodeInfo(item?.userName, '1'),
                    mobile: getDecodeInfo(item?.mobile, '2'),
                    nameCode: item?.userName,
                    mobileCode: item?.mobile,
                },
            }))
            setListCourseTeacher(arr)
        })
    }

    const { tableProps, refresh } = useAntdTable(getTableData, {
        defaultParams: [{ current: 1, pageSize: 5 }],
    })
    const { dataSource } = tableProps

    const changeDataList = (index: number, info: any, type: string) => {
        if (type === '1') {
            const list = [...dataList]
            list[index] = info
            setDataList(list)
        } else {
            const list = [...listCourseTeacher]
            list[index] = info
            setListCourseTeacher(list)
        }
    }

    const add = async (record: Record<string, any>) => {
        const res = await http(api.addCourseTeacher, 'post', {
            courseCode: courseInfo?.code,
            userCode: record?.userCode,
        })

        if (res) {
            message.success('添加成功！')
            refresh()
            refreshHome()
            getListCourseTeacher()
        }
    }

    const del = async (record: Record<string, any>) => {
        const res = await http(api.removeCourseTeacher, 'post', {
            courseCode: courseInfo?.code,
            userCode: record?.userCode,
        })

        if (res) {
            message.success('删除成功！')
            refresh()
            refreshHome()
            getListCourseTeacher()
        }
    }

    useEffect(() => {
        setDataList(dataSource)
    }, [dataSource])

    useEffect(() => {
        getListCourseTeacher()
    }, [])

    const columns = [
        {
            title: '姓名',
            dataIndex: ['name'],
            width: '40%',
            render: (_: any, record: any, index: number) => {
                const { name, nameCode, mobileCode } = record?.decodeInfo ?? {}
                return (
                    <Desensitization
                        text={name}
                        show={record?.infoShow}
                        info={{
                            nameCode,
                            mobileCode,
                        }}
                        changeInfo={(info: any) => {
                            const item = record
                            item.decodeInfo.name = info?.name
                            item.decodeInfo.mobile = info?.mobile
                            changeDataList(index, item, '1')
                        }}
                    />
                )
            },
        },
        {
            title: '手机号',
            width: '40%',
            dataIndex: ['decodeInfo', 'mobile'],
        },
        {
            title: '操作',
            dataIndex: 'gender',
            render: (_t: any, record: any) => {
                return (
                    <a
                        onClick={() => {
                            add(record)
                        }}
                    >
                        添加
                    </a>
                )
            },
        },
    ]

    return (
        <Modal
            title="管理教师"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1080}
            footer={null}
            bodyStyle={{ padding: '24px 24px 12px 24px' }}
        >
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.title}>更多教师</div>

                    <Table
                        columns={columns}
                        {...tableProps}
                        dataSource={dataList}
                        // pagination={{
                        //     // showSizeChanger: false,
                        //     // pageSize: 5,
                        //     showTotal: (total: number) => `共${total}个项目`,
                        // }}
                        onRow={(record, index) => {
                            return {
                                onMouseEnter: () => {
                                    record.infoShow = true
                                    changeDataList(index as number, record, '1')
                                },
                                onMouseLeave: () => {
                                    record.infoShow = false
                                    changeDataList(index as number, record, '1')
                                },
                            }
                        }}
                    />
                </div>
                <div className={styles.right}>
                    <div className={styles.title}>已添加</div>

                    <div className={styles.box}>
                        {listCourseTeacher?.length ? (
                            <>
                                {listCourseTeacher?.map((item, index) => (
                                    <div
                                        key={item?.id}
                                        className={styles.info}
                                        onMouseEnter={() => {
                                            item.infoShow = true
                                            changeDataList(index as number, item, '2')
                                        }}
                                        onMouseLeave={() => {
                                            item.infoShow = false
                                            changeDataList(index as number, item, '2')
                                        }}
                                    >
                                        <div>
                                            <Desensitization
                                                text={item?.decodeInfo?.name}
                                                show={item?.infoShow}
                                                info={{
                                                    nameCode: item?.decodeInfo?.nameCode,
                                                    mobileCode: item?.decodeInfo?.mobileCode,
                                                }}
                                                changeInfo={(info: any) => {
                                                    item.decodeInfo.name = info?.name
                                                    item.decodeInfo.mobile = info?.mobile
                                                    changeDataList(index, item, '2')
                                                }}
                                            />
                                        </div>
                                        <div>{item?.decodeInfo?.mobile}</div>
                                        <div>
                                            {+item?.createStatus === 1 ? (
                                                <div className={styles.tag}>创建者</div>
                                            ) : (
                                                <DeleteOutlined
                                                    style={{ color: 'rgba(0,0,0,0.45)' }}
                                                    onClick={() => {
                                                        del(item)
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <Empty />
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default Index
