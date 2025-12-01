import { Spin } from 'antd'
// import useJudgeTeacher from '../useJudgeTeacher'
// import styles from './index.module.less'

const PageLoading = () => {
    // const isTeacher = useJudgeTeacher()
    // return isTeacher ? (
    //     <div
    //         style={{
    //             width: '100%',
    //             height: '100vh',
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //         }}
    //     >
    //         <Spin size="large" />
    //     </div>
    // ) : (
    //     <div className={styles.page_loading}>
    //         <div className={[styles.skeleton, styles.skeleton_image].join(' ')} />
    //         <div
    //             className={[styles.skeleton, styles.skeleton_image].join(' ')}
    //             style={{ height: 300 }}
    //         />
    //     </div>
    // )

    return (
        <div style={{ paddingTop: 100, textAlign: 'center' }}>
            <Spin size="large" />
        </div>
    )
}

export default PageLoading
