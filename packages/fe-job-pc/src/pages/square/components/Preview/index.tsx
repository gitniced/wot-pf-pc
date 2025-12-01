import { CloseOutlined } from '@ant-design/icons'
import styles from './index.module.less'

interface Props {
    data: string[]
    onCancel: () => void
}

/** 预览视频 */
const Index: React.FC<Props> = ({ data, onCancel }) => {
    return (
        <>
            {data?.length ? (
                <div className={styles.preview}>
                    <div className={styles.content}>
                        <video
                            controlsList="nodownload noplaybackrate"
                            disablePictureInPicture
                            className={styles.video}
                            controls src={data[0]}
                         />
                    </div>
                    <div className={styles.icons}>
                        <div className={`${styles.icon} ${styles.btn_cancel}`} onClick={onCancel}>
                            <CloseOutlined />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default Index

