import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import bindHooks from './hooks'
import CustomTitle from '@/components/Global/CustomTitle'
import { useCallback, useEffect } from 'react'
import { Button, Tooltip, Modal } from 'antd'
import type { BindListItem, BindItem, BindProps } from './interface'
import type { IRoute } from 'umi'
import type { UserInfo } from '@/stores/interface'
import { InfoCircleOutlined } from '@ant-design/icons'
import ChangeBindModal from './components/ChangeBindModal'
import OAuthLogin from './components/OAuthLogin'
import { LOGIN_TYPE_STR_TO_NUM } from '@wotu/wotu-components/dist/esm/Types'
import { getDecodeInfo } from '@wotu/wotu-components'

const Bind = observer((props: BindProps) => {
    const { userStore, siteStore } = props

    const hooks = useLocalObservable(() => new bindHooks(userStore, siteStore))

    useEffect(() => {
        hooks.getAllBind(userStore)
    }, [])

    const getDecodeInfoByList = (unInfo: string, encodeType: string) => {
        const noDecodeList = ['账号身份未认证', '手机号码未认证', '邮箱地址暂未绑定', '未绑定']
        if (noDecodeList.includes(unInfo)) {
            return unInfo
        } else {
            return getDecodeInfo(unInfo || '', encodeType)
        }
    }

    const getBindItem = useCallback(
        (data: BindListItem[], userData?: UserInfo) => {
            return data.map((group: BindListItem, index: number) => {
                return (
                    <>
                        <div key={group.type} className={styles.group}>
                            <span className={styles.group_title}>{group.type}</span>
                            <div className={styles.group_item}>
                                {group.children
                                    .filter(item => item.isShow !== false)
                                    .map((item: BindItem) => {
                                        const {
                                            name,
                                            icon,
                                            unIcon,
                                            info,
                                            unInfo,
                                            statusStr,
                                            unStatusStr,
                                            status,
                                            key,
                                            remark,
                                            textType,
                                            encodeType,
                                        } = item
                                        return (
                                            <div key={name} className={styles.item}>
                                                <div className={styles.left}>
                                                    <img
                                                        className={styles.icon}
                                                        src={status === 0 ? unIcon : icon}
                                                    />
                                                    <div className={styles.info}>
                                                        <div className={styles.name}>
                                                            {name}
                                                            <svg
                                                                className={[
                                                                    status === 0
                                                                        ? ''
                                                                        : styles.success,
                                                                    'icon',
                                                                ].join(' ')}
                                                                aria-hidden="true"
                                                            >
                                                                <use
                                                                    xlinkHref={`#${
                                                                        status === 0
                                                                            ? 'Warning-Circle-Fill'
                                                                            : 'Check-Circle-Fill'
                                                                    }`}
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className={styles.des}>
                                                            {status === 0
                                                                ? getDecodeInfoByList(
                                                                      unInfo || '',
                                                                      encodeType,
                                                                  )
                                                                : getDecodeInfo(
                                                                      info || '',
                                                                      encodeType,
                                                                  )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.right}>
                                                    {remark && (
                                                        <Tooltip placement="top" title={remark}>
                                                            <div className={styles.remark}>
                                                                审核失败原因
                                                                <InfoCircleOutlined
                                                                    className={styles.remark_icon}
                                                                />
                                                            </div>
                                                        </Tooltip>
                                                    )}
                                                    {textType === 'text' ? (
                                                        status === 0 ? (
                                                            unStatusStr
                                                        ) : (
                                                            statusStr
                                                        )
                                                    ) : (
                                                        <Button
                                                            className={[
                                                                index === 0
                                                                    ? styles.unbind
                                                                    : status === 1
                                                                    ? styles.binded
                                                                    : styles.unbind,
                                                            ].join(' ')}
                                                            href={hooks.getfixBindUrl(
                                                                key,
                                                                userData,
                                                            )}
                                                            type={
                                                                status === 1 ? 'ghost' : 'primary'
                                                            }
                                                            onClick={e => {
                                                                e.preventDefault()
                                                                hooks.fixBind(
                                                                    key,
                                                                    info!,
                                                                    userData,
                                                                    userStore,
                                                                    siteStore,
                                                                )
                                                            }}
                                                        >
                                                            {status === 0 ? unStatusStr : statusStr}
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </>
                )
            })
        },
        [hooks.bindList, userStore?.userData, hooks.emailDisabled],
    )

    return (
        <div className={styles.page}>
            {!hooks.loading && (
                <div className={styles.content}>
                    <CustomTitle title="认证绑定" />
                    {getBindItem(hooks.bindList, userStore?.userData)}
                </div>
            )}
            <ChangeBindModal
                bindModalVisible={hooks.bindModalVisible}
                setBindModalVisible={hooks.setBindModalVisible}
                email={userStore?.userData?.email}
                mobile={userStore.userData?.mobile}
            />
            {hooks.qrcodeModalType && (
                <Modal
                    open={Boolean(hooks.qrcodeModalType)}
                    onCancel={() => {
                        hooks.qrcodeModalType = null
                    }}
                    bodyStyle={{ padding: 0 }}
                    className={styles.bind_modal_wrapper}
                    footer={null}
                    width={380}
                    centered
                >
                    <OAuthLogin
                        authType={hooks.qrcodeModalType}
                        auth_user_type={LOGIN_TYPE_STR_TO_NUM[userStore.userType || 'user']}
                    />
                </Modal>
            )}
        </div>
    )
})

const ObserverBind: IRoute = inject('userStore', 'siteStore')(Bind)

ObserverBind.title = '认证绑定'

export default ObserverBind
