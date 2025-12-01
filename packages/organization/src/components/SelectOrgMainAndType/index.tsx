import styles from './index.module.less'
import { CERTIFICATE_DATA, DOCUMENT_TYPE, SUBJECT_DATA } from './const'
import classNames from 'classnames'
import type {
    ISelectAuthSubjectProps,
    ISelectCertItemsType,
    ISelectCertificateProps,
} from './interface'
import { useState } from 'react'
import { Image } from 'antd'
/**   选择认证主体  */
export const SelectAuthSubject: React.FC<ISelectAuthSubjectProps> = ({
    value = 0,
    onChange,
    disabled,
    form,
}) => {
    const clickCard = (e: number) => {
        if (disabled) return null
        onChange?.(e)
        form.resetFields(['certifyDocumentType'])
    }

    return (
        <div className={styles.select_auth_subject}>
            {SUBJECT_DATA.map(i => {
                return (
                    <div
                        className={classNames(
                            styles.subject_card,
                            value === i.id ? styles.active : null,
                        )}
                        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
                        key={i.id}
                        onClick={() => clickCard(i.id)}
                    >
                        <div className={styles.title}>{i.title}</div>
                        <div className={styles.dec}>{i.dec}</div>
                    </div>
                )
            })}
        </div>
    )
}

/**  选择资质证件类型   */
export const SelectCertificate: React.FC<ISelectCertificateProps> = ({
    value,
    onChange,
    subject = 0,
    disabled,
}) => {
    const [visible, setVisible] = useState(false)
    const [previewUrl, setPreview] = useState<string>('')

    /**  单个card 点击选中  */
    const clickCard = (e: number) => {
        if (disabled) return null
        onChange?.(e)
    }

    /**  根据选择认证主体 获取对应的选择资质证件类型的list渲染  */
    const getList = () => {
        const renderItems = CERTIFICATE_DATA.find(
            i => i.id === subject,
        ) as unknown as ISelectCertItemsType
        renderItems || {}
        const { list = [] } = renderItems || {}
        return list
    }

    /** 点击图片预览   */
    const clickPreview = (url: string) => {
        setPreview(url)
        setVisible(true)
    }

    const renderCard = () => {
        const list = getList() || []

        return list.map(i => {
            return (
                <div
                    className={classNames(
                        styles.certificate_card,
                        value === i.id ? styles.active : null,
                    )}
                    key={i.id}
                    style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
                    onClick={() => clickCard(i.id)}
                >
                    <div className={styles.certificate_card_title}>
                        <div>{i.title}</div>
                        {/* 其他证件无 查看示例 */}
                        {i.id !== DOCUMENT_TYPE.OTHER_CERTIFICATE && (
                            <a className={styles.view_examples} onClick={() => clickPreview(i.url)}>
                                查看示例
                            </a>
                        )}
                    </div>
                    <div className={styles.certificate_card_dec}>{i.dec}</div>
                    <Image
                        width={200}
                        style={{ display: 'none' }}
                        preview={{
                            visible,
                            src: previewUrl,
                            onVisibleChange: e => {
                                setVisible(e)
                            },
                        }}
                    />
                </div>
            )
        })
    }

    return <div className={styles.select_certificate}>{renderCard()}</div>
}
