import React from 'react'
import styles from './index.module.less'

interface proprsType {
    footer: React.ReactNode | string
    icon?: boolean
}

function LoadingAnimeIcon({ footer, icon = true }: proprsType) {
    return (
        <div className={styles.loading_icon_warp}>
            {icon ? (
                <div className={styles.loading_anime_icon}> </div>
            ) : (
                <svg
                    className={styles.template}
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2651"
                    width="200"
                    height="200"
                >
                    <path
                        d="M512 64a448 448 0 1 0 0 896A448 448 0 0 0 512 64z m-32 232c0-4.416 3.584-8 8-8h48c4.416 0 8 3.584 8 8v272A8 8 0 0 1 536 576h-48a8 8 0 0 1-8-8v-272zM512 736A48 48 0 1 1 512 640a48 48 0 0 1 0 96z"
                        p-id="2652"
                        fill="#faad14"
                    >
                        {' '}
                    </path>
                </svg>
            )}

            <div className={styles.footer}>{footer ?? ''}</div>
        </div>
    )
}

export default LoadingAnimeIcon
