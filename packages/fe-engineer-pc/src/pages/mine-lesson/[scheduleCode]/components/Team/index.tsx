import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import TeamNull from './TeamNull'
import type { TeamProps } from './interface'
import TeamMember from './TeamMember'
import TeamLeader from './TeamLeader'
import Store from './store'
import { useEffect } from 'react'
import CustomSpin from '@/components/CustomSpin'
import { useParams } from 'umi'

const Index: React.FC<TeamProps> = ({ updateTeamInfo }) => {
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const store = useLocalObservable(() => new Store())
    const { teamInfo, isTeamLeader, hasRequest, getTeamInfo, bindTeamInfoUpdata } = store

    useEffect(() => {
        bindTeamInfoUpdata(updateTeamInfo)
    }, [updateTeamInfo])

    useEffect(() => {
        if (scheduleCode) {
            getTeamInfo(scheduleCode)
        }
    }, [scheduleCode])

    return (
        <div className={styles.team}>
            {hasRequest ? (
                teamInfo ? (
                    isTeamLeader ? (
                        <TeamLeader teamStore={store} />
                    ) : (
                        <TeamMember teamStore={store} />
                    )
                ) : (
                    <TeamNull teamStore={store} />
                )
            ) : (
                <CustomSpin className={styles.custom_spin} />
            )}
        </div>
    )
}

export default inject('userStore')(observer(Index))
