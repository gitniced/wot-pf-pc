const internExperienceConfig = ({ recall, ws, getAIChat }: any) => {
    return [
        {
            type: 'Input',
            label: '项目名称',
            name: 'name',
            rules: [{ required: true, message: '请输入项目名称' }],
        },
        {
            type: 'Input',
            label: '担任职位',
            name: 'job',
            rules: [{ required: true, message: '请输入你的担任职位' }],
        },
        {
            type: 'RangePicker',
            label: '时间段',
            name: 'startEnd',
            rules: [{ required: true, message: '请选择起止时间' }],
        },

        {
            type: 'TextArea',
            label: '项目链接',
            name: 'url',
            span: 24,
            childrenParam: {
                maxLength: 100,
            },
        },
        {
            type: 'TextArea',
            label: '经历描述',
            name: 'description',
            span: 24,
            rules: [{ required: true, message: '请输入你的经历描述' }],
            childrenParam: {
                maxLength: 500,
            },
            ai: {
                ws,
                getAIChat,
                recall,
                next: '的相关经历描述',
                master: ['name', 'job'],
                moduleName: 'project',
                warn: '请先填写担任职位',
            },
        },
        {
            type: 'TextArea',
            label: '项目业绩',
            name: 'performance',
            span: 24,
            ai: {
                ws,
                getAIChat,
                recall,
                next: '的项目业绩描述',
                master: ['name', 'job'],
                moduleName: 'project',
                warn: '请先填写担任职位',
            },
        },
    ]
}

export default internExperienceConfig
