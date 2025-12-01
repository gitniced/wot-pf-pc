const config = (label: string, type: string) => {
    if (type === 'addMode') {
        return [
            { type: 'Input', label: '模块名称', name: 'title', span: 24, rules: [{ required: true, message: '请输入模块名称' }] },
            { type: 'TextArea', label: '模块内容', name: 'description', span: 24 },
        ]
    }

    return [
        {
            type: 'Input',
            label: '模块名称',
            name: 'title',
            span: 24,
            rules: [{ required: true, message: '请输入模块名称' }],
        },
        { type: 'TextArea', label: '模块内容', name: 'description', span: 24 },
    ]
}

export default config
