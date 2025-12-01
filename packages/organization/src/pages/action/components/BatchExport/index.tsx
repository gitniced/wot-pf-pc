import React, { useEffect } from 'react';
import { Modal, Button } from 'antd';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import styles from './index.module.less';
import { observer, useLocalObservable } from 'mobx-react';
import ImportStore from '../../store';

interface BatchExportProps {
    open: boolean;
    code: string;
    onClose?: () => void;
}

const BatchExport: React.FC<BatchExportProps> = ({ open, code, onClose }) => {
    let store = useLocalObservable(() => new ImportStore())
    const { importDetail: fileData, } = store


    // 开始导出
    const getDetails = async () => {
        store.getImportDetail(code)
    };

    // 监听 open 变化，开始导出
    useEffect(() => {
        if (open) {
            getDetails();
        }
    }, [open]);

    // 关闭弹窗
    const handleClose = () => {
        onClose?.();
    };

    // 下载文件
    const handleDownload = () => {
        window.open(fileData.fileUrl);
        handleClose();
    };

    // 渲染不同状态的弹窗内容
    const renderModalContent = () => {
        if (fileData?.status === 3 || (fileData?.status === 2 && fileData.errorList?.length > 0)) {
            return (
                <div className={styles.failModal}>
                    <ExclamationCircleFilled className={styles.failIcon} />
                    <div className={styles.content}>
                        <div className={styles.text}>导出失败</div>
                    </div>
                </div>
            );
        } else if (fileData?.status === 2) {
            return (
                <div className={styles.successModal}>
                    <CheckCircleFilled className={styles.successIcon} />
                    <div className={styles.content}>
                        <div className={styles.text}>导出成功</div>
                        <div className={styles.fileName}>{fileData?.fileName}</div>
                    </div>
                </div>
            );

        }
    };

    function footerRender() {
        if (fileData?.status === 3 || (fileData?.status === 2 && fileData.errorList?.length > 0)) {
            return (
                <div className={styles.footer}>
                    <Button onClick={handleClose}>完成</Button>
                </div>
            );
        } else if (fileData?.status === 2) {
            return (
                
                <div className={styles.footer}>
                    <Button onClick={handleClose}>完成</Button>
                    <Button type="primary" onClick={handleDownload}>下载文件</Button>
                </div>
            );
        }
    }

    return (
        <Modal
            title="批量导出"
            visible={open}
            footer={footerRender()}
            width={648}
            onCancel={handleClose}
            className={styles.batchExportModal}
        >
            {renderModalContent()}
        </Modal>
    );
};

export default observer(BatchExport);
