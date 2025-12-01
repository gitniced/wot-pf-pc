import React, { useEffect } from 'react'
import { DownOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { Dropdown, Button, Form, Input, Modal, Row, Tooltip } from 'antd'
import ChoiceTextModal from '@/components/ChoiceTextModal/choiceTextModal'
import ChoiceWeiModal from '@/components/ChoiceWeiModal/choiceWeiModal'
import { LinkEnum } from './interface'
import type { RESTYPE } from './interface'
import type { LinkProps } from './interface'
import { observer, useLocalObservable } from 'mobx-react'
import LinkStore from './store'
import classNames from 'classnames'
import CourseListModal from '@/pages/gateway/components/Course/courseListModal'
import { getLinks, getMenuItem } from './const'
import PlanPublicModal from '@/pages/gateway/components/PlanFormulaModal'
import { PlanListModal } from '@/pages/gateway/components/IdentifyResult'
import ChoiceCategoryModal from '@/pages/gateway/web/components/ChoiceCategoryModal'
import SelectQuizContentModal from '@/pages/gateway/web/create/components/ActionBar/BrushQuestions/components/SelectQuizContentModal'
import EnrollModal from '../EnrollModal'
import { isDisableDiv } from '@/utils/isDisableDiv'

const CustomLink = ({
    value,
    onChange,
    stylesName,
    noLink,
    onlyWeiLink,
    type = 'mobile',
    list = [],
    powerId = 'default_menu_key',
}: LinkProps) => {
    const store = useLocalObservable(() => new LinkStore(type))
    const [form] = Form.useForm()
    useEffect(() => {
        if (!store.linkVisible) {
            form.resetFields()
            return
        }
        if (value?.type === LinkEnum.CUSTOM_LINK) {
            form.setFieldValue('link', value?.code)
        } else {
            form.resetFields()
        }
    }, [store.linkVisible, value])

    useEffect(() => {
        if (value?.label) {
            store.setLinkText(value?.label)
            store.setUrlItem(value)
        } else {
            store.setLinkText('')
            store.setUrlItem({})
        }
    }, [value])
    /**
     *  每种类型的 策略行为 用来回显
     */
    const links = getLinks({
        store,
        type,
    })

    // 点击menuItems的事件
    const clickLink = (e: any, item?: RESTYPE) => {
        const key = e.target?.dataset?.key
        let { code: _code, route } = item || {}

        if (key in links) {
            let linItem = links[key]
            let newItem = {
                route: route,
                code: _code || route,
                ...linItem,
            }

            switch (Object.prototype.toString.call(linItem)) {
                case '[object Object]':
                    store.setUrlItem(newItem)
                    onChange?.(newItem)
                    break
                case '[object Function]':
                    linItem?.()
                    break

                default:
                    break
            }
        }
    }

    useEffect(() => {
        store.getItemList(list)
    }, [list])

    let menuItems = [
        ...getMenuItem(clickLink, {
            evaluateMenuList: store.menuList,
            trainingMenuList: store.trainingMenuList,
            practiceMenuList: store.practiceMenuList,
            enrollMenuList: store.enrollMenuList,
            studyMenuList: store.studyMenuList,
        }),
    ]

    //判断是否需要显示 自定义链接
    const getContent = () => {
        //导航管理页面的跳转链接没有自定义链接
        if (noLink) {
            menuItems = menuItems?.filter(item => {
                return item?.key !== '3'
            })
        }
        // 只显示微页面
        if (onlyWeiLink) {
            const res = menuItems?.filter(item => {
                return item?.key === '1'
            })
            return res
        }

        return menuItems
    }

    return (
        // @ts-ignore
        <div className={styles.page}>
            <Dropdown
                overlayClassName={styles.drop}
                menu={{ items: getContent() }}
                placement="bottomRight"
                trigger={['click']}
                disabled={isDisableDiv(powerId!, true)}
            >
                <div
                    className={stylesName ? styles.center : styles.link}
                    style={isDisableDiv(powerId!)}
                >
                    {store.urlItem?.label && (
                        <span
                            className={classNames(
                                styles.label,
                                store?.urlItem?.label ? styles.selected_label : null,
                            )}
                            onClick={e => {
                                e.stopPropagation()
                            }}
                        >
                            <Tooltip title={store.urlItem.label} trigger="hover">
                                <div className={styles.link_text}>{store.urlItem.label}</div>
                            </Tooltip>
                        </span>
                    )}
                    <div className={styles.change}>
                        {store.urlItem?.label ? '修改' : '选择要跳转的页面'}
                    </div>
                    <DownOutlined style={{ color: 'var(--primary-color)' }} />
                </div>
            </Dropdown>
            {/* 图文分类 */}
            {store.categoryVisible && (
                <ChoiceCategoryModal
                    visible={store.categoryVisible}
                    closeDialog={() => store.setCategoryVisible(false)}
                    onSubmit={(category: any) => store.getCategoryCode(category, onChange)}
                />
            )}

            {/* 选择图文详情的模态框 */}
            {store.pictureVisible && (
                <ChoiceTextModal
                    visible={store.pictureVisible}
                    onCancel={() => store.setPictureVisible(false)}
                    onSubmit={(imageItem: any) => store.getImageCodes(imageItem, onChange)}
                    selectionType={'radio'}
                />
            )}

            {/* 微页面的modal框 */}
            {store.weiVisible && (
                <ChoiceWeiModal
                    type={type}
                    visible={store.weiVisible}
                    onCancel={() => store.setWeiVisible(false)}
                    onSubmit={(microItem: any) => store.getMicroCodes(microItem, onChange)}
                />
            )}
            {store.courseOpen && (
                <CourseListModal
                    type="radio"
                    // hasCourseSearch={false}
                    open={store.courseOpen}
                    onCancel={() => store.setCourseModalOpen(false)}
                    onOk={(courseItem: any) => store.getCourseCodes(courseItem, onChange)}
                />
            )}

            {/* 认定结果详情 */}
            {store.identifyResultVisible && (
                <PlanListModal
                    type="radio"
                    open={store.identifyResultVisible}
                    onOk={planList => store.getIdentifyResult(planList, onChange)}
                    onCancel={() => store.setIdentifyResultVisible(false)}
                />
            )}

            {/* 计划公示详情 */}
            {store.planFormulaVisible && (
                <PlanPublicModal
                    visible={store.planFormulaVisible}
                    onCancel={() => store.setPlanFormulaVisible(false)}
                    onConfirmSel={(rows, keys) => {
                        store.getPlanFormula(rows, keys, onChange)
                    }}
                    title={'选择计划'}
                    selectType={'radio'}
                    tableOptions={{}}
                    selectedRowKeys={[]}
                    _selectedRows={[]}
                />
            )}

            {/* 练习详情modal */}
            {store.practiceVisible && (
                <SelectQuizContentModal
                    visible={store.practiceVisible}
                    onCancel={() => store.setPracticeVisible(false)}
                    onOk={e => {
                        store.getPracticeCodes(e, onChange)
                    }}
                    type="radio"
                    choiceData={[store.urlItem]}
                />
            )}
            {/* 报名modal */}
            {store.enrollOpen.visible && (
                <EnrollModal
                    type="radio"
                    visible={store.enrollOpen.visible}
                    contentType={store.enrollOpen.type}
                    onOk={e => store.getEnrollResult(e, onChange, store.enrollOpen.type)}
                    onCancel={() => store.setEnrollModalOpen(false)}
                />
            )}

            <Modal
                title="自定义链接"
                open={store.linkVisible}
                centered
                footer={null}
                onCancel={() => store.setLinkVisible(false)}
                maskClosable={false}
            >
                <Form
                    form={form}
                    onFinish={(values: { link: string }) =>
                        store.onLinkValueChange(values, onChange)
                    }
                >
                    <Form.Item
                        label="链接地址"
                        name="link"
                        rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'url',
                            },
                        ]}
                    >
                        <Input placeholder="请输入链接地址" />
                    </Form.Item>
                    <Row justify={'end'} className={styles.operation}>
                        <Button htmlType="button" onClick={() => store.setLinkVisible(false)}>
                            取消
                        </Button>
                        <Button htmlType="submit" style={{ marginLeft: 8 }} type="primary">
                            确定
                        </Button>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default observer(CustomLink)
