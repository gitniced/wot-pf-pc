import { useRef, useEffect } from 'react'
import { useState } from 'react'
import { Upload, Modal } from 'antd'
// import type { UploadChangeParam } from 'antd/lib/upload'
import type { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface'
import Http from '@/servers/http'
import globalApi from '@/servers/globalApi'
import styles from './index.module.less'
import { checkAccpt, checkLimit, checkSize, getAccepts, getPromise } from './uploadUtil'
import type { FileProps } from './interface'
import ManyUpload from './ManyUpload'

export default function GlobalUpload(props: FileProps) {
    const {
        onChange,
        beforeFile,
        // onDddFeil,
        // onRemoveFeil,
        cardStyles = 'card',
        value,
        accept,
        amount,
        size,
        otherProps,
        children,
        className,
        type,
        mode,
        manyCount,
        manyConfig,
    } = props
    const uploadRef = useRef<any>(null)
    const contentRef = useRef(null)
    const currentUploadFile = useRef<any[]>([])
    // const [dargImage, setDargImage] = useState('')
    const [uploadSuccessFile, setUploadSuccessFile] = useState<any[]>(value || []) // 设置当前的文件list
    const [isShowplaceholder, setIsShowplaceholder] = useState(true) // 设置是否展示展位符号
    const [previewVisible, setPreviewVisible] = useState(false) //预览框的显隐
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('') //

    // 计算占位符的显示和隐藏
    const setIsShowplaceholderFn = (lengthCount: number) => {
        setIsShowplaceholder(!(lengthCount >= amount!))
    }

    // 监听并触发计算
    useEffect(() => {
        setIsShowplaceholderFn(uploadSuccessFile.length)
    }, [uploadSuccessFile])

    //监听并且更新value
    useEffect(() => {
        if (value?.length) {
            setUploadSuccessFile(value)
            setIsShowplaceholderFn(value.length)
        }
    }, [value])

    const modalCancel = () => {
        setPreviewVisible(false)
        setPreviewImage('')
        setPreviewTitle('')
    }

    // 上传前验证
    const beforeCheck = async (file: { type: string; size: number }, fileList: any[]) => {
        let result: boolean | string = true
        try {
            await checkAccpt(file, accept)
            await checkLimit(fileList, amount, uploadRef?.current?.fileList?.length)
            await checkSize(file, size)
        } catch (error) {
            result = Upload.LIST_IGNORE
        }
        return result
    }

    // 上传
    const handleUpload = async (option: RcCustomRequestOptions) => {
        const { file } = option
        try {
            const beForUploadFile = getPromise(beforeFile)
            const result = await beForUploadFile({ file })

            const res = await Http(
                globalApi.upload,
                'post',
                { file: file, isPrivate: false, type },
                { headers: { 'Content-Type': 'multipart/form-data' }, delayTime: 60000 },
            )

            const { url, name, hash } = res

            const resFile = {
                uid: url,
                name,
                url,
                size: res.size,
                hash,
                // status: 'done',
                ...result,
            }

            // setUploadSuccessFile([...uploadSuccessFile, resFile])
            option.onSuccess?.(resFile)
        } catch (err) {
            option.onError?.(err as any)
        }
    }

    // 改变回调
    const handleChange = async ({ fileList }: any) => {
        let noErrFileList = fileList.filter(item => item.status !== 'error')

        currentUploadFile.current = noErrFileList

        setUploadSuccessFile(noErrFileList)
        if (onChange) {
            // debugger
            onChange(noErrFileList)
        }
    }

    const uploadProps = {
        name: 'file',
        ...otherProps,
        fileList: uploadSuccessFile,
        maxCount: amount,
        accept: getAccepts(accept),
        beforeUpload: beforeCheck,
        onChange: handleChange,
        customRequest: handleUpload,
        onRemove: (file: any) => {
            setUploadSuccessFile(v => {
                const fileArr = v.filter(item => item.uid !== file.uid)
                handleChange({
                    fileList: fileArr,
                })
                return fileArr
            })

            return false
        },
        onPreview: (file: any) => {
            const { response, url } = file
            setPreviewImage(url || response?.url)
            setPreviewTitle(response?.name)
            setPreviewVisible(true)
        },
    }

    const getPlaceholderCard = () => {
        const maps: Record<string, JSX.Element> = {
            cardStyles: (
                <div ref={contentRef} className={className}>
                    <div className={styles.single}>
                        <Upload ref={uploadRef} {...uploadProps} fileList={uploadSuccessFile}>
                            {isShowplaceholder && children}
                        </Upload>
                    </div>
                </div>
            ),
            default: (
                <Upload ref={uploadRef} {...uploadProps} fileList={uploadSuccessFile}>
                    {isShowplaceholder && children}
                </Upload>
            ),
        }
        return maps[cardStyles] || maps.default
    }

    const getUploadControl = () => {
        if (mode === 'many') {
            const _manyConfig = {
                manyCount: manyCount,
                type: type,
                otherProps: otherProps,
                size: size,
                cardStyles: cardStyles,
                accept: accept,
                manyConfig: manyConfig,
                beforeFile,
            }
            return <ManyUpload {..._manyConfig} onChange={handleChange} value={uploadSuccessFile} />
        } else {
            return getPlaceholderCard()
        }
    }

    return (
        <div className={styles.page}>
            {getUploadControl()}
            <Modal
                centered
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={modalCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}
