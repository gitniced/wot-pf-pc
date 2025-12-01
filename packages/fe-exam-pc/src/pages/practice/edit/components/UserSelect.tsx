// 选择指定参与刷题的用户

import { SuperTable } from '@wotu/wotu-components'
import styles from './index.module.less'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'

import { Button, Modal, Pagination, Space, Typography, message } from 'antd'
import { useState } from 'react'
import type { PersonItem } from '../../interface'
import { observer, useLocalObservable } from 'mobx-react'

import PracticeStore from '../../store'
import AddPersonModal from './AddPersonModal'
import type { UserSelectProps } from './interface'
import BatchImport from '@/components/BatchImport'
import { IMPORT_TYPE_ENUM } from '@/components/BatchImport/constant'
import { SUBJECT_TYPE_ENUM } from '@/pages/question/[type]/constants'

// 批量导入说明
const DESCRIPTION = (
    <>
        <Typography>1.请按照模板文件内的相关说明，进行内容填写。</Typography>
        <Typography>
            2.将填写好的导入文件上传，系统会校验导入内容是否符合规定的数据格式。校验通过，会入库保存。如未通过，则会反馈提示。
        </Typography>
        <Typography>3. 请勿对模版已有内容做改动，否则可能无法导入。</Typography>
    </>
)

const UserSelect = ({ type }: UserSelectProps) => {
    const store = useLocalObservable(() => PracticeStore)
    const { personList, practiceDetail, personParams, personTotalCount } = store

    const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    const [visible, setVisible] = useState<boolean>(false)
    const [visibleImport, setVisibleImport] = useState<boolean>(false)

    // 删除已经添加的用户
    const handleDelete = (codeList: string[]) => {
        Modal.confirm({
            centered: true,
            title: '提示',
            content: '是否删除该用户，删除之后不可恢复',
            onOk: () => {
                store.batchDeletePersons(codeList).then(() => {
                    message.success('删除成功')
                    setSelectedKeys([])
                })
            },
        })
    }

    // 手动添加
    const handleShowAddPersonModal = () => {
        setVisible(true)
    }

    const handleSubmit = (params: Omit<PersonItem, 'personCode'>) => {
        store.getPersonList({ ...params, pageNo: 1, pageSize: personParams.pageSize })
    }

    const handleReset = () => {
        store.personParams = store.defaultPersonParams
        store.getPersonList()
    }

    // 批量导入
    const handleImportBatch = () => {
        setVisibleImport(!visibleImport)
    }
    // 批量导入完成
    const handleImportDone = () => {
        // 更新试题列表数据
        handleReset()
    }

    const desensitizationList = [
        {
            key: 'personName',
            type: '1',
            sign: true,
        },
        {
            key: 'personCertNumber',
            type: '4',
        },
        {
            key: 'personPhone',
            type: '2',
        },
    ]

    const columns: ColumnsTypeItem<PersonItem>[] = [
        {
            title: '姓名',
            dataIndex: 'personName',
            search: true,
        },
        {
            title: '账号名',
            dataIndex: 'username',
            search: true,
        },
        {
            title: '身份证号',
            dataIndex: 'personCertNumber',
            search: true,
        },
        {
            title: '手机号',
            dataIndex: 'personPhone',
            search: true,
        },
        {
            title: '操作',
            hide: type === 'detail',
            render: (_, record) => (
                <Typography.Link onClick={() => handleDelete([record.code])}>删除</Typography.Link>
            ),
        },
    ]

    const renderOptionBar = () => {
        if (type === 'detail') return null

        return (
            <Space size={16}>
                <Button onClick={handleShowAddPersonModal}>手动添加用户</Button>
                <Button type="primary" onClick={handleImportBatch}>
                    批量导入
                </Button>
            </Space>
        )
    }

    const renderFooterBar = () => {
        const selectedLength = selectedKeys.length
        return (
            <div className={styles.footer_bar}>
                {type === 'edit' && (
                    <Space size={8}>
                        <Button
                            type="primary"
                            disabled={selectedLength <= 0}
                            onClick={() => handleDelete(selectedKeys)}
                        >
                            批量删除
                        </Button>
                        {selectedLength > 0 && <Typography>已选择 {selectedLength} 项</Typography>}
                    </Space>
                )}

                <Pagination
                    current={personParams.pageNo}
                    pageSize={personParams.pageSize}
                    total={personTotalCount}
                    onChange={(current, pageSize) =>
                        store.getPersonList({ pageNo: current, pageSize })
                    }
                />
            </div>
        )
    }

    const rowSelection = {
        selectedRowKeys: selectedKeys,
        onChange: (_selectedKeys: React.Key[]) => {
            setSelectedKeys(_selectedKeys as string[])
        },
        preserveSelectedRowKeys: true,
    }

    return (
        <div className={styles.component_user_select}>
            <SuperTable
                rowKey="code"
                dataSource={personList}
                columns={columns.filter(item => !item.hide)}
                pagination={false}
                renderFooter={() => renderFooterBar()}
                // @ts-ignore
                renderOptionBar={() => renderOptionBar()}
                // @ts-ignore
                rowSelection={type === 'edit' ? rowSelection : false}
                search={{ expand: false }}
                // @ts-ignore
                onSubmit={handleSubmit}
                onReset={handleReset}
                // @ts-ignore
                desensitizationList={desensitizationList}
            />

            <AddPersonModal open={visible} onCancel={() => setVisible(false)} />

            {/* 批量导入 */}
            <BatchImport
                subject={SUBJECT_TYPE_ENUM.SIMULATION}
                importApi="/question/front/practice/user/excel/import"
                open={visibleImport}
                onCancel={handleImportBatch}
                onOk={handleImportDone}
                businessType={IMPORT_TYPE_ENUM.PRACTICE_USER}
                description={DESCRIPTION}
                practiceCode={practiceDetail.code!}
                importTemplate="https://static.zpimg.cn/public/fe-exam-pc/import_template/%E7%BB%83%E4%B9%A0%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E7%94%A8%E6%88%B7.xlsx"
            />
        </div>
    )
}

export default observer(UserSelect)
