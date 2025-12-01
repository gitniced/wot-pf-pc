import styles from './index.module.less'
import { Image, InputNumber, Row, Tag, Tooltip, message } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { SuperTable } from '@wotu/wotu-components'
import type ActivityDetailStore from './store'
import dayjs from 'dayjs'
import type { ACTIVITY_DETAILS } from './interface'
import { renderLocation } from '../const'
import Empty from '@/components/Empty'
import { InfoCircleOutlined } from '@ant-design/icons'

export function utils(
    activityDetails: ACTIVITY_DETAILS,
    store: ActivityDetailStore,
    actionRef: any,
    code: string | string[] | null,
    reviewData: any,
) {
    /**  活动介绍 富文本内容组件 */
    const RichTextContentComponent = () => {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: activityDetails?.activityIntroduce || '-',
                }}
                className={styles.rich_text_content_component}
            />
        )
    }

    /**  关联岗位  */
    const RelatedPositionsComponent = () => {
        const updateDetailSort = async (s: number, c: string) => {
            await store.sortRelatedJob(Number(s), c)
            actionRef?.current?.reload?.()
            message.success('排序成功')
        }

        /**  列  */
        const columns: ColumnsType<any> = [
            {
                title: '岗位名称',
                dataIndex: 'code',
                width: 200,
                render: (_, { professionName }) => {
                    return professionName || '-'
                },
            },
            {
                title: '薪水',
                dataIndex: 'salaryDesc',
                width: 200,
                render: (_, { salaryDesc }) => {
                    return salaryDesc || '-'
                },
            },
            {
                title: '招聘类型',
                dataIndex: 'recruitTypeName',
                width: 200,
                render: (_, { recruitTypeName }) => {
                    return recruitTypeName || '-'
                },
            },
            {
                title: '所在地',
                dataIndex: 'province',
                width: 200,
                render: (_, { province, city, region }) => (
                    <>{renderLocation({ province, city, region })}</>
                ),
            },
            {
                title: '职位类型',
                dataIndex: 'professionTypeName',
                width: 200,
                render: (_, { professionTypeName }) => {
                    return professionTypeName || '-'
                },
            },
            {
                title: '企业名称',
                dataIndex: 'organizationName',
                width: 200,
                render: (_, { organizationName }) => {
                    return organizationName || '-'
                },
            },
            {
                title: '排序',
                dataIndex: 'sort',
                width: 200,
                render: (_, recode) => {
                    return (
                        <InputNumber
                            defaultValue={recode?.sort}
                            min={0}
                            max={999999}
                            formatter={value => {
                                if (!Number(value)) return 0
                                return value
                            }}
                            parser={val => {
                                return val ? parseInt(val) : ''
                            }}
                            onBlur={(e: any) => {
                                updateDetailSort(
                                    e.target.value,
                                    recode?.activityProfessionRelationCode,
                                )
                            }}
                        />
                    )
                },
            },
            {
                title: '简历数量',
                dataIndex: 'catalogName',
                width: 200,
                search: true,
                render: (_, { catalogName }) => {
                    return catalogName || '-'
                },
            },
        ]
        return (
            <SuperTable
                toolBar={false}
                scroll={{ x: 0 }}
                search={false}
                columns={columns}
                request={store.getRelatedJob as any}
                params={{ code }}
                actionRef={actionRef}
                rowKey={'professionCode'}
            />
        )
    }
    /**  活动名单组件  */
    const ActivityListComponent = () => {
        const desensitizationList = [
            {
                key: 'name',
                type: '1',
                sign: true,
            },
            {
                key: 'mobile',
                type: '2',
            },
            {
                key: 'idCardNo',
                type: '4',
            },
        ]
        /**  列  */
        const columns: ColumnsType<any> = [
            {
                title: '姓名',
                dataIndex: 'name',
                width: 200,
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                width: 200,
            },
            {
                title: '证件类型',
                dataIndex: 'certificateTypeName',
                width: 200,
                render: (_, { certificateTypeName }) => {
                    return certificateTypeName || '-'
                },
            },
            {
                search: false,
                title: '证件号码',
                dataIndex: 'idCardNo',
                width: 200,
            },
            {
                title: '加入时间',
                dataIndex: 'applyTime',
                width: 200,
                render: (_, { applyTime }) => {
                    return (
                        <div>
                            {applyTime ? dayjs(applyTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
                        </div>
                    )
                },
            },
        ]
        return (
            <SuperTable
                rowKey={'userCode'}
                // @ts-ignore
                desensitizationList={desensitizationList}
                toolBar={false}
                scroll={{ x: 0 }}
                search={false}
                columns={
                    activityDetails?.relateSignStatus !== 1
                        ? columns
                        : [
                              ...columns,
                              {
                                  title: (
                                      <>
                                          打卡状态&nbsp;
                                          <Tooltip title="未到达打卡开始时间，默认展示 “ - “">
                                              <InfoCircleOutlined />
                                          </Tooltip>
                                      </>
                                  ),
                                  dataIndex: 'catalogName',
                                  width: 200,
                                  search: true,
                                  render: (_, { signStatus }) => {
                                      const statusText = ['-', '已打卡', '未打卡', '-']
                                      return statusText[signStatus] || '-'
                                  },
                              },
                          ]
                }
                request={store.getActivityList as any}
                params={{ code }}
            />
        )
    }
    /**  详情数据组件  */
    const ActivityDetailBox = () => {
        return (
            <div className={styles.top_box}>
                <div className={styles.left}>
                    <Image src={activityDetails?.coverUrl} className={styles.img} />
                </div>
                <div className={styles.right}>
                    <div className={styles.title}>
                        <div className={styles.name}>{activityDetails?.activityName}</div>
                        <div className={styles.status}>
                            <Tag color="success">{activityDetails?.activityStatusName || '-'}</Tag>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.label}>分类：</div>
                        <div className={styles.value}>
                            {activityDetails?.activityCatalogName || '-'}
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.label}>方式：</div>
                        <div className={styles.value}>
                            {activityDetails?.activityFormName || '-'}
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.label}>活动时间：</div>
                        <div className={styles.value}>
                            {activityDetails?.startTime
                                ? dayjs(activityDetails?.startTime).format('YYYY-MM-DD HH:mm')
                                : '-'}{' '}
                            至{' '}
                            {activityDetails?.endTime
                                ? dayjs(activityDetails?.endTime).format('YYYY-MM-DD HH:mm')
                                : '-'}
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.label}>活动地点：</div>
                        <div className={styles.value}>{activityDetails?.address || '-'}</div>
                    </div>
                </div>
            </div>
        )
    }
    /**  活动回顾  */
    const ActivityReview = () => {
        return reviewData.summary && reviewData.attachment.length > 0 ? (
            <div className={styles.activity_review}>
                <Row justify="start" wrap>
                    {reviewData.attachment?.split(',').map((url: string) => (
                        <Image src={url} className={styles.review_img} />
                    ))}
                </Row>
                <Row className={styles.summary}>{reviewData.summary}</Row>
            </div>
        ) : (
            <Empty />
        )
    }
    return {
        /**  活动介绍 富文本内容组件 */
        RichTextContentComponent,
        /**  关联岗位  */
        RelatedPositionsComponent,
        /**  活动名单组件  */
        ActivityListComponent,
        /**  详情数据组件  */
        ActivityDetailBox,
        ActivityReview,
    }
}
