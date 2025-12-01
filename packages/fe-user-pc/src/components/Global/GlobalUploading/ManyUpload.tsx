import React, { useState, useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import style from './index.module.less'
import GlobalUploading from './../GlobalUploading'

function ManyUpload({
    manyCount,
    type,
    otherProps,
    size,
    cardStyles,
    accept,
    onChange,
    manyConfig,
    value,
    beforeFile,
}: any) {
    const [datasurce, setDatasource] = useState<any[]>(new Array(manyCount).fill(false))
    const [isWarpUpdata, setIsWarpUpdata] = useState(true) /// 是否是外部的因素导致的更新
    useEffect(() => {
        if (isWarpUpdata) {
            setIsWarpUpdata(false)
            return
        }
        if (datasurce.filter(item => !!item)?.length >= manyCount) {
            console.log(datasurce, 'success')
            onChange({ fileList: datasurce })
        } else {
            onChange({ fileList: [] })
        }
    }, [datasurce])

    useEffect(() => {
        if (value.length >= manyCount) {
            setDatasource(value)
            setIsWarpUpdata(true)
        }
    }, [value])
    return (
        <div className={style.many_upload}>
            {manyConfig?.slice(0, manyCount).map((item, index: number) => {
                return (
                    <GlobalUploading
                        key={item.key ?? index}
                        type={type}
                        amount={1}
                        cardStyles={cardStyles}
                        otherProps={otherProps}
                        size={size}
                        accept={accept}
                        beforeFile={beforeFile}
                        value={datasurce?.[index] ? [datasurce[index]] : []}
                        onChange={file => {
                            const nowFiel = file?.filter(i => i.status !== 'error')
                            datasurce[index] = nowFiel?.length ? nowFiel?.[0] : null
                            setDatasource([...datasurce])
                        }}
                    >
                        <div>
                            <PlusOutlined />
                            <div>{item.desc || '上传照片'}</div>
                        </div>
                    </GlobalUploading>
                )
            })}
        </div>
    )
}

export default ManyUpload
