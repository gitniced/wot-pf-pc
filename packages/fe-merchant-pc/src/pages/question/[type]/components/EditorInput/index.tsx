// 富文本输入框，定制性较搞，其中填空题包含定制样式
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import styles from './index.modules.less'
import React, { useState, useEffect, memo } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Boot } from '@wangeditor/editor'
import type { IModuleConf } from '@wangeditor/editor'
import mathFormulaMenuConf from './customMenu'
// import formulaModule from '@wangeditor/plugin-formula'
import globalApi from '@/servers/globalApi'
import { message } from 'antd'
import http from '@/servers/http'
import classnames from 'classnames'

// 支持注册多个menu
const module: Partial<IModuleConf> = {
    // @ts-ignore
    menus: [mathFormulaMenuConf],
}
Boot.registerModule(module)

interface MyEditorProps {
    onChange?: (e: string) => void
    value?: any
    placeholder?: string
    style?: object
    minHeight?: number
    // 是否为填空题
    hasBlock?: boolean
    // 填空题文案
    BlockText?: string
    // 选中的函数播报
    onFocus?: (n?: any) => void
    onBlur?: (n?: any) => void
    // 初始toolbar
    initialToolbarKeys?: string[]
    insertKeys?: string[]
}

const MyEditor: React.FC<MyEditorProps> = memo(
    ({
        onChange,
        placeholder,
        style,
        value,
        minHeight,
        onFocus,
        onBlur,
        BlockText,
        hasBlock = false,
        initialToolbarKeys = ['uploadImage', 'fullScreen'],
        insertKeys = ['custom-math-formula-menu'],
    }) => {
        // editor 实例
        const [editor, setEditor] = useState<IDomEditor | null>(null)
        const [isShow, setIsShow] = useState<boolean>(false)
        // 工具栏配置
        let toolbarConfig: Partial<IToolbarConfig> = {
            toolbarKeys: initialToolbarKeys,
            insertKeys: {
                index: 3,
                keys: insertKeys,
            },
        }

        // 编辑器配置
        const editorConfig: Partial<IEditorConfig> = {
            placeholder,
            autoFocus: false,
            onFocus: () => {
                setIsShow(true)
                onFocus?.()
            },
            onBlur: () => {
                setIsShow(false)
                onBlur?.()
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
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                                delayTime: 60000,
                            },
                        )

                        // 最后插入图片
                        // @ts-ignore
                        insertFn(res?.url)
                        message.success('图片上传成功')
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

        const onEditorChange = (text: string) => {
            let editText = text === '<p><br></p>' ? '' : text
            const reg = /script/g
            editText = editText.replace(reg, '/')
            onChange?.(editText)
        }

        return (
            <div
                className={classnames(
                    styles.editor_input,
                    isShow ? styles.editor_input_border : null,
                )}
                style={{ ...style, minHeight: minHeight }}
            >
                {hasBlock && (
                    <div
                        className={classnames(
                            styles.editor_title,
                            isShow ? styles.editor_title_border : null,
                        )}
                    >
                        {BlockText}
                    </div>
                )}
                <div className={styles.editor_box}>
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
                        onChange={edit => {
                            onEditorChange(edit?.getHtml())
                        }}
                        mode="default"
                        className={isShow ? styles.editor_show : styles.editor_hide}
                    />
                </div>
            </div>
        )
    },
)

export default MyEditor
