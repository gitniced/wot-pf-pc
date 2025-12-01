import '@wangeditor/editor/dist/css/style.css' // 引入 css
import globalApi from '@/servers/globalApi'
import React, { useState, useEffect, memo } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import Http from '@/servers/http'
import { message } from 'antd'

const MyEditor = memo((props: { onChange?: (string: string) => void; value?: string }) => {
    let { onChange, value } = props
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)

    // 编辑器内容

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {
        excludeKeys: [
            // 排除菜单组，写菜单组 key 的值即可
            'group-video', //视频
        ],
    }

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入...',
        MENU_CONF: {
            uploadImage: {
                server: globalApi.upload,
                fieldName: 'file',
                maxFileSize: 1 * 5120 * 5120,
                allowedFileTypes: ['image/*'],
                meta: {
                    type: 8,
                },
                timeout: 6 * 1000,
                async customUpload(file: File, insertFn: (url: string) => void) {
                    // TS 语法
                    let res = await Http(
                        globalApi.upload,
                        'post',
                        { file: file, type: 8 },
                        {
                            form: true,
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                            delayTime: 60000,
                        },
                    )
                    console.log('👉 res:', res)
                    let { success, data, message: messageInfo } = res
                    if (success) {
                        // 最后插入图片
                        insertFn(data?.url)
                        message.success('图片上传成功')
                    } else {
                        message.error(messageInfo)
                    }
                },
            },
        },
    }
    // 及时销毁 editor
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={value}
                    onCreated={setEditor}
                    onChange={edit => onChange?.(edit.getHtml())}
                    mode="default"
                    style={{ height: '300px', overflowY: 'hidden' }}
                />
            </div>
        </>
    )
})

export default MyEditor
