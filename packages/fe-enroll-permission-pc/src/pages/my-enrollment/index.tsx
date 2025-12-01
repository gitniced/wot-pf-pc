import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.modules.less'
import { Pagination, Empty, Divider, Descriptions, Tabs, Image, Badge, Tooltip, Button } from 'antd'
import type { IRoute } from 'umi'
import React, { useEffect, useState } from 'react'
import useStore from './store'
import type { Datum, SearchParams } from './interface'
import dayjs from 'dayjs'
import { history } from 'umi'
import { STATUSENUM_MY_ENROLLMENT, REGISTRATION_STATUS, REGISTRATION_STATUS_TEXT } from './const'
import type { TabsProps } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import CustomTitle from '@/components/CustomTitle'
import type { ApplyRecordUserDto } from '@/@types/search'
import type SiteStore from '@/stores/siteStore'
import { EVENT_KIND, EVENT_KIND_VALUE } from '@/types'
import { findSiteData } from '@wotu/wotu-components'
interface IProps {
    siteStore: SiteStore
}

const MyEnrollment = (props: IProps) => {
    const store = useLocalObservable(() => new useStore())
    const { siteStore } = props || {}
    const { siteData } = siteStore || {}

    /**  当前的key  */
    const [currentKey, setCurrentKey] = useState<string>('0')

    /**  监听key改变  不同状态  请求列表数据*/
    useEffect(() => {
        const fetchData = async () => {
            try {
                await store.updateSearchParams({
                    status: currentKey,
                } as unknown as SearchParams)

                await store.getTableData()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [currentKey])

    useEffect(() => {
        document.title = '报名中心'

        const { query = {} } = history.location
        Reflect.deleteProperty(query, 'itemCode')
        Reflect.deleteProperty(query, 'itemName')
        Reflect.deleteProperty(query, 'status')

        store.updateSearchParams({
            ...query,
        } as unknown as SearchParams)
    }, [])

    const paginationDispose = {
        onChange: store.changePagination,
        current: store.tableData?.currentPage,
        total: store.tableData?.totalCount,
        pageSize: store.searchParams?.pageSize,
        showQuickJumper: true,
        showSizeChanger: true,
    }

    /*** 各种报名类型的展示字段map */
    const getDealBtn = (item: ApplyRecordUserDto) => {
        // 活动可展示取消报名的状态
        const activityShowCancelStatusList = [
            STATUSENUM_MY_ENROLLMENT.SUCCESS,
            STATUSENUM_MY_ENROLLMENT.PENDING_REVIEW,
            STATUSENUM_MY_ENROLLMENT.UNPAID_FEES,
            STATUSENUM_MY_ENROLLMENT.OVERDUE_UNPAID_FEES,
        ]
        // 机构和职业可展示取消报名的状态
        const otherShowCancelStatusList = [STATUSENUM_MY_ENROLLMENT.SUCCESS]

        const activityType = [
            EVENT_KIND_VALUE[EVENT_KIND.REVIEWS_PLAN],
            EVENT_KIND_VALUE[EVENT_KIND.TRAINING_PLAN],
            EVENT_KIND_VALUE[EVENT_KIND.TRAINING_CLASS],
            EVENT_KIND_VALUE[EVENT_KIND.COMPETITION],
            EVENT_KIND_VALUE[EVENT_KIND.EVENTS],
            EVENT_KIND_VALUE[EVENT_KIND.COMMON],
        ]

        const { cancelFlag, cancelEnd, type, status, showReapply } = item || {}

        // 当前是否是活动
        const isActivity = activityType.includes(type)

        // 获取取消报名按钮展示
        const getCancelVisible = () => {
            // 当未开启取消报名 则不展示取消报名按钮
            if (!cancelFlag) return false
            // 当前时间小于取消截止时间
            const nowTime = new Date().getTime()
            // 当前时间小于取消截止时间
            const isTime = nowTime < cancelEnd
            if (isTime) {
                if (isActivity) {
                    return activityShowCancelStatusList.includes(
                        status?.toString() as STATUSENUM_MY_ENROLLMENT,
                    )
                } else {
                    return otherShowCancelStatusList.includes(
                        status?.toString() as STATUSENUM_MY_ENROLLMENT,
                    )
                }
            } else {
                return false
            }
        }

        // 获取再次报名按钮展示
        const getAgainVisible = () => {
            return Boolean(showReapply)
        }

        // 是否展示取消报名按钮
        const cancelVisible = getCancelVisible()

        // 是否展示去支付按钮
        const payVisible = status?.toString() === STATUSENUM_MY_ENROLLMENT.UNPAID_FEES

        // 是否展示再次报名按钮
        const againVisible = getAgainVisible()

        return (
            <div>
                {payVisible ? (
                    <Button
                        type="primary"
                        className={styles.name_content_pay_btn}
                        onClick={() => store.goToPay(item.code, siteData)}
                    >
                        去支付
                    </Button>
                ) : null}
                {cancelVisible ? (
                    <Button onClick={() => store.goToCancel(item)}>取消报名</Button>
                ) : null}
                {againVisible ? (
                    <Button type="primary" onClick={() => store.goToAgain(item, siteData)}>
                        再次报名
                    </Button>
                ) : null}
            </div>
        )
    }

    /**
     * 渲染内容
     * @param item
     * @returns {*}
     */
    const renderContent = (item: ApplyRecordUserDto) => {
        if (!isNaN(item?.type)) {
            switch (Number(item?.type)) {
                // 机构报名
                case EVENT_KIND_VALUE[EVENT_KIND.ORGANIZATION]:
                    return (
                        <>
                            <div className={styles.name_content}>
                                <div className={styles.name_left}>
                                    <div className={styles.project_name}>{item.name}</div>
                                    <div className={styles.project_type}>{item.entryName}</div>
                                </div>
                                {getDealBtn(item)}
                            </div>
                            <Descriptions column={3} className={styles.messageItem}>
                                <Descriptions.Item label="报名时间">
                                    {item?.createdAt
                                        ? dayjs(item?.createdAt).format('YYYY-MM-DD HH:mm')
                                        : '-'}
                                </Descriptions.Item>
                            </Descriptions>
                        </>
                    )
                // 班级报名、班级活动
                case EVENT_KIND_VALUE[EVENT_KIND.TRAINING_PLAN]:
                case EVENT_KIND_VALUE[EVENT_KIND.TRAINING_CLASS]:
                    return (
                        <>
                            <div className={styles.name_content}>
                                <div className={styles.name_left}>
                                    <div className={styles.project_name}>{item.name}</div>
                                    <div className={styles.project_type}>{item.entryName}</div>
                                </div>
                                {getDealBtn(item)}
                            </div>
                            {/* <Descriptions column={3} className={styles.messageItem}>
                                <Descriptions.Item label="培训时间">
                                    {item?.activityStart
                                        ? dayjs(item?.activityStart).format('YYYY-MM-DD HH:mm')
                                        : '-'}{' '}
                                    {item?.activityEnd
                                        ? `至  ${dayjs(item?.activityEnd).format(
                                              'YYYY-MM-DD HH:mm',
                                          )}`
                                        : '至  待定'}
                                </Descriptions.Item>
                            </Descriptions> */}
                            <Descriptions column={3} className={styles.messageItem2}>
                                <Descriptions.Item label="报名时间">
                                    {item?.createdAt
                                        ? dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')
                                        : '-'}
                                </Descriptions.Item>
                                {(item.price && item.price !== '0') ? (
                                    <>
                                        <Descriptions.Item label="报名费用">
                                            {item.price}元
                                        </Descriptions.Item>
                                        <Descriptions.Item label="缴费截止时间">
                                            {item?.payEndTime
                                                ? dayjs(item?.payEndTime).format('YYYY-MM-DD HH:mm')
                                                : '待定'}
                                        </Descriptions.Item>
                                    </>
                                ) : null}
                            </Descriptions>
                        </>
                    )
                // 职业活动
                case EVENT_KIND_VALUE[EVENT_KIND.CAREER]:
                    return (
                        <>
                            <div className={styles.name_content}>
                                <div className={styles.name_left}>
                                    <div className={styles.project_name}>{item?.title}</div>
                                    <div className={styles.project_type}>职业</div>
                                </div>
                                {getDealBtn(item)}
                            </div>
                            <Descriptions column={3} className={styles.messageItem}>
                                <Descriptions.Item label="报名时间">
                                    {item?.createdAt
                                        ? dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')
                                        : '-'}
                                </Descriptions.Item>
                                {item.price && item.price !== '0' ? (
                                    <>
                                        <Descriptions.Item label="报名费用">
                                            {item.price}元
                                        </Descriptions.Item>
                                        <Descriptions.Item label="缴费截止时间">
                                            {item?.payEndTime
                                                ? dayjs(item?.payEndTime).format('YYYY-MM-DD HH:mm')
                                                : '待定'}
                                        </Descriptions.Item>
                                    </>
                                ) : null}
                            </Descriptions>
                        </>
                    )
                // 评价计划、技能竞赛、站点活动
                case EVENT_KIND_VALUE[EVENT_KIND.REVIEWS_PLAN]:
                case EVENT_KIND_VALUE[EVENT_KIND.COMPETITION]:
                case EVENT_KIND_VALUE[EVENT_KIND.EVENTS]:
                    return (
                        <>
                            <div className={styles.name_content}>
                                <div className={styles.name_left}>
                                    <div className={styles.project_name}>{item.name}</div>
                                    <div className={styles.project_type}>{item.entryName}</div>
                                </div>
                                {getDealBtn(item)}
                            </div>
                            {/* <Descriptions column={3} className={styles.messageItem}>
                                <Descriptions.Item label={TYPE_TIME[item.type]}>
                                    {item?.activityStart
                                        ? dayjs(item?.activityStart).format('YYYY-MM-DD HH:mm')
                                        : '-'}{' '}
                                    {item?.activityEnd
                                        ? `至  ${dayjs(item?.activityEnd).format(
                                              'YYYY-MM-DD HH:mm',
                                          )}`
                                        : '至  待定'}
                                </Descriptions.Item>
                            </Descriptions> */}
                            <Descriptions column={3} className={styles.messageItem2}>
                                <Descriptions.Item label="报名时间">
                                    {item?.createdAt
                                        ? dayjs(item?.createdAt).format('YYYY-MM-DD HH:mm')
                                        : '待定'}
                                </Descriptions.Item>
                                {item.price && item.price !== '0' ? (
                                    <>
                                        <Descriptions.Item
                                            label="报名费用"
                                            className={styles.money}
                                        >
                                            {item.price}元
                                        </Descriptions.Item>
                                        <Descriptions.Item label="缴费截止时间">
                                            {item?.payEndTime
                                                ? dayjs(item?.payEndTime).format('YYYY-MM-DD HH:mm')
                                                : '待定'}
                                        </Descriptions.Item>
                                    </>
                                ) : null}
                            </Descriptions>
                        </>
                    )
                case EVENT_KIND_VALUE[EVENT_KIND.COMMON]:
                case EVENT_KIND_VALUE[EVENT_KIND.COURSE_APPLY]:
                    return (
                        <>
                            <div className={styles.name_content}>
                                <div className={styles.name_left}>
                                    <div className={styles.project_name}>{item.name}</div>
                                    <div className={styles.project_type}>{item.entryName}</div>
                                </div>
                                {getDealBtn(item)}
                            </div>
                            {/* <Descriptions column={3} className={styles.messageItem}>
                                <Descriptions.Item label="活动时间">
                                    {item?.activityStart
                                        ? dayjs(item?.activityStart).format('YYYY-MM-DD HH:mm')
                                        : '-'}{' '}
                                    {item?.activityEnd
                                        ? `至  ${dayjs(item?.activityEnd).format(
                                              'YYYY-MM-DD HH:mm',
                                          )}`
                                        : '至  待定'}
                                </Descriptions.Item>
                            </Descriptions> */}
                            <Descriptions column={3} className={styles.messageItem2}>
                                <Descriptions.Item label="报名时间">
                                    {item?.createdAt
                                        ? dayjs(item?.createdAt).format('YYYY-MM-DD HH:mm')
                                        : '待定'}
                                </Descriptions.Item>
                                {item.price && item.price !== '0' ? (
                                    <>
                                        <Descriptions.Item
                                            label="报名费用"
                                            className={styles.money}
                                        >
                                            {item.price}元
                                        </Descriptions.Item>
                                        <Descriptions.Item label="缴费截止时间">
                                            {item?.payEndTime
                                                ? dayjs(item?.payEndTime).format('YYYY-MM-DD HH:mm')
                                                : '待定'}
                                        </Descriptions.Item>
                                    </>
                                ) : null}
                            </Descriptions>
                        </>
                    )
                default:
                    return null
            }
        } else {
            return null
        }
    }

    /**  tabs 数据  */
    const items: TabsProps['items'] = [
        {
            key: STATUSENUM_MY_ENROLLMENT.ALL_STATUS,
            label: `全部`,
        },
        {
            key: STATUSENUM_MY_ENROLLMENT.PENDING_REVIEW,
            label: `待审核`,
        },
        {
            key: STATUSENUM_MY_ENROLLMENT.UNPAID_FEES,
            label: `未缴费`,
        },
        {
            key: STATUSENUM_MY_ENROLLMENT.SUCCESS,
            label: `报名成功`,
        },
        {
            key: STATUSENUM_MY_ENROLLMENT.FAIL,
            label: `报名失败`,
        },
        {
            key: STATUSENUM_MY_ENROLLMENT.OVERDUE_UNPAID_FEES,
            label: `过期未缴费`,
        },
        {
            key: STATUSENUM_MY_ENROLLMENT.REFUNDED,
            label: `已退费`,
        },
        {
            key: STATUSENUM_MY_ENROLLMENT.CANCEL,
            label: `已取消`,
        },
    ]

    const renderOrganizationName = (item: Datum) => {
        if (item.type === EVENT_KIND_VALUE[EVENT_KIND.EVENTS]) {
            const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' })
            return item?.organizationName || siteName
        }

        return item?.organizationName
    }

    const renderOrganizationLogo = (item: Datum) => {
        const defaultOrgLogo =
            'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/4.%E6%95%B0%E6%8D%AE%E5%B1%95%E7%A4%BA%EF%BC%8F7.Avatar%E5%A4%B4%E5%83%8F%EF%BC%8F%E4%BA%AE%E8%89%B2%EF%BC%8F%E9%BB%98%E8%AE%A4%E7%BB%84%E7%BB%87%402x.png'

        if (item.type === EVENT_KIND_VALUE[EVENT_KIND.EVENTS]) {
            const wapLogo = findSiteData(siteData, 'wap_logo')?.value
            return item?.organizationLogo || wapLogo || defaultOrgLogo
        }

        return item?.organizationLogo || defaultOrgLogo
    }

    return (
        <div className={styles.my_enrollment}>
            <div className={styles.main}>
                <CustomTitle title="我的报名" marginBottom={8} />
                <Tabs defaultActiveKey={currentKey} items={items} onChange={setCurrentKey} />
                <div className={styles.card_list}>
                    {store.tableData?.data?.length > 0 ? (
                        store.tableData?.data.map((item: any) => (
                            <div className={styles.card} key={item?.code}>
                                <div className={styles.postion_div} />
                                <div className={styles.entity_header}>
                                    <div className={styles.entity_header_left}>
                                        <div className={styles.entity_logo}>
                                            <Image
                                                src={renderOrganizationLogo(item)}
                                                style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '6px',
                                                }}
                                                preview={false}
                                            />
                                        </div>
                                        <div className={styles.entity_name}>
                                            {renderOrganizationName(item)}
                                        </div>
                                    </div>
                                    <div className={styles.entity_header_right}>
                                        <Badge
                                            status={
                                                REGISTRATION_STATUS[item?.status?.toString()] ||
                                                'default'
                                            }
                                            text={
                                                REGISTRATION_STATUS_TEXT[item?.status?.toString()]
                                            }
                                        />
                                        {/* 失败 等于2 才显示 */}
                                        {item.auditComment && (
                                            <>
                                                <Tooltip title={item.auditComment}>
                                                    <InfoCircleOutlined />
                                                </Tooltip>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <Divider className={styles.divider} />
                                <div className={styles.signUpContent}>
                                    {renderContent(item)}
                                    {item.comment ? (
                                        <div className={styles.comment}>
                                            <div className={styles.label}>备注：</div>
                                            <div className={styles.value}>{item.comment}</div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.enpty_box}>
                            <Empty
                                image="https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/saas%201.0/%E7%BC%BA%E7%9C%81%EF%BC%8F%E6%9A%82%E6%97%A0%E5%86%85%E5%AE%B9.png"
                                imageStyle={{
                                    width: 200,
                                    height: 200,
                                }}
                                description={
                                    <span
                                        style={{
                                            color: '#888',
                                            fontWeight: 400,
                                            fontSize: 14,
                                        }}
                                    >
                                        暂无内容
                                    </span>
                                }
                            />
                        </div>
                    )}
                </div>
                {store.tableData?.data?.length > 0 && (
                    <div className={styles.pagination_box}>
                        <Pagination className={styles.pagination} {...paginationDispose} />
                    </div>
                )}
            </div>
        </div>
    )
}

const ObserverPassword: IRoute = inject('siteStore')(observer(MyEnrollment))

ObserverPassword.title = '报名中心'

export default ObserverPassword
