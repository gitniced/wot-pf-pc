import React, { useEffect } from 'react'
import { Image } from 'antd'
import { Observer, useLocalObservable } from 'mobx-react'
// import { toJS } from 'mobx'
import styles from './index.module.less'
// import BlockBox from './../BlockBox'
import _ from 'lodash'
import Minititle from './../Minititle'
import FilletTitle from '../FilletTitle'
import TemplateLayout from './../TemplateLayout'
import Store from './store'
import {
    BUSINESS_CLASS,
    DOCUMENT_TYPE,
    ONLINE_RETAILERS,
    // NATURAL_PERSON,
    // LEGAL_PERSON,
    LEGAL_PERSON_TYPE,
    SETTLEMENT,
    documentTypeEnum,
    NATICETYPE,
    // sameLegalPersonEnum,
} from './const'
import dayjs from 'dayjs'
// import classNames from 'classnames'

// 线上进件管理详情
const Page = ({ code, settlementCode }: { code: string; settlementCode: string }) => {
    const store = useLocalObservable(() => new Store())
    console.log('success')
    useEffect(() => {
        store.getMerchantDetails(code as string, settlementCode)
    }, [code])

    // 线上进件管理详情
    //商户基本信息
    const essentialInformation = () => {
        const {
            name,
            shortName,
            bizType,
            identityType,
            identityNo,
            orgCode,
            orgCodeEffect,
            orgCodeExpiration,
            taxCode,
            taxCodeEffect,
            taxCodeExpiration,
        } = store.merchantInfo || {}

        let arr = [
            {
                label: '商户名称：',
                value: name || '-',
            },
            {
                label: '商户简称：',
                value: shortName || '-',
            },
            {
                label: '经营分类：',
                value: bizType ? BUSINESS_CLASS[bizType] : '-',
            },
            {
                label: '证件类型：',
                value: identityType ? DOCUMENT_TYPE[identityType] : '-',
            },
            {
                label: '证件号码：',
                value: identityNo || '-',
            },
            {
                label: '机构代码：',
                value: orgCode || '-',
            },
            {
                label: '机构代码生效日期：',
                value: orgCodeEffect ? dayjs(orgCodeEffect).format('YYYY-MM-DD') : '-',
            },
            {
                label: '机构代码过期日期：',
                value: orgCodeExpiration ? dayjs(orgCodeExpiration).format('YYYY-MM-DD') : '-',
            },
            {
                label: '税务登记证号：',
                value: taxCode || '-',
            },
            {
                label: '税务登记证生效日期：',
                value: taxCodeEffect ? dayjs(taxCodeEffect).format('YYYY-MM-DD') : '-',
            },
            {
                label: '税务登记证过期日期：',
                value: taxCodeExpiration ? dayjs(taxCodeExpiration).format('YYYY-MM-DD') : '-',
            },
        ]

        if (identityType !== documentTypeEnum.ONE) {
            arr.splice(5)
        }
        return arr
    }
    // 商户附加信息
    const additionalInformation = () => {
        const { addressDetail, mchtPhone, mccName, crossBorder } = store.merchantInfo || {}
        return [
            {
                label: '地址：',
                //todo:
                value: addressDetail || '-',
            },
            {
                label: '详细地址：',
                value: addressDetail || '-',
            },
            {
                label: '联系电话：',
                value: mchtPhone || '-',
            },
            {
                label: '行业类别：',
                value: mccName || '-',
            },
            {
                label: '是否跨境电商：',
                value: ONLINE_RETAILERS[crossBorder!] ?? '-',
            },
        ]
    }
    /**
     *
     * @param type 自然人类型
     * @returns
     */
    const naturalPerson = (type: string) => {
        let targetPerson: any =
            _.get(store, 'merchantInfo.merchantNativeInfoList', []).find((item: any) => {
                return item.nativeType === type
            }) || {}
        let list: any = []
        if (type === NATICETYPE.ONE) {
            // 法人代表
            list = [
                {
                    label: '姓名：',
                    value: targetPerson.nativeName,
                },
                {
                    label: '证件类型：',
                    value: targetPerson.nativeIdentityType
                        ? LEGAL_PERSON_TYPE[targetPerson.nativeIdentityType]
                        : '-',
                },
                {
                    label: '证件号码：',
                    value: targetPerson.nativeIdentityNo,
                },
                {
                    label: '证件生效日期：',
                    value: targetPerson.nativeIdentityEffect
                        ? dayjs(targetPerson.nativeIdentityEffect).format('YYYY-MM-DD')
                        : '-',
                },
                {
                    label: '证件过期日期：',
                    value: targetPerson.nativeIdentityExpiration
                        ? dayjs(targetPerson.nativeIdentityExpiration).format('YYYY-MM-DD')
                        : '-',
                },
                {
                    label: '联系电话：',
                    value: targetPerson.nativePhone,
                },
            ]
        } else if (type === NATICETYPE.BENEFICIAY) {
            // 受益人
            let isBeneficiary = _.isEmpty(targetPerson) ? '否' : '是'
            let isSameLegal = targetPerson.sameLegal === '1' ? '是' : '否'
            list.push({
                label: '是否有受益人：',
                value: isBeneficiary,
            })
            if (!_.isEmpty(targetPerson)) {
                // 受益人不为否的时候，展示是否同法人
                list.push({
                    label: '是否同法人：',
                    value: isSameLegal,
                })
                if (targetPerson.sameLegal === '0') {
                    // 不同法人
                    list.push(
                        {
                            label: '姓名：',
                            value: targetPerson.nativeName,
                        },
                        {
                            label: '证件类型：',
                            value: targetPerson.nativeIdentityType
                                ? LEGAL_PERSON_TYPE[targetPerson.nativeIdentityType]
                                : '-',
                        },
                        {
                            label: '证件号码：',
                            value: targetPerson.nativeIdentityNo,
                        },
                        {
                            label: '证件生效日期：',
                            value: targetPerson.nativeIdentityEffect
                                ? dayjs(targetPerson.nativeIdentityEffect).format('YYYY-MM-DD')
                                : '-',
                        },
                        {
                            label: '证件过期日期：',
                            value: targetPerson.nativeIdentityExpiration
                                ? dayjs(targetPerson.nativeIdentityExpiration).format('YYYY-MM-DD')
                                : '-',
                        },
                    )
                }
                list.push({
                    label: '地址：',
                    value: targetPerson.nativeAddress,
                })
            }
        } else if (type === NATICETYPE.SIX) {
            // 业务联系人
            list = [
                {
                    label: '业务联系人电话：',
                    value: targetPerson.nativePhone || '-',
                },
            ]
        }
        return list
    }
    //商户账户信息
    const accountInformation = () => {
        const { account, accountName, accountType, openingBankName, openingBankAddress } =
            store.merchantInfo || {}
        return [
            {
                label: '结算账号：',
                value: account || '-',
            },
            {
                label: '结算账号户名：',
                value: accountName || '-',
            },
            {
                label: '结算账号类型：',
                value: accountType ? SETTLEMENT[accountType] : '-',
            },
            {
                label: '结算账号开户行名称：',
                value: openingBankName || '-',
            },
            {
                label: '结算账户开户行所在地：',
                value: openingBankAddress || '-',
            },
        ]
    }
    // 附件上传
    const additional = () => {
        const {
            legalIdentityPicFront,
            legalIdentityPicBack,
            beneficiaryIdentityPicBack,
            beneficiaryIdentityPicFront,
            bizLicensePic,
            bizPlacePic1,
            bizPlacePic2,
            bizPlacePic3,
            bizPlacePic4,
            bizPlacePic5,
        } = store.merchantInfo || {}
        let list = [
            {
                label: '法人代表身份证：',
                value: (
                    <>
                        {legalIdentityPicFront ? <Image src={legalIdentityPicFront} /> : '-'}
                        {legalIdentityPicBack ? <Image src={legalIdentityPicBack} /> : '-'}
                    </>
                ),
            },
            {
                label: '营业执照：',
                value: <>{bizLicensePic ? <Image src={bizLicensePic} /> : '-'}</>,
            },
            {
                label: '经营场所影像：',
                value: (
                    <div className={styles.image_warp}>
                        {bizPlacePic1 && <Image src={bizPlacePic1} />}
                        {bizPlacePic2 && <Image src={bizPlacePic1} />}
                        {bizPlacePic3 && <Image src={bizPlacePic3} />}
                        {bizPlacePic4 && <Image src={bizPlacePic4} />}
                        {bizPlacePic5 && <Image src={bizPlacePic5} />}
                    </div>
                ),
                labelStyle: {
                    margin: '42px 0 0 0',
                },
                itemStyle: {
                    'align-items': 'flex-start',
                },
            },
        ]
        // 如果受益人同法人的话，需要上传受益人身份证
        let targetPerson: any =
            _.get(store, 'merchantInfo.merchantNativeInfoList', []).find((item: any) => {
                return item.nativeType === NATICETYPE.BENEFICIAY
            }) || {}
        if (!_.isEmpty(targetPerson) && targetPerson.sameLegal === '0') {
            list.splice(1, 0, {
                label: '受益人身份证：',
                value: (
                    <>
                        {beneficiaryIdentityPicFront ? (
                            <Image src={beneficiaryIdentityPicFront} />
                        ) : (
                            '-'
                        )}
                        {beneficiaryIdentityPicBack ? (
                            <Image src={beneficiaryIdentityPicBack} />
                        ) : (
                            '-'
                        )}
                    </>
                ),
            })
        }
        return list
    }

    return (
        <div className={styles.success_view}>
            <Observer>
                {() => {
                    return (
                        <div className={styles.success_view_content}>
                            <Minititle
                                title="商户基本信息"
                                titleStyles={{ marginTop: '24px', fontSize: '16px' }}
                            />
                            <TemplateLayout
                                dataJson={essentialInformation()}
                                col={3}
                                lineStyle={{ height: '24px' }}
                            />
                            <Minititle
                                title="商户附加信息"
                                titleStyles={{ marginTop: '24px', fontSize: '16px' }}
                            />
                            <TemplateLayout
                                dataJson={additionalInformation()}
                                col={3}
                                lineStyle={{ height: '30px' }}
                            />
                            <Minititle
                                title="商户自然人信息"
                                titleStyles={{ marginTop: '24px', fontSize: '16px' }}
                            />
                            <FilletTitle title="法人代表" />
                            <TemplateLayout dataJson={naturalPerson(NATICETYPE.ONE)} />
                            <FilletTitle
                                title="受益人"
                                style={{ marginTop: '16px' }}
                                desc="他行进件（即结算账户非招行对公卡)，受益人信息必填，受益人指：直接或间接持股累计超过25%以上的自然人"
                            />
                            <TemplateLayout dataJson={naturalPerson(NATICETYPE.BENEFICIAY)} />
                            <FilletTitle title="业务联系人" style={{ marginTop: '16px' }} />
                            <TemplateLayout dataJson={naturalPerson(NATICETYPE.SIX)} />

                            <Minititle
                                title="商户账户信息"
                                titleStyles={{ marginTop: '24px', fontSize: '16px' }}
                            />
                            <TemplateLayout
                                dataJson={accountInformation()}
                                col={3}
                                lineStyle={{ height: '30px' }}
                            />
                            <Minititle
                                title="附件上传"
                                titleStyles={{ marginTop: '24px', fontSize: '16px' }}
                            />
                            <TemplateLayout
                                dataJson={additional()}
                                // col={3}
                                // // itemStyle={classNames(styles.itemsUpLoad)}
                                // itemClass={classNames(styles.itemsUpLoad)}
                                // lineStyle={{ alignItems: 'flex-start' }}
                            />
                        </div>
                    )
                }}
            </Observer>
        </div>
    )
}
Page.title = '线上进件详情'
export default Page
