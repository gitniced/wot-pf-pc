/**
 * @ Author: congrong
 * @ Create Time: 2022-12-22 11:10:13
 * @ Modified by: feeling
 * @ Modified time: 2023-03-28 15:12:30
 */
import React, { useEffect, useState } from 'react'
import PayAbleStore from './store'
import styles from './index.module.less'
import { inject, observer, useLocalObservable } from 'mobx-react'
import { toJS } from 'mobx'
import { Table, Space, Button, Radio, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { PayAbleListType, dataType } from './interface'
import Footer from '@/components/Order/Footer'
import type { IRoute } from 'umi'
import FormModal from '@/components/Order/addAndEditHeaderModal/Modal'
import Minititle from '@/components/Order/Minititle'
import type { RadioChangeEvent } from 'antd'
import { history } from 'umi'
// import { HEADING_TYPE, headingType } from './enum'

const Page: React.FC = observer(() => {
    let store = useLocalObservable(() => new PayAbleStore())
    let { getImportList } = toJS(store)
    const goBack = () => history.goBack()
    enum titleTypeEnum {
        COMPANY = 1,
        PERSON = 2,
    }
    const Title_type: Record<string, string> = {
        [titleTypeEnum.COMPANY]: '企业',
        [titleTypeEnum.PERSON]: '个人',
    }

    useEffect(() => {
        getImportList()
    }, [])

    useEffect(() => {
        document.title = '抬头管理'
    }, [])

    const [visible, setVisible] = useState<boolean>(false) //控制显示隐藏
    const [records, setRecords] = useState<dataType | undefined>(undefined) //点击编辑获取到的数据

    // 取消按钮
    const onCancel = () => {
        setRecords(undefined)
        setVisible(false)
    }
    // 确认按钮
    const onSubmit = (params: dataType, callback: () => void) => {
        let messageText: string = '新增'
        if (records) {
            messageText = '编辑'
            store
                .editTitle({ ...params, code: records?.code })
                .then(() => {
                    message.success(`${messageText}成功`)
                    store.getImportList()
                    onCancel()
                })
                .finally(() => {
                    callback()
                })
        } else {
            store
                .addTitle(params)
                .then(() => {
                    message.success(`${messageText}成功`)
                    store.getImportList()
                    onCancel()
                })
                .finally(() => {
                    callback()
                })
        }
    }

    // 企业table
    const companiesColumns: ColumnsType<PayAbleListType> = [
        {
            title: '抬头类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            width: '10%',
            render: (_, { type }) => {
                return <div>{Title_type?.[type]}</div>
            },
        },
        {
            title: '抬头名称',
            dataIndex: 'titleName',
            key: 'titleName',
            align: 'center',
            width: '18%',
        },
        {
            title: '税号',
            dataIndex: 'taxNum',
            key: 'taxNum',
            align: 'center',
            width: '20%',
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            align: 'center',
            width: '20%',
        },
        {
            title: '银行账号',
            dataIndex: 'bankAccount',
            key: 'bankAccount',
            align: 'center',
            width: '20%',
        },
        {
            title: '操作',
            dataIndex: 'code',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <a
                        className={styles.edit_text}
                        onClick={() => {
                            setVisible(true)
                            setRecords(record)
                        }}
                    >
                        编辑
                    </a>
                    <a
                        className={styles.delete_text}
                        onClick={() => {
                            store.deleteTitle(record?.code || '')
                        }}
                    >
                        删除
                    </a>
                </Space>
            ),
        },
    ]
    // 个人table
    const personColumns: ColumnsType<PayAbleListType> = [
        {
            title: '抬头类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            width: '10%',
            render: (_, { type }) => {
                return <div>{Title_type?.[type]}</div>
            },
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: '25%',
        },
        {
            title: '身份证号',
            dataIndex: 'idCard',
            key: 'idCard',
            align: 'center',
            width: '25%',
            render: text => {
                return text || '-'
            },
        },
        // {
        //     title: '地址',
        //     dataIndex: 'address',
        //     key: 'address',
        //     align: 'center',
        //     width: '20%',
        // },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center',
            width: '25%',
            render: text => {
                return text || '-'
            },
        },
        {
            title: '操作',
            dataIndex: 'code',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <a
                        className={styles.edit_text}
                        onClick={() => {
                            setVisible(true)
                            setRecords(record)
                        }}
                    >
                        编辑
                    </a>
                    <a
                        className={styles.delete_text}
                        onClick={() => {
                            store.deleteTitle(record?.code || '')
                        }}
                    >
                        删除
                    </a>
                </Space>
            ),
        },
    ]
    //单选按钮切换事件
    const onChange = (e: RadioChangeEvent) => {
        store.radioVal = e.target.value
        store.PayAbleObj.pageNo = 1
        getImportList()
    }

    return (
        <div className={styles.page}>
            <Minititle title="抬头管理" />
            <div className={styles.checkRadio}>
                <p>抬头类型: </p>
                <Radio.Group onChange={onChange} value={store.radioVal}>
                    <Radio value={titleTypeEnum.COMPANY}>企业</Radio>
                    <Radio value={titleTypeEnum.PERSON}>个人</Radio>
                </Radio.Group>
            </div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true)
                }}
            >
                新增
            </Button>
            {/* 表格 */}
            <div className={styles.content}>
                <Table
                    columns={store.radioVal === 1 ? companiesColumns : personColumns}
                    dataSource={store.radioVal === 1 ? store.companiesList : store.personList}
                    pagination={false}
                />
            </div>
            {/* 模态框 */}
            <FormModal
                visible={visible}
                onCancel={onCancel}
                onSubmit={onSubmit}
                records={records}
                radioVal={store.radioVal}
            />

            <Footer>
                <div className={styles.go_back} onClick={goBack}>
                    <svg className={styles.svg_icon} width="200" height="200" aria-hidden="true">
                        <use xlinkHref="#icon_back"> </use>
                    </svg>
                    返回
                </div>
            </Footer>
        </div>
    )
})
const ObserverAccount: IRoute = inject('userStore')(Page)
ObserverAccount.title = '抬头管理'
export default ObserverAccount
