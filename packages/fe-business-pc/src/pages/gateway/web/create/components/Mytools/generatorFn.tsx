import type { PreviewItem } from '../../../../components/utils/interface'
// 操作层
import Article from '../ActionBar/Article'
import ArticleContent from '../ActionBar/ArticleContent'
import CustomImage from '../ActionBar/CustomImage'
import Swiper from '../ActionBar/Swiper'
import Title from '../ActionBar/Title'
import IdentifyResult from '../ActionBar/IdentifyResult'
import PlanPublicityContent from '../ActionBar/PlanPublicityContent'
// 展示层
import {
    PTCustomImageView,
    PTSwiperView,
    PTArticleContentView,
    PTArticleView,
    PTTitleView,
    PTIdentifyResultView,
    PTPlanPublicityView,
    PTBrushQuestionsView,
    PTEnrollCardView,
    PTCustomer,
} from '@wotu/pt-components'
import PageConfig from '../ActionBar/PageConfig'
import Course from '../ActionBar/Course'
import { MOBILE_LAYOUT_ENUM_TO_VIEW } from '../ActionBar/Course/const'
import { PTListLayout } from '@wotu/pt-components'
import { PTCourseView as ptCourseView } from '@wotu/pt-components'
import styles from '../../index.module.less'
import classNames from 'classnames'
import BrushQuestions from '../ActionBar/BrushQuestions'
import { COMPONENT_TYPE } from '@/pages/gateway/components/const'
import EnrollCard from '../ActionBar/EnrollCard'
import Customer from '../ActionBar/Customer'

const getComponents = (nowActive: PreviewItem, key: 'view' | 'operation') => {
    let { layoutStyle, lessonContent = [] } = nowActive || {}
    if (!nowActive) return <PageConfig />

    const SectionMap: Record<string, { view: JSX.Element; operation: JSX.Element }> = {
        image: {
            operation: <CustomImage key={nowActive.id} />,
            view: <PTCustomImageView data={nowActive} key={nowActive.id} />,
        },
        swiper: {
            operation: <Swiper key={nowActive.id} />,
            view: <PTSwiperView data={nowActive} key={nowActive.id} mode="mobile" />,
        },
        tab: {
            operation: <Article data={nowActive} key={nowActive.id} />,
            view: <PTArticleView data={nowActive} key={nowActive.id} />,
        },
        title: {
            operation: <Title data={nowActive} key={nowActive.id} />,
            view: <PTTitleView data={nowActive} key={nowActive.id} />,
        },
        image_text: {
            operation: <ArticleContent data={nowActive} key={nowActive.id} />,
            view: <PTArticleContentView data={nowActive} key={nowActive.id} mode="mobile" />,
        },
        content: {
            operation: <ArticleContent data={nowActive} key={nowActive.id} />,
            view: <PTArticleContentView data={nowActive} key={nowActive.id} mode="mobile" />,
        },
        identification_result: {
            operation: <IdentifyResult key={nowActive.id} />,
            view: (
                <PTIdentifyResultView
                    data={nowActive}
                    key={nowActive.id}
                    type="mobile"
                    showDetail={false}
                />
            ),
        },
        plan_formula: {
            operation: <PlanPublicityContent data={nowActive} key={nowActive.id} />,
            view: (
                <PTPlanPublicityView
                    data={nowActive}
                    key={nowActive.id}
                    mode="mobile"
                    showDetails={false}
                />
            ),
        },
        course: {
            operation: <Course data={nowActive} key={nowActive.id} />,
            view: (
                <PTListLayout
                    dataSource={lessonContent}
                    extraData={nowActive}
                    layoutStyle={layoutStyle}
                    itemRender={ptCourseView}
                    key={nowActive.id}
                    type="mobile"
                    numWithOneLine={MOBILE_LAYOUT_ENUM_TO_VIEW?.[layoutStyle]}
                    className={classNames(
                        styles[`${layoutStyle}_mobile_course_layout`],
                        styles.mobile_course_layout,
                    )}
                />
            ),
        },
        practice: {
            operation: <BrushQuestions data={nowActive} key={nowActive.id} />,
            view: <PTBrushQuestionsView data={nowActive} key={nowActive.id} mode="mobile" />,
        },
        [COMPONENT_TYPE.ENROLL_CARD]: {
            operation: <EnrollCard data={nowActive} key={nowActive.id} type="h5" />,
            view: <PTEnrollCardView data={{ ...nowActive, content: nowActive.codes }} type="h5" />,
        },
        [COMPONENT_TYPE.CUSTOMER]: {
            operation: <Customer data={nowActive} key={nowActive.id} />,
            view: <PTCustomer data={nowActive} key={nowActive.id} fixed={nowActive.fixed} />,
        },
    }

    return SectionMap[nowActive?.type as string][key] || null
}

// 生成 操作栏
const getSectionComponents = (nowActive: PreviewItem) => getComponents(nowActive, 'operation')
// 生成 操作栏
const getViewComponents = (nowActive: PreviewItem) => getComponents(nowActive, 'view')

export { getComponents, getSectionComponents, getViewComponents }
