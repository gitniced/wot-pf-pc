import React from 'react'
import styles from '../../index.module.less'
import type { ComponentProps } from '../../interface'

const Top = (props: ComponentProps) => {
    const { paperTitle, examDetail, questionList } = props || {}
    const { precautions } = examDetail || {}

    return (
        <div>
            <div>
                <p className={styles.mg_0}>
                    <span className={styles.song_5}>&#xa0;</span>
                </p>
                <p className={`${styles.mg_0} ${styles.text_center}`}>
                    <span className={styles.black_2_l}>{paperTitle}</span>
                </p>
            </div>
            {precautions && (
                <div>
                    <p className={`${styles.mg_0} ${styles.text_center}`}>
                        <span className={styles.black_4_b}>
                            注&nbsp;&nbsp;意&nbsp;&nbsp;事&nbsp;&nbsp;项
                        </span>
                    </p>
                    <p className={styles.mg_0}>
                        <span className={`${styles.song_5} ${styles.keep_original}`}>
                            {precautions}
                        </span>
                    </p>
                </div>
            )}
            <div className={`${styles.text_center} ${styles.total_score_table_box}`}>
                <table className={styles.tb_1} cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr style={{ height: '17pt' }}>
                            <td className={`${styles.tb_1_td} ${styles.tb_1_td_1}`}>
                                <p className={`${styles.mg_0} ${styles.text_center}`}>
                                    <span className={styles.song_5}>&#xa0;</span>
                                </p>
                            </td>
                            {(questionList || []).map(item => {
                                const { logicSort, questionType } = item || {}
                                return (
                                    <td
                                        className={`${styles.tb_1_td} ${styles.tb_1_td_2}`}
                                        key={questionType}
                                    >
                                        <p className={`${styles.mg_0} ${styles.text_center}`}>
                                            <span className={styles.song_5}>{logicSort}</span>
                                        </p>
                                    </td>
                                )
                            })}
                            <td className={`${styles.tb_1_td} ${styles.tb_1_td_4}`}>
                                <p className={`${styles.mg_0} ${styles.text_center}`}>
                                    <span className={styles.song_5}>总&nbsp;&nbsp;分</span>
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '17pt' }}>
                            <td className={`${styles.tb_1_td} ${styles.tb_1_td_5}`}>
                                <p className={`${styles.mg_0} ${styles.text_center}`}>
                                    <span className={styles.song_5}>得&nbsp;&nbsp;分</span>
                                </p>
                            </td>

                            {(questionList || []).map((item) => {
                                return (
                                    <td
                                        className={`${styles.tb_1_td} ${styles.tb_1_td_6}`}
                                        key={item.logicSort}
                                    >
                                        <p className={`${styles.mg_0} ${styles.text_center}`}>
                                            <span className={styles.song_5}>&#xa0;</span>
                                        </p>
                                    </td>
                                )
                            })}
                            <td className={`${styles.tb_1_td} ${styles.tb_1_td_8}`}>
                                <p className={`${styles.mg_0} ${styles.text_center}`}>
                                    <span className={styles.song_5}>&#xa0;</span>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Top
