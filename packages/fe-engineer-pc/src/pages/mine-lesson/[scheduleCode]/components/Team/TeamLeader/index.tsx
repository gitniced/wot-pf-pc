import type { MenuProps } from 'antd'
import { Avatar, Button, Checkbox, Dropdown, Modal, Space, Table, Tooltip } from 'antd'
import styles from './index.module.less'
import { useEffect, useMemo, useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { inject, observer } from 'mobx-react'
import type { TeamLeaderProps } from './interface'
import dayjs from 'dayjs'

const TeamLeader: React.FC<TeamLeaderProps> = props => {
    const { teamStore } = props || {}
    const { getApplyList } = teamStore
    const {
        applyListInDeal,
        teamInfo,
        applyList = [],
        removeList = [],
        judgeApply,
        disbandTeam,
        updateRemoveList,
        clearRemoveList,
        delTeamMember,
        updateLeaderActive,
        transferLeader,
    } = teamStore
    const { name, members = [] } = teamInfo || {}
    const [applyModalOpen, setApplyModalOpen] = useState(false)
    const [editMode, setEditMode] = useState<'normal' | 'remove' | 'transfer'>('normal')

    const items: MenuProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: '移除组员',
                disabled: members.length === 1,
                onClick: () => {
                    setEditMode('remove')
                },
            },
            {
                key: '2',
                label: '转让组长',
                disabled: members.length === 1,
                onClick: () => {
                    setEditMode('transfer')
                },
            },
            {
                key: '3',
                label: '解散团队',
                onClick: () => {
                    Modal.confirm({
                        title: '确定要解散团队吗？',
                        centered: true,
                        okText: '确认',
                        cancelText: '取消',
                        onOk: () => disbandTeam(),
                    })
                },
            },
        ],
        [members],
    )

    useEffect(() => {
        getApplyList()
    }, [])

    return (
        <div className={styles.team_leader}>
            <div className={styles.team_leader_title}>
                <div className={styles.team_leader_title_left}>
                    <span className={styles.team_leader_title_name}>我的团队（{name}）</span>
                    {applyList.length ? (
                        <div
                            className={styles.team_leader_apply}
                            onClick={() => setApplyModalOpen(true)}
                        >
                            <span>{applyList.length}个新申请</span>
                        </div>
                    ) : null}
                </div>
                {editMode === 'normal' ? (
                    <Dropdown
                        menu={{ items }}
                        className={styles.team_leader_dropdown}
                        overlayClassName={styles.team_leader_dropdown_overlay}
                    >
                        <a onClick={e => e.preventDefault()}>
                            <Space size={4}>
                                <span>管理团队</span>
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                ) : (
                    <div className={styles.team_edit_mode}>
                        <Button
                            type="link"
                            className={styles.team_link}
                            onClick={e => {
                                e.stopPropagation()
                                setEditMode('normal')
                                clearRemoveList()
                            }}
                        >
                            取消
                        </Button>
                        <Button
                            type="link"
                            disabled={editMode === 'transfer' && !members.some(i => i.active)}
                            onClick={async e => {
                                e.stopPropagation()
                                if (editMode === 'remove') {
                                    console.log('移除组员')
                                    await delTeamMember()
                                    setEditMode('normal')
                                } else {
                                    Modal.confirm({
                                        title: '确定要转让吗？',
                                        centered: true,
                                        okText: '确认',
                                        cancelText: '取消',
                                        onOk: () => transferLeader(),
                                        afterClose: () => {
                                            setEditMode('normal')
                                        },
                                    })
                                }
                            }}
                            className={styles.team_link}
                            style={{ marginLeft: 16 }}
                        >
                            {editMode === 'remove' ? '保存' : '转让'}
                        </Button>
                    </div>
                )}
            </div>

            <div className={styles.team_leader_content}>
                {members.map(item => {
                    if (String(item.role) === '1') {
                        return (
                            <div key={item.code} className={styles.team_leader_content_item}>
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
                        const inRemoveList = removeList.some(i => i === item.code)
                        const finallyItem = inRemoveList ? null : (
                            <div key={item.code} className={styles.team_leader_content_item}>
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
                                    {editMode === 'transfer' && (
                                        <Checkbox
                                            style={{ marginLeft: 2 }}
                                            checked={item.active}
                                            onChange={e => {
                                                e.stopPropagation()
                                                updateLeaderActive(item.code!)
                                            }}
                                        />
                                    )}
                                    {editMode === 'remove' && (
                                        <svg
                                            className="icon"
                                            aria-hidden="true"
                                            style={{
                                                color: '#ff4d4f',
                                                width: 18,
                                                height: 18,
                                                cursor: 'pointer',
                                            }}
                                            onClick={e => {
                                                e.stopPropagation()
                                                updateRemoveList(item.code!)
                                            }}
                                        >
                                            <use xlinkHref={`#icon_jian`} />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        )
                        return finallyItem
                    }
                })}
            </div>

            <Modal
                open={applyModalOpen}
                onCancel={() => {
                    setApplyModalOpen(false)
                    getApplyList()
                }}
                footer={null}
                title="团队申请"
                width={748}
                centered
            >
                <Table
                    loading={applyListInDeal}
                    columns={[
                        {
                            title: '姓名',
                            dataIndex: 'studentName',
                            key: 'studentName',
                        },
                        {
                            title: '申请时间',
                            dataIndex: 'createdAt',
                            key: 'createdAt',
                            render: _ => dayjs(_).format('YYYY-MM-DD HH:mm:ss'),
                        },
                        {
                            title: '操作',
                            dataIndex: 'action',
                            key: 'action',
                            //@ts-ignore
                            render: (_, { code, status }) => {
                                if (String(status) !== '0') {
                                    return (
                                        <>
                                            <Button type="link" style={{ margin: 0, padding: 0 }}>
                                                已{String(status) === '1' ? '同意' : '拒绝'}
                                            </Button>
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            <Button
                                                type="link"
                                                style={{ margin: 0, padding: 0 }}
                                                onClick={() => {
                                                    judgeApply(code!, '1')
                                                }}
                                            >
                                                同意
                                            </Button>
                                            <Button
                                                type="link"
                                                style={{ margin: 0, padding: 0, marginLeft: 16 }}
                                                onClick={() => {
                                                    judgeApply(code!, '2')
                                                }}
                                            >
                                                拒绝
                                            </Button>
                                        </>
                                    )
                                }
                            },
                        },
                    ]}
                    dataSource={applyList}
                    pagination={false}
                    rowKey="studentId"
                />
            </Modal>
        </div>
    )
}

export default inject('userStore')(observer(TeamLeader))
