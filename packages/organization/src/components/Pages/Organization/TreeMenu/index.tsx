/*
tree：树
选择展开皆受控
 */

import React, { useMemo, useState } from 'react'
import styles from './index.module.less'
import { Form, Input, Modal, Tooltip, Tree } from 'antd'
import type StoreType from '@/pages/member/store'
import { observer } from 'mobx-react'
import TreeTitle from './components/TreeTitle'
import classNames from 'classnames'

interface PropsType {
    store: StoreType
}

const TreeMenu = (props: PropsType) => {
    let { store } = props
    // store = toJS(store)
    let {
        selectDepartmentHandler,
        // 设置选中的节点
        setSelectedTreeKeys,
        // 已选择的key
        selectedTreeKeys,
        // 切换部门
        switchDepartment,
        // tree数据源
        departmentTree,
        // 设置展开的节点
        setExpandedKeys,
        // 已展开的节点
        expandedKeys,
        directorVisible,
        updateDirectorVisible,
        selectOrg,
    } = store

    // 编辑or添加部门 modal
    const [operationDepartment] = Form.useForm()
    // 编辑部门modal
    const [modalVisible, setModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('')

    let BASE_IMG_URL = 'https://static.zpimg.cn/public/fe_user_pc/images'

    // 选中树节点
    const onTreeSelect = (departmentData: any) => {
        const { key, title } = departmentData
        selectDepartmentHandler(departmentData)
        setSelectedTreeKeys([key])
        switchDepartment(key, title)
    }

    // 选中机构 switchDepartment('')
    const selectOrganization = () => {
        switchDepartment('')
        setSelectedTreeKeys([])
        selectOrg()
    }

    const onTreeExpand = (keys: React.Key[]) => {
        setExpandedKeys(false, keys)
    }

    const handleModalOk = () => {
        return operationDepartment
            .validateFields()
            .then(res => {
                if (modalTitle === '编辑部门') {
                    store.editDepartment(res.departmentName)
                } else {
                    store.createDepartment(res.departmentName)
                    store.setExpandedKeys(true)
                }
                setModalVisible(false)
            })
            .catch(() => {})
    }

    const handleModalCancel = () => {
        setModalVisible(false)
    }

    /** 添加子部门 */
    const addGroup = (departmentData: any = {}) => {
        selectDepartmentHandler(departmentData)
        operationDepartment.resetFields()
        setModalTitle('添加子部门')
        setModalVisible(true)
    }
    /** 编辑部门 */
    const editGroup = (departmentData: any) => {
        selectDepartmentHandler(departmentData)
        operationDepartment.setFieldsValue({ departmentName: departmentData.title })
        setModalTitle('编辑部门')
        setModalVisible(true)
    }

    /** 删除部门 */
    const delGroup = (departmentData: any) => {
        selectDepartmentHandler(departmentData)
        Modal.confirm({
            title: '删除部门',
            content:
                '删除部门后下级部门也会一并删除，部门下若有成员会清空所属部门，确认删除该部门吗？',
            okText: '确认',
            cancelText: '取消',
            centered: true,
            onOk: () => {
                store.delDepartment()
            },
        })
    }

    /** 删除部门 */
    const addAdmin = (departmentData: any) => {
        selectDepartmentHandler(departmentData)
        updateDirectorVisible(!directorVisible)
    }

    // 树结构的数据
    const treeData = useMemo(() => {
        const loop = (data: any): any =>
            data.map((item: any) => {
                let staffsCount = item.staffCount ?? 0
                staffsCount = '(' + staffsCount + '人)'

                const title = (
                    <TreeTitle
                        data={item}
                        title={item.title}
                        count={staffsCount}
                        level={item.level}
                        addGroup={addGroup}
                        editGroup={editGroup}
                        delGroup={delGroup}
                        addAdmin={addAdmin}
                        onClick={onTreeSelect}
                        store={store}
                    />
                )

                if (item.children) {
                    return {
                        title: title,
                        key: item.key,
                        icon: <img src={BASE_IMG_URL + '/icon_zhankai@2x.png'} />,
                        children: loop(item.children),
                    }
                }
                return {
                    title: title,
                    key: item.key,
                }
            })

        return loop(departmentTree)
    }, [departmentTree])

    return (
        <div className={styles.content}>
            <div
                className={classNames(
                    styles.organization_title_content,
                    store.isSelectOrg ? styles.organization_title_active : '',
                )}
                onClick={selectOrganization}
            >
                <div className={styles.organization_title}>
                    <Tooltip
                        arrowPointAtCenter={true}
                        placement="top"
                        title={store.organizationDetail?.name}
                    >
                        <div className={styles.organization_title_str}>
                            {store.organizationDetail?.name}
                        </div>
                    </Tooltip>
                    &nbsp;
                    {store.orgStaffCount ? (
                        <div className={styles.organization_num}>
                            {`(${store.orgStaffCount}人)`}
                        </div>
                    ) : null}
                </div>

                <Tooltip arrowPointAtCenter={true} placement="top" title={'添加子部门'}>
                    <svg
                        className={['icon', styles.organization_title_btn].join(' ')}
                        aria-hidden="true"
                        onClick={() => {
                            addGroup()
                        }}
                    >
                        <use xlinkHref={`#Plus`} />
                    </svg>
                </Tooltip>
            </div>

            <Tree
                expandedKeys={expandedKeys}
                selectedKeys={selectedTreeKeys}
                // onSelect={onTreeSelect}
                onExpand={onTreeExpand}
                treeData={treeData}
                switcherIcon={
                    <img style={{ width: '0.1rem' }} src={BASE_IMG_URL + '/icon_shouqi@2x.png'} />
                }
            />

            {/* 新建or编辑部门 */}
            <Modal
                title={modalTitle}
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={operationDepartment}>
                    <Form.Item
                        label="部门名称："
                        name="departmentName"
                        rules={[{ required: true, message: '请输入部门名称' }]}
                    >
                        <Input maxLength={12} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default observer(TreeMenu)
