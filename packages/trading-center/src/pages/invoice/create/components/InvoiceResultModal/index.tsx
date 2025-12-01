import { Modal, Result, Button } from 'antd'
import styles from './index.module.less'
import { history } from 'umi'
const InvoiceResultModal = props => {
    const { invoiceCode, visible } = props

    return (
        <Modal
            width={506}
            centered
            destroyOnClose
            title={false}
            footer={false}
            open={visible}
            closable={false}
            className={styles.status_content}
        >
            <Result
                status="success"
                title={<div className={styles.status_info}>提交成功，待审核</div>}
                subTitle={
                    <div className={styles.price_info}>工作人员将在1-3个工作日内完成审核</div>
                }
                extra={
                    invoiceCode
                        ? [
                              <Button
                                  type="primary"
                                  onClick={() => {
                                      history.replace('/invoice')
                                  }}
                              >
                                  返回
                              </Button>,
                              <Button
                                  onClick={() => {
                                      if (invoiceCode) {
                                          history.replace(`/invoice/detail?code=${invoiceCode}`)
                                      } else {
                                          history.replace('/invoice')
                                      }
                                  }}
                              >
                                  查看详情
                              </Button>,
                          ]
                        : [
                              <Button
                                  type="primary"
                                  onClick={() => {
                                      history.replace('/invoice')
                                  }}
                              >
                                  返回
                              </Button>,
                          ]
                }
            />
        </Modal>
    )
}

export default InvoiceResultModal
