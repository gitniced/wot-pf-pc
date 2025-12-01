import styles from './index.modules.less'

/**
 * 专业角色功能设计，全流程考务保障
 */
const RoleRequirements: React.FC = () => {
    return (
        <div className={styles.page}>
            <div className={styles.main}>
                <div className={[styles.title, 'animated'].join(' ')}>
                    专业角色功能设计，全流程考务保障
                </div>
                <div className={[styles.content, 'animated'].join(' ')}>
                    <div className={[styles.card1, styles.card].join(' ')}>
                        <div className={styles.text}>考生</div>
                        <div className={styles.box}>
                            <div className={styles.head}>在线报名</div>
                            <div className={styles.info}>考生一键报名, 快速投递信息</div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.head}>测练模拟</div>
                            <div className={styles.info}>测试练习模拟，资讯一网打尽</div>
                        </div>
                    </div>
                    <div className={[styles.card2, styles.card].join(' ')}>
                        <div className={styles.text}>监考员</div>
                        <div className={styles.box}>
                            <div className={styles.head}>在线监考</div>
                            <div className={styles.info}>
                                监考员可以实时监控考试过程中的情况，包含视频监控、屏幕监控、远程控制等，确保考试的公平性，减少考生作弊行为的发生，提高考试的质量和真实性。
                            </div>
                        </div>
                    </div>
                    <div className={[styles.card3, styles.card].join(' ')}>
                        <div className={styles.text}>考评员</div>
                        <div className={styles.box}>
                            <div className={styles.head}>电子打分</div>
                            <div className={styles.info}>
                                考评员使用专业电子设备进行打分操作，包括考生成绩、评分标准、查看信息等，提高打分的效率和准确性，透明度和公正性，实现评价体系全过程留痕。
                            </div>
                        </div>
                    </div>
                    <div className={[styles.card4, styles.card].join(' ')}>
                        <div className={styles.text}>督导员</div>
                        <div className={styles.box}>
                            <div className={styles.head}>督导派遣</div>
                            <div className={styles.info}>
                                督导员可对评价认定全过程的实现监管、培训、质量控制等，主统要包含指派任务、任务分配、统计报表等，保障全链路顺畅的评价认定流程。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoleRequirements
