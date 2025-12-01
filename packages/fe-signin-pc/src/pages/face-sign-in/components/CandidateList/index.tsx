import { Popover, Space, Tabs } from 'antd'
import styles from './index.module.less'
import type { CandidateListProps } from './interface'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { SIGN_TYPE, SIGN_TYPE_TEXT, UN_SIGN_TYPE } from '../../const'
import SignInDetail from '../SignInDetail'
import { observer } from 'mobx-react'

/** 名单列表 */
const StudentList = observer(
    ({ signType, taskSignTable }: { signType: string; taskSignTable: [] }) => {
        /** 签到签退枚举 */
        const signTypeColumns: Record<
            UN_SIGN_TYPE,
            {
                classText: string
                Text: string
                icon: JSX.Element
            }
        > = {
            [UN_SIGN_TYPE.SIGN_IN]: {
                classText: 'success_status',
                Text: `已${SIGN_TYPE_TEXT[signType as unknown as SIGN_TYPE]}`,
                icon: <CheckCircleFilled />,
            },
            [UN_SIGN_TYPE.UN_SIGN_IN]: {
                classText: 'error_status',
                Text: `未${SIGN_TYPE_TEXT[signType as unknown as SIGN_TYPE]}`,
                icon: <CloseCircleFilled />,
            },
            [UN_SIGN_TYPE.CARD_REPLACEMENT]: {
                classText: 'success_status',
                Text: '补卡',
                icon: <CheckCircleFilled />,
            },
        }

        return (
            <div className={styles.list_box}>
                {taskSignTable.map((item, index) => {
                    const { signStatus, signOutStatus, name } = item
                    const status: UN_SIGN_TYPE =
                        (signType as unknown as SIGN_TYPE) === SIGN_TYPE.SIGN_IN
                            ? signStatus
                            : signOutStatus
                    return (
                        <Popover
                            overlayClassName={styles.popover}
                            placement="right"
                            title={null}
                            content={<SignInDetail data={item} signType={signType} />}
                            trigger="click"
                            key={item.code}
                        >
                            <div className={styles.list_item}>
                                <Space>
                                    <span>{index < 9 ? '0' + (index + 1) : index + 1}</span>
                                    <span>{name}</span>
                                </Space>
                                <Space className={styles[signTypeColumns[status]?.classText]}>
                                    {signTypeColumns[status]?.icon}
                                    {signTypeColumns[status]?.Text}
                                </Space>
                            </div>
                        </Popover>
                    )
                })}
            </div>
        )
    },
)

/** 名单模块 */
const CandidateList: React.FC<CandidateListProps> = ({ myHooks }: { myHooks: any }) => {
    const { taskSignTable, signType } = myHooks
    /** tab切换 */
    const tabChange = (e: string) => {
        myHooks.setSignStatus(e)
        myHooks.getTaskSignTable()
    }

    /** tab切换头部 */
    const renderTabBar = () => {
        return (
            <div className={styles.tab_box}>
                {myHooks.tabCounts.map(({ key, name, length }) => (
                    <div
                        key={key}
                        className={key === myHooks.signStatus ? styles.active : styles.no_active}
                        onClick={() => tabChange(key)}
                    >
                        {name} {length}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={styles.candidate_list}>
            <Tabs
                activeKey={myHooks.signStatus}
                className={styles.tabs}
                renderTabBar={myHooks.tabCounts.length > 0 ? renderTabBar : undefined}
            />
            <StudentList signType={signType} taskSignTable={taskSignTable} />
        </div>
    )
}

export default observer(CandidateList)
