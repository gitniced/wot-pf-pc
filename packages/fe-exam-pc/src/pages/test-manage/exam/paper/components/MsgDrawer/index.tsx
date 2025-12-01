import { Drawer } from 'antd'
import styles from './index.module.less'
import type { MsgDrawerProps } from './interface'
import { MessageType } from '../../../constant'
import { ReactSVG } from 'react-svg'

const MsgDrawer: React.FC<MsgDrawerProps> = ({ visible, setVisible, msgList }) => {
    const dealTimestamp = (timestamp: number) => {
        let nowStamp = new Date().getTime()
        let betweenStamp = nowStamp - timestamp + 32000
        let hours = Math.floor(betweenStamp / 1000 / 60 / 60)
        let mins = Math.floor(betweenStamp / 1000 / 60)
        let seconds = Math.floor(betweenStamp / 1000)
        let timeText = ''
        seconds > 0 && (timeText = `${seconds}秒前`)
        mins > 0 && (timeText = `${mins}分钟前`)
        hours > 0 && (timeText = `${hours}时前`)
        return timeText
    }

    return (
        <div className={styles.msg_drawer}>
            <Drawer
                title="消息"
                placement="right"
                closable={true}
                visible={visible}
                getContainer={false}
                className={styles.drawer}
                onClose={() => setVisible(false)}
            >
                <div className={styles.content}>
                    {msgList.map(item => {
                        return (
                            <div className={styles.item} key={item.messageTime}>
                                <div className={styles.title}>
                                    <div className={styles.svg_box}>
                                        <ReactSVG
                                            src={
                                                'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/icon_jiankaoyuan.svg'
                                            }
                                            style={{ width: 20, height: 20 }}
                                        />
                                    </div>
                                    <div className={styles.label}>
                                        {item.messageType === MessageType.DELAY
                                            ? '监考员为您延时：'
                                            : '监考员提醒您：'}
                                    </div>
                                    <div className={styles.time}>
                                        {dealTimestamp(item.messageTime)}
                                    </div>
                                </div>
                                <div className={styles.msg}>
                                    {item.messageType === MessageType.DELAY
                                        ? `延时${item.messageContent}`
                                        : item.messageContent}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Drawer>
        </div>
    )
}

export default MsgDrawer
