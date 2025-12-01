const config = (label: string) => {
    return [
        {
            type: 'Input',
            label,
            name: 'url',
            span: 24,
            childrenParam: {
                maxLength: 100,
            },
            rules: [
                { required: true, message: `请输入你的${label}` },
                { pattern: /^(http|https):\/\/([\w.]+\/?)\S*/i, message: '请输入正确的网址链接' },
            ],
        },
    ]
}

export default config
