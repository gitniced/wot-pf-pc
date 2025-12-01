const educationExperienceConfig = ({
    degressOption,
    requestFunc,
    requestUniversityFunc,
    initOptions,
    ws,
    recall,
    getAIChat,
    remoteFunc,
}: any) => {
    return [
        {
            type: 'SearchInput',
            label: '学校名称',
            name: 'name',
            childrenParam: {
                requestFunc: requestUniversityFunc,
                initOptions: [],
            },
            rules: [{ required: true, message: '请输入你的学校名称' }],
        },
        {
            type: 'Select',
            label: '学历',
            name: 'degree',
            childrenParam: {
                options: degressOption,
            },
            rules: [{ required: true, message: '请选择你的学历' }],
        },
        {
            type: 'Select',
            label: '学制类型',
            name: 'degreeType',
            childrenParam: {
                options: [
                    { label: '全日制', value: 1 },
                    { label: '非全日制', value: 2 },
                ],
            },
        },
        {
            type: 'RangePicker',
            label: '起止时间',
            name: 'startEnd',
            rules: [{ required: true, message: '请选择起止时间' }],
        },
        {
            type: 'SearchInput',
            label: '专业',
            name: 'professionCode',
            childrenParam: {
                requestFunc: requestFunc,
                initOptions,
            },
            rules: [{ required: true, message: '请输入你的专业' }],
        },
        {
            type: 'TextArea',
            label: '主修课程',
            name: 'courseDesc',
            span: 24,
            ai: {
                ws,
                getAIChat,
                remoteFunc,
                recall,
                next: '的主修课程, 以数组方式返回',
                watchedField: 'professionCode',
                master: 'professionCode',
                moduleName: 'edu',
                mode: 'tags',
            },
        },
        { type: 'TextArea', label: '专业成绩', name: 'professionDesc', span: 24 },
        {
            type: 'TextArea',
            label: '在校经历',
            name: 'schoolExperience',
            span: 24,
            childrenParam: {
                maxLength: 500,
            },
            ai: {
                maxLength: 500,
                ws,
                getAIChat,
                recall,
                remoteFunc,
                next: '在校经历描述',
                master: 'professionCode',
                moduleName: 'edu',
                warn: '请先填写你的专业',
            },
        },
    ]
}

export default educationExperienceConfig
