import { Avatar, Button, Popover, Table } from 'antd'
import styles from './index.module.less'
import { useEffect, useMemo, useState } from 'react'
import type { ScoreCell } from '../interface'
import useJudgeTeacher from '@/components/useJudgeTeacher'
import http from '@/servers/http'
import { useParams } from 'umi'

const Index: React.FC<{
    /** 评价类型 组内互评/组间互评 */
    type: 'intraGroup' | 'interGroup'
    /** 权重 */
    weight: number
    /** 考核项目编码 */
    projectCode: string
    /** 评价指标编码 */
    criterionCode: string
    /** 学生用户编码 */
    studentUserCode: string
    /** 评分单元格 */
    scoreCell: ScoreCell
}> = props => {
    const isTeacher = useJudgeTeacher()
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const { type, weight, projectCode, criterionCode, studentUserCode, scoreCell } = props || {}
    const { status, score } = scoreCell || {}
    const [visible, setVisible] = useState<boolean>(false)

    const columns = useMemo(() => {
        if (type === 'intraGroup') {
            return [
                {
                    title: '姓名',
                    dataIndex: 'userName',
                    key: 'userName',
                    render: (_: string, record: any) => {
                        const { avatar } = record || {}
                        return (
                            <div className={styles.user_content}>
                                <Avatar src={avatar || defaultAvatar} className={styles.avatar} />
                                <span>{_}</span>
                            </div>
                        )
                    },
                },
                {
                    title: '评分',
                    dataIndex: 'score',
                    key: 'score',
                    render: (value: ScoreCell) => {
                        const { score: scoreValue, status: statusValue } = value || {}
                        return String(statusValue) === '0' ? '未出分' : scoreValue
                    },
                },
            ]
        } else {
            return [
                {
                    title: '团队',
                    dataIndex: 'teamName',
                    key: 'teamName',
                },
                {
                    title: '组长',
                    dataIndex: 'leaderName',
                    key: 'leaderName',
                    render: (_: string, record: any) => {
                        const { avatar } = record || {}
                        return (
                            <div className={styles.user_content}>
                                <Avatar src={avatar || defaultAvatar} className={styles.avatar} />
                                <span>{_}</span>
                            </div>
                        )
                    },
                },
                {
                    title: '评分',
                    dataIndex: 'score',
                    key: 'score',
                    render: (value: ScoreCell) => {
                        const { score: scoreValue, status: statusValue } = value || {}
                        return String(statusValue) === '0' ? '未出分' : scoreValue
                    },
                },
            ]
        }
    }, [type])

    const [commentDetail, setCommentDetail] = useState<any[]>([])

    // 组内互评
    const getIntraGroupCommentDetail = (
        _scheduleCode: string,
        _projectCode: string,
        _criterionCode: string,
        _studentUserCode: string,
    ) => {
        http('/wil/evaluationScore/intraPeerScores', 'post', {
            scheduleCode: _scheduleCode,
            projectCode: _projectCode,
            criterionCode: _criterionCode,
            studentUserCode: _studentUserCode,
        }).then(res => {
            setCommentDetail(res as any[])
        })
    }

    // 组间互评
    const getInterGroupCommentDetail = (
        _scheduleCode: string,
        _projectCode: string,
        _criterionCode: string,
        _studentUserCode: string,
    ) => {
        http('/wil/evaluationScore/interPeerScores', 'post', {
            scheduleCode: _scheduleCode,
            projectCode: _projectCode,
            criterionCode: _criterionCode,
            studentUserCode: _studentUserCode,
        }).then(res => {
            setCommentDetail(res as any[])
        })
    }

    useEffect(() => {
        if (isTeacher && projectCode && studentUserCode && criterionCode && type && visible) {
            if (type === 'intraGroup') {
                getIntraGroupCommentDetail(
                    scheduleCode,
                    projectCode,
                    criterionCode,
                    studentUserCode,
                )
            } else {
                getInterGroupCommentDetail(
                    scheduleCode,
                    projectCode,
                    criterionCode,
                    studentUserCode,
                )
            }
            //
        }
    }, [isTeacher, criterionCode, studentUserCode, type, visible])

    return (
        <div className={styles.homework}>
            {String(weight) === '0' ? (
                '-'
            ) : (
                <>
                    {String(status) === '0' ? (
                        '未出分'
                    ) : isTeacher ? (
                        <Popover
                            trigger="click"
                            open={visible}
                            onOpenChange={e => {
                                setVisible(e)
                            }}
                            content={
                                <div
                                    className={[
                                        styles.popover,
                                        type === 'interGroup'
                                            ? styles.inter_group
                                            : styles.intra_group,
                                    ].join(' ')}
                                >
                                    <Table
                                        columns={columns}
                                        dataSource={commentDetail}
                                        pagination={false}
                                        bordered
                                    />
                                </div>
                            }
                            title={
                                <div className={styles.title_content}>
                                    <div className={styles.title}>
                                        {type === 'intraGroup' ? '组内互评' : '组间互评'}
                                    </div>
                                    <div className={styles.close} onClick={() => setVisible(false)}>
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref={`#a-icon_guanbichacha`} />
                                        </svg>
                                    </div>
                                </div>
                            }
                        >
                            <Button type="link" onClick={() => setVisible(!visible)}>
                                {score}
                            </Button>
                        </Popover>
                    ) : (
                        score
                    )}
                </>
            )}
        </div>
    )
}

export default Index
