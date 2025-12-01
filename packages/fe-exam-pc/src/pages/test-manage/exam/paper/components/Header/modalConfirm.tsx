import styles from './index.module.less';
import { Modal } from 'antd';

/** 二次确认弹框 */
export const modalConfirm = ({
    title, onOk
}: {
    title: React.ReactNode | string;
    onOk: () => void;
}) => {
    Modal.confirm({
        centered: true,
        title,
        okText: '确认交卷',
        okType: 'default',
        cancelText: '我知道了',
        maskClosable: true,
        cancelButtonProps: {
            type: 'primary'
        },
        className: styles.modal_confirm,
        onOk,
    });
};
