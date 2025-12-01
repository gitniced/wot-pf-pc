import { useEffect } from 'react'
import { history } from 'umi'
import { Button, message, Modal, Row, Space, Tooltip } from 'antd'
import { useLocalObservable, observer } from 'mobx-react'
import BlockBox from '@/components/Order/BlockBox'
import Minititle from '@/components/Order/Minititle'
// import StepLine from '../components/StepLine'
import TemplateLayout from '@/components/Order/TemplateLayout'
import styles from './index.module.less'
// import Footer from '@/components/Order/Footer'
// import Waring from '@/components/Order/Waring'
import Hooks from './store'
import { invoiceType, invoiceStateEnum } from '../constants'
import dayjs from 'dayjs'
import Clipboard from 'clipboard'
import RenderItem from '@/components/RenderItem'
import { DownloadOutlined } from '@ant-design/icons'

import { Document as PdfDocument, Page as PdfPage, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
pdfjs.GlobalWorkerOptions.workerSrc = `https://static.zpimg.cn/public/react_pdf/pdf.worker_3.11.174.js`
const pdfJSOptions = {
    cMapUrl: 'https://static.zpimg.cn/public/react_pdf/cmaps/',
}

function Detail() {
    useEffect(() => {
        document.title = '我的发票'
    })
    const { query } = history.location || {}
    const hooks = useLocalObservable(() => new Hooks())
    useEffect(() => {
        hooks.getDetailValue(query?.code as string, query?.makeType as unknown as number)
    }, [query?.code, query?.makeType])
    // 复制按钮
    const copy = new Clipboard('.copy-btn')
    copy.on('success', function (e) {
        console.log('👉 e:', e)
        message.success('复制成功')
    })
    copy.on('error', function (e) {
        message.error('复制失败')
        console.error('Action:', e.action)
        console.error('Trigger:', e.trigger)
    })

    useEffect(() => {
        copy.destroy()
    }, [copy])

    /** 发票item */
    const InvoiceLinkItem = (invoiceUrl: string) => {
        return (
            <div className={styles.invoice_item} key={invoiceUrl}>
                <div
                    className={styles.invoice_link}
                    title="查看"
                    onClick={() => {
                        Modal.info({
                            width: 700,
                            centered: true,
                            title: false,
                            icon: false,
                            className: styles.my_modal,
                            maskClosable: true,
                            content: (
                                <Row justify="center">
                                    <PdfDocument file={invoiceUrl} options={pdfJSOptions}>
                                        <PdfPage pageNumber={1} />
                                    </PdfDocument>
                                </Row>
                            ),
                        })
                    }}
                >
                    查看
                </div>
                <div
                    title="下载"
                    className={styles.invoice_icon}
                    onClick={() => {
                        let a = document.createElement('a')
                        a.href = invoiceUrl!
                        a.target = '_blank'
                        a.rel = 'noopener noreferrer'
                        a.style.display = 'none'
                        a.download = invoiceUrl! //下载后的文件名
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                    }}
                >
                    <DownloadOutlined
                        style={{ color: 'var(--primary-color)', margin: '0 0 0 10px' }}
                    />
                    下载
                </div>
            </div>
        )
    }

    // 开票信息
    const orderDataJson = () => {
        const detail = hooks.detail || {}

        return [
            {
                label: '申请编号：',
                value: detail.invoiceNo ?? '-',
            },
            {
                label: '发票类型：',
                value: <span>{invoiceType[detail.invoiceType] ?? '-'}</span>,
            },
            {
                label: '开票金额：',
                value: `￥${detail.amount || '-'}`,
            },
            {
                label: '关联订单：',
                value: (
                    <div className={styles.order_id}>
                        {detail.orderList?.length > 1 ? (
                            <>
                                {detail.orderList.length}个订单
                                <Button
                                    className={styles.order_id_btn}
                                    type={'link'}
                                    onClick={() => {
                                        history.push(`/invoice/orders?invoiceCode=${query?.code}`)
                                    }}
                                >
                                    查看
                                </Button>
                            </>
                        ) : (
                            detail.orderList?.[0]?.code
                        )}
                    </div>
                ),
            },
            {
                label: '邮箱：',
                value: detail.email || '-',
            },
            {
                label: '发票备注：',
                value: detail.remark ? (
                    <Tooltip
                        title={detail.remark}
                        getTooltipContainer={e => e.parentElement?.parentElement!}
                    >
                        {detail.remark}
                    </Tooltip>
                ) : (
                    '-'
                ),
            },

            {
                label: '开票要求：',
                value: detail.requirement ? (
                    <Tooltip
                        title={detail.requirement}
                        getTooltipContainer={e => e.parentElement?.parentElement!}
                    >
                        {detail.requirement}
                    </Tooltip>
                ) : (
                    '-'
                ),
            },
            // {
            //     label: '买家名称：',
            //     value: detail.buyerName || '-',
            // },
            // {
            //     label: '订单金额：',
            //     value: getPrice(detail.amount),
            // },
        ]
    }
    // 抬头信息
    const titleDataJson = () => {
        const detail = hooks.detail || {}
        return [
            {
                label: '抬头类型：',
                value: detail.titleTypeDesc || '-',
            },
            {
                label: '抬头名称：',
                // value:
                //     (Number(detail.titleType) === 2 ? detail.titlePersonName : detail.titleName) ||
                //     '-',
                value: (
                    Number(detail.titleType) === 2 ? detail.titlePersonName : detail.titleName
                ) ? (
                    <Tooltip
                        title={
                            Number(detail.titleType) === 2
                                ? detail.titlePersonName
                                : detail.titleName
                        }
                        getTooltipContainer={e => e.parentElement?.parentElement!}
                    >
                        {Number(detail.titleType) === 2 ? detail.titlePersonName : detail.titleName}
                    </Tooltip>
                ) : (
                    '-'
                ),
            },
            {
                label: '税号：',
                value: detail.taxNum ? (
                    <Tooltip
                        title={detail.taxNum}
                        getTooltipContainer={e => e.parentElement?.parentElement!}
                    >
                        {detail.taxNum}
                    </Tooltip>
                ) : (
                    '-'
                ),
            },
            {
                label: '电话：',
                value: detail.titlePhone ? (
                    <Tooltip
                        title={detail.titlePhone}
                        getTooltipContainer={e => e.parentElement?.parentElement!}
                    >
                        {detail.titlePhone}
                    </Tooltip>
                ) : (
                    '-'
                ),
            },
            {
                label: '地址：',
                value: detail.titleAddress ? (
                    <Tooltip
                        title={detail.titleAddress}
                        getTooltipContainer={e => e.parentElement?.parentElement!}
                    >
                        {detail.titleAddress}
                    </Tooltip>
                ) : (
                    '-'
                ),
            },
            {
                label: '银行账号：',
                value: detail.bankAccount ? (
                    <Tooltip
                        title={detail.bankAccount}
                        getTooltipContainer={e => e.parentElement?.parentElement!}
                    >
                        {detail.bankAccount}
                    </Tooltip>
                ) : (
                    '-'
                ),
            },
            {
                label: '开户行：',
                value: detail.openningBank ? (
                    <Tooltip
                        title={detail.openningBank}
                        getTooltipContainer={e => e.parentElement?.parentElement!}
                    >
                        {detail.openningBank}
                    </Tooltip>
                ) : (
                    '-'
                ),
            },
        ]
    }

    // 开票成功展示
    const resultSuccessDataJson = (item: any) => {
        const { invoiceTime, invoiceNumber, invoiceUrl, titleName } = item || {}
        return [
            {
                label: '开票时间：',
                value: invoiceTime ? dayjs(invoiceTime).format('YYYY-MM-DD HH:mm:ss') : '-',
            },
            {
                label: '发票号码：',
                value: invoiceNumber ? (
                    <Tooltip
                        title={invoiceNumber}
                        getTooltipContainer={e => e.parentElement?.parentElement!}
                    >
                        {invoiceNumber}
                    </Tooltip>
                ) : (
                    '-'
                ),
            },
            {
                label: '电子发票：',
                value: invoiceUrl ? (
                    <div className={styles.invoice_group}>
                        {invoiceUrl?.split?.(',')?.map?.((str: string) => InvoiceLinkItem(str))}
                    </div>
                ) : (
                    '-'
                ),
            },
        ]
    }

    // 开票失败展示
    const resultFailDataJson = (item: any) => {
        const { invoiceTime, rejectReason } = item || {}
        return [
            {
                label: '失败时间：',
                value: invoiceTime ? dayjs(invoiceTime).format('YYYY-MM-DD HH:mm:ss') : '-',
            },
            {
                label: '失败原因：',
                value: rejectReason ? (
                    <Tooltip
                        title={rejectReason}
                        getTooltipContainer={e => e.parentElement?.parentElement!}
                    >
                        {rejectReason}
                    </Tooltip>
                ) : (
                    '-'
                ),
            },
        ]
    }

    // 红冲展示
    const redDataJson = (item: any) => {
        const { invoiceTime, invoiceNumber, invoiceUrl, titleName } = item || {}
        return [
            {
                label: '开票时间：',
                value: invoiceTime ? dayjs(invoiceTime).format('YYYY-MM-DD HH:mm:ss') : '-',
            },
            {
                label: '发票号码：',
                value: invoiceNumber ? (
                    <Tooltip
                        title={invoiceNumber}
                        getTooltipContainer={e => e.parentElement?.parentElement!}
                    >
                        {invoiceNumber}
                    </Tooltip>
                ) : (
                    '-'
                ),
            },
            {
                label: '电子发票：',
                value: invoiceUrl ? (
                    <div className={styles.invoice_group}>
                        {invoiceUrl?.split?.(',')?.map?.((str: string) => InvoiceLinkItem(str))}
                    </div>
                ) : (
                    '-'
                ),
            },
        ]
    }

    const getStepLineNumber = () => {
        const { status } = hooks.detail
        const statusMap: Record<string, 0 | 1 | 2 | 3> = {
            [invoiceStateEnum.EXAMINE]: 0,
            [invoiceStateEnum.PADDING]: 1,
            [invoiceStateEnum.REJECT]: 2,
            [invoiceStateEnum.RESOLV]: 3,
        }
        return statusMap[status] ?? 0
    }
    // 开票结果
    const getResultView = () => {
        const { invoiceResultList = [] } = hooks.detail || {}

        console.log('invoiceResultList', invoiceResultList)
        return invoiceResultList.map((item: any) => {
            const { status } = item || {}
            if (status === invoiceStateEnum.REJECT) {
                return (
                    <div className={styles.result}>
                        <div className={styles.mini_header}> 开票结果</div>
                        <RenderItem dataJson={resultFailDataJson(item)} />
                    </div>
                )
            } else {
                return (
                    <>
                        <div className={styles.result}>
                            <div className={styles.mini_header}> 开票结果</div>
                            <RenderItem dataJson={resultSuccessDataJson(item)} />
                        </div>
                    </>
                )
            }
        })
    }
    // 红冲结果
    const getRedView = () => {
        const { redInvoiceResultList = [] } = hooks.detail || {}
        return redInvoiceResultList.map((item: any) => {
            return (
                <>
                    <div className={styles.result}>
                        <div className={styles.mini_header_red}> 红冲结果</div>
                        <RenderItem dataJson={redDataJson(item)} />
                    </div>
                </>
            )
        })
    }

    return (
        <div className={styles.detail_page}>
            {/* <BlockBox style={{ marginBottom: '24px', overflow: 'visible' }}>
                <Minititle title="发票申请" />
                {hooks.detail.status === invoiceStateEnum.EXAMINE ? (
                    <Waring text="发票申请已提交，请耐心等待审核结果，审核通过后将于1-3个工作日完成开票" />
                ) : null}
                <StepLine
                    current={getStepLineNumber()}
                    error={hooks.detail.status === invoiceStateEnum.REJECT}
                />
                <div className={styles.card_line}>
                    <div className={styles.left}></div>
                    <div className={styles.right}></div>
                </div>
            </BlockBox> */}
            <BlockBox style={{ marginBottom: '24px', overflow: 'visible' }}>
                <Minititle title="发票详情" />
                {/*开票信息 */}
                <div className={styles.mini_header}> 开票信息</div>
                <TemplateLayout
                    dataJson={orderDataJson()}
                    col={3}
                    lineStyle={{ marginBottom: '16px' }}
                />

                {/*抬头信息 */}
                <div className={styles.mini_header}> 抬头信息</div>
                <TemplateLayout
                    dataJson={titleDataJson()}
                    col={3}
                    lineStyle={{ marginBottom: '16px' }}
                />
                {/*开票结果 */}
                {getResultView()}

                {/*红冲结果 */}
                {getRedView()}
            </BlockBox>

            {/* <Footer>
                <div className={styles.footer} onClick={() => history.goBack()}>
                    <div className={styles.go_back}>
                        <svg
                            className={styles.svg_icon}
                            width="200"
                            height="200"
                            aria-hidden="true"
                        >
                            <use xlinkHref="#icon_back"> </use>
                        </svg>
                        返回
                    </div>
                </div>
            </Footer> */}
        </div>
    )
}

const ObserverDetail = observer(Detail)

ObserverDetail.title = '发票详情'

export default ObserverDetail
