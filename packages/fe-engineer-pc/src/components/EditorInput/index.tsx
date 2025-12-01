// 富文本输入框，定制性较搞，其中填空题包含定制样式
import '@wangeditor/editor/dist/css/style.css'
import styles from './index.modules.less'
import React, { useState, useEffect, memo, useRef } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Boot } from '@wangeditor/editor'
import type { IModuleConf } from '@wangeditor/editor'
import mathFormulaMenuConf from './customMenu'
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

// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。

interface EditorInputProps {
    onChange?: (e: string, isFocused?: boolean) => void
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
    mode?: 'default' | 'simple'
}

const EditorInput: React.FC<EditorInputProps> = memo(
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
        mode = 'default',
    }) => {
        // editor 实例
        const [editor, setEditor] = useState<IDomEditor | null>(null)
        const editorRef = useRef<IDomEditor | null>(null)
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
                if (onBlur && editorRef.current) {
                    const currentContent = editorRef.current.getHtml()
                    const editText = currentContent === '<p><br></p>' ? '' : currentContent
                    const reg = /script/g
                    const sanitizedText = editText.replace(reg, '/')
                    onBlur(sanitizedText)
                } else {
                    onBlur?.()
                }
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
                editorRef.current = null
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
                <div
                    className={classnames(
                        styles.editor_box,
                        mode === 'simple' ? styles.editor_box_simple : '',
                    )}
                >
                    <Toolbar
                        editor={editor}
                        defaultConfig={toolbarConfig}
                        mode="default"
                        className={classnames(
                            styles.editor_toolbar,
                            mode === 'simple' ? styles.editor_toolbar_simple : '',
                        )}
                        style={
                            mode === 'simple'
                                ? {
                                      borderBottom: 'none',
                                      order: 2,
                                  }
                                : { borderBottom: '1px solid #ccc' }
                        }
                    />
                    <Editor
                        defaultConfig={editorConfig}
                        value={value}
                        onCreated={editorInstance => {
                            setEditor(editorInstance)
                            editorRef.current = editorInstance
                        }}
                        onChange={edit => {
                            onEditorChange(edit?.getHtml())
                        }}
                        mode="default"
                        className={styles.editor_editor}
                        style={mode === 'simple' ? { order: 1 } : {}}
                        // className={isShow ? styles.editor_show : styles.editor_hide}
                    />
                </div>
            </div>
        )
    },
)

export default EditorInput
