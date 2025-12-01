import styles from './index.module.less'

type SellerFooterProps = {
    icp: string
    cctv: string
    police: string
    linkPolice: string
    noBg?: boolean
}

const Footer = (props: SellerFooterProps) => {
    const { icp, cctv, police, linkPolice, noBg = false } = props

    return (
        <div className={styles.page} style={noBg ? { boxShadow: 'none', background: 'none' } : {}}>
            <div className={styles.content}>
                {icp ? (
                    <div className={styles.site}>
                        <a target="_blank" href="https://beian.miit.gov.cn" rel="noreferrer">
                            {/* 浙ICP备{icp}号 */}
                            {icp}
                        </a>
                    </div>
                ) : null}

                {cctv ? (
                    <>
                        <div className={styles.split} />
                        <div className={styles.site}>
                            {/* 广播电视节目制作经营许可证（浙）字第{cctv}号 */}
                            {cctv}
                        </div>
                    </>
                ) : null}

                {police && linkPolice ? (
                    <>
                        <div className={styles.split} />
                        <a className={styles.site}>
                            <div className={styles.police} />
                            <a
                                target="_blank"
                                href={
                                    'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' +
                                    linkPolice
                                }
                                rel="noreferrer"
                            >
                                {/* 浙公网安备{police}号 */}
                                {police}
                            </a>
                        </a>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default Footer
