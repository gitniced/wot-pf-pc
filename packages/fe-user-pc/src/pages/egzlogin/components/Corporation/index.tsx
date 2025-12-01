import styles from './index.modules.less'
/**
 * 公司
 */
const Corporation: React.FC = () => {
    const dataList: any[] = [
        {
            num: 10,
            unit: '+个',
            info: '职业技能人才培训',
            info2: '评价服务平台',
        },
        {
            num: 20,
            unit: '+省份',
            info: '人力资源社会保障部门',
            info2: '数字化创就业服务平台',
        },
        {
            num: 1500,
            unit: '+机构',
            info: '提供院校、培训/考评机构',
            info2: '平台技术服务保障',
        },
        {
            num: 50,
            unit: '+企业',
            info: '助力各类企业数字化',
            info2: '人才培养体系建设',
        },
        {
            num: 500,
            unit: '万+学员',
            info: '覆盖大学生、企业职工',
            info2: '社会各类劳动者用户',
        },
    ]

    return (
        <div className={styles.page}>
            <div className={styles.main}>
                <div className={styles.title}>杭州沃土教育科技股份有限公司</div>
                <div className={styles.info}>
                    构建终身学习产业互联生态平台、赋能个人终身职业成长
                </div>
                <div className={styles.content}>
                    {dataList.map(item => (
                        <div className={styles.card} key={item.num}>
                            <div className={styles.head}>
                                <span className={styles.num}>{item.num}</span>
                                <span className={styles.unit}>{item.unit}</span>
                            </div>
                            <div className={styles.texts}>
                                <div className={styles.text}>{item.info}</div>
                                <div className={styles.text}>{item.info2}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Corporation
