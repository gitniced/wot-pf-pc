import { Tag, Button, Space } from 'antd'
import { useState, forwardRef, useRef, useEffect, useImperativeHandle } from 'react'
import { FormOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import GeneralForm from '../GeneralForm'
import CertificateConifg from './config'

const Index = forwardRef(({ saveCertificate, userCertificateList = [], setStatus }: any, ref) => {
    const [mode, setMode] = useState('view')
    const [formData, setFormData] = useState({})
    const [extraOptions, setExtraOptions] = useState([] as any[])
    const formRef = useRef<any>(null)

    useEffect(() => {
        setStatus(mode === 'view' ? '' : '编辑')
    }, [mode])

    const addFunc = () => {
        setFormData({})
        setMode('edit')
    }

    const editFunc = () => {
        setFormData({ list: userCertificateList })
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

    const onCancel = () => {
        setMode('view')
    }

    const onFinish = (value: object) => {
        saveCertificate(value)
        setMode('view')
    }

    const formValueChange = (changedValues: any) => {
        const mergeArr = [
            ...extraOptions,
            ...(changedValues?.list?.map((item: any) => ({ label: item, value: item })) || []),
        ]
        const mergeObj = mergeArr.reduce((acc, cur) => ({ ...acc, [cur.label]: cur }), {})
        setExtraOptions(() => Object.values(mergeObj))
        if (changedValues?.list && changedValues?.list.length > 5) {
            formRef.current?.form.setFieldsValue({ list: changedValues?.list.slice(0, 5) })
        }
    }

    if (mode === 'view') {
        return (
            Array.isArray(userCertificateList) &&
            userCertificateList.length > 0 && (
                <div className={styles.certificate_container}>
                    <div className={styles.tag_wrapper}>
                        <Space size={[8, 16]} wrap>
                            {userCertificateList.map(item => (
                                <Tag>{item}</Tag>
                            ))}
                        </Space>
                    </div>
                    <div className={styles.operate}>
                        <Button onClick={() => editFunc()} icon={<FormOutlined />} type="link">
                            编辑
                        </Button>
                    </div>
                </div>
            )
        )
    }

    return (
        // @ts-ignore
        <GeneralForm
            structure={CertificateConifg(extraOptions)}
            ref={formRef}
            formValueChange={formValueChange}
            formData={formData}
            onCancel={onCancel}
            onFinish={onFinish}
        />
    )
})

export default Index
