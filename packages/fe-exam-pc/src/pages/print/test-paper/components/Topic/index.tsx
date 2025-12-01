import React from 'react'
import styles from '../../index.module.less'
import type { TopicProps } from '../../interface'
import { SCORE_SETTING_TYPE } from '@/pages/paper-library/[type]/const'
/**
 * 题型框和题型标题
 * @param props {
 *  examDetail: 试卷详情
 *  questionItem: 试题信息
 * }
 * @returns
 */
const Topic = (props: TopicProps) => {
    const { examDetail, questionItem } = props || {}
    const { scoreType } = examDetail || {}
    const { logicSort, title, minSort, maxSort, unificationScore, totalScore, totalQuestion } =
        questionItem || {}
    return (
        <div style={{ pageBreakInside: 'avoid' }}>
            <p className={styles.mg_0}>
                <span className={styles.song_5}>&#xa0;</span>
            </p>
            <div className={styles.score_table_box}>
                <table className={styles.tb_2} cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr style={{ height: '18.05pt' }}>
                            <td className={`${styles.tb_2_td} ${styles.tb_2_td_1}`}>
                                <p className={styles.P1}>
                                    <span className={styles.song_5}>得</span>
                                    <span className={styles.song_5}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span className={styles.song_5}>分</span>
                                </p>
                            </td>
                            <td className={`${styles.tb_2_td} ${styles.tb_2_td_2}`}>
                                <p className={styles.P1}>
                                    <span className={styles.song_5}>&#xa0;</span>
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '18.05pt' }}>
                            <td className={`${styles.tb_2_td} ${styles.tb_2_td_3}`}>
                                <p className={styles.P1}>
                                    <span className={styles.song_5}>评分人</span>
                                </p>
                            </td>
                            <td className={`${styles.tb_2_td} ${styles.tb_2_td_4}`}>
                                <p className={styles.P1}>
                                    <span className={styles.song_5}>&#xa0;</span>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className={styles.mg_0}>
                <span className={styles.song_5_b}>
                    {logicSort}、{title}（第{minSort}题~第{maxSort}题，
                    {/* 分值设置为非单题独立设置的展示 */}
                    {scoreType !== SCORE_SETTING_TYPE.SINGLE &&
                        `每题
                    ${
                        scoreType === SCORE_SETTING_TYPE.QUESTION_TYPE
                            ? (totalScore / totalQuestion).toFixed(1)
                            : unificationScore
                    }分，`}
                    共{totalScore}
                    分）
                </span>
            </p>
        </div>
    )
}
export default Topic
