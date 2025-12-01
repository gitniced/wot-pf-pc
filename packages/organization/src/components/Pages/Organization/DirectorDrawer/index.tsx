import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Drawer, Button, Space, Radio } from 'antd'
import type { PropsType } from './interface'
import type { RadioChangeEvent } from 'antd'

const DirectorDrawer = (props: PropsType) => {
    let { directorVisible, setDirectorVisible, staffList, setDirector, setDirectorCode } = props

    const [currentDirectorCode, setCurrentDirectorCode] = useState('')

    // 选择单选框，确认主管
    const changeRadio = (e: RadioChangeEvent) => {
        setCurrentDirectorCode(e.target.value)
        setDirectorCode(e.target.value)
    }

    const closeDirector = () => {
        setDirectorVisible(false)
    }
    const okDirector = () => {
        setDirectorVisible(false)
        setDirector()
    }

    useEffect(() => {
        if (staffList.length) {
            staffList.map((i: any) => {
                if (i.isDirector) {
                    setCurrentDirectorCode(i.userCode)
                }
            })
        }
    }, [staffList])

    return (
        <div className={styles.content}>
            <Drawer
                className={styles.drawer}
                title={`设置主管`}
                placement="right"
                onClose={closeDirector}
                visible={directorVisible}
                width="2.36rem"
                footer={
                    <Space>
                        <Button onClick={closeDirector}>取消</Button>
                        <Button type="primary" onClick={okDirector} disabled={!staffList?.length}>
                            确认
                        </Button>
                    </Space>
                }
                footerStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Radio.Group
                    onChange={changeRadio}
                    value={currentDirectorCode}
                    size="large"
                    className={styles.drawer_list}
                >
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {staffList?.length > 0 &&
                            staffList?.map((item: any) => {
                                return (
                                    <Radio.Button
                                        className={styles.radio}
                                        key={item.userCode}
                                        value={item.userCode}
                                    >
                                        <div className={styles.drawer_radio}>{item.name}</div>
                                    </Radio.Button>
                                )
                            })}
                    </div>
                </Radio.Group>
            </Drawer>
        </div>
    )
}
export default DirectorDrawer
