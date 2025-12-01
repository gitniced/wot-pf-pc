import type { VideoBoxProps } from './interface';
import styles from './index.module.less';
import { IDENTIFY_TYPE } from '../../const';

/** 人脸显示页面 */
export const VideoBox: React.FC<VideoBoxProps> = ({ signInStatus }) => {
    return (
        <div className={styles.video_box}>
            <video
                id="video"
                style={{ visibility: signInStatus === IDENTIFY_TYPE.WAIT ? 'visible' : 'hidden' }} 
                x5-video-player-type={'h5'}
                x5-video-player-fullscreen={'true'}
                playsInline
                webkit-playsinline={'true'}
            />
            <canvas
                id="canvas"
                style={{ visibility: signInStatus !== IDENTIFY_TYPE.WAIT ? 'visible' : 'hidden' }} />
            <canvas
                id="hideCanvas"
                style={{ visibility: 'hidden' }} />
        </div>
    );
};

export default VideoBox