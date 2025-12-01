import React, { useEffect, useState } from 'react'
import RosterStore from './store'
import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'
import { toJS } from 'mobx'
import CustomTitle from '@/components/CustomTitle'
import { Select, Button, message } from 'antd'
import { history, useLocation } from 'umi'
import type { IRoute } from 'umi'
import { useModel } from 'umi'
import type { MasterProps } from '@/components/MasterPlugins/interface'

const { Option } = Select
const Page: IRoute = observer(() => {
    const masterStore: MasterProps = useModel('@@qiankunStateFromMaster')
    let { getCurrentOrganization } = masterStore
    let currentOrganization = getCurrentOrganization?.()
    let { query } = useLocation()
    let { departmentCode } = query
    let store = useLocalObservable(() => new RosterStore())
    store = toJS(store)
    const { getInviteCode, getOrganizationDetail, getOrganizationCode } = store

    const [inviteExpire, setInviteExpire] = useState<number>(0)

    useEffect(() => {
        getOrganizationCode(currentOrganization)
    }, [currentOrganization])

    useEffect(() => {
        getInviteCode(departmentCode, inviteExpire)
        getOrganizationDetail()
    }, [currentOrganization, departmentCode, inviteExpire, store.organizationCode])

    const handleChange = (value: string) => {
        setInviteExpire(Number(value))
    }

    const goToPage = () => {
        if (departmentCode) {
            history.push(`/proposer?departmentCode=${departmentCode}`)
        } else {
            history.push(`/proposer`)
        }
    }

    const clickCopy = () => {
        navigator.clipboard
            .writeText(store.inviteCode.inviteUrl)
            .then(() => {
                message.success('复制成功')
            })
            .catch(() => {})
    }

    return (
        <div className={styles.page}>
            <div className={styles.top}>
                <CustomTitle title="邀请成员" />
                <Button type="primary" onClick={goToPage} className={styles.next}>
                    申请人列表
                </Button>
            </div>
            <div className={styles.main}>
                <div className={styles.main_title}>
                    您可以通过以下方式邀请成员加入，成员申请后需管理员审核确认后，方可加入该部门
                </div>
                <div className={styles.share}>
                    {/* 分享二维码 */}
                    <div className={styles.share_box}>
                        <img
                            style={{ height: '0.16rem' }}
                            src="https://static.zpimg.cn/public/fe_user_pc/images/bg_share1_1@2x.png"
                            alt=""
                        />
                        <div className={styles.share_box_bottom}>
                            <div className={styles.share_box_title}>分享二维码邀请加入</div>
                            <div className={styles.share_box_center}>
                                <div className={styles.share_box_center_text}>
                                    <span> </span>
                                    邀请你加入
                                </div>
                                <div className={styles.share_box_center_name}>
                                    {store.organizationDetail?.name}
                                </div>
                                <img
                                    className={styles.share_box_center_code}
                                    src={store.inviteCode.inviteImage}
                                />
                            </div>
                        </div>
                        <Button type="primary" className={styles.btn}>
                            <a href={store.inviteCode.inviteImage}>下载二维码图片</a>
                        </Button>
                    </div>

                    {/* 分享链接 */}
                    <div className={styles.share_box}>
                        <img
                            style={{ height: '0.16rem' }}
                            src="https://static.zpimg.cn/public/fe_user_pc/images/bg_share2_1@2x.png"
                            alt=""
                        />
                        <div className={styles.share_box_bottom}>
                            <div className={styles.share_box_title}>分享链接申请加入</div>
                            <div className={styles.share_box_center}>
                                <div className={styles.share_box_center_text}>
                                    <span> </span>
                                    邀请你加入 {store.organizationDetail?.name}，快来一起加入吧
                                </div>
                                <div className={styles.share_box_center_path}>
                                    {store.inviteCode.inviteUrl}
                                </div>
                            </div>
                        </div>
                        <Button type="primary" className={styles.btn} onClick={clickCopy}>
                            复制链接邀请
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.bottom_title}>邀请码有效期设置</div>
                <Select placeholder="永久有效" style={{ width: 480 }} onChange={handleChange}>
                    <Option value="0">永久有效</Option>
                    <Option value="1">一周内</Option>
                    <Option value="2">3天内</Option>
                </Select>
            </div>
        </div>
    )
})

Page.title = '邀请成员'

export default Page
