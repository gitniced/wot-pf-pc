/**
 * 注意事项
 */
import { Input } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { ModalCallbackContext, ModalValueContext } from '@/components/ModalProvider'

const NoteModal = () => {
    const [content, setContent] = useState<string>()

    const { confirmValueCallback } = useContext(ModalCallbackContext)
    const { dataSource } = useContext(ModalValueContext)

    useEffect(() => {
        confirmValueCallback?.(content)
    }, [content, confirmValueCallback])

    useEffect(() => {
        if (!dataSource) return
        setContent(dataSource?.precautions)
    }, [dataSource?.precautions])

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}
        >
            {dataSource.isDetail ? (
                dataSource.precautions
            ) : (
                <>
                    <label>注意事项：</label>
                    <Input.TextArea
                        rows={4}
                        showCount
                        defaultValue={dataSource?.precautions}
                        maxLength={500}
                        onChange={e => setContent(e.target.value)}
                        style={{ flex: 1 }}
                    />
                </>
            )}
        </div>
    )
}

export default NoteModal
