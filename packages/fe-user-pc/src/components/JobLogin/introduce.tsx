import { BASE_URL, COMPANY_INTRODUCTION_NOTE_LIST, RECOMMEND_DATA, SCHOOL_INTRODUCTION_NOTE_LIST } from './const'
import { CURRENT_LOGIN_URL_TYPE_ENUM } from "@/types"
import styles from './introduce.module.less'
import type { JobComponentProps } from './interface'
import classNames from 'classnames'
// 院校登录页的介绍
export const SchoolIntroduce = () => {
    return (
        <div
            className={styles.school_introduce}
            style={{ backgroundImage: `url( ${BASE_URL}/bg_zhanting2_blue.png)` }}

        >
            <div className={styles.wrapper}>
                <div className={styles.title}>帮助大学生高质量充分就业</div>
                <div className={styles.desc}>智慧就业服务平台集“管理、就业、测评、辅导、实习、培训、调研、监测”八位一体，赋能每年近千万高校毕业生高质量充分就业。</div>
                <div className={styles.main}>
                    <div className={styles.note}>
                        {
                            SCHOOL_INTRODUCTION_NOTE_LIST.map((item) => {
                                let { title, text, key } = item
                                return (
                                    <div className={styles.note_item} key={key}>
                                        <img className={styles.note_item_icon} src={`${BASE_URL}/job_bianzu_blue.png`} />
                                        <div className={styles.note_item_right}>
                                            <div className={styles.note_item_title}>{title}</div>
                                            <div className={styles.note_item_text}>{text}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <img
                        className={styles.note_img}
                        src={`${BASE_URL}/school_banner_blue.png`}
                    />
                </div>
            </div>

        </div>
    )
}

// 企业登录页的介绍
export const CompanyIntroduce = () => {
    return (
        <div
            className={styles.company_introduce}

        >
            <div className={styles.wrapper}>
                <div className={styles.title}>协助企业寻找优质人才，人工智能分析</div>
                <div className={styles.desc}>聚合海量人才资源，一键职位发布，精准人岗匹配，招聘降本增效</div>

                <div className={styles.note}>
                    {
                        COMPANY_INTRODUCTION_NOTE_LIST.map((item) => {
                            let { title, text, key, img } = item
                            return (
                                <div className={styles.note_item} key={key}>
                                    <img className={styles.note_item_img} src={img} />
                                    <div className={styles.note_item_bottom}>
                                        <div className={styles.note_item_title}>{title}</div>
                                        <div className={styles.note_item_text}>{text}</div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>


            </div>

        </div>
    )
}

// 院校、企业的推荐位
export const Recommend = (props: JobComponentProps) => {
    let { sourceType = CURRENT_LOGIN_URL_TYPE_ENUM.SCHOOL } = props || {}

    return (
        <div className={styles.recommend} >

            <div className={styles.recommend_title}>
                {RECOMMEND_DATA?.[sourceType]?.title}

            </div>
            <div className={styles.recommend_content}>
                {
                    RECOMMEND_DATA?.[sourceType]?.content.map?.((item) => {
                        let { img, key } = item
                        return (
                            <div
                                className={classNames(styles.recommend_item, styles[`${sourceType}_recommend_item`])}
                                key={key}
                            >
                                <img src={img} />
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )

}