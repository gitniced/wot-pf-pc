import '@wangeditor/editor/dist/css/style.css' // 引入 css
import styles from './index.modules.less'
// import globalApi from '@/servers/globalApi'
import React, { useState, useEffect, memo } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import globalApi from '@/servers/globalApi'
import { message } from 'antd'
import http from '@/servers/http'
import classnames from 'classnames'
// import Http from '@/servers/http'
// import { message } from 'antd'

// import { createEditor } from '@wangeditor/editor'

interface MyEditorProps {
    onChange?: (string: string) => void
    value?: string
    placeholder?: string
    style?: object
    minHeight?: number
}
const MyEditor: React.FC<MyEditorProps> = memo(({ placeholder, style, value, minHeight }) => {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)

    const [isShow, setIsShow] = useState<boolean>(false)

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {
        toolbarKeys: ['uploadImage', 'fullScreen'],
    }

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder,
        autoFocus: false,
        onFocus: () => {
            setIsShow(true)
        },
        onBlur: () => {
            setIsShow(false)
        },
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
                    let res = await http(
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
                    let { success, data, messInfo } = res
                    if (success) {
                        // 最后插入图片
                        insertFn(data?.url)
                        message.success('图片上传成功')
                    } else {
                        message.error(messInfo)
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
        <div
            style={{ ...style, minHeight: minHeight }}
            className={classnames(styles.editor_box, isShow ? styles.editor_box_border : null)}
        >
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                className={classnames(
                    styles.editor_toolbar,
                    isShow ? styles.editor_toolbar_show : styles.editor_toolbar_hidden,
                )}
            />
            <Editor
                defaultConfig={editorConfig}
                value={value}
                onCreated={setEditor}
                // onChange={edit => onChange?.(edit.getHtml())}
                mode="default"
                className={styles.editor}
            />
        </div>
    )
})

export default MyEditor
