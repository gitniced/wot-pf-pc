import { Avatar } from 'antd'
import styles from './index.module.less'
import type { GroupLearningProgressRankItemDto, StudentRankingDto } from '../../interface'
import Empty from '@/components/Empty'

const LessonProgressTop: React.FC<{
    groupProgressRank: GroupLearningProgressRankItemDto[]
    classScoreRanking: StudentRankingDto[]
}> = ({ groupProgressRank, classScoreRanking }) => {
    return (
        <div className={styles.lesson_progress_top}>
            <div className={styles.top_learning_progress}>
                <div className={styles.top_learning_progress_title}>学习进度排行榜</div>
                <div className={styles.top_learning_progress_content}>
                    {groupProgressRank.length === 0 ? (
                        <Empty type={'component'} style={{ paddingTop: '10px' }} />
                    ) : null}
                    {groupProgressRank.map((item, index) => {
                        return (
                            <div key={item.teamCode} className={styles.content_item}>
                                <div className={styles.content_item_left}>
                                    <img
                                        src={`https://static.zpimg.cn/public/fe-engineer-pc/images/icon_no.${
                                            index + 1
                                        }@2x.png`}
                                        width={24}
                                        height={24}
                                    />
                                    <Avatar.Group
                                        className={styles.avatar_group}
                                        maxCount={5}
                                        maxPopoverTrigger="click"
                                        maxStyle={{
                                            color: '#f56a00',
                                            backgroundColor: '#fde3cf',
                                            cursor: 'pointer',
                                        }}
                                        size={20}
                                    >
                                        <Avatar
                                            className={styles.avatar_item}
                                            src={'' || defaultAvatar}
                                        />
                                        <Avatar
                                            className={styles.avatar_item}
                                            src={'' || defaultAvatar}
                                        />
                                        <Avatar
                                            className={styles.avatar_item}
                                            src={'' || defaultAvatar}
                                        />
                                        <Avatar
                                            className={styles.avatar_item}
                                            src={'' || defaultAvatar}
                                        />
                                        <Avatar
                                            className={styles.avatar_item}
                                            src={'' || defaultAvatar}
                                        />
                                    </Avatar.Group>
                                    <div className={styles.item_name}>{item.teamName}</div>
                                </div>
                                <div className={styles.content_item_right}>
                                    <span>{item.progress}%</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.top_exam_progress}>
                <div className={styles.top_exam_progress_title}>考核成绩排行榜</div>
                <div className={styles.top_exam_progress_content}>
                    {classScoreRanking.length === 0 ? (
                        <Empty type={'component'} style={{ paddingTop: '10px' }} />
                    ) : null}
                    {classScoreRanking.map(item => {
                        const { studentAvatar, studentName, ranking, studentUserCode } = item || {}
                        return (
                            <div
                                key={studentUserCode}
                                className={styles.top_exam_progress_content_item}
                            >
                                <div className={styles.item_avatar}>
                                    <img
                                        className={styles.item_avatar_tag}
                                        src={`https://static.zpimg.cn/public/fe-engineer-pc/images/icon_huangguan${ranking}@2x.png`}
                                        width={32}
                                        height={32}
                                    />
                                    <Avatar
                                        className={styles.item_avatar_img}
                                        size={48}
                                        style={{ border: '1px solid #ffb919' }}
                                        src={studentAvatar || defaultAvatar}
                                        icon={<img src={defaultAvatar} />}
                                    />
                                    <span
                                        className={styles.item_avatar_no}
                                        style={{ background: '#ffb919' }}
                                    >
                                        NO.{ranking}
                                    </span>
                                </div>
                                <div className={styles.item_name}>
                                    <span>{studentName}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default LessonProgressTop
