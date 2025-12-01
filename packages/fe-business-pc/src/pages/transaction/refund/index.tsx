import React, { useRef, useEffect } from 'react'
import { Button, Tooltip, Modal, Select } from 'antd'
import { useLocalObservable, observer } from 'mobx-react'
import Store from './store'
import BlockBox from '@/components/BlockBox'
import { DatePicker } from '@/components/Picker'
import { SuperTable, findSiteData } from '@wotu/wotu-components'
import type { ColumnsType, FormRef } from '@wotu/wotu-components/dist/esm/SuperTable/interface.d'
import styles from './index.module.less'
import MoreSelect from '@/components/MoreSelect'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { history } from 'umi'
import type { IRoute } from 'umi'
import { getCookie, getLocalStorage } from '@/storage'
import RefundOrderItem from '../order/components/RefundOrderItem'
import { debounce } from 'lodash'

interface DataType {
    key: string
    name: string
    age: number
    address: string
    tags: string[]
}

const { RangePicker } = DatePicker

/**
 * 时间跨度的弹窗
 */
const emptyTime = () => {
    Modal.info({
        title: '提示',
        icon: <ExclamationCircleOutlined style={{ color: '#FAAD14' }} />,
        content: '可支持查询的最长时间跨度为365天，请进行日期筛选后再导出。',
    })
}
const emptyList = () => {
    Modal.info({
        title: '提示',
        icon: <ExclamationCircleOutlined style={{ color: '#FAAD14' }} />,
        content: '暂无可导出数据',
    })
}
/**
 * 导出成功
 */
const exportSuccess = () => {
    Modal.confirm({
        title: '操作成功',
        icon: <ExclamationCircleOutlined />,
        content: '请在“批量操作”中查看进度',
        okText: '查看进度',
        cancelText: '我知道了',
        onOk: () => {
            const siteData = getLocalStorage('SITE_STORE')
            const loginUrl = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' })
            window.location.href = `${loginUrl}/account/organization/action`
        },
    })
}

/**
 *  时间跨度是否超过了 366 天
 * @param params
 * @returns
 */
const testRange = (paramsArr: any, day = 366) => {
    /**
     *  往后减去 固定天数 如果减去后 开始世家还是大于 结束时间
     *  那么就表示这个时间区间 大于了 所指定的时间
     */
    const [startTime, endTime] = paramsArr
    if (!startTime || !endTime) return true
    const newEndTime = endTime.subtract(day, 'day')
    return newEndTime.valueOf() > startTime.valueOf()
}

/**
 * 获取订单的商品名称
 * @param text
 * @returns
 */
export const getGoodsPopover = (text: string) => {
    const popLength = 45
    if (text.length > popLength) {
        return <Tooltip title={text}>{text.slice(0, popLength) + '...'}</Tooltip>
    }
    return text
}

const parseParams = (param: any) => {
    if (param.createTime) {
        param.createTime[0] && (param.createStartTime = param.createTime[0].valueOf())
        param.createTime[1] && (param.createEndTime = param.createTime[1].valueOf())
    }
}
const formItemProps = {
    fieldProps: {
        style: {
            width: '246px',
        },
    },
    formItemProps: {
        style: {
            width: '328px',
        },
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    },
}

function Refund() {
    const store = useLocalObservable(() => new Store())
    const goodsCode = history.location?.query?.goodsCode as string | undefined
    const formRef = useRef<FormRef>({})
    const refundRef = useRef({})
    const isMerchant = () => getCookie('SELECT_USER_TYPE') === 'merchant'
    useEffect(() => {
        document.title = '售后管理'
        const { goodsName, orderNo } = history.location.query
        if (goodsName && orderNo) {
            formRef.current.setFieldsValue({
                orderNo,
                goodsName,
                // code: goodsCode
            })
            refundRef?.current?.reload()
        }
    }, [])
    const columns = [
        isMerchant()
            ? {
                  title: '站点',
                  dataIndex: 'sid',
                  key: 'sid',
                  search: true,
                  renderFormItem() {
                      return (
                          <MoreSelect
                              all={false}
                              maxLength={5}
                              placeholder="请选择站点"
                              valueKey={'value'}
                              requestUrl={'/search/front/order/page_order_sid'}
                          />
                      )
                  },
              }
            : null,
        {
            title: '售后编号',
            dataIndex: 'code',
            key: 'code',
            search: true,
            ...formItemProps,
        },
        {
            title: '订单编号',
            dataIndex: 'orderNo',
            key: 'orderNo',
            search: true,
            ...formItemProps,
        },
        {
            title: '商品名称',
            key: 'goodsName',
            dataIndex: 'goodsName',
            search: true,
            ...formItemProps,
        },
        {
            title: '买家类型',
            key: 'buyerType',
            dataIndex: 'buyerType',
            search: true,
            valueType: 'select',
            ...formItemProps,

            renderFormItem() {
                return (
                    <Select style={{ width: '246px' }}>
                        <Select.Option value={1}>个人</Select.Option>
                        <Select.Option value={2}>机构</Select.Option>
                    </Select>
                )
            },
        },
        {
            title: '申请日期',
            key: 'createTime',
            dataIndex: 'createTime',
            search: true,
            // formItemProps: {
            //     style: {
            //         width: '328px',
            //     },
            //     labelCol: { span: 6 },
            //     wrapperCol: { span: 18 }
            // },
            formItemProps: {
                style: {
                    width: '328px',
                },
                labelCol: { span: 6 },
                wrapperCol: { span: 18 },
            },
            renderFormItem() {
                return (
                    <RangePicker
                        className={styles.create_time_search_rangepicker}
                        style={{ width: '246px', fontSize: '14px' }}
                    />
                )
            },
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            search: true,
            ...formItemProps,
            valueType: 'select',
            valueEnum: {
                0: {
                    text: '待审核',
                },
                1: {
                    text: '售后中',
                },
                2: {
                    text: '已完成',
                },
                3: {
                    text: '申请失败',
                },
            },
        },
    ].filter(Boolean) as ColumnsType<DataType>
    const exportRefound = async () => {
        const currentTime = formRef.current.getFieldValue('createTime')
        console.log(currentTime)
        if (!currentTime || currentTime?.length < 2 || testRange(currentTime)) {
            emptyTime()
            return
        }
        let params = formRef.current.getFieldsValue()
        parseParams(params)
        const res = await store.getRefundList({
            pageNo: 1,
            pageSize: 10,
            goodsCode,
            ...params,
        })
        if (res?.data?.length === 0) {
            emptyList()
            return
        }
        store.exportRefundFile(params).then(() => {
            exportSuccess()
        })
    }
    const debounceExportRefound = debounce(exportRefound, 1000)
    return (
        <BlockBox className={styles.refund_list}>
            <SuperTable
                formRef={formRef}
                actionRef={refundRef}
                renderOptionBar={{
                    center: () => {
                        return (
                            <Button type="primary" onClick={debounceExportRefound}>
                                导出
                            </Button>
                        )
                    },
                }}
                formProps={{
                    labelCol: { span: 6 },
                }}
                headerItemRender={() => {
                    return (
                        <div className={styles.refund_title}>
                            <div className={styles.goods}>商品</div>
                            <span />
                            <div className={styles.num}>退款数量</div>
                            <span />
                            <div className={styles.price}>退款金额</div>
                            <span />
                            <div className={styles.state}>状态</div>
                        </div>
                    )
                }}
                rowItemRender={r => {
                    return <RefundOrderItem data={r} />
                }}
                rowKey={'code'}
                columns={columns}
                request={async param => {
                    console.log('param: ', param)
                    parseParams(param)
                    // if (param.createTime) {
                    //     param.createTime[0] &&
                    //         (param.createStartTime = param.createTime[0].valueOf())
                    //     param.createTime[1] && (param.createEndTime = param.createTime[1].valueOf())
                    // }
                    const data: any = await store.getRefundList({ ...param, goodsCode })

                    return {
                        success: true,
                        totalCount: data.totalCount,
                        data: data.data,
                    }
                }}
            />
        </BlockBox>
    )
}

const Components: IRoute = observer(Refund)
Components.title = '售后管理'

export default Components
