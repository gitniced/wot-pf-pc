import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import styles from './index.module.less'
import { Image } from 'antd'
import Config from './config'
import GeneralForm from '../GeneralForm'

const Index = forwardRef(({ userImgList, saveImgWorks, setStatus }: any, ref) => {
    const [mode, setMode] = useState('view')
    const [formData, setFormData] = useState({})

    useEffect(() => {
        setStatus(mode === 'view' ? '' : '编辑')
    }, [mode])

    const onCancel = () => {
        setMode('view')
    }

    const onFinish = (value: any) => {
        const urlList = value?.urlList?.map((item: { url: any }) => item.url)
        saveImgWorks({ urlList, type: 1 })
        setMode('view')
    }

    const editInstance = () => {
        setFormData({ urlList: userImgList.map((item: { url: any }) => ({ url: item.url })) })
        setMode('edit')
    }

    useImperativeHandle(
        ref,
        () => {
            return {
                editInstance,
            }
        },
        [userImgList],
    )

    if (mode === 'view') {
        return Array.isArray(userImgList) && userImgList.length > 0 ? (
            <div className={styles.imglist_container}>
                {userImgList.map(({ url }) => (
                    <Image rootClassName={styles.img_style} src={url} />
                ))}
            </div>
        ) : (
            <></>
        )
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
