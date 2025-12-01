import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import styles from './index.module.less'
import Config from './config'
import GeneralForm from '../GeneralForm'
import MdViewer from '@/components/MdViewer'

const Index = forwardRef(
    (
        { userExperience, saveExperience, type, setStatus, ws, recall, getAIChat, remoteFunc }: any,
        ref,
    ) => {
        const [mode, setMode] = useState('view')
        const [formData, setFormData] = useState({})

        useEffect(() => {
            setStatus(mode === 'view' ? '' : '编辑')
        }, [mode])

        const editInstance = () => {
            setFormData({ description: userExperience?.description ?? '' })
            setMode('edit')
        }

        const onCancel = () => {
            setMode('view')
        }

        const onFinish = async (values: object) => {
            await saveExperience({ ...(userExperience ? userExperience : {}), ...values, type })
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
            [userExperience],
        )

        if (mode === 'view') {
            return userExperience?.description ? (
                <div className={styles.hobby_container}>
                    <MdViewer content={userExperience?.description} />
                </div>
            ) : null
        }

        return (
            // @ts-ignore
            <GeneralForm
                structure={Config({ type, ws, recall, getAIChat, remoteFunc })}
                formData={formData}
                onCancel={onCancel}
                onFinish={onFinish}
            />
        )
    },
)

export default Index
