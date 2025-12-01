import { Avatar, Modal, Tooltip } from 'antd'
import styles from './index.module.less'
import { inject, observer } from 'mobx-react'
import type { TeamMemberProps } from './interface'

const TeamMember: React.FC<TeamMemberProps> = props => {
    const { teamStore } = props || {}
    const { teamInfo, exitTeam } = teamStore
    const { name, members = [] } = teamInfo || {}

    const confirm = () => {
        Modal.confirm({
            title: '确定要退出吗？',
            centered: true,
            okText: '确认',
            cancelText: '取消',
            onOk: () => exitTeam(),
        })
    }
    return (
        <div className={styles.team_member}>
            <div className={styles.team_member_title}>
                <span>我的团队（{name}）</span>
                <span onClick={confirm}>退出团队</span>
            </div>

            <div className={styles.team_member_content}>
                {members.map(item => {
                    if (String(item.role) === '1') {
                        return (
                            <div key={item.code} className={styles.team_member_content_item}>
                                <div className={styles.item_avatar}>
                                    <Avatar
                                        src={item.studentAvatar}
                                        icon={<img src={defaultAvatar} />}
                                    />
                                </div>
                                <div className={styles.item_name_content}>
                                    <span className={styles.item_name}>
                                        <Tooltip placement="topLeft" title={item.studentName}>
                                            {item.studentName}
                                        </Tooltip>
                                    </span>
                                    <svg
                                        className="icon"
                                        aria-hidden="true"
                                        style={{
                                            color: '#faad14',
                                            width: 38,
                                        }}
                                    >
                                        <use xlinkHref={`#icon_zuzhang`} />
                                    </svg>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={item.code} className={styles.team_member_content_item}>
                                <div className={styles.item_avatar}>
                                    <Avatar
                                        src={item.studentAvatar}
                                        icon={<img src={defaultAvatar} />}
                                    />
                                </div>
                                <div className={styles.item_name_content}>
                                    <span className={styles.item_name}>
                                        <Tooltip placement="topLeft" title={item.studentName}>
                                            {item.studentName}
                                        </Tooltip>
                                    </span>
                                </div>
                            </div>
                        )
                    }
                })}
                {/* <div className={styles.team_member_content_item}>
                    <div className={styles.item_avatar}>
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                    </div>
                    <div className={styles.item_name}>
                        <span>张三</span>
                        <svg
                            className="icon"
                            aria-hidden="true"
                            style={{ color: '#faad14', width: 38 }}
                        >
                            <use xlinkHref={`#icon_zuzhang`} />
                        </svg>
                    </div>
                </div> */}
                {/* <div className={styles.team_member_content_item}>
                    <div className={styles.item_avatar}>
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                    </div>
                    <div className={styles.item_name}>
                        <span>张三</span>
                    </div>
                </div>
                <div className={styles.team_member_content_item}>
                    <div className={styles.item_avatar}>
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                    </div>
                    <div className={styles.item_name}>
                        <span>张三</span>
                    </div>
                </div>
                <div className={styles.team_member_content_item}>
                    <div className={styles.item_avatar}>
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                    </div>
                    <div className={styles.item_name}>
                        <span>张三</span>
                    </div>
                </div>
                <div className={styles.team_member_content_item}>
                    <div className={styles.item_avatar}>
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                    </div>
                    <div className={styles.item_name}>
                        <span>张三</span>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default inject('userStore')(observer(TeamMember))
