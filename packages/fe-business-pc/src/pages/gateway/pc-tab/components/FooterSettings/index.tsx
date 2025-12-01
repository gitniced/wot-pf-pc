import Minititle from '@/components/Minititle'
import styles from './index.module.less'
import { Button, Form, Modal } from 'antd'
import { TEMPLATE_ENUM, templates } from './const'
import { useEffect, useState } from 'react'
import FooterSortTable from '../FooterSortTable'
import type store from '../../store'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { inject, observer } from 'mobx-react'
import MarketingLinksComponent from '../MarketingLinksComponents'
import { PTPcFooter, FooterDefaultPreview } from '@wotu/pt-components'
import { findSiteData } from '@wotu/wotu-components'
import type SiteStore from '@/stores/siteStore'
import { FOOTER_LINK_TYPE } from '../../const'
import { Power } from '@wotu/wotu-pro-components'
const { confirm } = Modal

interface IFooterSettingsProps {
    store: store
    siteStore: SiteStore
}

/**  页脚设置  */
const FooterSettings: React.FC<IFooterSettingsProps> = ({ store, siteStore }) => {
    /**  from 表单  */
    const [form] = Form.useForm()
    /**  监听营销链接 checkbox */
    const checkbox = Form.useWatch('checkbox', form)
    /**  监听 移动端上传二维码 */
    const mobile = Form.useWatch('mobile', form)
    /**  监听微信公众号上传二维码 */
    const weChat = Form.useWatch('weChat', form)
    /**  监听 官方微博值 */
    const weibo = Form.useWatch('weibo', form)

    /**  选择的模板  */
    const [selectTemplate, setSelectTemplate] = useState<number>(TEMPLATE_ENUM.ONE)

    /**  选择的模板   */
    useEffect(() => {
        setSelectTemplate(store.footerTemplateKey || 1)
    }, [store.footerTemplateKey])

    useEffect(() => {
        /**  友情链接只有模板1没有 其余都有  */
        if (selectTemplate !== TEMPLATE_ENUM.ONE) {
            if (store.friendshipLinksList?.length) {
                form.setFieldsValue({
                    friendshipLinks: store.friendshipLinksList,
                })
            } else {
                form.setFields([
                    { name: 'friendshipLinks', errors: ['友情链接至少1条'], value: undefined },
                ])
            }
        }
    }, [store.friendshipLinksList])

    useEffect(() => {
        /**  导航链接只有模板4有 其余没有有  */
        if (selectTemplate === TEMPLATE_ENUM.FOUR) {
            if (store.navigationLinksList?.length) {
                form.setFieldsValue({
                    navigationLinks: store.navigationLinksList,
                })
            } else {
                form.setFields([
                    { name: 'navigationLinks', errors: ['导航至少1个'], value: undefined },
                ])
            }
        }
    }, [store.navigationLinksList])

    useEffect(() => {
        if (selectTemplate !== TEMPLATE_ENUM.ONE && selectTemplate !== TEMPLATE_ENUM.TWO) {
            if (checkbox?.includes('mobile') && mobile?.length) {
                form.setFields([{ name: 'marketingLinks', errors: [''] }])
                return
            }
            if (checkbox?.includes('weChat') && weChat?.length) {
                form.setFields([{ name: 'marketingLinks', errors: [''] }])
                return
            }
            if (checkbox?.includes('weibo') && weibo) {
                form.setFields([{ name: 'marketingLinks', errors: [''] }])
                return
            }
            form.setFields([
                {
                    name: 'marketingLinks',
                    errors: ['营销链接至少勾选1个，且必须上传对应图片或填写链接'],
                    value: undefined,
                },
            ])
            // store.updateMarketingLinks({ checkbox, mobile, weChat, weibo })
        }
    }, [checkbox, mobile, weChat, weibo])

    useEffect(() => {
        if (selectTemplate === TEMPLATE_ENUM.THREE || selectTemplate === TEMPLATE_ENUM.FOUR) {
            const types = ['mobile', 'weChat', 'weibo']
            const tempCheckbox: string[] = []

            types.forEach(type => {
                const item = store.marketingLinksList?.find(
                    i => Number(i?.disableState) === 1 && i.marketingType === type,
                )
                if (item) {
                    tempCheckbox.push(type)
                    if (item.link) {
                        const echo = [
                            {
                                uid: '-1',
                                name: 'image.jpeg',
                                status: 'done',
                                url: item.link,
                            },
                        ]
                        item.marketingType === 'weibo'
                            ? form.setFieldValue(type, item.link)
                            : form.setFieldValue(type, echo)
                    }
                }
            })

            form.setFieldValue('checkbox', checkbox)
        }
    }, [selectTemplate, store.marketingLinksList])
    // 公安备案号
    const PoliceObj = {
        // icp备案号
        policeCode: findSiteData(siteStore!.siteData, 'icp_code')?.value,
        // 备案号链接
        linkPoliceCode: findSiteData(siteStore!.siteData, 'link_police_code')?.value,
    }

    /**  模板二  配置  */
    const templateTwoDefault = (
        isHaveMarketingLinks: boolean = false, //模板三的营销链接
        isHaveNav: boolean = false, // 模板四的导航链接
    ) => {
        return (
            <div className={styles.template_preview_two}>
                {/* <div className={styles.template_preview_two_content}>
                    {renderContent(selectTemplate)}
                </div>
                <FooterPreview /> */}
                <PTPcFooter
                    selectTemplate={selectTemplate}
                    navigationLinksList={store.navigationLinksList}
                    friendshipLinksList={store.friendshipLinksList}
                    marketingLinksList={store.marketingLinksList}
                    {...PoliceObj}
                />
                <div className={styles.template_preview_two_opera}>
                    <Form labelCol={{ span: 4 }} className={styles.form_warp} form={form}>
                        {isHaveNav && (
                            <Form.Item
                                label="导航链接"
                                name="navigationLinks"
                                rules={[
                                    {
                                        required: true,
                                        message: '导航至少1个',
                                    },
                                ]}
                            >
                                <FooterSortTable
                                    /**  判断是导航链接 还是友情链接  */
                                    flag={FOOTER_LINK_TYPE.NAV_LINK}
                                    /**  数据  */
                                    dataList={store.navigationLinksList}
                                    /**  新增  */
                                    onAddLinks={store.onAddNavLinks}
                                    /**  编辑  */
                                    onEditLinks={store.onEditNavLinks}
                                    /**  删除  */
                                    onDeleteLinks={(id: string) => {
                                        confirm({
                                            title: '确定要删除吗？',
                                            icon: <ExclamationCircleOutlined />,
                                            onOk() {
                                                store.onDeleteNavLinks(id)
                                            },
                                            okText: '确定',
                                            cancelText: '取消',
                                        })
                                    }}
                                    /**  更新 store.navigationLinksList 数据 */
                                    updateList={store.updateNavLinksList}
                                    customLinkList={store.customLinkList}
                                />
                            </Form.Item>
                        )}
                        <Form.Item
                            label="友情链接"
                            name="friendshipLinks"
                            rules={[
                                {
                                    required: true,
                                    message: '友情链接至少1条',
                                },
                            ]}
                        >
                            <FooterSortTable
                                flag={FOOTER_LINK_TYPE.FRIEND_LINK}
                                /**  数据  */
                                dataList={store.friendshipLinksList}
                                /**  新增  */
                                onAddLinks={store.onAddFriendshipLinks}
                                /**  编辑  */
                                onEditLinks={store.onEditFriendshipLinks}
                                /**  删除  */
                                onDeleteLinks={(id: string) => {
                                    confirm({
                                        title: '确定要删除吗？',
                                        icon: <ExclamationCircleOutlined />,
                                        onOk() {
                                            store.onDeleteFriendshipLinks(id)
                                        },
                                        okText: '确定',
                                        cancelText: '取消',
                                    })
                                }}
                                /**  更新 store.friendshipLinksList 数据 */
                                updateList={store.updateFriendshipLinksList}
                            />
                        </Form.Item>
                        {isHaveMarketingLinks ? (
                            <Form.Item
                                label="营销链接"
                                name="marketingLinks"
                                rules={[
                                    {
                                        required: isHaveMarketingLinks && true,
                                        message:
                                            '营销链接至少勾选1个，且必须上传对应图片或填写链接',
                                    },
                                ]}
                            >
                                <MarketingLinksComponent store={store} />
                            </Form.Item>
                        ) : null}
                    </Form>
                </div>
            </div>
        )
    }

    /**  渲染模板内容  */
    const renderTemplate = () => {
        switch (selectTemplate) {
            case TEMPLATE_ENUM.ONE:
                return <FooterDefaultPreview {...PoliceObj} />
            case TEMPLATE_ENUM.TWO:
                return templateTwoDefault()
            case TEMPLATE_ENUM.THREE:
                return templateTwoDefault(true)
            case TEMPLATE_ENUM.FOUR:
                return templateTwoDefault(true, true)
            default:
                ''
        }
    }

    const onSaveFooter = async () => {
        if (selectTemplate !== TEMPLATE_ENUM.ONE && selectTemplate !== TEMPLATE_ENUM.TWO) {
            if (
                (checkbox?.includes('mobile') && mobile?.length) ||
                (checkbox?.includes('weChat') && weChat?.length) ||
                (checkbox?.includes('weibo') && weibo)
            ) {
                form.setFieldsValue({ marketingLinks: 'marketingLinks' })
            } else {
                form.setFields([
                    {
                        name: 'marketingLinks',
                        errors: ['营销链接至少勾选1个，且必须上传对应图片或填写链接'],
                        value: undefined,
                    },
                ])
                return
            }
        }

        let res = await form.validateFields()

        /**  更新选择的模板  */
        await store.upDataFooterTemplateKey(selectTemplate)
        /**  更新营销链接的数据  */
        await store.updateMarketingLinks(res)

        /**  更新总配置 掉接口保存  */
        await store.updateFooterConfig()
    }

    return (
        <div className={styles.footer_settingspage}>
            <Minititle title="模板选择" titleStyles={{ marginTop: 32 }} />
            <div className={styles.template_selection}>
                {templates.map(i => {
                    return (
                        <div
                            key={i.id}
                            style={{ border: i.id === selectTemplate ? '1px solid #1678FF' : '' }}
                            onClick={() => setSelectTemplate(i.id)}
                        >
                            <img src={i.url} />
                        </div>
                    )
                })}
            </div>
            <Minititle title="页脚预览" titleStyles={{ marginTop: 16 }} />
            <div className={styles.template_preview_content}>{renderTemplate()}</div>
            <div className={styles.footer}>
                <Power powerId={11118}>
                    <Button type="primary" onClick={onSaveFooter}>
                        保存并启用
                    </Button>
                </Power>
            </div>
        </div>
    )
}

export default inject('siteStore')(observer(FooterSettings))
