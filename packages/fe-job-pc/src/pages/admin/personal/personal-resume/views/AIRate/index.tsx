import { observer, useLocalObservable } from 'mobx-react'
import ResumeScoreStore from './store'

import styles from './index.module.less'
import { useEffect, useRef } from 'react'
import { Collapse, Space } from 'antd'
import { MenuScoreItem } from './interface'
import CommonTitle from '@/components/CommonTitle'
import { Timeout } from 'ahooks/lib/useRequest/src/types'

const AIRate = ({
    resumeHasChanged,
    setResumeHasChanged,
    onScroll,
}: {
    resumeHasChanged: boolean
    setResumeHasChanged: () => void
    onScroll: (key: string) => void
}) => {
    const store = useLocalObservable(() => new ResumeScoreStore())
    const { resumeScoreResult, getResumeScoreResult } = store

    let timeRef = useRef<Timeout | number>()

    const {
        score = 0,
        menuScores = [],
        menuScoreMap = {},
        analysisScores = [],
        generateState = 0,
    } = resumeScoreResult

    const optimizationCount = menuScores.reduce((prev, curr) => prev + curr.suggestion.length, 0)

    const onRefresh = () => {
        timeRef.current = window.setInterval(() => {
            getResumeScoreResult().then((res: any) => {
                if (res.generateState === 1) {
                    window.clearInterval(timeRef.current)
                }
            })
        }, 3000)
    }

    useEffect(() => {
        getResumeScoreResult()
    }, [])
    useEffect(() => {
        if (resumeHasChanged) {
            getResumeScoreResult().then(() => {
                setResumeHasChanged()
                onRefresh()
            })
        }
    }, [resumeHasChanged])

    const handleEdit = (item: MenuScoreItem) => {
        onScroll(item.key)
    }

    const renderHeader = (menuScores: MenuScoreItem[]) => {
        const optimizationCount = menuScores.reduce(
            (prev, curr) => prev + curr.suggestion.length,
            0,
        )
        return (
            <CommonTitle>
                <Space size={4}>
                    <span className={styles.title}>{menuScores[0].title}</span>
                    <span className={styles.count}>{optimizationCount}项</span>
                </Space>
            </CommonTitle>
        )
    }

    return (
        <div className={styles.ai_rate}>
            <div className={styles.ai_rate_header}>
                <div className={styles.ai_rate_header_top}>
                    <div className={styles.left}>
                        <img
                            src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/job-pc/img/icon_pingfen.png"
                            alt="icon_pingfen"
                        />
                        <span className={styles.text}>AI简历评分</span>
                    </div>
                    <div className={styles.right}>
                        {generateState === 0 ? (
                            <span className={styles.unit}>评分中</span>
                        ) : score > 0 && score <= 100 ? (
                            <>
                                <span className={styles.score}>{score}</span>
                                <span className={styles.unit}>分</span>
                            </>
                        ) : (
                            <span className={styles.unit}>暂无评分</span>
                        )}
                    </div>
                </div>
                {generateState === 0 && (
                    <div className={styles.ai_rate_header_bottom}>
                        <div className={styles.content}>
                            预计编辑完后30s左右诊断完成，请在等待后刷新页面查看
                        </div>
                    </div>
                )}
                {/* 有评分 */}
                {generateState !== 0 && score > 0 && score < 100 && (
                    <div className={styles.ai_rate_header_bottom}>
                        {analysisScores.map(item => (
                            <div className={styles.analysis_item}>
                                <div className={styles.percent}>
                                    {Math.floor((item.score / item.totalScore) * 100)}%
                                </div>
                                <div className={styles.title}>{item.title}</div>
                            </div>
                        ))}
                    </div>
                )}
                {generateState !== 0 && score === 100 && (
                    <div className={styles.ai_rate_header_bottom}>
                        <div className={styles.content}>简历超赞，前途一片光明！</div>
                    </div>
                )}
                {generateState !== 0 && score === 0 && (
                    <div className={styles.ai_rate_header_bottom}>
                        <div className={styles.content}>完善简历，开启职业新旅程！</div>
                    </div>
                )}
            </div>

            {/* 有评分 */}
            {score > 0 && score < 100 && (
                <div className={styles.ai_rate_content}>
                    <div className={styles.menu_scores_count}>
                        <span className={styles.count}>{optimizationCount}</span>
                        <span className={styles.text}>项待优化</span>
                    </div>
                    <div className={styles.menu_scores_list}>
                        <Collapse expandIconPosition="end">
                            {Object.keys(menuScoreMap).map(key => {
                                const menuScores = menuScoreMap[key]
                                return (
                                    <Collapse.Panel key={key} header={renderHeader(menuScores)}>
                                        {menuScores.map(item => {
                                            if (!item.name) {
                                                return (
                                                    <div className={styles.suggestion_list}>
                                                        {item.suggestion.map(suggestion => (
                                                            <div className={styles.suggestion_item}>
                                                                <div className={styles.suggestion}>
                                                                    {suggestion}
                                                                </div>
                                                                <div
                                                                    className={styles.edit}
                                                                    onClick={() => handleEdit(item)}
                                                                >
                                                                    去编辑
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )
                                            }
                                            if (item.name) {
                                                return (
                                                    <div className={styles.suggestion_wrapper}>
                                                        <div className={styles.top}>
                                                            <div className={styles.name}>
                                                                {item.name}
                                                            </div>
                                                            <div
                                                                className={styles.edit}
                                                                onClick={() => handleEdit(item)}
                                                            >
                                                                去编辑
                                                            </div>
                                                        </div>
                                                        <div className={styles.bottom}>
                                                            {item.suggestion.map(
                                                                (suggestion, index) => (
                                                                    <div
                                                                        className={styles.desc}
                                                                        key={index}
                                                                    >
                                                                        {index + 1}. {suggestion}
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </Collapse.Panel>
                                )
                            })}
                        </Collapse>
                    </div>
                </div>
            )}
        </div>
    )
}

export default observer(AIRate)
