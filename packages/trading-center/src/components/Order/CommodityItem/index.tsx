import { history, NavLink } from 'umi'
import { Button, Checkbox, Modal, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'
import styles from './index.module.less'
import { filterNum } from '@/utils/numberTransform'
import type { indexType } from './interface'
import { QuestionCircleOutlined } from '@ant-design/icons'
import PointItem from '@/components/Order/PointItem'
import { ORDER_STATUS_MAP } from '@/pages/order/const'
import Decimal from 'decimal.js'
import classnames from 'classnames'
import { PlayStatus, STATUSENUM } from '@/pages/order/interface.d'
import { isToPlay } from '@/pages/order/utils'
import Http from '@/servers/http'
import { getPortalCodeFromUrl } from '@wotu/wotu-components'
import { getCookie, getSessionStorage } from '@/storage'

let _status: string = ''
let isOnlyGood: boolean = false

interface CommodityItemType {
    modify: boolean
    isServe: boolean
    isRefund: boolean
    tabStatus: string
    data: Record<string, any>
    cancelCallback: any
    allPrice: boolean
    goodsList: any[]
    playCallback: (path: string, code: string) => void
    checkItem: (i: any) => void
}
function CommodityItem({
    modify = true,
    isServe = false,
    isRefund = false,
    tabStatus,
    data = {},
    cancelCallback,
    allPrice,
    goodsList,
    playCallback,
    checkItem,
}: Partial<CommodityItemType>) {
    _status = data.status
    isOnlyGood = data?.goodsList?.length === 1 ? true : false
    const playStatus = data.payStatus

    const handleInvoiceBill = async (code: string, orderRefundStatus: number) => {
        if (orderRefundStatus !== 1) {
            history.push(`/invoice/create?code=${code}`)
        } else {
            Modal.warning({
                centered: true,
                title: '当前订单有进行中的退款申请，请等待退款完成再申请开票。',
                okText: '我知道了',
            })
        }
    }
    const handleDownloadBill = async () => {
        Modal.confirm({
            title: '是否下载结算单?',
            cancelText: '取消',
            okText: '确认',
            centered: true,
            onOk: () => {
                Http(
                    '/order/front/export_contract_order',
                    'get',
                    { code: data.code },
                    {
                        responseType: 'blob',
                    },
                ).then((res: any) => {
                    const aDom = document.createElement('a')
                    aDom.download = '结算单.pdf'
                    // 创建二进制对象
                    const blob = new Blob([res], { type: 'application/pdf;charset=utf-8' })
                    const url = window.URL.createObjectURL(blob)
                    aDom.target = '_blank'
                    aDom.href = url
                    aDom.click()
                })
            },
        })
    }

    const getPlayReactNode = (
        status: string,
        isContractOrder: boolean,
        canApplyBlueInvoice: boolean,
        orderInvoicingStatus: number,
        orderPayAmount: number,
        orderRefundStatus: number,
    ) => {
        /**
         * 判断是否是合同型订单 是的话 就隐藏 取消订单按钮 0 否 1是
         */
        let closeJsxNode = !Number(isContractOrder) ? (
            <span
                className={styles.no_payment}
                onClick={() => cancelOrder(data.code, cancelCallback)}
            >
                取消订单
            </span>
        ) : null
        return (
            <>
                {isToPlay(status) ? (
                    <>
                        <Button
                            type="primary"
                            className={styles.to_payment}
                            onClick={() => playCallback?.(toPayment(data.code), data.code)}
                        >
                            支付
                        </Button>
                        {closeJsxNode}
                    </>
                ) : null}

                {(orderInvoicingStatus === 0 || orderInvoicingStatus === 6) &&
                Number(orderPayAmount) > 0 &&
                String(status) !== STATUSENUM.CLOSE_STATUS ? (
                    <Typography.Link
                        className={styles.editor_payment}
                        onClick={() => handleInvoiceBill(data.code, orderRefundStatus)}
                    >
                        申请开票
                    </Typography.Link>
                ) : null}
                {Number(isContractOrder) ? (
                    <Typography.Link className={styles.editor_payment} onClick={handleDownloadBill}>
                        下载结算单
                    </Typography.Link>
                ) : null}
                <NavLink
                    className={styles.editor_payment}
                    to={`/order/detail?orderId=${data.code}`}
                >
                    订单详情
                </NavLink>
            </>
        )
    }

    /**
     *  获取元素外框的样式 主要用在已逾期状态下
     * @param status
     * @returns
     */
    const getWarpStyle = (status: string, orderStatus: string) => {
        const isOverdue = data?.overdueStatus === 2
        let mapStyle: any = {
            [PlayStatus.OVERDUE_STATUS]: {
                warp: { border: '1px solid #FFE5E5' },
                item: { borderBottom: '1px solid #FFE5E5' },
                operation: {
                    borderBottom: '1px solid #FFE5E5',
                    borderLeft: '1px solid #FFE5E5',
                },
                title: { background: '#FFF8F8' },
                text: { color: '#FF4D4F' },
            },
            [PlayStatus.CLOSE_STATUS]: {
                title: { background: '#FAFAFA' },
            },
        }

        const orderStatusMap: any = {
            [STATUSENUM.CLOSE_STATUS]: {
                title: { background: '#FAFAFA' },
            },
        }
        return (
            orderStatusMap[orderStatus] ||
            (isOverdue ? mapStyle[PlayStatus.OVERDUE_STATUS] : mapStyle[status]) ||
            {}
        )
    }

    return (
        <div className={styles.commodity_item} style={getWarpStyle(playStatus, _status).warp}>
            <div
                className={styles.commodity_item_hearder}
                style={getWarpStyle(playStatus, _status).title}
            >
                <div className={styles.commodity_item_left}>
                    {['1', '6'].includes(tabStatus) ? (
                        <Checkbox
                            className={styles.commodity_item_checkbox}
                            checked={data.active}
                            onChange={() => {
                                checkItem(data)
                            }}
                        />
                    ) : null}
                    <NavLink
                        to={`/order/detail?orderId=${data.code}`}
                        className={styles.order_no}
                        style={getWarpStyle(playStatus, _status).text}
                    >
                        订单ID：{data.orderNo || '-'}
                    </NavLink>
                </div>
                <div className={styles.order_time}>
                    {data.createdAt ? dayjs(data.createdAt).format('YYYY-MM-DD HH:mm:ss') : '-'}
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.commodity_item_list} id="popver">
                    {goodsList?.map?.((item: any) => {
                        let hasAmount = false
                        if (isRefund) {
                            /** 商品总额 */
                            let goodsAmount = Number(
                                new Decimal(item?.quantity || 0).mul(new Decimal(item?.price || 0)),
                            )
                            /** 商品可退款总金额 */
                            let refundAmount = Number(
                                new Decimal(goodsAmount).sub(new Decimal(item?.refundAmountAll)),
                            )
                            if (refundAmount > 0 && item?.refundStatus === 0) {
                                hasAmount = true
                            }
                        }

                        return (
                            <div
                                className={classnames(
                                    styles.item,
                                    isOnlyGood ? styles.only_good : null,
                                )}
                                key={item.code}
                                // style={getWarpStyle(playStatus,_status).item}
                            >
                                <div className={styles.image_warp}>
                                    <img
                                        src={item.goodsImage}
                                        alt={item.goodsName}
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.describe}>
                                    <div
                                        className={styles.name}
                                        style={item.goodsAttributes ? {} : { marginBottom: '0' }}
                                    >
                                        {item.goodsName ?? ''}
                                    </div>
                                    {item.goodsAttributes ? (
                                        <Tooltip
                                            title={
                                                <div className={styles.hover_text}>
                                                    {item.goodsAttributes}
                                                </div>
                                            }
                                        >
                                            <div className={styles.cycle}>
                                                {item.goodsAttributes || ''}
                                            </div>
                                        </Tooltip>
                                    ) : null}
                                </div>
                                <div className={styles.item_data}>
                                    <div>￥{filterNum(item.price)}</div>
                                    <div>{item.quantity ?? ''}</div>

                                    {/* 
                                        表示列表是否在展示 申请退款按钮
                                        isservre 表示 订单是否在支付的 15天之内
                                     */}
                                    {isServe ? (
                                        <div className={styles.serve}>
                                            {isRefund && hasAmount && (
                                                <NavLink
                                                    to={`/refund/apply?orderId=${data.code}&goodsId=${item.code}`}
                                                    className={styles.serve_content}
                                                >
                                                    <Tooltip title="因特殊原因，可对15天内“已完成的订单”进行“申请退款”操作">
                                                        <span>申请退款</span>
                                                        <QuestionCircleOutlined rev={undefined} />
                                                    </Tooltip>
                                                </NavLink>
                                            )}

                                            {item?.refundStatus ? (
                                                <NavLink
                                                    to={`/refund/detail?code=${item.refundingOrderCode}`}
                                                    className={styles.serve_content}
                                                >
                                                    退款详情
                                                </NavLink>
                                            ) : null}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        )
                    })}
                </div>
                {allPrice && <div className={styles.all_price}>￥{data.payAmount || '-'}</div>}

                <div
                    className={styles.status}
                    style={{
                        ...getWarpStyle(playStatus, _status).operation,
                    }}
                >
                    <div className={styles.status_item}>
                        <PointItem
                            status={_status as unknown as string}
                            statusMap={ORDER_STATUS_MAP}
                        />
                    </div>
                </div>
                {modify ? (
                    <div
                        className={styles.payment}
                        style={{ ...getWarpStyle(playStatus, _status).operation }}
                    >
                        {getPlayReactNode(
                            _status,
                            data.contractOrder,
                            data.canApplyBlueInvoice,
                            data.invoicingStatus,
                            data.payAmount,
                            data.refundStatus,
                        )}
                    </div>
                ) : null}
            </div>
            <div className={styles.desc}>
                <div>备注：</div>
                <div>{data.remark || '暂无备注'}</div>
            </div>
        </div>
    )
}
//去支付的页面
function toPayment(code: string) {
    const platform = getSessionStorage('PLATFORM')
    // const portalCode = getPortalCodeFromUrl()
    const currentAlias = getPortalCodeFromUrl({ isGetDomain: true })
    const identity = getCookie('SELECT_IDENTITY_CODE')

    switch (platform) {
        case 'portal':
            return `/${currentAlias}/transaction/order/payment?orderId=${code}&identity=${identity}`
        case 'workbench':
            return `/trading-center/order/payment?orderId=${code}&identity=${identity}`
        case 'middle':
            return `/transaction/order/payment?orderId=${code}&identity=${identity}`
        default:
            return `/order/payment?orderId=${code}&identity=${identity}`
    }
}

//取消订单
function cancelOrder(code: string, callBack?: any) {
    Modal.confirm({
        title: '你确定要取消掉这个订单么？',
        okText: '确认',
        cancelText: '取消',
        centered: true,
        onOk() {
            return callBack?.(code)
        },
    })
}

//合并每一个属性
function joinArrtibute(arr: any[]) {
    if (arr?.length > 1) {
        return arr.reduce((a, b) => `${a}${b.name}：${b.value} / `, '').replace(/( - )$/i, '')
    } else {
        return arr.reduce((a, b) => `${a}${b.name}：${b.value} `, '')
    }
}

//生成头部
function getTableHearder({
    modify = true,
    isServe = false,
    allPrice = false,
}: Partial<{ modify: boolean; isServe: boolean; allPrice: boolean }>) {
    return (
        <>
            <ul className={styles.hearder}>
                <li>商品</li>
                <li className={styles.price}>单价</li>
                <li className={styles.num}>数量</li>
                {allPrice && <li className={styles.all_price}>订单金额</li>}
                {isServe && <li className={styles.editor}>操作</li>}
                <li className={styles.state}>状态</li>
                {modify && <li className={styles.editor}>操作</li>}
            </ul>
        </>
    )
}

const statusText = {
    '1': '未支付',
    '2': '支付待确认',
    '3': '已支付',
    '4': '已完成',
    '5': '已关闭',
}
//时间格式化统一
const formatString = 'YYYY-MM-DD HH:mm:ss'

//获取头部
CommodityItem.getTableHearder = getTableHearder

//跳转支付的逻辑
CommodityItem.toPayment = toPayment

//取消订单
CommodityItem.cancelOrder = cancelOrder

//提示文字
CommodityItem.statusText = statusText as indexType

//合并属性
CommodityItem.joinArrtibute = joinArrtibute

//时间格式化统一
CommodityItem.formatString = formatString

export { joinArrtibute, cancelOrder, toPayment, getTableHearder, formatString }

export default CommodityItem
