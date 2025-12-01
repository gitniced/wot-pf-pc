import { SuperTable } from '@wotu/wotu-components'
import styles from './index.module.less'
import serviceManagementColumns from './columns'
import type { MenuProps } from 'antd'
import { Button, Dropdown, message, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import CreateStaffModal from './CreateStaffModal'

import Store from './store'
import { useLocalObservable } from 'mobx-react'
import { IMPORT_API, IMPORT_DESCRIPTION, IMPORT_TEMPLATE } from './consts'
import type { CreateServiceStaffParams, ListItem } from './interface'
import TitleBlock from '@/components/TitleBlock'
import { setDocTitle } from '@/utils/setDocTitle'
import { getCookie } from '@/storage'
import BatchImport from '@/components/BatchImport'
import { SOURCE_TYPE } from '../../employment-assistance/list/consts'

const ServiceManagement = () => {
    const store = useLocalObservable(() => Store)
    const [currentRecord, setCurrentRecord] = useState<ListItem>()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(false)
    const [importFileType, setImportFileType] = useState<'image' | 'excel' | 'word'>('image')
    const [importTitle, setImportTitle] = useState<string>()

    const actionRef = useRef({
        reload: () => {}, // 添加 reload 方法
    })

    const organizationCode = getCookie('SELECT_ORG_CODE')

    useEffect(() => {
        setDocTitle('就业人员管理')
    }, [])

    const columns = serviceManagementColumns(store, actionRef, record => {
        setOpenCreateModal(true)
        setIsEdit(true)
        setCurrentRecord(record)
    })

    // 批量导入下拉菜单（
    const items: MenuProps['items'] = [
        {
            label: '就业服务人员名单',
            key: 'serviceStaff',
            onClick: () => {
                setVisible(true)
                setImportFileType('excel')
                setImportTitle('批量导入就业服务人员名单')
            },
        },
        {
            label: '电子照片',
            key: 'photo',
            onClick: () => {
                setVisible(true)
                setImportFileType('image')
                setImportTitle('批量导入电子照片')
            },
        },
    ]

    const handleSubmit = (values: CreateServiceStaffParams) => {
        if (!isEdit) {
            return store.createServiceStaff({ ...values, organizationCode }).then(() => {
                actionRef.current.reload()
                setOpenCreateModal(false)
                message.success('新建成功')
            })
        }

        store
            .editServiceStaff({ photo: values.photo, code: currentRecord?.code, organizationCode })
            .then(() => {
                actionRef.current.reload()
                setOpenCreateModal(false)
                setIsEdit(false)
                message.success('操作成功')
            })
    }

    const desensitizationList = [
        {
            key: 'name',
            type: '1',
            sign: true,
        },
        {
            key: 'mobile',
            type: '2',
        },
        {
            key: 'idCardNo',
            type: '4',
        },
    ]

    return (
        <div className={styles.page_service_management}>
            <TitleBlock title="服务人员管理" />
            <SuperTable
                params={{
                    organizationCode: getCookie('SELECT_ORG_CODE'),
                }}
                actionRef={actionRef}
                columns={columns}
                // @ts-ignore
                request={store.getServiceStaffList}
                renderOptionBar={() => (
                    <Space size={8}>
                        <Button type="primary" onClick={() => setOpenCreateModal(true)}>
                            新建
                        </Button>
                        <Dropdown menu={{ items }}>
                            <Button type="primary">
                                <Space size={0}>
                                    批量导入 <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </Space>
                )}
                scroll={{ x: 0 }}
                rowKey={'code'}
                // @ts-ignore
                desensitizationList={desensitizationList}
            />
            <CreateStaffModal
                isEdit={isEdit}
                record={currentRecord!}
                open={openCreateModal}
                onOk={handleSubmit}
                onCancel={() => {
                    setOpenCreateModal(false)
                    setIsEdit(false)
                }}
            />

            <BatchImport
                title={importTitle}
                importFileType={importFileType}
                description={IMPORT_DESCRIPTION[importFileType]}
                importTemplate={IMPORT_TEMPLATE[importFileType]}
                importApi={IMPORT_API[importFileType]}
                importParams={{
                    sourceType: SOURCE_TYPE.Organization,
                    organizationCode: getCookie('SELECT_ORG_CODE'),
                }}
                open={visible}
                onCancel={() => setVisible(false)}
                onOk={() => actionRef.current.reload()}
                uploadTips="支持zip格式文件"
                accept="zip"
                uploadParams={{ type: 26 }}
            />
        </div>
    )
}

export default ServiceManagement
