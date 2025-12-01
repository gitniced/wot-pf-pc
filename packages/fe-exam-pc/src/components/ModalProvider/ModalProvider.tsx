import { Button, Modal } from 'antd'
import { ModalCallbackContext, ModalValueContext } from './context'
import { useCallback, useState } from 'react'
import type { ComponentMapType, ModalProviderType } from './interface'
import styles from './index.module.less'

interface PropsType extends ModalProviderType {
    componentMap: ComponentMapType
}
/**
 * 弹窗组件
 * @param props {
 *  visible: 是否展示
 *  type: 弹窗类型
 *  dataSource: 弹窗数据
 *  componentMap: {
 *      title: 弹窗标题
 *      width: 弹窗宽度
 *      height: 弹窗内部高度
 *      component: 弹窗内部组件
 *      okText: 确认按钮文本
 *      cancelText: 取消按钮文本
 *      centered: 弹窗是否居中
 *  }
 *  handleClose: 弹窗关闭回调
 *  handleConfirm: 弹窗确认回调
 * }
 * @returns
 */
const ModalProvider = (props: PropsType) => {
    const { visible, type, dataSource, componentMap, handleClose, handleConfirm } = props
    /**
     * 提交数据
     */
    const [confirmValue, setConfirmValue] = useState<any>()

    const {
        title,
        width = 520,
        height,
        component,
        okText,
        cancelText,
        centered,
    } = componentMap[type]
    /**
     * 点击确定
     * @returns
     */
    const handleOk = () => {
        return handleConfirm(confirmValue)
    }
    /**
     * 修改弹窗内数据
     */
    const confirmValueCallback = useCallback(data => {
        setConfirmValue(data)
    }, [])
    /**
     * 获取弹窗内部样式
     * @returns 弹窗内样式
     */
    const getStyle = () => {
        return height ? { height: `${height}px` } : { maxHeight: '689px' }
    }

    return (
        <Modal
            title={title}
            width={width}
            centered={centered}
            className={styles.modal_provider}
            maskClosable={false}
            open={visible}
            onCancel={handleClose}
            footer={[
                cancelText && (
                    <Button onClick={handleClose} key="cancel">
                        {cancelText}
                    </Button>
                ),
                okText && (
                    <Button type="primary" onClick={handleOk} key="ok">
                        {okText}
                    </Button>
                ),
            ]}
        >
            <ModalValueContext.Provider value={{ dataSource }}>
                <ModalCallbackContext.Provider value={{ confirmValueCallback }}>
                    <div className={styles.content} style={getStyle()}>
                        {component}
                    </div>
                </ModalCallbackContext.Provider>
            </ModalValueContext.Provider>
        </Modal>
    )
}

export default ModalProvider
