import React, { useState, useRef, useEffect } from 'react'
import { Button, Tooltip, Tabs, Modal, Form, Radio, message, Select } from 'antd'
import { useLocalObservable, observer } from 'mobx-react'
import Store from './store'
import BlockBox from '@/components/BlockBox'
import { DatePicker } from '@/components/Picker'
import { SuperTable, findSiteData } from '@wotu/wotu-components'
import type { ColumnsType, FormRef } from '@wotu/wotu-components/dist/esm/SuperTable/interface.d'
import styles from './index.module.less'
import MoreSelect from '@/components/MoreSelect'
import NumberRange from '@/components/NumRange'
import { ExclamationCircleOutlined } from '@ant-design/icons'
// import { history } from 'umi'
import type { IRoute } from 'umi'
import OrderItem from './components/OrderItem'
import { getCookie, getLocalStorage } from '@/storage'
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
 * 时间错误的弹窗
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
 * 导出成功的弹窗
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
            // history.push(`${loginUrl}/organization/action`)
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

/**
 * 转换 接口参数
 * @param params
 */
const parseParams = (params: Record<string, any>) => {
    if (params.createTime) {
        if (params.createTime[0]) {
            params.createStartTime = params.createTime[0].valueOf()
        }
        if (params.createTime[1]) {
            params.createEndTime = params.createTime[1].valueOf()
        }
        delete params.createTime
    }

    if (params.amount) {
        if (params.amount[0]) {
            params.amountLow = params.amount[0]
        }
        if (params.amount[1]) {
            params.amountHigh = params.amount[1]
        }
        delete params.amount
    }
    if (params.status === '0') delete params.status
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
function Order() {
    const store = useLocalObservable(() => new Store())
    /** 买家类型 */
    const [type, setType] = useState(undefined)
    const [visible, setVisible] = useState(false)
    const [checkedKey, setCheckedKey] = useState('0')
    const formRef = useRef<FormRef>({})
    const actionRef = useRef({})
    const [form] = Form.useForm()
    const isMerchant = () => getCookie('SELECT_USER_TYPE') === 'merchant'
    // const getList = async () => {
    //     return await http(api.)
    // }
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
            title: '订单编号',
            dataIndex: 'orderNo',
            key: 'orderNo',
            search: true,
            ...formItemProps,
        },
        {
            title: '商品名称',
            dataIndex: 'goodsName',
            key: 'goodsName',
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
                    <Select
                        style={{ width: '246px' }}
                        onChange={e => {
                            setType(e)
                        }}
                    >
                        <Select.Option value={1}>个人</Select.Option>
                        <Select.Option value={2}>机构</Select.Option>
                    </Select>
                )
            },
        },
        {
            title: '买家名称',
            key: 'buyerCode',
            dataIndex: 'buyerCode',
            search: true,
            ...formItemProps,
            renderFormItem() {
                return (
                    <MoreSelect
                        requestParams={{
                            buyerType: type,
                            merchantOrgCode: getCookie('SELECT_ORG_CODE'),
                            identity: getCookie('SELECT_IDENTITY_CODE'),
                        }}
                        all={false}
                        maxLength={5}
                        placeholder="请选择买家名称"
                        valueKey={'value'}
                        requestUrl={'/search/front/order/page_order_buyer'}
                        selectProps={{
                            showSearch: false,
                        }}
                    />
                )
            },
        },
        {
            title: '创建日期',
            key: 'createTime',
            dataIndex: 'createTime',
            search: true,
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
            title: '实收款',
            key: 'amount',
            dataIndex: 'amount',
            search: true,
            formItemProps: {
                style: {
                    width: '490px',
                },
                labelCol: { span: 4 },
                wrapperCol: { span: 18 },
            },
            renderFormItem() {
                return <NumberRange style={{ width: '160px', height: '35px' }} />
            },
        },
        {
            title: '支付方式',
            key: 'payType',
            dataIndex: 'payType',
            search: true,
            ...formItemProps,

            valueType: 'select',
            valueEnum: {
                0: {
                    text: '支付宝',
                },
                1: {
                    text: '微信',
                },
                2: {
                    text: '线下支付',
                },
            },
        },
    ].filter(Boolean) as ColumnsType<DataType>
    const exportOrder = async () => {
        const currentTime = formRef.current.getFieldValue('createTime')
        /* 
            校验时间 存在 length 正确 时间区间 是再366 天内
         */
        if (!currentTime || currentTime?.length < 2 || testRange(currentTime)) {
            emptyTime()
            return
        }
        let params = formRef.current.getFieldsValue()
        parseParams(params)
        params.pageNo = 1
        params.pageSize = 10
        const res = await store.getOrderData(params)
        if (res?.data?.length === 0) {
            emptyList()
            return
        }
        setVisible(true)
    }

    useEffect(() => {
        document.title = '订单管理'
    }, [])
    const debounceExportOrder = debounce(exportOrder, 1000)
    return (
        <BlockBox className={styles.order_list}>
            <SuperTable
                params={{ status: checkedKey }}
                formRef={formRef}
                actionRef={actionRef}
                renderOptionBar={{
                    //@ts-ignore
                    center: () => {
                        return (
                            <Button
                                type="primary"
                                // onClick={exportOrder}
                                onClick={debounceExportOrder}
                            >
                                导出
                            </Button>
                        )
                    },
                    bottom: () => {
                        return (
                            <Tabs
                                defaultActiveKey={checkedKey}
                                onChange={e => {
                                    setCheckedKey(e)
                                }}
                            >
                                <Tabs.TabPane tab="全部" key="0" />
                                <Tabs.TabPane tab="未支付" key="1" />
                                <Tabs.TabPane tab="支付待确认" key="2" />
                                <Tabs.TabPane tab="已支付" key="3" />
                                <Tabs.TabPane tab="已完成" key="4" />
                                <Tabs.TabPane tab="已关闭" key="5" />
                            </Tabs>
                        )
                    },
                }}
                formProps={{
                    labelCol: { span: 6 },
                }}
                request={async params => {
                    parseParams(params)

                    const data: any = await store.getOrderData(params)
                    // console.log('request =》 data: ', data);
                    // listRef.current.data = data.data;
                    return {
                        totalCount: data.totalCount,
                        success: true,
                        data: data.data,
                    }
                }}
                headerItemRender={() => {
                    return (
                        <div className={styles.order_title}>
                            <div className={styles.goods_warp}>
                                <div className={styles.goods}>商品</div>
                                <span />
                                <div className={styles.price}>单价</div>
                                <span />
                                <div className={styles.num}>数量</div>
                                <span />
                                <div className={styles.after}>售后</div>
                                <span />
                            </div>
                            <div className={styles.state}>状态</div>
                            <span />
                            <div className={styles.true_price}>实收款</div>
                        </div>
                    )
                }}
                rowItemRender={r => {
                    return <OrderItem data={r} />
                }}
                rowKey={'code'}
                columns={columns}
            />
            <Modal
                title="导出"
                open={visible}
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={() => {
                    const nowType = form.getFieldValue('type')
                    console.log(nowType)
                    if (!nowType) {
                        message.info('请选择导出类型')
                        return
                    }
                    const exportFn = nowType === 1 ? store.exportOrderFile : store.exportGoodsFile
                    const params = formRef.current.getFieldsValue()
                    parseParams(params)
                    exportFn(params)
                        .then(() => {
                            exportSuccess()
                        })
                        .finally(() => {
                            setVisible(false)
                        })
                }}
            >
                <Form form={form}>
                    <Form.Item name="type" label="导出类型">
                        <Radio.Group>
                            <Radio value={1}>订单报表</Radio>
                            <Radio value={2}>商品报表</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </BlockBox>
    )
}

const Components: IRoute = observer(Order)

Components.title = '订单管理'

export default Components
