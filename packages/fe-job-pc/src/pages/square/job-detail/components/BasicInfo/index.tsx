import styles from './index.module.less'
import { Button, message, Space, Typography } from 'antd'
import GlobalUpload from '@/components/GlobalUpload'
import { getCookie } from '@/storage'
import { salaryCount } from '@/pages/square/utils'
import { findSiteLData } from '@/utils/valueGet'
import { inject } from 'mobx-react'

import { USER_IDENTITY_TYPE, USER_TYPE } from '@/types'

const BasicInfo: React.FC<{
    data: any
    setIsOpen: (e: boolean) => void
    uploadResumeFile: (url: string) => void
    siteStore?: any
}> = ({ data, setIsOpen, uploadResumeFile, siteStore }) => {
    const { professionName, address, recruitSimpleDto } = data ?? {}
    const loginUrl = findSiteLData(siteStore?.siteData, 'pcDomain', { findKey: 'baseInfo' })

    const isStudent =
        getCookie('SELECT_USER_TYPE') === USER_TYPE.USER &&
        getCookie('SELECT_IDENTITY_CODE') === USER_IDENTITY_TYPE.STUDENT

    /** 判断是否登录 */
    const isLogin = (cb: Function) => {
        const token = getCookie('TOKEN')
        // 没有登录，跳转到个人中心页面
        if (!token) {
            location.href = `${loginUrl}/account/user/login`
        } else {
            cb()
        }
    }

    return (
        <div className={styles.basic_info}>
            <div className={styles.name}>
                <div className={styles.title}>{professionName}</div>
                <div className={styles.salary}>
                    {salaryCount({
                        salaryMin: recruitSimpleDto?.salaryMin,
                        salaryMax: recruitSimpleDto?.salaryMax,
                        salaryType: recruitSimpleDto?.salaryType,
                        salaryMonth: recruitSimpleDto?.salaryMonth,
                        uint: recruitSimpleDto?.uint,
                        salaryDesc: recruitSimpleDto?.salaryDesc,
                    })}
                </div>
            </div>
            <div className={styles.other_info}>
                {address?.cityName && (
                    <div className={styles.other}>
                        <svg className={`icon ${styles.icon}`}>
                            <use xlinkHref={'#ic_zuobiao'} />
                        </svg>
                        <span className={styles.text}>{address?.cityName}</span>
                    </div>
                )}
                <div className={styles.other}>
                    <svg className={`icon ${styles.icon}`}>
                        <use xlinkHref={'#ic_gongzuojingyan'} />
                    </svg>
                    <span className={styles.text}>{recruitSimpleDto?.experienceName}</span>
                </div>
                <div className={styles.other}>
                    <svg className={`icon ${styles.icon}`}>
                        <use xlinkHref={'#ic_xueli'} />
                    </svg>
                    <span className={styles.text}>{recruitSimpleDto?.educationName}</span>
                </div>
            </div>
            <div className={styles.biographical_notes}>
                <div className={styles.buttons}>
                    <Button
                        className={styles.button}
                        type="primary"
                        onClick={() => isLogin(() => setIsOpen(true))}
                    >
                        立即投递
                    </Button>
                </div>
                <div className={styles.operate}>
                    <Space size={40} align="baseline">
                        <Typography.Link
                            className={styles.link}
                            onClick={() =>
                                isLogin(() => {
                                    window.open(
                                        '/job-center/admin/personal/personal-resume',
                                        '_blank',
                                    )
                                })
                            }
                        >
                            <svg className={`icon ${styles.icon}`}>
                                <use xlinkHref={'#ic_wanshanjianli'} />
                            </svg>
                            <span>填写在线简历</span>
                        </Typography.Link>
                        {isStudent ? (
                            <GlobalUpload
                                size={20}
                                accept={['pdf']}
                                drag={false}
                                type={3}
                                onChange={val => uploadResumeFile(val)}
                                otherProps={{
                                    itemRender: () => null,
                                    maxCount: 1,
                                }}
                            >
                                <Typography.Link
                                    className={styles.link}
                                    onClick={() => isLogin(() => {})}
                                >
                                    <svg className={`icon ${styles.icon}`}>
                                        <use xlinkHref={'#ic_xinzengjianli'} />
                                    </svg>
                                    <span>上传附件简历</span>
                                </Typography.Link>
                            </GlobalUpload>
                        ) : (
                            <Typography.Link
                                className={styles.link}
                                onClick={() =>
                                    isLogin(() => {
                                        message.error('请登录学员账号再上传')
                                    })
                                }
                            >
                                <svg className={`icon ${styles.icon}`}>
                                    <use xlinkHref={'#ic_xinzengjianli'} />
                                </svg>
                                <span>上传附件简历</span>
                            </Typography.Link>
                        )}
                    </Space>
                </div>
            </div>
        </div>
    )
}

/** 基本信息 */
export default inject('userStore', 'siteStore')(BasicInfo)
