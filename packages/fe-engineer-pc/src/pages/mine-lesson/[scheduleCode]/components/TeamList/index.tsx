import classNames from 'classnames'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import { inject, observer, useLocalObservable } from 'mobx-react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { Settings } from 'react-slick'
import Slider from 'react-slick'
import Store from './store'
import { useParams } from 'umi'
import Empty from '@/components/Empty'
import { LEVEL_MAP, START_POINT_MAP } from '@/pages/mine-lesson/const'

const Index: React.FC = () => {
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const store = useLocalObservable(() => new Store())
    const { getTeamList, teamInfo = {}, teamList = [], hasRequest } = store
    const {
        className: currentClassName,
        studentCount,
        teamCount,
        startPoint,
        trainLevel,
        eduLen,
    } = teamInfo || {}

    const NextArrow = (params: any) => {
        const { className, style, onClick } = params || {}
        return (
            <div
                className={[styles.next_arrow, className].join(' ')}
                style={{ ...style }}
                onClick={onClick}
            >
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`#right`} />
                </svg>
            </div>
        )
    }
    const PrevArrow = (params: any) => {
        const { className, style, onClick } = params || {}
        return (
            <div
                className={[styles.prev_arrow, className].join(' ')}
                style={{ ...style }}
                onClick={onClick}
            >
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`#left`} />
                </svg>
            </div>
        )
    }

    const [settings, setSettings] = useState<Readonly<Settings>>({})
    const [showOneLine, setShowOneLine] = useState(true)

    useEffect(() => {
        if (scheduleCode) {
            getTeamList(scheduleCode)
        }
    }, [scheduleCode])

    useEffect(() => {
        if (teamList) {
            setSettings({
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 3,
                nextArrow: <NextArrow />,
                prevArrow: <PrevArrow />,
            })
            if (teamList.length > 3) {
                setShowOneLine(false)
            } else {
                setShowOneLine(true)
            }
        }
    }, [teamList])

    return (
        <div className={styles.team_list}>
            <div className={classNames(styles.class_content)}>
                <div className={classNames(styles.class_name)}>
                    {currentClassName || ''}-
                    {LEVEL_MAP[trainLevel as unknown as keyof typeof LEVEL_MAP]}-
                    {START_POINT_MAP[startPoint as unknown as keyof typeof START_POINT_MAP]}
                    {eduLen}年
                </div>
                <div className={classNames(styles.class_info)}>
                    <div>学生人数</div>
                    <span>{studentCount || 0}</span>
                    <div className={styles.split} />
                    <div>团队数量</div>
                    <span>{teamCount || 0}</span>
                </div>
            </div>

            <div className={classNames(styles.group_content)}>
                {hasRequest ? (
                    teamList.length > 0 ? (
                        showOneLine ? (
                            <div className={styles.group_content_one_line}>
                                {teamList.map(item => {
                                    return (
                                        <div
                                            key={item.teamCode}
                                            className={styles.group_content_item_content}
                                        >
                                            <div className={styles.group_content_item}>
                                                <div>
                                                    {item.teamName}（{item.memberCount}人）
                                                </div>
                                                <span>组长：{item.leaderName}</span>
                                                <span>组员：{item.memberNames?.join(',')}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <Slider {...settings}>
                                {teamList.map(item => {
                                    return (
                                        <div
                                            key={item.teamCode}
                                            className={styles.group_content_item_content}
                                        >
                                            <div className={styles.group_content_item}>
                                                <div>
                                                    {item.teamName}（{item.memberCount}人）
                                                </div>
                                                <span>组长：{item.leaderName}</span>
                                                <span>组员：{item.memberNames?.join(',')}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </Slider>
                        )
                    ) : (
                        <Empty type={'component'} className={styles.custom_empty} text="暂无团队" />
                    )
                ) : null}
            </div>
        </div>
    )
}

export default inject('userStore')(observer(Index))
