import { message, Modal, Spin } from 'antd'
import { Observer, inject } from 'mobx-react'
import styles from './index.module.less'
import type { IProps, OBJ_TYPE } from './interface'
import Http from '@/servers/http'
import API from './api'
import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import { getViewComponents } from '../../create/components/Mytools/generatorFn'
import { delCookie, getCookie, getLocalStorage, setCookie } from '@/storage'
// import { getLastPath } from '@/utils/pathUtils'
// import type { PlanListItem } from '@/pages/gateway/pc-web/create/components/ActionBar/IdentifyResult/interface'
import {
    getCognList,
    getCourseList,
    getImageText,
    getPlanList,
    judgeIsPcOrMobile,
    getEnrollList,
    getPracticeList,
} from '@/utils/getMicroList'
import { COMPONENT_TYPE } from '@/pages/gateway/components/const'

function parseJson(res: string) {
    try {
        return JSON.parse(res)
    } catch (err) {
        return [] || err
    }
}

export default inject('siteStore')((props: IProps) => {
    const { visible, onCancel, code, data, siteStore } = props

    const getSaasBase = () => siteStore?.siteData?.data?.baseInfo?.portalH5Url
    const title = '预览'
    const [detail, setDetail] = useState<OBJ_TYPE>()
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const getDetail = async (codes: string) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const sid = getLocalStorage('SID')

        const res: any = await Http(
            `${API.getMicroDetail}`,
            'POST',
            { code: codes, organizationCode, sid },
            {},
        )

        const { httpStatusCode, summaryMicropageRespDto } = (res || {}) as any
        if (httpStatusCode === '401') {
            delCookie('TOKEN')
            message.error('您没有预览权限', 3)
            if (window) {
                const { siteData } = getLocalStorage('SITE_STORE') || {}
                const { data: sData } = siteData || {}
                const { baseInfo = {} } = sData || {}
                let loginUrl = baseInfo.pcDomain || ''
                loginUrl = RUN_ENV === 'local' ? '' : loginUrl
                setCookie('FROM_URL', `${location.href}`)
                window.location.replace(loginUrl ? `${loginUrl}/account/user/login` : '/404')
                window?.self_store?.userStore?.initStore()
            }
            return
        }
        setDetail(summaryMicropageRespDto)

        let _res = parseJson(summaryMicropageRespDto.customContent) || []

        const { type } = summaryMicropageRespDto

        let ImageDefault = await getImageText(_res, 'default')
        let PlanDefault = await getPlanList(_res, 'default')
        let CognizanceDefault = await getCognList(_res, 'default')
        let CourseDefault = await getCourseList(_res, 'default')
        let EnrollDefault = await getEnrollList(_res, 'default')
        let PracticeDefault = await getPracticeList(_res, 'default')

        _res = await Promise.all(
            _res?.map(async (item: any) => {
                const typeHandlers: Record<string, () => Promise<any>> = {
                    image_text: async () => {
                        if (item?.selectMode === 2 || item.rule === 'custom_rule') {
                            item.rule = 'custom'
                        } else if (item?.selectMode === 1) {
                            item.rule = 'default'
                        }

                        let codesList: any = []
                        /**  type 1移动 2pc  */
                        const ruleHandlers: Record<string, () => Promise<any>> = {
                            default: async () => {
                                return judgeIsPcOrMobile(type, ImageDefault)
                            },
                            custom: async () => {
                                return await getImageText(_res, 'custom', item.codes)
                            },
                            by_category: async () => {
                                let byCategoryList = await getImageText(
                                    _res,
                                    'by_category',
                                    item.selectCategory,
                                )
                                return judgeIsPcOrMobile(type, byCategoryList)
                            },
                        }

                        codesList = await ruleHandlers?.[item?.rule]()

                        delete item?.selectMode
                        return {
                            ...item,
                            codes: Array.isArray(codesList) ? codesList : [],
                        }
                    },
                    plan_formula: async () => {
                        let codesList: any = []
                        item.rule = item.rule === 'custom_rule' ? 'custom' : item.rule
                        const ruleHandlers: Record<string, () => Promise<any>> = {
                            default: () => {
                                return PlanDefault?.slice(0, 4) || []
                            },
                            custom: async () => {
                                return await getPlanList(_res, 'custom', item.codes)
                            },
                            by_category: async () => {
                                let byCategoryList = await getPlanList(
                                    _res,
                                    'by_category',
                                    item.selectCategory,
                                )
                                return judgeIsPcOrMobile(1, byCategoryList)
                            },
                        }
                        codesList = await ruleHandlers?.[item?.rule]()

                        return { ...item, codes: codesList }
                    },
                    identification_result: async () => {
                        let contentList: any = []
                        item.rule = item.rule === 'custom_rule' ? 'custom' : item.rule

                        const ruleHandlers: Record<string, () => Promise<any>> = {
                            default: () => CognizanceDefault?.slice(0, 4) || [],
                            custom: async () => {
                                return await getCognList(_res, 'custom', item.codes)
                            },
                            by_category: async () => {
                                let byCategoryList = await getCognList(
                                    _res,
                                    'by_category',
                                    item.selectCategory,
                                )
                                return judgeIsPcOrMobile(1, byCategoryList)
                            },
                        }
                        contentList = await ruleHandlers?.[item?.rule]()

                        return { ...item, content: contentList }
                    },
                    course: async () => {
                        let codesList: any = []
                        const ruleHandlers: Record<string, () => Promise<any>> = {
                            default: () => CourseDefault || [],
                            custom: async () => {
                                return await getCourseList(_res, 'custom', item.codes)
                            },
                            by_category: async () => {
                                return await getCourseList(_res, 'by_category', item.selectCategory)
                            },
                        }
                        codesList = await ruleHandlers?.[item?.rule]()

                        return { ...item, lessonContent: codesList }
                    },
                    enroll_card: async () => {
                        let codesList: any = []
                        const ruleHandlers: Record<string, () => Promise<any>> = {
                            default: () => EnrollDefault || [],
                            custom: async () => {
                                return await getEnrollList(_res, 'custom', item.codes).catch(() => {
                                    return []
                                })
                            },
                            by_category: async () => {
                                return await getEnrollList(
                                    _res,
                                    'by_category',
                                    item.selectCategory,
                                ).catch(() => {
                                    return []
                                })
                            },
                        }
                        codesList = await ruleHandlers?.[item?.rule]()
                        return { ...item, codes: codesList, content: codesList }
                    },
                    practice: async () => {
                        let codesList: any = []
                        const ruleHandlers: Record<string, () => Promise<any>> = {
                            default: async () => {
                                return judgeIsPcOrMobile(type, PracticeDefault)
                            },
                            custom: async () => {
                                return await getPracticeList(_res, 'custom', item.codes)
                            },
                            by_category: async () => {
                                return await getPracticeList(
                                    _res,
                                    'by_category',
                                    item.selectCategory,
                                )
                            },
                        }
                        codesList = await ruleHandlers?.[item?.rule]()
                        return {
                            ...item,
                            codes: codesList,
                        }
                    },
                }

                const typeHandler = typeHandlers?.[item?.type]
                if (typeHandler) {
                    return typeHandler()
                } else {
                    return item
                }
            }),
        )
        setList(_res)
        setLoading(false)
    }
    useEffect(() => {
        visible ? getDetail(code) : setList([])
        !visible && setLoading(true)
    }, [visible])

    return (
        <div className={styles.modal}>
            <Modal
                title={title}
                open={visible}
                onCancel={onCancel}
                width={800}
                destroyOnClose={true}
                className={styles.previewModal}
                footer={false}
                centered
            >
                <Observer>
                    {() => {
                        return (
                            <div className={styles.flexBox}>
                                <div
                                    className={styles.prevBox}
                                    style={{ backgroundColor: detail?.backgroundColor }}
                                >
                                    <div className={styles.mobile_top}>
                                        <div className={styles.page_title}>{detail?.name}</div>
                                    </div>
                                    {list?.length > 0 ? (
                                        list?.map?.((item: any) => {
                                            if (item.type === COMPONENT_TYPE.CUSTOMER) {
                                                item.fixed = true
                                            }
                                            return getViewComponents(item)
                                        })
                                    ) : (
                                        <div className={styles.spin_box}>
                                            <Spin spinning={loading} size={'large'} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className={styles.qrCode}>
                                        <QRCode
                                            id="QR-code"
                                            value={`${getSaasBase()}${data.preViewUrl}` || ''}
                                            size={175}
                                            fgColor="#000000"
                                        />
                                    </div>
                                    <div className={styles.title}>手机扫码预览</div>
                                </div>
                            </div>
                        )
                    }}
                </Observer>
            </Modal>
        </div>
    )
})
