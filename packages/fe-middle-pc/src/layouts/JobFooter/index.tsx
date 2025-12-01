import React, { useEffect } from 'react'
import styles from './index.module.less'

const Index = ({ data, style = {} }: any) => {
    useEffect(() => {}, [])
    return (
        <div className={styles.bottom_content} style={style}>
            <div className={styles.footer}>
                <div className={styles.footer_line}>
                    {/* <span>{data?.organizer}</span>
                    <span className={styles.line_text}>|</span> */}
                    <span>{data?.technology}</span>
                </div>

                <div className={styles.footer_line}>
                    <a href={'https://beian.miit.gov.cn'} target={'_blank'} rel="noreferrer">
                        {data?.siteRecordNumber}
                    </a>
                    <span>
                        <span className={styles.line_text}>|</span>
                        {data?.licence}
                    </span>
                    <span className={styles.line_text}>|</span>
                    <a
                        href={`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602002490`}
                        target={'_blank'}
                        rel="noreferrer"
                    >
                        <i className={styles.icon} />
                        {data?.beian}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Index
