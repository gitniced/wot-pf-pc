import React from 'react'
// 展示层
import {
    PTCustomImageView,
    PTSwiperView,
    PTArticleContentView,
    PTTitleView,
    PTIdentifyResultView,
    PTPlanPublicityView,
    PTListLayout,
    PTCourseView,
    PTBrushQuestionsView,
    PTEnrollCardView,
    PTTabs,
    PTClassView,
} from '@wotu/pt-components'
import styles from '../../index.module.less'
import { LAYOUT_STYLE } from '@/pages/gateway/components/utils/interface.d'
import type { PreviewItem } from '@/pages/gateway/components/utils/interface'

// 操作层
import ArticleContent from '@/pages/gateway/pc-web/create/components/ActionBar/ArticleContent'
import PlanPublicityContent from '@/pages/gateway/pc-web/create/components/ActionBar/PlanPublicityContent'
import CustomImage from '@/pages/gateway/pc-web/create/components/ActionBar/CustomImage'
import Swiper from '@/pages/gateway/pc-web/create/components/ActionBar/Swiper'
import CourseConfig from '@/pages/gateway/web/create/components/ActionBar/Course'
import Title from '@/pages/gateway/web/create/components/ActionBar/Title'
import PageConfig from '@/pages/gateway/pc-web/create/components/ActionBar/PageConfig'
import ActionEmpty from './../ActionBar/ActionEmpty'
import IdentifyResult from '../ActionBar/IdentifyResult'
import PcBrushQuestions from '../ActionBar/PcBrushQuestions'
import Enroll from '../ActionBar/Enroll'
import http from '@/servers/http'
import Class from '../ActionBar/Class'
import { getCookie } from '@/storage'

// 展示样式单选框的枚举
enum PC_LAYOUT_ENUM {
    // 竖向一行5个
    VERTICAL_FIVE = 'vertical_5',
    // 竖向一行4个
    VERTICAL_FOUR = 'vertical_4',
    // 横向一行2个
    HORIZONTAL_TWO = 'horizontal_2',
    // 横向一行3个
    HORIZONTAL_THREE = 'horizontal_3',
}

const PC_LAYOUT_ENUM_TRANSFORM = {
    [PC_LAYOUT_ENUM.VERTICAL_FIVE]: 5,
    [PC_LAYOUT_ENUM.VERTICAL_FOUR]: 4,
    [PC_LAYOUT_ENUM.HORIZONTAL_TWO]: 2,
    [PC_LAYOUT_ENUM.HORIZONTAL_THREE]: 3,
}

const getComponents = (nowActive: PreviewItem | undefined, key: 'view' | 'operation') => {
    /**
     * @params key 选中的key
     * @return 分组{key}下的课程列表数据
     */
    const getCourseDataByKey = (currentKey: string) => {
        const currentAlias = getCookie('SELECT_ORG_CODE')
        return http(
            '/career_main/course/batch_detail_by_organization',
            'post',
            {
                groupId: currentKey,
                organizationCode: currentAlias,
            },
            { repeatFilter: false },
        )
    }

    console.log('🍊 PTClassView:', nowActive)
    if (!nowActive) return <ActionEmpty desc="请先添加组件" />
    const { showType = 'single', lessonGroup = [] } = nowActive || {}
    const SectionMap: Record<string, { view: JSX.Element; operation: JSX.Element }> = {
        image: {
            operation: <CustomImage key={nowActive.id} />,
            view: <PTCustomImageView data={nowActive} key={nowActive.id} mode="pc" />,
        },
        swiper: {
            operation: <Swiper key={nowActive.id} />,
            view: <PTSwiperView data={nowActive} key={nowActive.id} mode="pc" />,
        },
        title: {
            operation: <Title data={nowActive} key={nowActive.id} mode="pc" />,
            view: <PTTitleView data={nowActive} key={nowActive.id} mode="pc" />,
        },

        image_text: {
            operation: <ArticleContent data={nowActive} key={nowActive.id} />,
            view:
                nowActive?.layoutStyle === LAYOUT_STYLE.IMAGE_LEFT_TITLE_RIGHT ? (
                    <PTArticleContentView
                        codes={nowActive?.codes || (nowActive?.content as [])}
                        key={nowActive.id}
                        extraData={nowActive}
                        data={nowActive.codes}
                        containerStyle={{ width: '1200px', margin: '0 auto' }}
                        {...nowActive}
                        type="pc"
                    />
                ) : (
                    <PTListLayout
                        dataSource={nowActive?.codes || (nowActive?.content as [])}
                        containerStyle={{ width: '1200px', margin: '0 auto' }}
                        numWithOneLine={nowActive?.layoutStyle}
                        extraData={nowActive}
                        itemRender={PTArticleContentView}
                        key={nowActive.id}
                        type="pc"
                        className={styles.pc_article_content_layout}
                    />
                ),
        },
        content: {
            operation: <ArticleContent data={nowActive} key={nowActive.id} />,
            view: <PTArticleContentView data={nowActive} key={nowActive.id} mode="pc" />,
        },
        identification_result: {
            operation: <IdentifyResult key={nowActive.id} />,
            view: (
                <PTIdentifyResultView
                    key={nowActive.id}
                    data={nowActive}
                    showDetail={false}
                    type="pc"
                />
            ),
        },
        plan_formula: {
            operation: <PlanPublicityContent data={nowActive} key={nowActive.id} />,
            view: (
                <PTPlanPublicityView
                    data={nowActive}
                    key={nowActive.id}
                    mode="pc"
                    showDetails={false}
                />
            ),
        },
        course: {
            operation: <CourseConfig type="pc" data={nowActive} key={nowActive.id} />,
            view:
                showType === 'single' ? (
                    <PTListLayout
                        dataSource={nowActive?.lessonContent as []}
                        containerStyle={{ width: '1200px', margin: '0 auto' }}
                        numWithOneLine={PC_LAYOUT_ENUM_TRANSFORM?.[nowActive?.layoutStyle] || 5}
                        extraData={nowActive}
                        itemRender={PTCourseView}
                        key={nowActive.id}
                        type="pc"
                        className={styles.pc_course_layout}
                    />
                ) : (
                    <PTTabs
                        data={(nowActive || []) as unknown as any}
                        specialStyle={{ minHeight: '267px' }}
                        tabs={lessonGroup}
                        getCurrentKeyData={getCourseDataByKey}
                        source={'work'}
                        itemRender={tempData => (
                            <PTListLayout
                                inTab={true}
                                dataSource={tempData as []}
                                containerStyle={{ width: '1200px', margin: '0 auto' }}
                                numWithOneLine={
                                    PC_LAYOUT_ENUM_TRANSFORM?.[nowActive?.layoutStyle] || 5
                                }
                                extraData={nowActive}
                                itemRender={PTCourseView}
                                key={nowActive.id}
                                type="pc"
                                className={styles.pc_course_layout}
                                noLayout={true}
                            />
                        )}
                    />
                ),
        },
        practice: {
            operation: <PcBrushQuestions data={nowActive} key={nowActive.id} />,
            view: (
                <PTListLayout
                    dataSource={nowActive?.codes || []}
                    containerStyle={{ width: '1200px', margin: '0 auto' }}
                    numWithOneLine={nowActive?.layoutStyle || 2}
                    extraData={nowActive}
                    itemRender={PTBrushQuestionsView}
                    key={nowActive.id}
                    type="pc"
                    className={styles.pc_brush_questions}
                />
            ),
        },
        enroll_card: {
            operation: <Enroll type="pc" data={nowActive} key={nowActive.id} />,
            view: (
                <PTListLayout
                    dataSource={nowActive?.codes}
                    containerStyle={{ width: '1200px', margin: '0 auto' }}
                    numWithOneLine={nowActive?.layoutStyle || 1}
                    extraData={nowActive}
                    itemRender={PTEnrollCardView}
                    key={nowActive.id}
                    type="pc"
                    className={styles.pc_course_layout}
                />
            ),
        },
        class: {
            operation: <Class data={nowActive} key={nowActive.id} />,
            view: <PTClassView data={nowActive} key={nowActive.id} mode="pc" />,
        },
    }

    return SectionMap[nowActive?.type as string][key] || null
}

/**
 * 获取页面设置
 * @returns
 */
export const getPageConfig = () => <PageConfig />

/**
 * 生成 操作栏
 * @param nowActive
 * @returns
 */
const getPcSectionComponents = (nowActive?: PreviewItem) => getComponents(nowActive, 'operation')

/**
 * 生成 视图区域
 * @param nowActive
 * @returns
 */
const getViewComponents = (nowActive: PreviewItem) => getComponents(nowActive, 'view')

export { getComponents, getPcSectionComponents, getViewComponents }
