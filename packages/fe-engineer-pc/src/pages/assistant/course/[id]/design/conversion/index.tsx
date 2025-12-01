import {
    COURSE_DESIGN_STEP,
    COURSE_DESIGN_STEP_LABEL,
    COURSE_DESIGN_STEP_MAP_STYLISTIC,
} from '@/modules/course/const'
import styles from './index.module.less'
import CourseDesignAside from '@/pages/assistant/components/CourseDesignAside'
import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import ClickEditInputH2Card from '@/modules/course/components/ClickEditInputH2Card'
import { useLocation, history } from 'umi'
import CourseDesignTitle from '@/pages/assistant/components/CourseDesignTitle'
import { useCourseStore } from '@/modules/course/context'
import { observer } from 'mobx-react'

type StylisticKey =
    (typeof COURSE_DESIGN_STEP_MAP_STYLISTIC)[COURSE_DESIGN_STEP.conversion][number]['key']

const conversionItemsMap = {
    schoolBasedConversion: [
        {
            key: 'schoolBasedConversion',
            name: '校本转化要点',
        },
    ],
    localIndustryOverview: [
        {
            key: 'localIndustryOverview',
            name: '当地产业概况',
        },
    ],
    teachingConditionsOverview: [
        {
            key: 'teachingConditionsOverview',
            name: '教学条件概况',
        },
    ],
}

const CourseDesignConversion: React.FC = observer(() => {
    const { search, pathname } = useLocation()
    let initStylistic = new URLSearchParams(search).get(
        'stylistic',
    ) as unknown as StylisticKey | null
    initStylistic = initStylistic ? Number(initStylistic) : null

    const [activeKey, setActiveKey] = useState<StylisticKey | null>(initStylistic)
    const contentMainRef = useRef<HTMLDivElement>(null)

    // 滚动到顶部的函数
    const scrollToTop = () => {
        if (contentMainRef.current) {
            contentMainRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        }
    }
    const stylisticList = useMemo(
        () => COURSE_DESIGN_STEP_MAP_STYLISTIC[COURSE_DESIGN_STEP.conversion],
        [],
    )
    const stylistic = useMemo(
        () => (activeKey === null ? null : stylisticList.find(item => item.key === activeKey)),
        [activeKey, stylisticList],
    )

    const courseStore = useCourseStore()

    useEffect(() => {
        if (courseStore.isHydrated) {
            courseStore.loadConversion()
        }
    }, [courseStore.isHydrated])

    const conversionKeyInformation = useMemo(
        () => courseStore.conversionKeyInformation,
        [courseStore.conversionKeyInformation],
    )

    const loadRefreshKey = useMemo(() => courseStore.loadRefreshKey, [courseStore.loadRefreshKey])

    const title = useMemo(() => {
        return stylistic === null
            ? COURSE_DESIGN_STEP_LABEL[COURSE_DESIGN_STEP.conversion]
            : stylistic?.name ?? '未知命名'
    }, [stylistic])

    const handleSchoolBasedConversionChange = useCallback(
        (value: string) => {
            return courseStore.saveConversionKeyInformation({
                schoolBasedConversion: value,
            })
        },
        [courseStore],
    )

    const handleLocalIndustryOverviewChange = useCallback(
        (value: string) => {
            return courseStore.saveConversionKeyInformation({
                localIndustryOverview: value,
            })
        },
        [courseStore],
    )

    const handleTeachingConditionsOverviewChange = useCallback(
        (value: string) => {
            return courseStore.saveConversionKeyInformation({
                teachingConditionsOverview: value,
            })
        },
        [courseStore],
    )

    return (
        <div className={styles.course_design_conversion}>
            <div className={styles.aside}>
                <CourseDesignAside
                    step={COURSE_DESIGN_STEP.conversion}
                    stylisticList={stylisticList}
                    activeKey={activeKey}
                    onActive={key => {
                        setActiveKey(key)
                        const params = new URLSearchParams(search)
                        if (key === null) {
                            params.delete('stylistic')
                        } else {
                            params.set('stylistic', String(key))
                        }
                        const nextSearch = params.toString()
                        history.replace(nextSearch ? `${pathname}?${nextSearch}` : pathname)
                        scrollToTop()
                    }}
                />
            </div>

            <div className={styles.content}>
                <CourseDesignTitle title={title} />

                <div className={styles.content_main} key={loadRefreshKey} ref={contentMainRef}>
                    {stylistic ? (
                        <stylistic.component />
                    ) : (
                        <div className={styles.content_main_form}>
                            <ClickEditInputH2Card
                                title="校本转化要点"
                                dataTitle="课程校本转化"
                                defaultValue={conversionKeyInformation.schoolBasedConversion}
                                onChangeBlur={handleSchoolBasedConversionChange}
                                items={conversionItemsMap.schoolBasedConversion}
                            />
                            <ClickEditInputH2Card
                                title="当地产业概况"
                                dataTitle="课程校本转化"
                                defaultValue={conversionKeyInformation.localIndustryOverview}
                                onChangeBlur={handleLocalIndustryOverviewChange}
                                items={conversionItemsMap.localIndustryOverview}
                            />
                            <ClickEditInputH2Card
                                title="教学条件概况"
                                dataTitle="课程校本转化"
                                defaultValue={conversionKeyInformation.teachingConditionsOverview}
                                onChangeBlur={handleTeachingConditionsOverviewChange}
                                items={conversionItemsMap.teachingConditionsOverview}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
})

export default CourseDesignConversion
