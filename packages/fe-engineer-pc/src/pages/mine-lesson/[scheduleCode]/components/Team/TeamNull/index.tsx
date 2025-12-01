import { Button, Form, Input, Modal, Table } from 'antd'
import styles from './index.module.less'
import { useState } from 'react'
import { inject, observer } from 'mobx-react'
import type { TeamNullProps } from './interface'

const TeamNull: React.FC<TeamNullProps> = props => {
    const { teamStore } = props || {}
    const { teamList = [], applyListInDeal, createTeam, getTeamList, joinTeam } = teamStore

    const [form] = Form.useForm()
    const formLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
    }
    const [createTeamModalOpen, setCreateTeamModalOpen] = useState(false)
    const [createTeamModalConfirm, setCreateTeamModalConfirm] = useState(false)
    const [joinTeamModalOpen, setJoinTeamModalOpen] = useState(false)

    const onCreateTeam = () => {
        form.validateFields().then(formData => {
            const { name } = formData
            setCreateTeamModalConfirm(true)
            createTeam(
                name,
                () => {
                    setCreateTeamModalConfirm(false)
                    setCreateTeamModalOpen(false)
                },
                () => {
                    setCreateTeamModalConfirm(false)
                },
            )
        })
    }

    return (
        <div className={styles.team_null}>
            <div className={styles.team_null_title}>我的团队</div>
            <div className={styles.team_null_content}>
                <span>当前尚未加入团队，您可以选择自己</span>
                <span
                    className={styles.link}
                    onClick={() => {
                        setCreateTeamModalOpen(true)
                    }}
                >
                    创建团队
                </span>
                <span>，或选择</span>
                <span
                    className={styles.link}
                    onClick={() => {
                        setJoinTeamModalOpen(true)
                        getTeamList()
                    }}
                >
                    加入已有团队
                </span>
            </div>

            <Modal
                open={createTeamModalOpen}
                confirmLoading={createTeamModalConfirm}
                onCancel={() => {
                    setCreateTeamModalOpen(false)
                }}
                onOk={onCreateTeam}
                centered
                title="创建团队"
                destroyOnClose={true}
            >
                <Form form={form} {...formLayout} requiredMark={false}>
                    <Form.Item
                        name="name"
                        label="团队名称"
                        rules={[
                            { required: true, message: '请输入团队名称' },
                            { message: '团队名称不可超过15个字', max: 15 },
                        ]}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                open={joinTeamModalOpen}
                onCancel={() => {
                    setJoinTeamModalOpen(false)
                }}
                centered
                title="加入团队"
                width={728}
                footer={null}
                destroyOnClose={true}
            >
                <Table
                    loading={applyListInDeal}
                    columns={[
                        {
                            title: '团队名称',
                            dataIndex: 'name',
                        },
                        {
                            title: '组长',
                            dataIndex: 'leaderName',
                        },
                        {
                            title: '团队人数',
                            dataIndex: 'memberCount',
                        },
                        {
                            title: '操作',
                            render: ({ code, hasPendingApply }) => {
                                return !hasPendingApply ? (
                                    <Button
                                        type="link"
                                        style={{ margin: 0, padding: 0 }}
                                        onClick={e => {
                                            e.stopPropagation()
                                            joinTeam(code)
                                        }}
                                    >
                                        申请加入
                                    </Button>
                                ) : (
                                    <span>已申请</span>
                                )
                            },
                        },
                    ]}
                    dataSource={teamList}
                    pagination={false}
                />
            </Modal>
        </div>
    )
}

export default inject('userStore')(observer(TeamNull))
