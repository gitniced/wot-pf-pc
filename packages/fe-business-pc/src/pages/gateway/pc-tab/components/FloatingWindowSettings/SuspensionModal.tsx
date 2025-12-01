import { useEffect } from 'react'
import { ACTION_TYPE_ENUM, NAME_TYPE_ENUM, icons } from './const'
import styles from './index.module.less'
import { Form, Modal } from 'antd'
import { cloneDeep } from 'lodash'
import { PTPcFloatingWindow } from '@wotu/pt-components'
import { floatingWindowFormItemConfig } from './floatingWindowFormItemConfig'

/**  悬浮窗设置  */
export function SuspensionModal(props: any) {
    const { form, isOpen, addSuspensionSubmit, closeModel, checkItem, customLinkList } = props || {}
    /**  监听选择图标  名称radio name  交互radio */
    const selectedIcon = Form.useWatch('selectedIcon', form)
    const nameType = Form.useWatch('nameType', form)
    const name = Form.useWatch('name', form)
    const actionType = Form.useWatch('actionType', form)
    const uploadImg = Form.useWatch('uploadImg', form)
    const uploadImgText = Form.useWatch('uploadImgText', form)
    const actionText = Form.useWatch('actionText', form)
    const actionCustomLink = Form.useWatch('actionCustomLink', form)

    useEffect(() => {
        /**  编辑回显  */
        if (isOpen && checkItem) {
            let cloneItem = cloneDeep(checkItem) || {}
            if (cloneItem?.uploadImg) {
                cloneItem.uploadImg = [
                    {
                        uid: '-1',
                        name: 'image.jpeg',
                        status: 'done',
                        url: cloneItem?.uploadImg,
                    },
                ]
            } else {
                cloneItem.uploadImg = []
            }

            form.setFieldsValue(cloneItem)
            /**  交互 为 点击跳转链接  */
            if (cloneItem?.actionType === ACTION_TYPE_ENUM.LINK) {
                cloneItem.echoLinkObj = {
                    code: cloneItem?.actionUrl,
                    label: cloneItem?.actionUrlTitle,
                    type: cloneItem?.actionUrlType,
                }
                /**  回显跳转链接  */
                form.setFieldsValue({
                    actionCustomLink: cloneItem.echoLinkObj,
                })
            }
        }
    }, [checkItem])

    /**  找到选择icon的名字  */
    const findIconName = () => {
        return icons.find(item => item.icon === selectedIcon)?.title || ''
    }

    useEffect(() => {
        /**  如果是第一次打开modal 就不执行 form.setFieldsValue  因为和回显的重叠 */
        if (sessionStorage.getItem('isFirstOpenModal') === '1') return
        selectedIcon &&
            form.setFieldsValue({
                name: findIconName(),
            })
    }, [selectedIcon])

    const formItems = floatingWindowFormItemConfig(nameType, actionType, customLinkList)

    return (
        <Modal
            open={isOpen}
            title={'悬浮窗'}
            onCancel={() => closeModel()}
            onOk={() => addSuspensionSubmit(checkItem ? true : false)}
            width={1000}
            className={styles.suspended_window_modal}
        >
            <div className={styles.main}>
                <div className={styles.left}>
                    <Form
                        form={form}
                        labelCol={{ span: 4 }}
                        initialValues={{
                            selectedIcon: 'icon_xf_erweima',
                            name: '二维码',
                            nameType: NAME_TYPE_ENUM.SHOW,
                            actionType: ACTION_TYPE_ENUM.IMAGE,
                        }}
                    >
                        {formItems.map(item => {
                            if (item?.condition) {
                                return (
                                    <Form.Item
                                        key={item?.name}
                                        label={item?.label}
                                        name={item?.name}
                                        required={item?.required}
                                        rules={item?.rules}
                                        className={item?.className}
                                    >
                                        {item?.component}
                                    </Form.Item>
                                )
                            } else {
                                return null
                            }
                        })}
                    </Form>
                </div>
                <div className={styles.right}>
                    <div className={styles.right_content_div}>
                        <PTPcFloatingWindow
                            checklist={[
                                {
                                    selectedIcon,
                                    nameType,
                                    name,
                                    actionType,
                                    uploadImg,
                                    uploadImgText,
                                    actionText,
                                    actionUrl: actionCustomLink?.code,
                                    actionUrlTitle: actionCustomLink?.label,
                                    actionUrlType: actionCustomLink?.type,
                                    code: checkItem?.code,
                                    organizationCode: checkItem?.code,
                                },
                            ]}
                        />
                    </div>
                    {actionType === ACTION_TYPE_ENUM.LINK && (
                        <div className={styles.tip}>点击图标可跳转</div>
                    )}
                    {/* <PTPcFloatingWindow checklist={[checkItem]} /> */}
                    {/* <Popover
                        placement="leftTop"
                        content={content}
                        // trigger="click"
                        trigger="hover"
                        overlayClassName={styles.popover_right}
                    >
                        <div className={styles.right_content} onClick={onLinkCLickGoToUrl}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`#${selectedIcon}`} />
                            </svg>
                            <span>{name || ''}</span>
                        </div>
                    </Popover>
                    {actionType === ACTION_TYPE_ENUM.LINK && (
                        <div className={styles.tip}>点击图标可跳转</div>
                    )} */}
                </div>
            </div>
        </Modal>
    )
}
