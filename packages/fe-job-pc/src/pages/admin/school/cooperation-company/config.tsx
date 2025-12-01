import { Popconfirm, Space } from 'antd'
import styles from './index.module.less'

export const tableColumns = ({
    terminateCooperation,
    activeKey,
    saveOperate,
}: {
    terminateCooperation: (params: any) => void
    activeKey: string
    saveOperate: (params: any) => any
}) =>
    activeKey === '1'
        ? [
              {
                  title: '企业名称',
                  dataIndex: 'name',
                  key: 'name',
              },
              {
                  title: '操作',
                  render: (_, { code }: { code: string }) => {
                      return (
                          <Popconfirm
                              placement="topRight"
                              title={'确认要解除合作关系么?'}
                              onConfirm={() => terminateCooperation(code as string)}
                              okText="解除"
                              cancelText="取消"
                          >
                              <span className={styles.operate_btn}>解除合作</span>
                          </Popconfirm>
                      )
                  },
              },
          ]
        : [
              {
                  title: '企业名称',
                  dataIndex: 'name',
                  key: 'name',
              },
              {
                  title: '申请人',
                  dataIndex: 'applyUserName',
                  key: 'applyUserName',
              },
              {
                  title: '企业认证状态',
                  dataIndex: 'certifyStatus',
                  key: 'certifyStatus',
                  render: (_, { certifyStatus }: { certifyStatus: number }) => {
                      const statusCollect = ['未认证', '已认证', '审核中']

                      const arr = [
                          <div className={styles.close} />,
                          <div className={styles.public} />,
                          <div className={styles.ready} />,
                      ]

                      return (
                          <div className={styles.status}>
                              {' '}
                              {arr[certifyStatus]} <span>{statusCollect[certifyStatus]}</span>{' '}
                          </div>
                      )

                      return
                  },
              },
              {
                  title: '邀请人',
                  dataIndex: 'inviteUserName',
                  key: 'inviteUserName',
              },
              {
                  title: '申请理由',
                  dataIndex: 'applyReason',
                  key: 'applyReason',
              },
              {
                  title: '操作',
                  render: (_, { code }: { code: string }) => {
                      return (
                          <Space>
                              <span
                                  onClick={() => {
                                      saveOperate({ code, status: 1 })
                                  }}
                                  className={styles.operate_btn}
                              >
                                  通过
                              </span>
                              <Popconfirm
                                  placement="topRight"
                                  title={'确认要拒绝申请么?'}
                                  onConfirm={() => {
                                      saveOperate({ code, status: 2 })
                                  }}
                                  okText="拒绝"
                                  cancelText="取消"
                              >
                                  <span className={styles.operate_btn}>拒绝</span>
                              </Popconfirm>
                          </Space>
                      )
                  },
              },
          ]
