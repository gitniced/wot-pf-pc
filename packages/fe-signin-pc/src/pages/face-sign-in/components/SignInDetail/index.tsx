import type { SignInDetailProps, Data } from './interface'
import styles from './index.module.less'
import { Descriptions, Divider } from 'antd'
import { SIGN_TYPE_TEXT } from '../../const'
import { SIGN_TYPE } from '../../const'
import dayjs from '@/components/Dayjs'

/** 系统照片和签到照片对比 */
const SignInDetail: React.FC<SignInDetailProps> = ({ data, signType, index }) => {
    const {
        signUserImg,
        signInImg,
        signOutImg,
        name,
        checkType,
        signStatus,
        signOutStatus,
        signInTime,
        signOutTime,
    } = data ?? {}
    const signTypeText: string = SIGN_TYPE_TEXT[signType]
    const dataObj: Record<SIGN_TYPE, Data> = {
        [SIGN_TYPE.SIGN_IN]: {
            img: signInImg,
            status: signStatus,
            time: signInTime,
        },
        [SIGN_TYPE.SIGN_OUT]: {
            img: signOutImg,
            status: signOutStatus,
            time: signOutTime,
        },
    }
    const item: Data = dataObj[signType]

    const CHECK_TYPE_TEXT: Record<string, string> = {
        '1': '手动打卡',
        '2': '自动打卡',
        '4': '补卡',
    }

    return (
        <div className={styles.sign_in_detail}>
            <div className={styles.content}>
                {index && (
                    <div className={styles.svg_box}>
                        <svg
                            className={[styles.icon, 'icon'].join(' ')}
                            aria-hidden="true"
                            style={{ color: item.status === 0 ? '#FF4D4F' : '#1678FF' }}
                        >
                            <use xlinkHref={'#bg_qiandao'} />
                        </svg>
                        <span>
                            {item.status === 0 ? '未' : '已'}
                            {signTypeText}
                        </span>
                    </div>
                )}

                <div className={styles.img_list}>
                    <div className={styles.img_item}>
                        {signUserImg ? (
                            <img src={signUserImg} className={styles.img} />
                        ) : (
                            <div className={styles.no_img}>暂无照片</div>
                        )}
                        <span>系统照片</span>
                    </div>

                    <div className={`${styles.img_item}`}>
                        {item.img ? (
                            <img src={item.img} className={styles.img} />
                        ) : (
                            <div className={styles.no_img}>暂无照片</div>
                        )}
                        <span>{signTypeText}照片</span>
                    </div>
                </div>
                <Divider className={styles.divider} />
                <Descriptions className={styles.descriptions} column={1}>
                    {index ? (
                        <div className={styles.index}>
                            {index}.{name}
                        </div>
                    ) : (
                        <Descriptions.Item label="姓名">{name}</Descriptions.Item>
                    )}
                    {checkType && (
                        <Descriptions.Item label={`${signTypeText}方式`}>
                            {CHECK_TYPE_TEXT[checkType] || '-'}
                        </Descriptions.Item>
                    )}
                    <Descriptions.Item
                        label={`${signTypeText}时间`}
                        className={!item.time && styles.time}
                    >
                        {item.time
                            ? dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')
                            : `暂未${signTypeText}`}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    )
}

export default SignInDetail
