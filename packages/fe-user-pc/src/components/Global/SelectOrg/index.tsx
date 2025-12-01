import React from 'react'
import { observer } from 'mobx-react'
import styles from './index.module.less'
import { Button } from 'antd'
import { useLocation, history } from 'umi'
import { getPathParams } from '@/utils/urlUtils'
import { ORG_IDENTITY_TEXT_MAP } from '@/types'
import { PlusCircleFilled } from '@ant-design/icons'
import {
    LOGIN_TYPE,
    SOURCE_TYPE_MAPPING,
    SOURCE_TYPE_STATUS_TEXT_MAP,
} from '@wotu/wotu-components/dist/esm/Types'

import { CERTIFY_STATUS } from './const'

const SelectOrg = ({
    orgList = [],
    onClick,
    fromType,
}: {
    orgList: any[]
    onClick: (item: Record<string, any>) => void
    // 来源 是机构的选择机构、资源方的选择机构
    fromType: LOGIN_TYPE
}) => {
    let { query } = useLocation()

    // 创建机构
    const gotoCreateOrg = () => {
        // 创建机构且直接去第二步 填写机构信息
        let params = getPathParams() ? `${getPathParams()}&register=1` : '?register=1'
        history.push(`/organization/create${params}`)
    }
    let { sourceType } = query || {}
    // 根据来源是资源方还是机构，获取对应的身份文案
    let sourceTypeStatusText =
        fromType === LOGIN_TYPE.SELLER_LOGIN
            ? SOURCE_TYPE_STATUS_TEXT_MAP?.[SOURCE_TYPE_MAPPING?.[sourceType]]
            : ORG_IDENTITY_TEXT_MAP[sourceType as string] || '机构'

    return (
        <>
            {Boolean(orgList?.length) && (
                <div className={styles.page}>
                    <p className={styles.org_title}>
                        {query?.type === 'register' ? (
                            <>
                                您可以通过以下两种方式，入驻成为
                                <br />
                                {sourceTypeStatusText}{' '}
                            </>
                        ) : (
                            '选择你需要进入的机构'
                        )}
                    </p>
                    <div className={styles.org_list}>
                        {query?.type === 'register' && (
                            <div className={styles.sub_title}>
                                <div className={styles.number}>1</div>
                                选择已有机构，入驻成为 {sourceTypeStatusText}
                            </div>
                        )}
                        <div className={styles.org_list_content}>
                            {orgList.map(item => {
                                return (
                                    <div
                                        key={item.organizationCode}
                                        className={styles.org_list_item}
                                        onClick={() => onClick?.(item)}
                                    >
                                        <div
                                            className={styles.logo}
                                            style={{
                                                background: `url('${
                                                    item?.logo || defaultOrgLogo
                                                }') no-repeat center / contain`,
                                            }}
                                        />
                                        <div className={styles.name_wrapper}>
                                            <div className={styles.name}>{item.name}</div>
                                            {item.certifyStatus === CERTIFY_STATUS.CERTIFIED && (
                                                <img
                                                    src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/png_yirenzheng.png"
                                                    alt="renzheng_icon"
                                                    width={24}
                                                    height={24}
                                                />
                                            )}
                                        </div>

                                        <svg
                                            className={['icon', styles.arrow].join(' ')}
                                            aria-hidden="true"
                                        >
                                            <use xlinkHref={`#icon_jiantou_you`} />
                                        </svg>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* 来源为注册并且有指定身份，展示创建机构按钮 */}
                    {sourceType && query?.type === 'register' && (
                        <>
                            <div className={styles.sub_title}>
                                <div className={styles.number}>2</div>
                                创建新机构，入驻成为 {sourceTypeStatusText}
                            </div>
                            <Button
                                block
                                type="dashed"
                                onClick={gotoCreateOrg}
                                className={styles.create_btn}
                                style={{ width: '100%!important' }}
                            >
                                <PlusCircleFilled style={{ color: 'var(--primary-color)' }} />
                                创建机构
                            </Button>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default observer(SelectOrg)
