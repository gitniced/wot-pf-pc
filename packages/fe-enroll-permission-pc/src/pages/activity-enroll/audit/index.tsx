import CustomTitle from '@/components/CustomTitle'
import styles from './index.modules.less'
import { Button, Image, Descriptions, Badge, Tooltip, Tag } from 'antd'
import { EyeFilled, EyeInvisibleFilled, ManOutlined, WomanOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import type { ENROLL_TABLE_LIST_ENUM, INFO_ENUM } from './const'
import { SEX_TEXT } from './const'
import {
    STATUS_AUDIT,
    STATUS_AUDIT_TEXT,
    AUDIT_STATUS_ENUM,
    sexEnum,
    statusMap,
    ENROLL_TABLE_LIST,
    ENROLL_TABLE_LIST_ENUM_NAME,
} from './const'
import AuditStore from './store'
import { observer, useLocalObservable } from 'mobx-react'
import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'umi'
import type { IRoute } from 'umi'
import AuditModal from '../components/auditModal'
import { DEFAULT_IMG, REGISTRATION_METHOD_ENUM, TYPE_TAG } from '../const'
import {
    TYPE_TAG_TRANSFORMED,
    TYPE_TIME,
} from '../../event-management/components/superTables/const'
import { cloneDeep } from 'lodash'
import { DesensitizationItem } from '@wotu/wotu-pro-components'
import { getDecodeInfo } from '@wotu/wotu-components'

//审核
const Audit = () => {
    const pageRef = useRef(null)
    const store = useLocalObservable(() => new AuditStore())
    const { query = {} } = useLocation()
    /**  审核modal visible  */
    const [auditVisible, setAuditVisible] = useState(false)
    /**  姓名是否脱敏  */
    const [isHideMsg, setIsHideMsg] = useState(true)

    useEffect(() => {
        query?.code && store.getDetail(query.code)
    }, [query?.code])

    useEffect(() => {
        document.title = '报名管理详情'
    }, [])

    /**
     * 审核提交
     */
    const onAuditSubmit = (params: any) => {
        store.onAuditSubmit({ ...params, code: query?.code }, setAuditVisible)
    }

    /**
     * 渲染男女
     *  @type {*}
     * */
    const genderIcon: Record<string, React.ReactElement> = {
        [sexEnum.MAN]: <ManOutlined style={{ color: '#1678ff', fontSize: 18 }} />, //男
        [sexEnum.WOMAN]: <WomanOutlined style={{ color: '#FF4D4F' }} />, //女
    }
    /**
     * 渲染男女
     *  @type {*}
     * */
    const genderStr: Record<string, string> = {
        [sexEnum.MAN]: '男', //男
        [sexEnum.WOMAN]: '女', //女
    }

    /**
     * 渲染否是
     *  @type {*}
     * */
    const TRUE_FALSE_Str: Record<string, string> = {
        0: '否', //否
        1: '是', //是
    }

    /**
     * 渲染审核状态
     */
    const renderStatus: Record<string, () => React.ReactElement> = {
        [AUDIT_STATUS_ENUM.WAIT]: () => <span style={{ color: '#FAAD14' }}>待审核</span>,
        [AUDIT_STATUS_ENUM.UNPAID]: () => <span style={{ color: '#000000' }}>未缴费</span>,
        [AUDIT_STATUS_ENUM.SUCCESS]: () => <span style={{ color: '#52C41A' }}>报名成功</span>,
        [AUDIT_STATUS_ENUM.FAIL]: () => <span style={{ color: '#FF4D4F' }}>报名失败</span>,
        [AUDIT_STATUS_ENUM.EXPIRED]: () => <span style={{ color: '#000000' }}>过期未缴费</span>,
        [AUDIT_STATUS_ENUM.REFUND]: () => <span style={{ color: '#000000' }}>已退费</span>,
        [AUDIT_STATUS_ENUM.CANCEL]: () => <span style={{ color: '#000000' }}>已取消</span>,
    }

    /**  活动时间  */
    const renderTime = (startTime: number, endTime: number) => {
        if (startTime && endTime) {
            return `${dayjs(startTime).format('YYYY-MM-DD')} 至 ${dayjs(endTime).format(
                'YYYY-MM-DD',
            )}`
        }

        if (!startTime && !endTime) {
            return '-'
        }

        if (startTime && !endTime) {
            return `${dayjs(startTime).format('YYYY-MM-DD')}`
        }
    }
    /**  计算年龄  */
    const calculateAge = (timestamp: number) => {
        const birthDate = new Date(timestamp)
        const currentDate = new Date()

        let age = currentDate.getFullYear() - birthDate.getFullYear()
        const monthDiff = currentDate.getMonth() - birthDate.getMonth()

        // 如果当前月份小于出生月份或者当前月份等于出生月份但当前日期小于出生日期，则年龄减一
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--
        }

        return age
    }

    /**  显示年龄  */
    const getAgeElement = (value: number, flag = false) => {
        if (flag) {
            return `${dayjs(Number(value)).format('YYYY-MM-DD')} (${calculateAge(value)}岁)`
        } else {
            return `${dayjs(Number(value)).format('YYYY-MM-DD')}`
        }
    }

    /***将value 根据inputType转换为需要的格式
     * 1 日期
     * 2 图片
     * 3 性别
     * 4 分类
     * 6 省市区
     * 7 附件材料
     * flag 是否展示年龄
     */
    const translateValue = (item: any, flag = false) => {
        const { inputType, value = '', alias, renderType } = item || {}
        const DESENSITIZATION_TYPE = {
            NAME: '1',
            PHONE_NUMBER: '2',
            ID_NUMBER: '4',
        }
        const NEED_DESENSITIZATION_LIST = ['NAME', 'PHONE_NUMBER', 'ID_NUMBER']
        const TRUE_FALSE_List = ['IS_PAY_SOCIAL_SECURITY', 'IS_REGISTERED_UNEMPLOYMENT']
        let valueList = []
        /**  原证书截图  */
        if (alias === 'CERTIFICATE_PHOTO') {
            valueList = [value?.[0]?.url] || []
        } else {
            valueList = value?.split?.(',') || []
        }
        switch (Number(inputType || 0)) {
            case 1:
                return value && !isNaN(value) ? getAgeElement(value, flag) : '-'
            case 2:
                return valueList.length > 0 ? (
                    <Image.PreviewGroup>
                        {valueList.map((data: string) => {
                            return data ? (
                                <div key={data} className={styles.enroll_img}>
                                    <Image src={data} className={styles.enroll_img_img} />
                                </div>
                            ) : (
                                '-'
                            )
                        })}
                    </Image.PreviewGroup>
                ) : (
                    '-'
                )
            case 3:
                // 当性别非数字时 展示-
                // 当性别为数字时 展示icon
                return value ? genderStr[value.toString()] : '-'
            case 4: {
                let parseObj = value ? JSON.parse(value) : ''
                let { categoryDtoList = [] } = store.auditDetail || {}

                const cateObj =
                    categoryDtoList.find(
                        (cateItem: any) =>
                            cateItem?.categoryId?.toString() +
                                cateItem?.careerId?.toString() +
                                cateItem?.workId?.toString() +
                                cateItem?.levelRelationId?.toString() ===
                            parseObj?.categoryId?.toString() +
                                parseObj?.careerId?.toString() +
                                parseObj?.workId?.toString() +
                                parseObj?.levelRelationId?.toString(),
                    ) || {}
                return value && cateObj?.categoryName ? (
                    <div className={styles.enroll_info_cate}>
                        <Tooltip
                            title={cateObj?.categoryName}
                            getPopupContainer={() => pageRef?.current as unknown as HTMLElement}
                        >
                            <div className={styles.enroll_info_cate_info}>
                                {cateObj?.categoryName}
                            </div>
                        </Tooltip>
                    </div>
                ) : (
                    '-'
                )
            }
            case 6:
                return Array.isArray(value) && value.length > 0
                    ? value.map((p: any, index: number) =>
                          index < value.length - 1 ? `${p?.name}/` : p?.name,
                      )
                    : '-'
            case 7:
                return item?.value?.length > 0 ? (
                    <div>
                        {item?.value?.map((data: any) => {
                            return data ? (
                                <a
                                    key={data}
                                    href={data?.url}
                                    download={data?.name}
                                    target={'_blank'}
                                    rel="noreferrer"
                                    style={{ display: 'block' }}
                                >
                                    {data?.name}
                                </a>
                            ) : (
                                '-'
                            )
                        })}
                    </div>
                ) : (
                    '-'
                )
            default:
                if (alias === 'APPLICATION_CONDITIONS') {
                    return store.applicationConditions?.[value] || '-'
                } else if (TRUE_FALSE_List.includes(alias)) {
                    return TRUE_FALSE_Str[Number(value)]
                } else if (alias === 'NAME') {
                    //@ts-ignore
                    return <DesensitizationItem preStr={value} type={'1'} />
                } else if (NEED_DESENSITIZATION_LIST.includes(alias)) {
                    return value ? (
                        typeof value === 'string' ? (
                            //@ts-ignore
                            <DesensitizationItem
                                preStr={value}
                                //@ts-ignore
                                type={DESENSITIZATION_TYPE[alias]}
                            />
                        ) : (
                            value
                        )
                    ) : (
                        '-'
                    )
                } else {
                    // 自定义字段通过 renderType 处理
                    switch (renderType) {
                        case 'IMAGE_UPLOAD':
                            return value.length > 0 ? (
                                <Image.PreviewGroup>
                                    {value.map((data: any) => {
                                        return data ? (
                                            <div key={data?.url} className={styles.enroll_img}>
                                                <Image
                                                    src={data?.url}
                                                    className={styles.enroll_img_img}
                                                />
                                            </div>
                                        ) : (
                                            '-'
                                        )
                                    })}
                                </Image.PreviewGroup>
                            ) : (
                                '-'
                            )
                        case 'FILE_UPLOAD':
                            return value.length > 0 ? (
                                <div>
                                    {value.map((data: any) => {
                                        return data ? (
                                            <a
                                                key={data}
                                                href={data?.url}
                                                download={data?.name}
                                                target={'_blank'}
                                                rel="noreferrer"
                                                style={{ display: 'block' }}
                                            >
                                                {data?.name}
                                            </a>
                                        ) : (
                                            '-'
                                        )
                                    })}
                                </div>
                            ) : (
                                '-'
                            )
                        case 'MULTI_SELECT':
                        case 'MULTI_CHOICE':
                            return value.length > 0 ? value.join('/') : '-'
                        default:
                            if (Array.isArray(value)) {
                                return value.map(i => i.name).join('/')
                            } else {
                                return value || '-'
                            }
                    }
                }
        }
    }

    /***通过别名获取指定值 */
    const getAliasValue = (orderAlias: keyof typeof INFO_ENUM) => {
        const {
            fieldUserDtoList = [],
            gender,
            userIdentify,
            userMobile,
            birthday,
        } = store.auditDetail || {}
        let matchItem = fieldUserDtoList.find((item: any) => item?.alias === orderAlias) || {}

        switch (orderAlias) {
            case 'NAME':
                return matchItem?.value ? matchItem?.value : ''
            case 'TYPE_OF_CERTIFICATE':
                // 证件类型字段 优先取fieldUserDtoList中的 不存在则为身份证
                return matchItem?.value ? matchItem?.value : '身份证'
            case 'ID_NUMBER':
                // 证件号码字段 优先取fieldUserDtoList中的 不存在则取userIdentify
                // eslint-disable-next-line no-case-declarations
                const finallyID = matchItem?.value
                    ? matchItem?.value
                    : userIdentify
                    ? userIdentify
                    : ''
                return finallyID ? <DesensitizationItem preStr={finallyID} type="4" /> : '-'
            case 'PHONE_NUMBER':
                // 手机号码字段 优先取fieldUserDtoList中的 不存在则取userMobile
                // eslint-disable-next-line no-case-declarations
                const finallyPhone = matchItem?.value
                    ? matchItem?.value
                    : userMobile
                    ? userMobile
                    : ''
                return finallyPhone ? <DesensitizationItem preStr={finallyPhone} type="2" /> : '-'
            case 'DATE_OF_BIRTH':
                // 出生日期字段 优先取fieldUserDtoList中的 不存在则将birthday赋值给matchItem
                matchItem?.value
                    ? ''
                    : // eslint-disable-next-line no-constant-condition
                      (matchItem = {
                          ...matchItem,
                          value: dayjs(birthday).unix() * 1000,
                          inputType: 1,
                      })
                return translateValue(matchItem, true)
            case 'GENDER':
                // 性别字段 优先取fieldUserDtoList中的 不存在则取gender
                return matchItem?.value
                    ? genderIcon[matchItem?.value.toString()]
                    : gender
                    ? genderIcon[gender.toString()]
                    : '-'

            default:
                return translateValue(matchItem)
        }
    }

    /**用户基础信息 */
    const UserBaseList = [
        { label: '证件类型', key: 'TYPE_OF_CERTIFICATE' },
        { label: '证件号码', key: 'ID_NUMBER' },
        { label: '手机号码', key: 'PHONE_NUMBER' },
        { label: '出生年月', key: 'DATE_OF_BIRTH' },
    ]

    /**
     * 报名基础信息
     */
    const EnrollBaseList = [
        {
            label: TYPE_TAG[TYPE_TAG_TRANSFORMED[store.auditDetail?.entryCode]] || '-',
            value: store.auditDetail?.name || '-',
        },
        {
            label: TYPE_TIME[TYPE_TAG_TRANSFORMED[store.auditDetail?.entryCode]] || '-',
            value: () =>
                renderTime(store.auditDetail?.activityStart, store.auditDetail?.activityEnd),
        },
        {
            label: '报名审核',
            value: () => (
                <>
                    <Badge status={statusMap[store.auditDetail?.openAudit] || 'default'} />
                    &nbsp;
                    {STATUS_AUDIT[store.auditDetail?.openAudit]}
                </>
            ),
        },
        {
            label: '报名缴费',
            value: () => (
                <>
                    <Badge status={statusMap[store.auditDetail?.openPay] || 'default'} />
                    &nbsp;
                    {STATUS_AUDIT[store.auditDetail?.openPay]}
                </>
            ),
        },
        {
            label: '报名费用',
            value: `${store.auditDetail?.price || '-'}元`,
            contentStyle: () => ({ color: 'var(--primary-color)' }),
            iSPayment: !store.auditDetail?.openPay,
        },
        {
            label: '缴费截止时间',
            value: dayjs(store.auditDetail?.payEndTime).format('YYYY-MM-DD HH:mm:ss'),
            iSPayment: !store.auditDetail?.openPay,
        },

        {
            label: '分类',
            span: store.auditDetail?.categoryDtoList?.length,
            value: () => (
                <div className={styles.enroll_info_cate}>
                    {store.auditDetail?.categoryDtoList?.map((temp: any) => {
                        return (
                            <Tooltip
                                key={temp?.categoryId}
                                title={temp?.categoryName}
                                getPopupContainer={() => pageRef?.current as unknown as HTMLElement}
                            >
                                <div className={styles.enroll_info_cate_info}>
                                    {temp?.categoryName}
                                </div>
                            </Tooltip>
                        )
                    })}
                </div>
            ),
        },
        {
            label: '审核状态',
            value: () => (
                <>
                    <Badge status={statusMap[store.auditDetail?.auditStatus] || 'default'} />
                    &nbsp;
                    {STATUS_AUDIT_TEXT[store.auditDetail?.auditStatus]}
                </>
            ),
            isEnrollSuccess: !(store.auditDetail?.status === AUDIT_STATUS_ENUM.SUCCESS),
        },
        {
            label: '审核时间',
            value: store.auditDetail?.auditTime
                ? dayjs(store.auditDetail?.auditTime).format('YYYY-MM-DD HH:mm:ss')
                : '-',
            isEnrollSuccess: !(store.auditDetail?.status === AUDIT_STATUS_ENUM.SUCCESS),
        },
        {
            label: '缴费时间',
            value: store.auditDetail?.payTime
                ? dayjs(store.auditDetail?.payTime).format('YYYY-MM-DD HH:mm:ss')
                : '-',
            isEnrollSuccess: !(store.auditDetail?.status === AUDIT_STATUS_ENUM.SUCCESS),
        },
        // {
        //     label: '备注',
        //     value: () => (
        //         <div className={styles.contentStyle}>
        //             {store.auditDetail?.remark ? (
        //                 <Tooltip placement="top" title={store.auditDetail?.remark}>
        //                     {store.auditDetail?.remark}
        //                 </Tooltip>
        //             ) : (
        //                 '-'
        //             )}
        //         </div>
        //     ),
        // },
    ]

    /**
     * 报名表是否展示
     * 当fieldUserDtoList有值时 展示
     */
    const getEnrollTableVisible = () => {
        const { fieldUserDtoList = [] } = store.auditDetail || {}
        return fieldUserDtoList.length > 0
    }

    /**
     * 报名表 逐项渲染
     */
    const getEnrollTableListItem = (type: ENROLL_TABLE_LIST_ENUM, list: any[]) => {
        return (
            <div className={styles.enroll_table_item}>
                <div className={styles.enroll_table_item_title}>
                    <span />
                    {ENROLL_TABLE_LIST_ENUM_NAME[type]}
                </div>

                <div className={styles.enroll_table_item_list}>
                    <Descriptions column={3}>
                        {list.map(item => (
                            <Descriptions.Item key={JSON.stringify(item)} label={item.name}>
                                {translateValue(item)}
                            </Descriptions.Item>
                        ))}
                    </Descriptions>
                </div>
            </div>
        )
    }
    /**
     * 报名表信息
     */
    const getEnrollTableList = () => {
        const { fieldUserDtoList = [] } = store.auditDetail || {}
        const tempEnrollMap: any = {}
        fieldUserDtoList.map((item: any) => {
            const { fieldType = 0 } = item || {}
            if (!tempEnrollMap[fieldType.toString()]) {
                tempEnrollMap[fieldType.toString()] = [item]
            } else {
                tempEnrollMap[fieldType.toString()].push(item)
            }
        })

        return ENROLL_TABLE_LIST.map(itemSort => {
            const itemList = tempEnrollMap[itemSort.toString()]
            if (itemList) {
                return getEnrollTableListItem(Number(itemSort), itemList)
            } else {
                return null
            }
        })
    }

    /**  渲染在线核验信息  */
    const renderVerification = () => {
        return (
            <>
                <div className={styles.sub_title}>在线核验信息</div>
                <div className={styles.enroll_table_item_veridic}>
                    <div className={styles.enroll_table_item_list}>
                        <Descriptions column={3}>
                            <Descriptions.Item label={'电子签名'}>
                                {store.auditDetail?.signPicWatermark ? (
                                    <div className={styles.img_veridic_box}>
                                        <Image
                                            src={store.auditDetail?.signPicWatermark}
                                            className={styles.enroll_img_img_veridic}
                                        />
                                    </div>
                                ) : (
                                    '-'
                                )}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
            </>
        )
    }

    /**  批量报名信息  */
    const renderBatchRegistration = () => {
        let BatchData = cloneDeep(store?.auditDetail?.applyBatchGroupResponseDto) || {}
        /**  报名方式 1-个人报名 2-批量报名  */
        let method = cloneDeep(store?.auditDetail?.method) || ''
        const list = [
            {
                label: '联系人姓名',
                value: BatchData?.userName || '-',
            },
            {
                label: '手机号',
                value: BatchData?.userMobile || '-',
            },
            {
                label: '证件号码',
                value: BatchData?.userIdentify || '-',
            },
            {
                label: '性别',
                value: SEX_TEXT[BatchData?.gender] || '-',
            },
            {
                label: '工作单位',
                value: BatchData?.workAddress || '-',
            },
            {
                label: '职务',
                value: BatchData?.position || '-',
            },
        ]

        return (
            method === REGISTRATION_METHOD_ENUM.BATCH && (
                <>
                    <div className={styles.sub_title}>批量报名信息</div>
                    <div className={styles.enroll_table_item_veridic}>
                        <div className={styles.enroll_table_item_list}>
                            <Descriptions column={3}>
                                {list.map(item => (
                                    <Descriptions.Item key={item.label} label={item.label}>
                                        {item.value}
                                    </Descriptions.Item>
                                ))}
                            </Descriptions>
                        </div>
                    </div>
                </>
            )
        )
    }

    return (
        <div className={styles.audit_page} ref={pageRef}>
            <div className={styles.audit_title}>
                <CustomTitle
                    title={store.auditDetail?.status === AUDIT_STATUS_ENUM.WAIT ? '审核' : '详情'}
                />
                {store.auditDetail?.status === AUDIT_STATUS_ENUM.WAIT && (
                    <Button type="primary" onClick={() => setAuditVisible(true)}>
                        审核
                    </Button>
                )}
            </div>
            {/* 用户基础信息 */}
            <div className={styles.audit_info}>
                <div className={styles.avatar}>
                    <Image
                        src={store.auditDetail?.userAvatar || DEFAULT_IMG}
                        preview={false}
                        className={styles.avatar_inner}
                    />
                </div>
                <div className={styles.user_info}>
                    <div className={styles.info_name}>
                        <span>
                            {isHideMsg
                                ? getDecodeInfo(getAliasValue('NAME') || '', '1')
                                : getDecodeInfo(getAliasValue('NAME') || '')}
                        </span>
                        <span>{getAliasValue('GENDER')}</span>
                        {store.auditDetail?.method === REGISTRATION_METHOD_ENUM.PERSONAL && (
                            <Tag color="processing">个人报名</Tag>
                        )}
                        {store.auditDetail?.method === REGISTRATION_METHOD_ENUM.BATCH && (
                            <Tag color="success">批量报名</Tag>
                        )}
                        <div
                            className={styles.info_name_btn}
                            onClick={() => {
                                setIsHideMsg(v => !v)
                            }}
                        >
                            {isHideMsg ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </div>
                    </div>
                    <div className={styles.info_info}>
                        <Descriptions column={4}>
                            {UserBaseList.map(item => (
                                <Descriptions.Item
                                    key={item.key}
                                    label={item.label}
                                    contentStyle={{
                                        display: 'block',
                                        whiteSpace: 'nowrap',
                                        maxWidth: 'fit-content',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                    labelStyle={{ whiteSpace: 'nowrap' }}
                                >
                                    <Tooltip
                                        title={getAliasValue(
                                            item.key as unknown as keyof typeof INFO_ENUM,
                                        )}
                                    >
                                        {getAliasValue(
                                            item.key as unknown as keyof typeof INFO_ENUM,
                                        )}
                                    </Tooltip>
                                </Descriptions.Item>
                            ))}
                        </Descriptions>
                    </div>
                </div>
                <div className={styles.info_status}>
                    <span>状态</span>
                    <span className={styles.status_text}>
                        {renderStatus?.[store.auditDetail?.status]?.()}
                    </span>
                </div>
            </div>

            <div className={styles.split} />

            <div className={styles.sub_title}>报名活动</div>

            {/* 报名基础信息 */}
            <div className={styles.enroll_info}>
                <Descriptions column={3}>
                    {EnrollBaseList.map(item => {
                        //缴费未开启 不显示报名费用和缴费截止时间   报名未成功 不显示审核状态和审核时间和缴费时间
                        if (item.iSPayment) return null
                        if (item.isEnrollSuccess) return null
                        return (
                            <Descriptions.Item
                                label={item.label}
                                key={JSON.stringify(item)}
                                contentStyle={item.contentStyle?.()}
                                span={item?.span || 1}
                            >
                                {typeof item.value === 'function' ? item.value?.() : item.value}
                            </Descriptions.Item>
                        )
                    })}
                </Descriptions>
            </div>

            {/* 报名表信息 */}
            {getEnrollTableVisible() ? <div className={styles.sub_title}>报名表信息</div> : null}

            {/* 报名表 每项内容 */}
            {getEnrollTableList()}

            {/* 在线核验信息 */}
            {renderVerification()}
            {/* 批量报名信息 */}
            {renderBatchRegistration()}

            {/*审核modal  */}
            <AuditModal
                visible={auditVisible}
                onCancel={() => setAuditVisible(false)}
                onSubmit={onAuditSubmit}
            />
        </div>
    )
}

const ObserverAuditPage: IRoute = observer(Audit)
ObserverAuditPage.title = '报名管理详情'
export default ObserverAuditPage
