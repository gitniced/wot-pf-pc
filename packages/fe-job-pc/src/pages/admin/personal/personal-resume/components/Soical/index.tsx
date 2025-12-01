import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import styles from './index.module.less'
import Config from './config'
import GeneralForm from '../GeneralForm'
import OperationBtn from '../OperateBtn'

const Index = forwardRef(
    ({ label, userSoical, saveSoical, deleteWorks, type, setStatus }: any, ref) => {
        const [mode, setMode] = useState('view')
        const [formData, setFormData] = useState({})
        const [origin, setOrigin] = useState({})

        useEffect(() => {
            setStatus(mode === 'view' ? '' : '编辑')
        }, [mode])

        const addFunc = () => {
            setOrigin({})
            setFormData({})
            setMode('edit')
        }

        const editInstance = (userSoicalItem: any) => {
            setOrigin(userSoicalItem)
            setFormData({ url: userSoicalItem?.url ?? '' })
            setMode('edit')
        }

        const onCancel = () => {
            setMode('view')
        }

        const onFinish = async (values: object) => {
            await saveSoical({ ...origin, ...values, type })
            setMode('view')
        }

        const delFunc = (code: string) => {
            deleteWorks({ code, type })
        }

        useImperativeHandle(
            ref,
            () => {
                return {
                    mode,
                    addFunc,
                }
            },
            [],
        )

        if (mode === 'view') {
            return userSoical.map(({ code, url }: any, i: number) => (
                <div key={code} className={styles.soical_container}>
                    <div className={styles.top_exp}>
                        <div className={styles.name}>{label}:</div>
                        <div className={styles.url}>{url}</div>
                    </div>
                    <div className={styles.operate}>
                        <OperationBtn
                            editFunc={() => editInstance(userSoical[i])}
                            delFunc={() => delFunc(code)}
                        />
                    </div>
                </div>
            ))
        }

        return (
            // @ts-ignore
            <GeneralForm
                structure={Config(label)}
                formData={formData}
                onCancel={onCancel}
                onFinish={onFinish}
            />
        )
    },
)

export default Index
