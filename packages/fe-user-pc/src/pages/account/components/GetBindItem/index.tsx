import type { AccountBindItem } from '../../interface'
import styles from '../../index.module.less'
import type { UserInfo } from '@/stores/interface'
import classNames from 'classnames'
import { SuperLink } from '@wotu/wotu-components'
const GetBindItem = ({
    accountBind,
    userData,
    fixBind,
    getBindUrl,
}: {
    accountBind: AccountBindItem[]
    userData?: UserInfo
    fixBind: (key: string, statusStr: string, userData?: UserInfo) => void
    getBindUrl: (key: string, info?: string, userData?: UserInfo) => string | undefined
}) => {
    return (
        <>
            {accountBind.map(item => {
                let { name, key, status, statusStr, unStatusStr, toolStr, noneSkip } = item || {}
                return (
                    <SuperLink
                        key={name}
                        className={styles.account_item}
                        href={getBindUrl(key, statusStr, userData)}
                        onClick={() => {
                            !noneSkip && fixBind(key, statusStr, userData)
                        }}
                    >
                        <div className={styles.title}>
                            {name}
                            <svg
                                className={[
                                    status === 1 ? styles.verfiyed : styles.un_verfiy,
                                    'icon',
                                ].join(' ')}
                                aria-hidden="true"
                            >
                                <use
                                    xlinkHref={`#${
                                        status === 1 ? 'Check-Circle-Fill' : 'Warning-Circle-Fill'
                                    }`}
                                />
                            </svg>
                        </div>
                        <div className={styles.status_str}>
                            {/* @ts-ignore */}
                            {status === 1 ? statusStr : unStatusStr}
                        </div>
                        <div
                            className={classNames(
                                styles.tool_str,
                                noneSkip ? styles.tool_str_text : '',
                            )}
                        >
                            {toolStr}
                            {!noneSkip && (
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#icon_shouqi`} />
                                </svg>
                            )}
                        </div>
                    </SuperLink>
                )
            })}
        </>
    )
}

export default GetBindItem
