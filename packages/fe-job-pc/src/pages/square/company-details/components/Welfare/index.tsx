import { Row, Col } from 'antd'
import styles from './index.module.less'
import { overTimeStateOptions } from '@/pages/admin/company/company-homepage/formList/WelfareInfo/const'
import { Tooltip } from 'antd'

/** 工作时间及福利 */
const Welfare: React.FC = ({ data }: any) => {
    const { welfareDto, talentDevelopmentDto } = data ?? {}
    if (!welfareDto && !talentDevelopmentDto) return <></>
    const talentDevelopment = [
        talentDevelopmentDto?.abilityTraining,
        talentDevelopmentDto?.promotionSystem,
        talentDevelopmentDto?.talentIncentive,
    ]
        .flatMap(item => item?.split?.(','))
        .filter(Boolean)

    return (
        <div className={styles.welfare}>
            <div className={styles.header}>
                <span className={styles.title}>工作时间及福利</span>
            </div>
            <div className={styles.content}>
                <div className={styles.text_box}>
                    <svg className={`icon ${styles.icon}`}>
                        <use xlinkHref={'#ic_zuoxi'} />
                    </svg>
                    <div className={styles.text}>
                        {welfareDto?.workStartTime} ~ {welfareDto?.workEndTime}
                    </div>
                </div>
                <div className={styles.text_box}>
                    <svg className={`icon ${styles.icon}`}>
                        <use xlinkHref={'#ic_xiuxi'} />
                    </svg>
                    <div className={styles.text}>
                        {overTimeStateOptions[welfareDto?.overTimeState]}
                    </div>
                </div>
                <Row className={styles.tags} gutter={[8, 12]}>
                    {talentDevelopment.map(item => (
                        <Col span={12} key={item}>
                            <Tooltip title={item}>
                                <div className={styles.tag}>{item}</div>
                            </Tooltip>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default Welfare
