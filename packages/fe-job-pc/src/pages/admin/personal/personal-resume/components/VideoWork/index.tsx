import { forwardRef, useImperativeHandle, useState } from 'react'
import GeneralForm from '../GeneralForm'
import VideoWorkConfig from './config'
import OperationBtn from '../OperateBtn'

import styles from './index.module.less'

const VideoWork = forwardRef(({ videoList, deleteWorks, saveWorks }: any, ref) => {
    const [mode, setMode] = useState('view')
    const [formData, setFormData] = useState({})

    const onCancel = () => {
        setMode('view')
    }

    const addFunc = () => {
        setMode('edit')
    }

    useImperativeHandle(
        ref,
        () => {
            return {
                addFunc,
            }
        },
        [],
    )

    const editFunc = (item: any) => {
        console.log(item)
        setFormData(item)
        setMode('edit')
    }

    const delFunc = (code: string) => {
        deleteWorks({ code, type: 2 })
    }

    const onFinish = (value: any) => {
        saveWorks({ ...formData, ...value, type: 2 })
        setMode('view')
    }

    if (mode == 'view') {
        return videoList.map((item: any) => (
            <div className={styles.video_item}>
                <div className={styles.top}>
                    <div className={styles.introduce}>{item.introduce}</div>
                    <div className={styles.operate}>
                        <OperationBtn
                            editFunc={() => editFunc(item)}
                            delFunc={() => delFunc(item.code)}
                        />
                    </div>
                </div>

                <video src={item.url} controls />
            </div>
        ))
    }

    return (
        // @ts-ignore
        <GeneralForm
            structure={VideoWorkConfig()}
            formData={formData}
            onCancel={onCancel}
            onFinish={onFinish}
        />
    )
})

export default VideoWork
