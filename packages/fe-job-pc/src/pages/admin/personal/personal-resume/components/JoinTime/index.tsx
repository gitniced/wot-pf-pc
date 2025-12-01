import { Button, Select } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { JOB_SEARCHING_STATUS_TEXT } from '../../views/AttachmentResume/config'

import styles from './index.module.less'
import { FormOutlined } from '@ant-design/icons'

const JoinTime = forwardRef(({ candidateInfo, joinTimeOption, saveJoinTime }: any, ref) => {
    const [mode, setMode] = useState('view')
    const [joinTime, setJoinTime] = useState<number>(1)

    useEffect(() => {
        setJoinTime(candidateInfo.joinTime)
    }, [candidateInfo?.joinTime])

    const editInstance = () => {
        setMode('edit')
    }

    useImperativeHandle(
        ref,
        () => {
            return {
                editInstance,
            }
        },
        [],
    )

    // 求职状态切换
    const handleChange = async (joinTime: number) => {
        await saveJoinTime(joinTime)
        setJoinTime(joinTime)
        setMode('view')
    }

    return (
        <div className={styles.join_time}>
            {mode === 'view' ? (
                <div className={styles.view}>
                    <div className={styles.join_time}>{JOB_SEARCHING_STATUS_TEXT[joinTime]}</div>
                    <Button
                        className={styles.operate_btn}
                        onClick={() => setMode('edit')}
                        icon={<FormOutlined />}
                        type="link"
                    >
                        编辑
                    </Button>
                </div>
            ) : (
                <Select
                    value={joinTime}
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    options={joinTimeOption}
                />
            )}
        </div>
    )
})

export default JoinTime
