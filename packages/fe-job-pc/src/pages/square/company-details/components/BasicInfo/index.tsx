import styles from './index.module.less'

/** 基本信息 */
const BasicInfo: React.FC<{
    data: any
}> = ({ data }) => {
    const { organizationInfoDto, logo, name } = data ?? {}
    return (
        <div className={styles.basic_info}>
            <div className={styles.left}>
                <img
                    src={logo}
                    onError={e => {
                        e.target.src = defaultOrgLogo
                    }}
                    className={styles.image}
                />
                <div className={styles.info}>
                    <div className={styles.title}>{name}</div>
                    <div className={styles.tags}>
                        {organizationInfoDto?.financingStr && (
                            <div className={styles.tag}>{organizationInfoDto?.financingStr}</div>
                        )}
                        {organizationInfoDto?.scaleStr && (
                            <div className={styles.tag}>{organizationInfoDto?.scaleStr}</div>
                        )}
                        {organizationInfoDto?.industryStr && (
                            <div className={styles.tag}>{organizationInfoDto?.industryStr}</div>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.item}>
                    <span className={styles.total}>{data.professionCount}</span>
                    <div className={styles.text}>在招岗位</div>
                </div>
                <div className={styles.item}>
                    <span className={styles.total}>{data.cityCount}</span>
                    <div className={styles.text}>座城市</div>
                </div>
                <div className={styles.item}>
                    <span className={styles.total}>{data.professionTypeCount}</span>
                    <div className={styles.text}>大职位类型</div>
                </div>
            </div>
        </div>
    )
}

export default BasicInfo
