import { useState, forwardRef, useEffect, useImperativeHandle } from 'react'
import styles from './index.module.less'
import GeneralForm from '../GeneralForm'
import Config from './config'

const Index = forwardRef(
    ({ userHobbyList, saveHobby, setStatus, ws, recall, getAIChat, remoteFunc }: any, ref) => {
        const [mode, setMode] = useState('view')
        const [formData, setFormData] = useState({})

        useEffect(() => {
            setStatus(mode === 'view' ? '' : '编辑')
        }, [mode])

        const editInstance = () => {
            setFormData({ hobbyList: userHobbyList })
            setMode('edit')
        }

        useImperativeHandle(
            ref,
            () => {
                return {
                    editInstance,
                }
            },
            [userHobbyList],
        )

        const onCancel = () => {
            setMode('view')
        }

        const onFinish = async (values: any) => {
            let list = Object.values(values)
            if (Object.prototype.toString.call(values?.hobbyList) === '[object Array]') {
                list = values?.hobbyList
            }

            await saveHobby({ list })

            setMode('view')
        }

        if (mode === 'view') {
            return Array.isArray(userHobbyList) && userHobbyList.length > 0 ? (
                <div className={styles.hobby_container}>
                    {Array.isArray(userHobbyList) && JSON.parse(JSON.stringify(userHobbyList))}
                </div>
            ) : null
        }

        return (
            // @ts-ignore
            <GeneralForm
                structure={Config({ ws, recall, getAIChat, remoteFunc })}
                formData={formData}
                onCancel={onCancel}
                onFinish={onFinish}
            />
        )
    },
)

export default Index
