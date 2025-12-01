import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import styles from './index.module.less'
import Config from './config'
import GeneralForm from '../GeneralForm'

const Index = forwardRef(
    ({ userCustomModule, saveCustomModule, label, setStatus, type }: any, ref) => {
        const [mode, setMode] = useState('view')
        const [formData, setFormData] = useState({})

        useEffect(() => {
            if (type !== 'addMode') {
                setStatus(mode === 'view' ? '' : '编辑')
            }
        }, [mode])

        const editInstance = () => {
            setFormData({
                description: userCustomModule?.description ?? '',
                title: userCustomModule?.title ?? '',
            })
            setMode('edit')
        }

        const addFunc = () => {
            setFormData({})
            setMode('edit')
        }

        const onCancel = () => {
            setMode('view')
        }

        const onFinish = async (values: object) => {
            await saveCustomModule({ ...(userCustomModule ? userCustomModule : {}), ...values })
            setMode('view')
        }

        useImperativeHandle(
            ref,
            () => {
                return {
                    editInstance,
                    mode,
                }
            },
            [userCustomModule],
        )

        if (type === 'addMode') {
            if (mode === 'view') {
                return (
                    <div className={styles.hobby_container}>
                        <Button onClick={addFunc} icon={<PlusOutlined />}>
                            自定义模块
                        </Button>
                    </div>
                )
            }

            return (
                // @ts-ignore
                <GeneralForm
                    structure={Config(label, type)}
                    formData={formData}
                    onCancel={onCancel}
                    onFinish={onFinish}
                />
            )
        }

        if (mode === 'view') {
            return userCustomModule?.description ? (
                <div className={styles.hobby_container}>{userCustomModule?.description ?? ''}</div>
            ) : (
                <></>
            )
        }

        return (
            // @ts-ignore
            <GeneralForm
                structure={Config(label, type)}
                formData={formData}
                onCancel={onCancel}
                onFinish={onFinish}
            />
        )
    },
)

export default Index
