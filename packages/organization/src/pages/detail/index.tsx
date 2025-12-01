import React, { useEffect } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import { useModel } from 'umi'
import type { IRoute } from 'umi'
import styles from './index.module.less'
import { Button, Col, Form, Input, Row } from 'antd'
import CustomTitle from '@/components/CustomTitle'
import OrgInfo from '@/components/Pages/Organization/OrgInfo'
import DetailStore from './store'
// import { ITEM_LAYOUT } from '@/types'
import { getMasterHistory } from '@/utils/masterHistoryVO'
import InitDom from './components/InitDom'
import { formDate } from './const'
import Minititle from '@/components/Minititle'
import type { MasterProps } from '@/components/MasterPlugins/interface'
import { getCookie } from '@/storage'

const Page: IRoute = observer(() => {
    const masterStore: MasterProps = useModel('@@qiankunStateFromMaster')
    let { updateCurrentOrganization, getCurrentOrganization } = masterStore
    let currentOrganization = getCurrentOrganization?.()
    let store = useLocalObservable(() => new DetailStore())
    const [form] = Form.useForm()

    const masterHistoryVO = getMasterHistory()
    let token = getCookie('TOKEN')
    useEffect(() => {
        if (!currentOrganization && !token) {
            masterHistoryVO?.masterHistory?.replace('/account/user/login')
        } else {
            store.getOrgDetail(currentOrganization!).then(() => {
                // 编辑机构信息 回显数据
                form.setFieldsValue(store.orgDetail)
            })
        }
    }, [currentOrganization])
    return (
        <div className={styles.page}>
            {/* 初次进入 */}
            {!currentOrganization && token ? <InitDom /> : null}
            {currentOrganization ? (
                <div className={styles.flow}>
                    <CustomTitle title="机构信息" style={{ marginBottom: '32px' }} />

                    <Form
                        name="basic"
                        autoComplete="off"
                        className={styles.form_wrapper}
                        form={form}
                        // {...ITEM_LAYOUT}
                        onFinish={values => {
                            store.editOrg(values, currentOrganization!, updateCurrentOrganization)
                        }}
                    >
                        <Col span={14} offset={5}>
                            <Minititle title="基础信息" size="small" />
                        </Col>
                        <Row>
                            <Col span={10} offset={7}>
                                <OrgInfo
                                    type="edit"
                                    createStore={store}
                                    nameDisable={Boolean(store.orgDetail?.certifyStatus)}
                                    isShowSuffix={true}
                                    certifyStatus={store.orgDetail?.certifyStatus}
                                />
                            </Col>
                        </Row>
                        <Col span={14} offset={5}>
                            <Minititle
                                title="联系人信息"
                                size="small"
                                titleStyles={{ marginTop: 24 }}
                            />
                        </Col>

                        <Row>
                            <Col span={10} offset={7}>
                                {formDate.map(item => {
                                    let { name, label, maxLength, rules } = item

                                    return (
                                        <Form.Item
                                            key={name}
                                            name={name}
                                            label={label}
                                            validateTrigger="onBlur"
                                            rules={rules as any}
                                        >
                                            <Input
                                                className={styles.input}
                                                maxLength={maxLength}
                                                placeholder={`请输入${label}`}
                                            />
                                        </Form.Item>
                                    )
                                })}
                            </Col>
                        </Row>
                        <div className={styles.footer}>
                            <Button className={styles.input_btn} type="primary" htmlType="submit">
                                保存
                            </Button>
                        </div>
                    </Form>
                </div>
            ) : null}
        </div>
    )
})

Page.title = '机构信息'

export default Page
