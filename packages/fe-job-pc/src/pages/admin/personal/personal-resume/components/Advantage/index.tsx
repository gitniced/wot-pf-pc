import { useState, forwardRef, useEffect, useImperativeHandle } from 'react'
import styles from './index.module.less'
import Config from './config'
import GeneralForm from '../GeneralForm'

// @ts-ignore
const Index = forwardRef(({ userVolunteer, saveExperience, setStatus }, ref) => {
    const [mode, setMode] = useState('view')
    const [formData, setFormData] = useState({})

    useEffect(() => {
        setStatus(mode === 'view' ? '' : '编辑')
    }, [mode])

    const editInstance = () => {
        setFormData({ description: userVolunteer?.description ?? '' })
        setMode('edit')
    }

    const onCancel = () => {
        setMode('view')
    }

    const onFinish = async (values: object) => {
        await saveExperience({ ...(userVolunteer ? userVolunteer : {}), ...values, type: 1 })
        setMode('view')
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

    if (mode === 'view') {
        return <div className={styles.hobby_container}>{userVolunteer?.description ?? ''}</div>
    }

    return (
        // @ts-ignore
        <GeneralForm
            structure={Config()}
            formData={formData}
            onCancel={onCancel}
            onFinish={onFinish}
        />
    )
})

export default Index
