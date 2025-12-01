/* eslint-disable */
import { useRef, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import { Button, message, Modal, Space, Typography } from 'antd'
import classnames from 'classnames'

import { SuperTable } from '@wotu/wotu-components'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'

import TitleBlock from '@/components/TitleBlock'

import type { CreateRecruiterParams, EditRecruiterParams, RecruiterItemProps } from './interface'
import CreateModal from './CreateModal'
import Store from './store'
import { editRecruiterApi, createRecruiterApi, deleteCheckApi, deleteApi } from './api'

import styles from './index.module.less'
import { COMPANY_TYPE_MAPS } from './constants'
import type { IRoute } from 'umi'
import { getSessionStorage } from '@/storage'

const RecruiterManage = () => {
    const store = useLocalObservable(() => Store)

    const [open, setOpen] = useState<boolean>()
    const [code, setCode] = useState<string>()

    // 是否是中台
    const isMiddle = getSessionStorage('PLATFORM') === 'middle'

    const actionRef = useRef({
        reload: () => {}, // 添加 reload 方法
    })

    const handleDelete = async (code: string) => {
        // TODO判断是否有无关联职位
        const canDelete = await deleteCheckApi(code)
        if (!canDelete) {
            Modal.error({
                title: '有关联职位，不可删除',
            })
            return
        }
        Modal.confirm({
            title: '确定要删除吗？此操作不可逆',
            onOk: () => {
                deleteApi(code).then(() => {
                    message.success('删除成功')
                    actionRef.current.reload()
                })
            },
        })
    }

    // 新增招聘单位
    const handleCreateRecruiter = (params: CreateRecruiterParams) => {
        return createRecruiterApi(params).then(() => {
            message.success('新建成功')
            setOpen(false)
            actionRef.current.reload()
        })
    }

    const handleEditRecruiter = (params: EditRecruiterParams) => {
        return editRecruiterApi(params).then(() => {
            message.success('编辑成功')
            setOpen(false)
            actionRef.current.reload()
        })
    }

    const handleCreate = () => {
        setOpen(true)
    }

    const handleEdit = (code: string) => {
        setOpen(true)
        setCode(code)
    }
    const columns: ColumnsTypeItem<RecruiterItemProps>[] = [
        {
            title: '单位名称',
            width: 200,
            dataIndex: 'companyName',
        },
        {
            title: '统一信用代码',
            width: 150,
            dataIndex: 'companyCode',
            render: val => val || '--',
        },
        {
            title: '单位性质',
            width: 120,
            dataIndex: 'companyType',
            render: val => COMPANY_TYPE_MAPS[val],
        },
        {
            title: '所在地',
            width: 180,
            dataIndex: 'address',
            render: (_, { province, city, region }) => {
                return `${province}${city}${region}`
            },
        },
        {
            title: '行业',
            width: 180,
            dataIndex: 'industry',
            render: (_, { parentIndustryName, industryName }) => {
                return `${parentIndustryName}/${industryName}`
            },
        },
        {
            title: '操作',
            dataIndex: 'operate',
            width: 120,
            fixed: 'right',
            render: (_, { code }) => (
                <Space>
                    <Typography.Link onClick={() => handleEdit(code)}>编辑</Typography.Link>
                    <Typography.Link onClick={() => handleDelete(code)}>删除</Typography.Link>
                </Space>
            ),
        },
    ]

    return (
        <div
            className={classnames(styles.page_recruiter_manage, {
                [styles.isMiddle]: isMiddle,
            })}
        >
            <TitleBlock title="招聘单位管理" />
            <SuperTable
                actionRef={actionRef}
                columns={columns}
                // @ts-ignore
                request={store.getRecruiterList}
                renderOptionBar={() => (
                    <Button type="primary" onClick={handleCreate}>
                        新建
                    </Button>
                )}
                search={false}
            />

            <CreateModal
                code={code}
                open={open}
                onCancel={() => {
                    setCode(undefined)
                    setOpen(false)
                }}
                onCreate={handleCreateRecruiter}
                onEdit={handleEditRecruiter}
            />
        </div>
    )
}

const observePage: IRoute = observer(RecruiterManage)
observePage.title = '招聘单位管理'

export default observePage
