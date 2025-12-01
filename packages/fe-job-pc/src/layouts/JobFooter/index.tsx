import React, { useEffect, useState } from 'react'
import styles from './index.module.less'

const Index = ({ data }: { data: any }) => {
    const [list, setList] = useState<any>({})

    useEffect(() => {
        setList(data)
    }, [data])
    return (
        <div className={styles.bottom_content}>
            <div className={styles.footer}>
                <div className={styles.footer_line}>
                    <span>{list?.organizer}</span>
                    <span className={styles.line_text}>|</span>
                    <span>{list?.technology}</span>
                </div>

                <div className={styles.footer_line}>
                    <a href={'https://beian.miit.gov.cn'} target={'_blank'} rel="noreferrer">
                        {list?.siteRecordNumber}
                    </a>
                    <span>
                        <span className={styles.line_text}>|</span>
                        {list?.licence}
                    </span>
                    <span className={styles.line_text}>|</span>
                    <a
                        href={'https://beian.mps.gov.cn/#/query/webSearch'}
                        target={'_blank'}
                        rel="noreferrer"
                    >
                        <i className={styles.icon} />
                        {list?.beian}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Index
