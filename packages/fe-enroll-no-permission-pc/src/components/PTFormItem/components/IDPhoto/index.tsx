import React, { useEffect, useState } from 'react'
import GlobalUpload from '../GlobalUpload'
import styles from './index.module.less'
import { PlusOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash'

/**
 *
 *
 * @param {*} props
 * @return {*}
 *
 * [{"id":208,"key":"1","name":"身份证"},{"id":209,"key":"2","name":"护照"},{"id":210,"key":"3","name":"其他证件"}]
 *
 *
 *
 */
const IDPhoto = (props: any) => {
    const { idPhotoType = 208, onChange } = props || {}

    const [finallyValue, setFinallyValue] = useState<File[] | File[][]>([])

    const [fontValue, setFontValue] = useState<File[]>([])
    const [backValue, setBackValue] = useState<File[]>([])

    useEffect(() => {
        let tempValue = cloneDeep(finallyValue)
        if (fontValue.length === 0) {
            tempValue.splice(0, 1, [])
        } else {
            tempValue.splice(0, 1, fontValue)
        }
        setFinallyValue(tempValue)
    }, [fontValue])

    useEffect(() => {
        let tempValue = cloneDeep(finallyValue)
        if (backValue.length === 0) {
            tempValue.splice(1, 1, [])
        } else {
            tempValue.splice(1, 1, backValue)
        }
        setFinallyValue(tempValue)
    }, [backValue])

    useEffect(() => {
        if (onChange) {
            onChange?.(finallyValue)
        }
    }, [finallyValue])

    const getRenderByIdPhotoType = () => {
        if (isNaN(idPhotoType)) {
            return null
        } else {
            switch (Number(idPhotoType)) {
                case 208:
                    return (
                        <>
                            <div className={styles.id_image}>
                                <GlobalUpload
                                    value={fontValue}
                                    amount={1}
                                    otherProps={{
                                        listType: 'picture-card',
                                    }}
                                    drag={false}
                                    size={5}
                                    type={11}
                                    accept={'image'}
                                    onChange={e => {
                                        setFontValue(e)
                                    }}
                                >
                                    <div className={styles.id_btn}>
                                        <PlusOutlined />
                                        <p>正面</p>
                                    </div>
                                </GlobalUpload>
                            </div>
                            <div className={styles.id_image}>
                                <GlobalUpload
                                    value={backValue}
                                    amount={1}
                                    otherProps={{
                                        listType: 'picture-card',
                                    }}
                                    drag={false}
                                    size={5}
                                    type={11}
                                    accept={'image'}
                                    onChange={e => {
                                        setBackValue(e)
                                    }}
                                >
                                    <div className={styles.id_btn}>
                                        <PlusOutlined />
                                        <p>反面</p>
                                    </div>
                                </GlobalUpload>
                            </div>
                        </>
                    )
                default:
                    return (
                        <>
                            <div className={styles.id_image}>
                                <GlobalUpload
                                    value={fontValue}
                                    amount={1}
                                    otherProps={{
                                        listType: 'picture-card',
                                    }}
                                    drag={false}
                                    size={5}
                                    type={11}
                                    accept={'image'}
                                    onChange={e => {
                                        setFinallyValue(e)
                                    }}
                                >
                                    <div className={styles.id_btn}>
                                        <PlusOutlined />
                                        <p>{`上传${Number(idPhotoType) === 209 ? '护照' : ''}`}</p>
                                    </div>
                                </GlobalUpload>
                            </div>
                        </>
                    )
            }
        }
    }

    return <div className={styles.page}>{getRenderByIdPhotoType()}</div>
}

export default IDPhoto
