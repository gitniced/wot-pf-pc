import React, { useRef } from 'react'
import styles from './index.module.less'
import { Modal, Tag, Tooltip, Space, Badge, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { FormDataType, PropsType } from './interface'
import { history } from 'umi'
import { getCookie } from '@/storage'
import { getDecodeInfo, SuperTable } from '@wotu/wotu-components'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'

const AuthTable = (props: PropsType) => {
    let { dataSource, pagination, userData, delAuth, ownerCode, orgUserCode, changeOwner } = props

    const actionRef = useRef({
        toggleRowHideMsg: () => {},
    })

    // 跳转页面
    const gotoPage = (path: string, state?: any) => {
        history.push(path, state)
    }

    const handleDelete = (code: string) => {
        Modal.confirm({
            title: '删除成员',
            content: '确认删除该成员吗',
            okText: '确认',

            cancelText: '取消',
            centered: true,
            onOk: () => delAuth(code),
        })
    }

    const desensitizationList = [
        {
            key: 'name',
            type: '1',
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

    // 花名册
    const columns: ColumnsType<FormDataType> = [
        {
            title: '姓名',
            key: 'name',
            // width: 120,
            width: 'auto',
            ellipsis: true,
            render: (_, item) => {
                const {
                    name: realName,
                    nickname,
                    userCode,
                    isDirector,
                    isValidateIdCard,
                    isHideMsg,
                    isHideBtn,
                } = item
                return (
                    <Space>
                        <Typography.Text>
                            <div className={styles.table_name}>
                                <Tooltip
                                    arrowPointAtCenter={true}
                                    placement="top"
                                    title={
                                        <>
                                            {nickname}
                                            {isValidateIdCard && realName
                                                ? `(${
                                                      isHideMsg
                                                          ? getDecodeInfo(realName, '1')
                                                          : getDecodeInfo(realName)
                                                  })`
                                                : ''}
                                        </>
                                    }
                                >
                                    <div className={styles.table_name_str}>
                                        {nickname}
                                        {isValidateIdCard && realName
                                            ? `(${
                                                  isHideMsg
                                                      ? getDecodeInfo(realName, '1')
                                                      : getDecodeInfo(realName)
                                              })`
                                            : ''}
                                    </div>
                                </Tooltip>
                                {userCode === ownerCode ? (
                                    <Tooltip
                                        arrowPointAtCenter={true}
                                        placement="top"
                                        title={'创建者'}
                                    >
                                        <div className={styles.logo_box} />
                                    </Tooltip>
                                ) : null}
                                {isDirector && (
                                    <Tag color="processing" style={{ color: '#1890ff' }}>
                                        主管
                                    </Tag>
                                )}
                            </div>
                        </Typography.Text>
                        {/* @ts-ignore */}
                        {!isHideBtn ? (
                            <Typography.Text
                                onClick={(e: any) => {
                                    e.stopPropagation()
                                    //@ts-ignore
                                    actionRef.current.toggleRowHideMsg(item)
                                }}
                            >
                                <div style={{ cursor: 'pointer', width: '16px', height: '100%' }}>
                                    {/* @ts-ignore */}
                                    {item.isHideMsg ? (
                                        <EyeFilled style={{ color: 'var(--primary-color)' }} />
                                    ) : (
                                        <EyeInvisibleFilled
                                            style={{ color: 'var(--primary-color)' }}
                                        />
                                    )}
                                </div>
                            </Typography.Text>
                        ) : null}
                    </Space>
                )
            },
        },

        {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
            width: 160,
            ellipsis: true,
        },
        {
            title: '关联角色',
            dataIndex: 'roleName',
            key: 'roleName',
            // width: 120,
            width: 'auto',
            ellipsis: true,
        },
        {
            title: '所属部门',
            key: 'department',
            width: 'auto',
            // width: 120,
            ellipsis: true,
            render: (_, { department }) => <div>{department.join('/')}</div>,
        },
        {
            title: '账号状态',
            key: 'enable',
            width: 'auto',
            // width: 120,
            ellipsis: true,
            render: (_, { enable }) => (
                <Space direction="vertical">
                    {enable?.toString?.() === '1' ? (
                        <Badge status="success" text="已激活" />
                    ) : (
                        <Badge status="error" text="未激活" />
                    )}
                </Space>
            ),
        },
        {
            title: '操作',
            key: 'status',
            fixed: 'right',
            // width: 100,
            width: 'auto',
            render: (_, { userCode, mobile, name, idCard, roleCode, departmentCode }) => {
                return (
                    <div className={styles.auth_operation}>
                        {userCode === ownerCode &&
                        getCookie('USER_CODE')?.toString?.() === ownerCode?.toString?.() ? (
                            <div
                                className={styles.delete}
                                onClick={() => {
                                    changeOwner(_)
                                }}
                            >
                                转让创建者
                            </div>
                        ) : null}
                        {userCode !== userData?.code && orgUserCode !== userCode ? (
                            <>
                                <div
                                    className={styles.delete}
                                    onClick={() =>
                                        gotoPage(
                                            `/auth?type=edit&idCard=${userCode}&departmentCode=${departmentCode}`,
                                            {
                                                name,
                                                mobile,
                                                idCard,
                                                roleCode,
                                                departmentCode,
                                            },
                                        )
                                    }
                                >
                                    编辑
                                </div>

                                <div
                                    className={styles.delete}
                                    onClick={() => handleDelete(userCode)}
                                >
                                    删除
                                </div>
                            </>
                        ) : null}
                    </div>
                )
            },
        },
    ]

    return (
        <div className={styles.content}>
            {/* <Table
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                // scroll={{ x: 400 }}
            /> */}

            <SuperTable
                actionRef={actionRef}
                search={false}
                //@ts-ignore
                desensitizationList={desensitizationList}
                rowKey={'code'}
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
            />
        </div>
    )
}
export default AuthTable
