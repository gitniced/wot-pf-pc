import { Button, Form, Radio, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import GlobalUpload from '@/components/GlobalUpload'
import { PTPcNav } from '@wotu/pt-components'
import styles from '../../index.module.less'
import type Store from '../../store'
import SortTable from '@/pages/gateway/components/SortTable'
import Minititle from '@/components/Minititle'
import { isDisableDiv } from '@/utils/isDisableDiv'

/**  导航设置  */
export default function NavigationSettings(store: Store, form: any) {
    const navigationImgType = Form.useWatch('navigationImgType', form)
    return (
        <>
            <Minititle title="导航栏预览" titleStyles={{ marginTop: 32 }} />
            <div className={styles.nav_warp}>
                <PTPcNav
                    logo={store.getawayData.naviLogo}
                    title={
                        navigationImgType === 0 &&
                        (store.getawayData.shortName || store.getawayData.organizationName)
                    }
                    dataList={store.navList}
                    onItemClick={() => {
                        console.log('click')
                    }}
                    rightNode={
                        <Space>
                            <Button type="text" className={styles.registry}>
                                注册
                            </Button>
                            <Button type="primary" className={styles.login}>
                                登录
                            </Button>
                        </Space>
                    }
                />
            </div>
            <Form form={form} className={styles.form_warp} labelCol={{ span: 4 }}>
                <Form.Item
                    label="导航栏LOGO"
                    name="navigationImgType"
                    rules={[{ required: true, message: '请上传LOGO' }]}
                    initialValue={0}
                >
                    <Radio.Group>
                        <Radio
                            value={0}
                            onClick={() => {
                                store.upDataGateway(store.getawayData.organizationLogo, 0)
                            }}
                        >
                            默认LOGO
                        </Radio>
                        <Radio
                            value={1}
                            onClick={() => {
                                store.upDataGateway('', 1)
                                form.setFieldValue('naviLogo', [])
                            }}
                        >
                            自定义LOGO
                        </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    shouldUpdate={(c, p) => c.navigationImgType !== p.navigationImgType}
                    noStyle
                >
                    {({ getFieldValue }) => {
                        const navType = getFieldValue('navigationImgType')
                        return (
                            navType === 1 && (
                                <Form.Item
                                    label=" "
                                    colon={false}
                                    help="建议高度56px，宽度56～560px，支持jpg、jpeg、png格式，大小不超过1MB"
                                    name="naviLogo"
                                    style={{ marginBottom: 48 }}
                                >
                                    <GlobalUpload
                                        onChange={event => {
                                            const e = event || []
                                            // 有数据表示所有状态都已完成
                                            if (e[0]?.status === 'done' && e[0]?.response?.url) {
                                                store.upDataGateway(e[0]?.response?.url, 1)
                                            }
                                            // 数组是空的 就表示删除了
                                            if (!e?.length) {
                                                store.upDataGateway('', 1)
                                            }
                                        }}
                                        amount={1}
                                        otherProps={{
                                            listType: 'picture-card',
                                            disabled: isDisableDiv(11116, true),
                                        }}
                                        drag={false}
                                        size={1}
                                        type={11}
                                        accept={'image'}
                                        className={styles.nav_upload}
                                    >
                                        <div className={styles.nav_upload_placeholder}>
                                            <PlusOutlined />
                                            上传照片
                                        </div>
                                    </GlobalUpload>
                                </Form.Item>
                            )
                        )
                    }}
                </Form.Item>
                <Form.Item label="导航栏菜单">
                    <SortTable
                        // 数据
                        dataList={store.navList}
                        // 新增
                        onAddNav={(params: Record<string, unknown>) => {
                            store.addNav({ ...params })
                        }}
                        // 编辑
                        onEditNav={(params: Record<string, unknown>) => {
                            store.editNav(params)
                        }}
                        // 删除
                        onDeleteNav={(id: string) => {
                            store.deleteNav(id)
                        }}
                        // sort 变化
                        onChangePosition={store.changePosition}
                        customLinkList={store.customLinkList}
                    />
                </Form.Item>
            </Form>
        </>
    )
}
