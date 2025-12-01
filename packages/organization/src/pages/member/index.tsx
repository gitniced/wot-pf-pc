import React, { useEffect, useState } from 'react'
import { inject, observer, useLocalObservable } from 'mobx-react'
import RosterStore from './store'
import { MICRO_APP_TYPE } from '@/types'

import type { IRoute } from 'umi'
import styles from './index.module.less'
import { Input, Button, message, Modal, Form, Alert } from 'antd'
import { history } from 'umi'
import OrgTop from '@/components/Pages/Organization/OrgTop'
import classNames from 'classnames'
import ImportFile from '@/components/Pages/Organization/ImportFile'
import AuthTable from '@/components/Pages/Organization/AuthTable'
import DirectorDrawer from '@/components/Pages/Organization/DirectorDrawer'
import TreeMenu from '@/components/Pages/Organization/TreeMenu'
import { getMasterHistory } from '@/utils/masterHistoryVO'
import { useModel } from 'umi'
import type { MasterProps } from '@/components/MasterPlugins/interface'
import { getCookie } from '@/storage'
import type { PageProps } from '@/types'
import { getDecodeInfo, TCaptcha } from '@wotu/wotu-components'
import MoreSelect from '@/components/MoreSelect'
const { Search } = Input

const Page = observer((props: PageProps) => {
    // 转让创建人
    const [changeOwnerFrom] = Form.useForm()
    const masterStore: MasterProps = useModel('@@qiankunStateFromMaster')
    let { getCurrentOrganization } = masterStore
    let currentOrganization = getCurrentOrganization?.()

    let store = useLocalObservable(() => new RosterStore())

    // 是否在工作台中
    let isMerchant = masterStore?.tag === MICRO_APP_TYPE.WORK_BENCH
    // 工作台中从主营用获取userStore
    let userStore = isMerchant ? masterStore?.masterStore?.userStore : props.userStore
    let { userData } = userStore

    // 批量操作弹窗
    const [isImportVisible, setImportVisible] = useState(false)

    const masterHistoryVO = getMasterHistory()

    useEffect(() => {
        console.log('useEffect---currentOrganization', currentOrganization)
        let token = getCookie('TOKEN')
        if (!currentOrganization && !token) {
            masterHistoryVO?.masterHistory?.replace('/account/user/login')
        } else {
            store.getOrganizationCode(currentOrganization)
        }
        return store.clearClock
    }, [currentOrganization])

    // 搜索树节点
    const onSearch = (value: string) => {
        if (value) {
            store.getSearchTree(value)
        } else {
            store.getIndustryList()
        }
    }

    // 跳转页面
    const gotoPage = (path: string, state?: any) => {
        history.push(path, state)
    }
    // 批量导入
    const importFile = () => {
        store.getImportList()
        setImportVisible(true)
    }

    /** 确认转让创建人
     * 阶段1:确认创建人身份
     * 阶段2:确认被转让人身份
     * 通过后：转让成功
     */
    const changeOwnerModalOk = () => {
        if (store.changeOwnerStep === 1) {
            changeOwnerFrom.validateFields().then(res => {
                const { verifyCode } = res || {}
                store.mobileVerify(1, store.organizationOwner, verifyCode).then(() => {
                    changeOwnerFrom.resetFields()
                })
            })
        } else {
            changeOwnerFrom.validateFields().then(res => {
                const { newOwner, verifyCode } = res || {}
                store.mobileVerify(2, newOwner, verifyCode)
            })
        }
    }

    /** 关闭转让创建人 */
    const changeOwnerModalCancel = () => {
        store.updateChangeOwnerVisible(false)
    }

    /** 创建人获取验证码 */
    const getOldCodeHandler = () => {
        store.getCode(getDecodeInfo(store.organizationOwner.mobile))
    }

    /** 接受转让人获取验证码 */
    const getNewCodeHandler = () => {
        const newOwner = changeOwnerFrom.getFieldValue('newOwner')
        const { mobile } = newOwner || {}
        if (mobile) {
            store.getCode(getDecodeInfo(mobile || ''))
        }
    }

    return (
        <div className={styles.page} id="member_manager">
            {/* 初次进入 */}
            {!currentOrganization && (
                <div className={styles.banner}>
                    <svg
                        className={[styles.icon, 'icon'].join(' ')}
                        aria-hidden="true"
                        width="100%"
                        height="100%"
                        viewBox="0 0 7999 1024"
                        preserveAspectRatio="none meet"
                    >
                        <use xlinkHref={`#bg_zuzhi`} />
                    </svg>

                    <div className={styles.banner_mine}>
                        <div className={styles.banner_title}>机构新建</div>
                        <div className={styles.banner_text}>
                            还未建立新的机构？您可以新建一个机构，并关联相关人员，对其进行权限配置。建立自己团队的机构架构吧
                        </div>
                        <Button
                            type="primary"
                            onClick={() => {
                                gotoPage('/create')
                            }}
                            className={classNames(styles.banner_set, styles.btn)}
                        >
                            去新建
                        </Button>
                    </div>
                </div>
            )}
            {currentOrganization && (
                <>
                    <OrgTop organizationDetail={store.organizationDetail} />

                    <div className={styles.main}>
                        <div className={styles.left}>
                            <Search
                                placeholder="搜索部门"
                                allowClear
                                onSearch={onSearch}
                                className={styles.search}
                            />

                            {/* 部门树 */}
                            <TreeMenu store={store} />
                        </div>
                        <div className={styles.line}> </div>

                        <div className={styles.right}>
                            <div className={styles.right_top}>
                                <div className={styles.right_top_title}>{store.rightTitle}</div>
                            </div>

                            <div className={styles.operation}>
                                <Button
                                    type="primary"
                                    onClick={() =>
                                        gotoPage(
                                            `/auth?type=addition&departmentCode=${store.departmentCode}`,
                                        )
                                    }
                                    className={styles.btn}
                                >
                                    添加成员
                                </Button>

                                <Button className={styles.operation_btn} onClick={importFile}>
                                    批量导入
                                </Button>

                                <ImportFile
                                    isImportVisible={isImportVisible}
                                    setImportVisible={setImportVisible}
                                    importResource={store.importResource}
                                    importList={store.importList}
                                    departmentCode={store.departmentCode}
                                />

                                <Button
                                    className={styles.operation_btn}
                                    onClick={() => {
                                        if (!store.departmentCode) {
                                            message.info('请选择要邀请成员的部门')
                                            return
                                        }
                                        gotoPage(`/invite?departmentCode=${store.departmentCode}`)
                                    }}
                                >
                                    邀请成员加入
                                </Button>
                            </div>

                            {/* 表格 */}
                            <div className={styles.table}>
                                <AuthTable
                                    dataSource={store.authList}
                                    userData={userData}
                                    delAuth={store.delAuth}
                                    departmentCode={store.departmentCode}
                                    ownerCode={store.organizationDetail.userCode}
                                    orgUserCode={store.organizationDetail?.userCode}
                                    changeOwner={store.changeOwner}
                                    toggleShow={store.toggleShow}
                                    pagination={{
                                        current: store.pageNo,
                                        pageSize: store.pageSize,
                                        total: store.totalCount,
                                        showQuickJumper: true,
                                        onChange: store.pageHandler,
                                        showSizeChanger: true,
                                    }}
                                />
                            </div>
                        </div>

                        <DirectorDrawer
                            directorVisible={store.directorVisible}
                            setDirectorVisible={store.updateDirectorVisible}
                            currentDirectorCode={store.currentDirectorCode}
                            staffList={store.staffList}
                            setDirector={store.setDirector}
                            setDirectorCode={store.setDirectorCode}
                        />

                        {/* 转让创建人 */}
                        <Modal
                            title={'转让创建人身份'}
                            getContainer={() =>
                                document.getElementById('member_manager') as HTMLElement
                            }
                            centered
                            visible={store.changeOwnerVisible}
                            okText={store.changeOwnerStep === 1 ? '下一步' : '确定'}
                            onOk={changeOwnerModalOk}
                            onCancel={changeOwnerModalCancel}
                        >
                            <Form
                                labelCol={{ span: 7 }}
                                wrapperCol={{ span: 16 }}
                                form={changeOwnerFrom}
                            >
                                {store.changeOwnerStep === 1 ? (
                                    <>
                                        <Form.Item noStyle>
                                            <Alert
                                                message="换绑创建人账号，需要验证当前创建人账号的身份"
                                                type="info"
                                                showIcon
                                                style={{ marginBottom: '24px' }}
                                            />
                                        </Form.Item>
                                        <Form.Item label="当前创建人" required={true}>
                                            {store.organizationOwner.nickname}{' '}
                                            {store.organizationOwner.name
                                                ? `(${getDecodeInfo(
                                                      store?.organizationOwner?.name || '',
                                                      '1',
                                                  )})`
                                                : ''}
                                        </Form.Item>
                                        <Form.Item label="手机号" required={true}>
                                            {getDecodeInfo(store?.organizationOwner?.mobile || '')}
                                            <TCaptcha serverVerify={store.serverVerify}>
                                                <Button
                                                    type={'link'}
                                                    disabled={
                                                        store.codeBtnStr !== '发送验证码' ||
                                                        store.veriCodeBtn
                                                    }
                                                    onClick={getOldCodeHandler}
                                                >
                                                    {store.codeBtnStr}
                                                </Button>
                                            </TCaptcha>
                                        </Form.Item>
                                        <Form.Item
                                            label="验证码"
                                            name="verifyCode"
                                            rules={[{ required: true, message: '请输入验证码' }]}
                                        >
                                            <Input maxLength={12} />
                                        </Form.Item>
                                    </>
                                ) : null}
                                {store.changeOwnerStep === 2 ? (
                                    <>
                                        <Form.Item
                                            label="新的创建人"
                                            required={true}
                                            name={'newOwner'}
                                        >
                                            {store.organizationCode ? (
                                                <MoreSelect
                                                    disabled={store.codeEventTime !== 60}
                                                    all={false}
                                                    maxLength={5}
                                                    placeholder="请选择"
                                                    requestParams={{
                                                        organizationCode: store.organizationCode,
                                                    }}
                                                    valueKey={'userCode'}
                                                    showSearch={false}
                                                    requestUrl={'/organization/staff/employee/page'}
                                                    beforeChange={(_, selectItem: any) => {
                                                        return { _, ...selectItem }
                                                    }}
                                                    labelInValue
                                                    labelHander={data => {
                                                        const { name, nickname } = data || {}
                                                        return `${nickname}${
                                                            name
                                                                ? `(${getDecodeInfo(name, '1')})`
                                                                : ''
                                                        }`
                                                    }}
                                                    // fieldNames={{ label: name, value: 'code' }}
                                                />
                                            ) : null}
                                        </Form.Item>

                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, currentValues) =>
                                                prevValues?.newOwner?.userCode !==
                                                currentValues?.newOwner?.userCode
                                            }
                                        >
                                            {({ getFieldValue }) => {
                                                const newOwner = getFieldValue('newOwner') || {}
                                                if (newOwner?.userCode) {
                                                    return (
                                                        <>
                                                            <Form.Item
                                                                label="手机号"
                                                                required={true}
                                                            >
                                                                {getDecodeInfo(
                                                                    newOwner.mobile || '',
                                                                )}
                                                                <TCaptcha
                                                                    serverVerify={
                                                                        store.serverVerify
                                                                    }
                                                                >
                                                                    <Button
                                                                        type={'link'}
                                                                        disabled={
                                                                            store.codeBtnStr !==
                                                                                '发送验证码' ||
                                                                            store.veriCodeBtn
                                                                        }
                                                                        onClick={getNewCodeHandler}
                                                                    >
                                                                        {store.codeBtnStr}
                                                                    </Button>
                                                                </TCaptcha>
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="验证码"
                                                                name="verifyCode"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: '请输入验证码',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input maxLength={12} />
                                                            </Form.Item>
                                                        </>
                                                    )
                                                } else {
                                                    return null
                                                }
                                            }}
                                        </Form.Item>
                                    </>
                                ) : null}
                            </Form>
                        </Modal>
                    </div>
                </>
            )}
        </div>
    )
})

const ObserverAccount: IRoute = inject('userStore')(Page)

ObserverAccount.title = '机构管理'

export default ObserverAccount
