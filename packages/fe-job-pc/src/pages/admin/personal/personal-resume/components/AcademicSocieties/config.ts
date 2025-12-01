const config = ({ type, ws, getAIChat, remoteFunc, recall }: any) => {
    const arr = [
        { label1: '社团/组织名称', label2: '担任职务', name: '学校' },
        { label1: '社团/组织名称', label2: '担任职务', name: '学校' },
        { label1: '项目名称', label2: '担任职位', name: '公司' },
    ]
    return [
        {
            type: 'Input',
            label: arr[type].label1,
            name: 'name',
            rules: [{ required: true, message: `请输入你的${arr[type].label1}` }],
        },
        {
            type: 'Input',
            label: arr[type].label2,
            name: 'job',
        },
        {
            type: 'RangePicker',
            label: '时间段',
            name: 'startEnd',
            rules: [{ required: true, message: '请选择起止时间' }],
        },

        {
            type: 'TextArea',
            label: '经历描述',
            name: 'description',
            span: 24,
            childrenParam: {
                maxLength: 500,
            },
            ai: {
                maxLength: 500,
                ws,
                getAIChat,
                next: '的经历描述',
                master: ['name', 'job'],
                moduleName: 'societies',
                warn: '请先填写担任职位',
                remoteFunc,
                recall,
            },
        },
    ]
}

export default config
