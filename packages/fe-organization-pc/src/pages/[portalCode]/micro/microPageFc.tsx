import styles from './index.module.less'
import type { PC_LAYOUT_ENUM } from './interface.d'
import { LinkEnum, PC_COMPONENT_TYPE, LAYOUT_STYLE } from './interface.d'
import baseHooks from './hooks'
import {
    PTCustomImageView,
    PTSwiperView,
    PTArticleContentView,
    PTTitleView,
    PTListLayout,
    PTCourseView,
    PTIdentifyResultView,
    PTPlanPublicityView,
    PTBrushQuestionsView,
    PTEnrollCardView,
    PTTabs,
    PcClassCard,
} from '@wotu/pt-components'
import { microLinkHandler } from '@/utils/microLink'
import { Spin, message } from 'antd'
import { useEffect, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import { omitObject, PC_LAYOUT_ENUM_TRANSFORM } from './const'
import http from '@/servers/http'
import packageInfo from '../../../../package.json'
// import { omitObject, PC_LAYOUT_ENUM_TRANSFORM } from './const'

const MicroPageFc = ({
    code,
    type,
    siteStore,
    userStore,
}: {
    code: string
    type?: 'home' | 'micro'
    siteStore: SiteStore
    userStore: UserStore
}) => {
    const hooks = useLocalObservable(() => new baseHooks())
    const { portalData } = siteStore
    let currentAlias = getPortalCodeFromUrl()
    let currentPortalData = portalData?.[currentAlias] || {}
    const [loading] = useState(true)

    let { customContent = [], backgroundColor = '#fff', name = '' } = hooks.microData || {}
    name = name || (type === 'home' ? '首页' : '微页面')
    customContent = Array.isArray(customContent) ? customContent : JSON.parse(customContent || '[]')

    /**
     * @params key 选中的key
     * @return 分组{key}下的课程列表数据
     */
    const getCourseDataByKey = (key: string) => {
        return http(
            '/career_main/course/batch_detail_by_organization',
            'post',
            {
                groupId: key,
                organizationCode: currentAlias,
            },
            { repeatFilter: false },
        )
    }

    const init = async () => {
        if (!code) return
        await hooks.initPage(code)
    }

    useEffect(() => {
        const { organizationName = '', shortName = '' } = currentPortalData || {}
        let orgName = shortName || organizationName
        let documentTitle = orgName ? `${name}-${orgName}` : name
        document.title = documentTitle
    }, [name, currentPortalData])
    useEffect(() => {
        init()
    }, [code, currentAlias])
    return (
        <div className={styles.micro} style={{ background: backgroundColor }}>
            {customContent?.length > 0 ? (
                customContent?.map?.((item: any) => {
                    const { showType = 'single', lessonGroup = [] } = item || {}
                    console.log('+++++++++++++++++++++', item)
                    switch (item?.type) {
                        case PC_COMPONENT_TYPE.COURSE: {
                            return (
                                <div className={styles.page_module} key={item?.id}>
                                    {showType === 'single' ? (
                                        <PTListLayout
                                            source="portal"
                                            dataSource={item?.lessonContent}
                                            containerStyle={{ width: '1200px', margin: '0 auto' }}
                                            numWithOneLine={
                                                PC_LAYOUT_ENUM_TRANSFORM?.[
                                                item?.layoutStyle as PC_LAYOUT_ENUM
                                                ] || 5
                                            }
                                            extraData={{
                                                ...omitObject(item),
                                                onClickCard: id => {
                                                    if (!id) {
                                                        message.info('暂无内容展示，请先配置完内容')
                                                        return
                                                    }
                                                    microLinkHandler(
                                                        {
                                                            code: id,
                                                            type: LinkEnum.COURSE_DETAIL,
                                                        },
                                                        userStore,
                                                    )
                                                },
                                            }}
                                            itemRender={PTCourseView}
                                            key={item?.id}
                                            type="pc"
                                            className={styles.pc_course_layout}
                                            prefixCls={packageInfo.name}
                                        />
                                    ) : null}
                                    {showType === 'group' ? (
                                        <PTTabs
                                            data={(item || []) as unknown as any}
                                            specialStyle={{ minHeight: '267px' }}
                                            tabs={lessonGroup || []}
                                            getCurrentKeyData={getCourseDataByKey}
                                            itemRender={tempData => (
                                                <PTListLayout
                                                    source="portal"
                                                    dataSource={tempData as []}
                                                    containerStyle={{
                                                        width: '1200px',
                                                        margin: '0 auto',
                                                    }}
                                                    numWithOneLine={
                                                        PC_LAYOUT_ENUM_TRANSFORM?.[
                                                        item?.layoutStyle as PC_LAYOUT_ENUM
                                                        ] || 5
                                                    }
                                                    extraData={{
                                                        ...omitObject(item),
                                                        onClickCard: id => {
                                                            if (!id) {
                                                                message.info(
                                                                    '暂无内容展示，请先配置完内容',
                                                                )
                                                                return
                                                            }
                                                            microLinkHandler(
                                                                {
                                                                    code: id,
                                                                    type: LinkEnum.COURSE_DETAIL,
                                                                },
                                                                userStore,
                                                            )
                                                        },
                                                    }}
                                                    itemRender={PTCourseView}
                                                    type="pc"
                                                    // className={styles.pc_course_layout}
                                                    noLayout={true}
                                                    prefixCls={packageInfo.name}
                                                />
                                            )}
                                        />
                                    ) : null}
                                </div>
                            )
                        }
                        case PC_COMPONENT_TYPE.IMAGE:
                            return (
                                <div className={styles.page_module} key={item?.id}>
                                    <PTCustomImageView
                                        data={item}
                                        key={item?.id}
                                        mode="pc"
                                        onItemClick={temp => {
                                            const { url = {} } = temp || {}
                                            microLinkHandler(url, userStore)
                                        }}
                                    />
                                </div>
                            )
                        case PC_COMPONENT_TYPE.SWIPER:
                            return (
                                <div className={styles.page_module} key={item?.id}>
                                    <PTSwiperView
                                        data={item}
                                        key={item?.id}
                                        mode="pc"
                                        onItemClick={(temp: {}) => {
                                            const { url = {} } = temp || {}
                                            microLinkHandler(url, userStore)
                                        }}
                                    />
                                </div>
                            )
                        case PC_COMPONENT_TYPE.TITLE:
                            return (
                                <div className={styles.page_module} key={item?.id}>
                                    <PTTitleView
                                        data={item}
                                        key={item?.id}
                                        mode="pc"
                                        onItemClick={temp => {
                                            const { url = {} } = temp || {}
                                            microLinkHandler(url, userStore)
                                        }}
                                    />
                                </div>
                            )
                        case PC_COMPONENT_TYPE.IMAGE_TEXTS:
                            return (
                                <div className={styles.page_module} key={item?.id}>
                                    {item?.layoutStyle === LAYOUT_STYLE.IMAGE_LEFT_TITLE_RIGHT ? (
                                        <PTArticleContentView
                                            codes={item?.codes}
                                            containerStyle={{ width: '1200px', margin: '0 auto' }}
                                            // key={item.id}
                                            // extraData={{
                                            //     ...omitObject(item),
                                            // }}
                                            onClick={(i: { code: any }) => {
                                                if (!i?.code) {
                                                    message.info('暂无内容展示，请先配置完内容')
                                                    return
                                                }
                                                return microLinkHandler(
                                                    {
                                                        code: i?.code || '',
                                                        type: LinkEnum.IMAGE_TEXT,
                                                    },
                                                    userStore,
                                                )
                                            }}
                                            data={item?.codes || []}
                                            // noLayout={false}
                                            {...item}
                                            type="pc"
                                            source="portal"
                                        />
                                    ) : (
                                        <PTListLayout
                                            source="portal"
                                            dataSource={item?.codes || []}
                                            containerStyle={{ width: '1200px', margin: '0 auto' }}
                                            numWithOneLine={item?.layoutStyle || 1}
                                            extraData={{
                                                ...omitObject(item),
                                                onItemClick: (i: { code: any }) => {
                                                    if (!i?.code) {
                                                        message.info('暂无内容展示，请先配置完内容')
                                                        return
                                                    }
                                                    return microLinkHandler(
                                                        {
                                                            code: i?.code || '',
                                                            type: LinkEnum.IMAGE_TEXT,
                                                        },
                                                        userStore,
                                                    )
                                                },
                                            }}
                                            itemRender={PTArticleContentView}
                                            key={item?.id}
                                            type="pc"
                                            className={styles.pc_articleCont_layout}
                                            prefixCls={packageInfo.name}
                                        />
                                    )}
                                </div>
                            )
                        case PC_COMPONENT_TYPE.IDENTIFY_RESULT:
                            return (
                                <div className={styles.page_module} key={item?.id}>
                                    <PTIdentifyResultView
                                        source="portal"
                                        data={{ content: item?.content || [], type: item.type }}
                                        onClick={_item => {
                                            microLinkHandler(
                                                {
                                                    code: `/exam/gateway/result-publicity/2/${_item.id}`,
                                                    type: LinkEnum.IDENTIFICATION_RESULT_DETAIL,
                                                },
                                                userStore,
                                            )
                                        }}
                                    />
                                </div>
                            )
                        case PC_COMPONENT_TYPE.PLAN_FORMULA:
                            return (
                                <div className={styles.page_module} key={item?.id}>
                                    <PTPlanPublicityView
                                        source="portal"
                                        data={{ codes: item?.content || [], type: item.type }}
                                        mode="pc"
                                        onItemClick={_item => {
                                            microLinkHandler(
                                                {
                                                    code: `/exam/gateway/plan-publicity/1/${_item.id}`,
                                                    type: LinkEnum.PLAN_FORMULA_DETAIL,
                                                },
                                                userStore,
                                            )
                                        }}
                                    />
                                </div>
                            )
                        case PC_COMPONENT_TYPE.ENROLL_CARD:
                            return (
                                <div className={styles.page_module} key={item?.id}>
                                    <PTListLayout
                                        source="portal"
                                        dataSource={item?.codes || []}
                                        containerStyle={{ width: '1200px', margin: '0 auto' }}
                                        numWithOneLine={item?.layoutStyle || 1}
                                        extraData={{
                                            ...omitObject(item),
                                            onItemClick: (i: { code: any }) => {
                                                if (!i?.code) {
                                                    message.info('暂无内容展示，请先配置完内容')
                                                    return
                                                }
                                                return microLinkHandler({
                                                    code: i?.code || '',
                                                    type: LinkEnum.REGISTRATION_DETAILS_PAGE,
                                                })
                                            },
                                        }}
                                        itemRender={PTEnrollCardView}
                                        key={item?.id}
                                        type="pc"
                                        className={styles.pc_enroll_layout}
                                        prefixCls={packageInfo.name}
                                    />
                                </div>
                            )
                        case PC_COMPONENT_TYPE.PRACTICE:
                            return (
                                <div className={styles.page_module} key={item?.id}>
                                    <PTListLayout
                                        source="portal"
                                        dataSource={item.codes || []}
                                        containerStyle={{ width: '1200px', margin: '0 auto' }}
                                        numWithOneLine={item?.layoutStyle || 2}
                                        extraData={{
                                            ...omitObject(item),
                                            onItemClick: (i: { code: any }) => {
                                                if (!i?.code) {
                                                    message.info('暂无数据')
                                                    return
                                                }
                                                return microLinkHandler(
                                                    {
                                                        code: i?.code || '',
                                                        type: LinkEnum.PRACTICE_LIST,
                                                    },
                                                    userStore,
                                                )
                                            },
                                        }}
                                        itemRender={PTBrushQuestionsView}
                                        key={item?.id}
                                        type="pc"
                                        className={styles.pc_practice_layout}
                                        prefixCls={packageInfo.name}
                                    />
                                </div>
                            )
                        case PC_COMPONENT_TYPE.CLASS:
                            // eslint-disable-next-line no-case-declarations
                            let res = item.classData.map((i: any) => {
                                return {
                                    key: Number(i.year),
                                    label: i.year,
                                    // children: (
                                    //     <div className={'default_card_class'} key={i.year}>
                                    //         <PcClassCard key={i.year} data={i.list} />
                                    //     </div>
                                    // ),
                                }
                            })
                            // return <PTClassView data={item} key={item.id} mode="pc" />

                            return (
                                <PTTabs
                                    tabs={res}
                                    itemRender={(data: any) => {
                                        return (
                                            <PcClassCard
                                                data={data || []}
                                                onItemClick={i => {
                                                    const tempAlias = getPortalCodeFromUrl({
                                                        isGetDomain: true,
                                                    })
                                                    location.href = `/${tempAlias}/mine/train-center/mine/student/subPages/student/class?id=${i?.id}`
                                                }}
                                            />
                                        )
                                    }}
                                    getCurrentKeyData={key => {
                                        let items =
                                            item.classData.find(
                                                (i: { year: string }) =>
                                                    Number(i.year) === Number(key),
                                            ) || {}

                                        return Promise.resolve(items?.list || [])
                                    }}
                                    key={item?.id}
                                />
                            )

                        default:
                            break
                    }
                })
            ) : (
                <Spin spinning={loading} size={'large'} />
            )}
        </div>
    )
}

export default observer(MicroPageFc)
