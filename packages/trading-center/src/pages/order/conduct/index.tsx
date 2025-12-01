import React, { useEffect, useRef } from 'react'
import { history } from 'umi'
import { Input, Button, Popover, Table } from 'antd'
import { useLocalObservable, observer } from 'mobx-react'
import styles from './index.module.less'
import BlockBox from '@/components/Order//BlockBox'
import Setup from '@/components/Order/Setup'
import AllPrice from '@/components/Order/AllPrice'
import Footer from '@/components/Order/Footer'
import LayoutPage from '@/components/Order/LayoutPage'
import { filterNum } from '@/utils/numberTransform'
import Hooks from './hooks'
import { isEmpty } from 'lodash'
import { ORDER_BUSINESS_TEXT } from '../const'
import { getPortalCodeFromUrl } from '@wotu/wotu-components'
import { getSessionStorage } from '@/storage'
function Conduct() {
    const { orderId, identity } = history.location.query || {}
    const hooks = useLocalObservable(() => new Hooks())
    const textareaData = useRef('')

    /**
     * 提交
     */
    const submit = () => {
        hooks
            .submitOrder({
                code: orderId,
                remark: textareaData.current,
            })
            .then(() => {
                const platform = getSessionStorage('PLATFORM')
                const currentAlias = getPortalCodeFromUrl({ isGetDomain: true })
                switch (platform) {
                    case 'portal':
                        location.href = `/${currentAlias}/transaction/order/payment?orderId=${orderId}&identity=${identity}`
                        break
                    case 'workbench':
                        location.href = `/trading-center/order/payment?orderId=${orderId}&identity=${identity}`
                        break
                    case 'middle':
                        location.href = `/transaction/order/payment?orderId=${orderId}&identity=${identity}`
                        break
                    default:
                        location.href = `/order/payment?orderId=${orderId}&identity=${identity}`
                }
            })
    }
    /**
     *  返回
     * @returns
     */
    // const goBack = () => history.replace('/order')
    /**
     *  获取 文本域内容
     * @param e
     */
    const getTextarea = (e: any) => {
        textareaData.current = e.target.value
    }

    useEffect(() => {
        hooks.getConductData(orderId as string, identity as string)
    }, [])
    const columns = [
        {
            title: '编号',
            dataIndex: 'reservedCode',
            key: 'reservedCode',
        },
        {
            title: '名称',
            dataIndex: 'bizName',
            key: 'bizName',
        },
        {
            title: '数量',
            dataIndex: 'bizCount',
            key: 'bizCount',
        },
    ]
    return (
        <LayoutPage>
            <div className={styles.conduct}>
                <Setup setup={1} />
                <>
                    <BlockBox>
                        <div className={styles.title}> 确认订单信息</div>
                        <div className={styles.hearder}>
                            {hooks.headerList.map(item => (
                                <div key={item.key}>{item.name}</div>
                            ))}
                        </div>
                        <div className={styles.content} id="popver">
                            {hooks.orderDetail.goodsOrderList?.map?.((item: any) => {
                                return (
                                    <div className={styles.item} key={item.code}>
                                        <div className={styles.commodity}>
                                            <div className={styles.image_warp}>
                                                <img
                                                    src={item.goodsImage || ''}
                                                    alt={item.goodsName}
                                                    className={styles.image}
                                                />
                                            </div>
                                            <div className={styles.desc}>
                                                <div className={styles.name}>
                                                    {item.goodsName || '-'}
                                                </div>
                                                {item.goodsAttributes && (
                                                    <Popover
                                                        color="rgba(0, 0, 0, 0.75)"
                                                        getPopupContainer={() =>
                                                            document.getElementById(
                                                                'popver',
                                                            ) as HTMLLIElement
                                                        }
                                                        content={
                                                            <div className={styles.hover_text}>
                                                                {item.goodsAttributes}
                                                            </div>
                                                        }
                                                    >
                                                        <div className={styles.attrbute}>
                                                            {item.goodsAttributes}
                                                        </div>
                                                    </Popover>
                                                )}
                                            </div>
                                        </div>
                                        <div className={styles.price}>
                                            ￥{filterNum(item.price)}
                                        </div>
                                        <div className={styles.num}>{item.quantity ?? ''}</div>
                                        {/* <div className={styles.tax}>
                                            {filterTaxRate(item.taxRate) || 0}%
                                        </div> */}
                                        <div className={styles.all_price}>
                                            ￥
                                            {hooks.getAllTotalPrice(
                                                item.quantity ?? 0,
                                                item.price ?? 0,
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.describe}>
                            <div>备注信息：</div>
                            <Input.TextArea
                                className={styles.textarea}
                                rows={4}
                                placeholder="请输入"
                                maxLength={1000}
                                style={{ minHeight: 100 }}
                                onChange={getTextarea}
                            />
                        </div>
                        <AllPrice
                            preferentialType={hooks.orderDetail.preferentialType}
                            preferential={hooks.orderDetail.preferential}
                            total={filterNum(hooks.orderDetail.payAmount)}
                        />
                        {!isEmpty(hooks.orderDetail?.contract) &&
                            hooks.orderDetail?.reservedInfoList?.length > 0 && (
                                <div style={{ marginBottom: '36px' }}>
                                    <div className={styles.title}>
                                        关联
                                        {ORDER_BUSINESS_TEXT[
                                            hooks.orderDetail?.contractOrderType
                                        ] || ''}
                                    </div>
                                    <Table
                                        columns={columns}
                                        dataSource={hooks.orderDetail?.reservedInfoList || []}
                                        pagination={false}
                                    />
                                </div>
                            )}
                    </BlockBox>
                    <Footer centerWidth="1200px">
                        {/* <div className={styles.go_back} onClick={goBack}>
                            <svg
                                className={styles.svg_icon}
                                width="200"
                                height="200"
                                aria-hidden="true"
                            >
                                <use xlinkHref="#icon_back"> </use>
                            </svg>
                            返回
                        </div> */}
                        {hooks.isGetData ? (
                            <Button type="primary" onClick={submit}>
                                提交订单
                            </Button>
                        ) : null}
                    </Footer>
                </>
            </div>
        </LayoutPage>
    )
}

const Component = observer(Conduct)
// @ts-ignore
Component.title = '收银台'
export default Component
