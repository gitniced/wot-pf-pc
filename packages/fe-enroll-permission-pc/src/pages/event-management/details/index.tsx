import React, { useEffect, useRef, useState } from 'react'
import CustomTitle from '@/components/CustomTitle'
import RenderItem from '../components/RenderItem'
import FilletTitle from '@/components/FilletTitle'
import type { DataJsonItem } from '@/components/RenderItem'
import { Tabs, Row, Col, Button } from 'antd'
import { history, useLocation } from 'umi'
import { items } from '@/pages/enroll-setting/const'
import { observer, useLocalObservable } from 'mobx-react'
import EventDetailsStore from './store'
import styles from './index.module.less'
import {
    TYPE_ITEM,
    TYPE_ITEM_ENUM,
    TYPE_TAG,
    TYPE_TAG_TRANSFORMED,
} from '../components/superTables/const'
// import { toJS } from 'mobx';
import dayjs from 'dayjs'
import CategoryItem from '@/pages/enroll-setting/components/FormCategory'
import { setPageTitle } from '@/utils/setDocTitle'
import EnrollDetails from '../components/EnrollDetails'

/** 活动详情页面 */
const EventDetailsPage = () => {
    const pageRef = useRef(null)
    const store = useLocalObservable(() => new EventDetailsStore())
    const { eventDetails } = store
    const { query } = useLocation()

    useEffect(() => {
        const { code = '' } = query
        if (code) {
            store.getEventDetails(code)
        }
        setPageTitle('详情')
    }, [])

    /**  selectKey  */
    const [selectKey, setSelectKey] = useState('basicInformation')
    /**  可见区域总高度  */
    // const [contentHeight, setContentHeight] = useState<number>(0)
    // /**  滚动内容总高度  */
    // const [scrollHeight, setScrollHeight] = useState<number>(0)
    // /**  前滚动条的位置  */
    // const [scrollPosition, setScrollPosition] = useState<number>(0)

    // /**  监听滚动  */
    // const handleScroll = () => {
    //     const currentScrollHeight =
    //         document?.getElementById('event_details_content')?.scrollHeight || 0
    //     const currentPosition = document?.getElementById('event_details_content')?.scrollTop || 0
    //     setScrollHeight(currentScrollHeight)
    //     setScrollPosition(currentPosition)
    // }

    // useEffect(() => {
    //     const enrollContentId = document.getElementById('event_details_content')
    //     setContentHeight(enrollContentId?.offsetHeight || 0)
    //     enrollContentId?.addEventListener('scroll', handleScroll)
    //     return () => {
    //         enrollContentId?.removeEventListener('scroll', handleScroll)
    //     }
    // }, [])

    // useEffect(() => {
    //     const bottomDis =
    //         scrollHeight - scrollPosition < contentHeight ||
    //         scrollHeight - scrollPosition === contentHeight
    //     if (scrollHeight && contentHeight) {
    //         if (bottomDis) {
    //             setSelectKey('enrollFormSetting')
    //         } else {
    //             if (scrollPosition) {
    //                 if (scrollPosition >= 0 && scrollPosition < 160) {
    //                     setSelectKey('basicInformation')
    //                 } else if (scrollPosition >= 160 && scrollPosition < 295) {
    //                     setSelectKey('enrollInformation')
    //                 } else if (scrollPosition >= 295 && scrollPosition < 555) {
    //                     setSelectKey('enrollDetails')
    //                 } else if (scrollPosition >= 555) {
    //                     setSelectKey('enrollFormSetting')
    //                 }
    //             }
    //         }
    //     }
    // }, [scrollPosition])

    // 选中后取消元素焦点 消除样式bug
    useEffect(() => {
        Array.from(document.getElementsByClassName('fe-enroll-pc-tabs-tab-btn')).map(item => {
            // @ts-ignore
            item.blur()
        })
    }, [selectKey])

    /*滚动到锚点*/
    const scrollToAnchor = (anchorName: string) => {
        const enrollContentId = document.getElementById('event_details_content')
        if (enrollContentId) {
            enrollContentId.scrollTop = 0
        }
        setSelectKey(anchorName)
        // if (anchorName) {
        //     setSelectKey(anchorName)
        //     let anchorElement = document.getElementById(anchorName)
        //     if (anchorElement) {
        //         anchorElement.scrollIntoView({ block: 'start', behavior: 'auto' })
        //     }
        // }
    }

    const getTime = (time: number | string, format = 'YYYY-MM-DD') => {
        return time ? dayjs(time).format(format) : '-'
    }
    /** 基本信息 */
    // const getBaseInfoJson = (): DataJsonItem[] => {
    //     return [
    //         {
    //             label: '报名项目',
    //             value: TYPE_TAG[TYPE_TAG_TRANSFORMED[eventDetails.entryCode!]],
    //             type: TYPE_ITEM[TYPE_ITEM_ENUM.DEFAULT],
    //         },
    //         // {
    //         //     label: '报名活动名称',
    //         //     value: eventDetails.name,
    //         //     type: TYPE_ITEM[TYPE_ITEM_ENUM.DEFAULT],
    //         // },
    //         {
    //             label: '选择分类',
    //             type: TYPE_ITEM[TYPE_ITEM_ENUM.CATE],
    //             render: () => {
    //                 //@ts-ignore
    //                 return eventDetails?.categoryName?.length > 0 ? (
    //                     <CategoryItem list={eventDetails?.categoryName || []} />
    //                 ) : null
    //             },
    //         },
    //         // {
    //         //     label: '活动开始时间',
    //         //     value: getTime(eventDetails.activityStart!),
    //         //     type: TYPE_ITEM[TYPE_ITEM_ENUM.TIME],
    //         // },
    //         // {
    //         //     label: '活动结束时间',
    //         //     value: eventDetails.activityEnd ? getTime(eventDetails.activityEnd) : undefined,
    //         //     type: TYPE_ITEM[TYPE_ITEM_ENUM.TIME],
    //         // },
    //         // {
    //         //     label: '地点',
    //         //     value: eventDetails.address,
    //         //     type: TYPE_ITEM[TYPE_ITEM_ENUM.DEFAULT],
    //         // },
    //         // {
    //         //     label: '封面',
    //         //     value: eventDetails.cover ? (
    //         //         <Image style={{ width: 104, height: 104 }} src={eventDetails.cover} />
    //         //     ) : (
    //         //         '-'
    //         //     ),
    //         //     type: TYPE_ITEM[TYPE_ITEM_ENUM.IMAGE],
    //         // },
    //     ]
    // }
    /** 报名信息 */
    const getEnrollInfoJson = (): DataJsonItem[] => {
        return [
            {
                label: '报名项目',
                value: TYPE_TAG[TYPE_TAG_TRANSFORMED[eventDetails.entryCode!]],
                type: TYPE_ITEM[TYPE_ITEM_ENUM.DEFAULT],
            },
            {
                label: '选择分类',
                type: TYPE_ITEM[TYPE_ITEM_ENUM.CATE],
                render: () => {
                    //@ts-ignore
                    return eventDetails?.categoryName?.length > 0 ? (
                        <CategoryItem list={eventDetails?.categoryName || []} />
                    ) : null
                },
            },
            {
                label: '报名开始时间',
                value: getTime(eventDetails.applyStartTime!, 'YYYY-MM-DD HH:mm'),
            },
            {
                label: '报名结束时间',
                value: getTime(eventDetails.applyEndTime!, 'YYYY-MM-DD HH:mm'),
            },
            {
                label: '最大报名人数',
                value: eventDetails.quota === -1 ? '-' : eventDetails.quota,
            },
            {
                label: '报名审核',
                value: eventDetails.openAudit === 0 ? '关闭' : '开启',
            },
            {
                label: '报名缴费',
                value: eventDetails.openPay === 0 ? '关闭' : '开启',
            },
            {
                label: '取消报名',
                value: eventDetails?.cancelFlag === 0 ? '关闭' : '开启',
            },
            {
                label: '取消报名截止时间',
                value: getTime(eventDetails?.cancelEnd || 0, 'YYYY-MM-DD HH:mm:ss'),
            },
        ]
    }
    /** 报名详情 */
    // const renderEnrollDetailContent = () => {
    //     let attachmentJson: { name: string; url: string }[] = []
    //     if (eventDetails.attachmentJson) {
    //         try {
    //             attachmentJson = JSON.parse(eventDetails.attachmentJson)
    //         } catch (e) {
    //             console.log('e', e)
    //         }
    //     }
    //     let list = [
    //         {
    //             label: '联系方式',
    //             value: eventDetails.contract,
    //         },
    //         {
    //             label: '活动简介',
    //             value: eventDetails.intro,
    //         },
    //         {
    //             label: '活动详情',
    //             type: 'richText',
    //             value: eventDetails.detail || '',
    //         },
    //         {
    //             label: '附件材料',
    //             render: () => {
    //                 return (
    //                     <div className={styles.attachment_content}>
    //                         {attachmentJson.length === 0
    //                             ? '-'
    //                             : attachmentJson.map(file => {
    //                                   return (
    //                                       <div
    //                                           key={file.url}
    //                                           className={styles.attachment_file_item}
    //                                       >
    //                                           <div className={styles.file}>{file.name}</div>
    //                                           <a
    //                                               download={file.name}
    //                                               href={file.url}
    //                                               target="_blank"
    //                                               rel="noreferrer"
    //                                           >
    //                                               下载
    //                                           </a>
    //                                       </div>
    //                                   )
    //                               })}
    //                     </div>
    //                 )
    //             },
    //         },
    //     ]
    //     return (
    //         <Row gutter={24}>
    //             {list.map(item => {
    //                 let content: React.ReactNode = ''
    //                 if (typeof item.render === 'function') {
    //                     content = item.render()
    //                 } else if (item.type === 'richText') {
    //                     content = (
    //                         <div
    //                             className={styles.rich_text_wrapper}
    //                             dangerouslySetInnerHTML={{
    //                                 __html: item.value,
    //                             }}
    //                         />
    //                     )
    //                 } else {
    //                     content = (
    //                         <div className={styles.value} title={item.value?.toString()}>
    //                             {item.value || '-'}
    //                         </div>
    //                     )
    //                 }
    //                 return (
    //                     <Col key={Math.random()} className={styles.enroll_detail_col} span={24}>
    //                         <div className={styles.label}>{item.label}：</div>
    //                         {content}
    //                     </Col>
    //                 )
    //             })}
    //         </Row>
    //     )
    // }
    /** 报名表单 */
    const renderEnrollFormInfo = () => {
        let list: any[] = []
        let map = new Map()
        // @ts-ignore
        eventDetails.fieldDtoList?.forEach(item => {
            if (map.has(item.fieldType)) {
                const cur = map.get(item.fieldType)
                cur.children.push(item)
                map.set(item.fieldType, cur)
            } else {
                map.set(item.fieldType, {
                    children: [{ ...item }],
                    fieldTypeDesc: item.fieldTypeDesc,
                    fieldType: item.fieldType,
                })
            }
        })
        map.forEach(item => {
            list.push(item)
        })
        return (
            <div className={styles.enroll_form}>
                {list.map((item, index) => {
                    return (
                        <div key={item?.fieldTypeDesc}>
                            <FilletTitle
                                title={item.fieldTypeDesc}
                                titleStyles={{ marginTop: index !== 0 ? 40 : 0 }}
                            />
                            <Row className={styles.enroll_form_row}>
                                {/* @ts-ignore */}
                                {item.children.map(child => {
                                    return (
                                        <Col
                                            className={styles.enroll_form_col}
                                            key={child.toString()}
                                            span={5}
                                        >
                                            <div className={styles.enroll_form_col_label}>
                                                {child.name}
                                            </div>
                                            <div className={styles.enroll_form_col_value}>
                                                {/* {child.requiredType === 1 ? ( */}
                                                {child?.rule?.required ? (
                                                    <svg
                                                        className={[
                                                            'icon',
                                                            'icon_bitian',
                                                            styles.require,
                                                        ].join(' ')}
                                                        aria-hidden="true"
                                                    >
                                                        <use xlinkHref="#icon_bitian" />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        className={[
                                                            'icon',
                                                            'icon_feibitian',
                                                            styles.un_require,
                                                        ].join(' ')}
                                                        aria-hidden="true"
                                                    >
                                                        <use xlinkHref="#icon_feibitian" />
                                                    </svg>
                                                )}
                                            </div>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    )
                })}
            </div>
        )
    }

    const [fatherLeft, setFatherLeft] = useState(0)
    useEffect(() => {
        const resizeHandler = () => {
            const fatherDom = document.getElementsByClassName('right_content')?.[0] || null
            if (fatherDom) {
                const { x: left } = fatherDom?.getBoundingClientRect?.() || {}
                setFatherLeft(left || 0)
            }
        }
        resizeHandler()
        window.addEventListener('resize', resizeHandler)
        window.addEventListener('scroll', resizeHandler)
        return () => {
            window.removeEventListener('resize', resizeHandler)
            window.removeEventListener('scroll', resizeHandler)
        }
    }, [])

    return (
        <div className={styles.event_details_page} ref={pageRef}>
            <div className={styles.header}>
                <CustomTitle title="详情" marginBottom={0} />
                <Tabs
                    className={styles.tabs}
                    // defaultActiveKey="1"
                    activeKey={selectKey}
                    onChange={scrollToAnchor}
                    items={items}
                />
            </div>
            {selectKey !== 'enrollDetails' && (
                <div className={styles.event_details_content} id="event_details_content">
                    {/* <Minititle
                    title="报名信息"
                    id={'basicInformation'}
                    titleStyles={{ marginTop: 32 }}
                /> */}
                    {selectKey === 'basicInformation' && (
                        <>
                            {/* <RenderItem dataJson={getBaseInfoJson()} /> */}
                            {/* <Minititle title="基本信息" id={'enrollInformation'} /> */}
                            <RenderItem dataJson={getEnrollInfoJson()} />
                        </>
                    )}
                    {/* <Minititle title="报名详情" id={'enrollDetails'} />
                {renderEnrollDetailContent()} */}
                    {/* <Minititle title="报名表单" id={'enrollFormSetting'} /> */}
                    {selectKey === 'enrollFormSetting' && renderEnrollFormInfo()}
                </div>
            )}
            {selectKey === 'enrollDetails' && (
                <div className={styles.event_details_wrapper} id="event_details_content">
                    <EnrollDetails store={store} />
                </div>
            )}

            <div
                className={styles.footer}
                style={{ width: `calc(100vw - ${fatherLeft}px)`, left: `${fatherLeft}px` }}
            >
                <Button onClick={() => history.push('/event-management')}>返回</Button>
            </div>
        </div>
    )
}

export default observer(EventDetailsPage)
