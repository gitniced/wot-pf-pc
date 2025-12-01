import '@wangeditor/editor/dist/css/style.css' // 引入 css
import globalApi from '@/servers/globalApi'
import React, { useState, useEffect, memo } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import Http from '@/servers/http'
import { message } from 'antd'

const MyEditor = memo(
    (props: {
        setEditorText: (string: string) => void
        editorText: string
        disabled?: boolean
        autoFocus?: boolean
    }) => {
        const { setEditorText, editorText, disabled = false, autoFocus = true } = props
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
            placeholder: '请输入内容...',
            readOnly: disabled,
            autoFocus,
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
                        const { size } = file || {}
                        if (size / 1024 / 1024 > 20) {
                            message.error('图片大小不能超过20M')
                            return
                        }

                        const res: any = await Http(
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
                        const { url } = res || {}
                        const { url: _url } = res.data || {}
                        if (url || _url) {
                            // 最后插入图片
                            url && insertFn(url)
                            _url && insertFn(_url)
                            message.success('图片上传成功')
                        } else {
                            message.error('上传失败')
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
                <div style={{ border: '1px solid #ccc', zIndex: 100, position: 'relative' }}>
                    <Toolbar
                        editor={editor}
                        defaultConfig={toolbarConfig}
                        mode="default"
                        style={{ borderBottom: '1px solid #ccc' }}
                    />
                    <Editor
                        defaultConfig={editorConfig}
                        value={editorText}
                        onCreated={setEditor}
                        onChange={edit => setEditorText(edit.getHtml())}
                        mode="default"
                        style={{ height: '300px', overflowY: 'hidden' }}
                    />
                    {disabled ? (
                        <div
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: '0',
                                left: '0',
                                cursor: 'not-allowed',
                                background: '#c6c6c6',
                                opacity: '0.2',
                                zIndex: '101',
                            }}
                        />
                    ) : null}
                </div>
            </>
        )
    },
)

export default MyEditor
