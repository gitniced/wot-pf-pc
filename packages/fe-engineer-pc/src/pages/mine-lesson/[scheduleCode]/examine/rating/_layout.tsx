import { history, useParams } from 'umi'
import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'
import ExamTabBar from '../../components/ExamTabBar'
import { useEffect } from 'react'
import Store from './store'
import type { PageProps } from '@/types'
import { useSaasTitle } from '@wotu/wotu-components'
import { Tooltip } from 'antd'

const Index: React.FC<PageProps> = observer(props => {
    useSaasTitle('考核-考核评分')
    const store = useLocalObservable(() => new Store())
    const { courseEvaluations = [], getCourseClassInfo, getCourseEvaluations } = store
    const { scheduleCode } = useParams<{
        scheduleCode: string
    }>()

    useEffect(() => {
        if (scheduleCode) {
            getCourseClassInfo(scheduleCode)
            getCourseEvaluations(scheduleCode)
        }
    }, [scheduleCode])

    const judgeActive = (type: number = 0, taskCode?: string) => {
        const numType = Number(type)
        if (numType === 1) {
            console.log(
                location.pathname.includes(
                    `/mine-lesson/${scheduleCode}/examine/rating/performance`,
                ),
            )
            return location.pathname.includes(
                `/mine-lesson/${scheduleCode}/examine/rating/performance`,
            )
        } else if (numType === 2) {
            return location.pathname.includes(
                `/mine-lesson/${scheduleCode}/examine/rating/homework`,
            )
        } else if (numType === 3) {
            return location.pathname.includes(
                `/mine-lesson/${scheduleCode}/examine/rating/task/${taskCode}`,
            )
        } else {
            return location.pathname.includes(`/mine-lesson/${scheduleCode}/examine/rating/exam`)
        }
    }

    const toPages = (type: number, taskCode?: string) => {
        let finallyUrl = ''
        switch (type) {
            case 1:
                finallyUrl = `/mine-lesson/${scheduleCode}/examine/rating/performance`
                break
            case 2:
                finallyUrl = `/mine-lesson/${scheduleCode}/examine/rating/homework`
                break
            case 3:
                finallyUrl = `/mine-lesson/${scheduleCode}/examine/rating/task/${taskCode}`
                break
            case 4:
                finallyUrl = `/mine-lesson/${scheduleCode}/examine/rating/exam`
                break
            default:
                finallyUrl = `/mine-lesson/${scheduleCode}/examine/rating/performance`
        }
        history.push(finallyUrl)
    }

    return (
        <>
            <ExamTabBar />
            <div className={styles.rating}>
                <div className={styles.left_content}>
                    <div className={styles.menu_content}>
                        <div
                            className={styles.menu_item}
                            onClick={e => {
                                e.stopPropagation()
                            }}
                        >
                            <svg className={['icon', styles.sign].join(' ')} aria-hidden="true">
                                <use xlinkHref={`#guochengxing`} />
                            </svg>
                            <div className={styles.name}>过程性考核</div>
                            <div className={styles.status} />
                        </div>
                        {courseEvaluations.map(item => {
                            const { type = 0, taskCode } = item || {}
                            return String(type) === '4' ? (
                                <div
                                    key={item.code}
                                    className={[
                                        styles.menu_item,
                                        judgeActive(Number(type), taskCode) ? styles.active : '',
                                    ].join(' ')}
                                    onClick={e => {
                                        e.stopPropagation()
                                        toPages(Number(type), taskCode)
                                    }}
                                >
                                    <svg
                                        className={['icon', styles.sign].join(' ')}
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref={`#zhongjiexing`} />
                                    </svg>
                                    <div className={styles.name}>终结性考核</div>
                                </div>
                            ) : (
                                <div
                                    key={item.code}
                                    className={[
                                        styles.menu_item,
                                        styles.second,
                                        judgeActive(Number(type), taskCode) ? styles.active : '',
                                    ].join(' ')}
                                    onClick={e => {
                                        e.stopPropagation()
                                        toPages(Number(type), taskCode)
                                    }}
                                >
                                    <div className={styles.sign} />
                                    {String(type) === '3' ? (
                                        <Tooltip
                                            placement="topLeft"
                                            title={item.name}
                                            getPopupContainer={e => e.parentElement}
                                        >
                                            <div className={styles.name}>{item.name}</div>
                                        </Tooltip>
                                    ) : (
                                        <div className={styles.name}>{item.name}</div>
                                    )}

                                    {item.scored && (
                                        <svg
                                            className={['icon', styles.status, styles.green].join(
                                                ' ',
                                            )}
                                            aria-hidden="true"
                                        >
                                            <use xlinkHref={`#Check-Circle-Fill`} />
                                        </svg>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.right_content}>{props.children}</div>
            </div>
        </>
    )
})

export default Index
