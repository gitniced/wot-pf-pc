const internExperienceConfig = ({
    industryCascade,
    loadIndustryData,
    capacityTree,
    loadCapacityData,
    ws,
    recall,
    getAIChat,
    remoteFunc,
}: any) => {
    const secondLevelValidator = (rule: any, selectedValue: any, callback: any) => {
        if (Array.isArray(selectedValue) && selectedValue.length !== 2) {
            callback('请选择到最后一级')
        } else {
            callback()
        }
    }

    const thirdLevelValidator = (rule: any, selectedValue: any, callback: any) => {
        if (Array.isArray(selectedValue) && selectedValue.length !== 3) {
            callback('请选择到最后一级')
        } else {
            callback()
        }
    }
    return [
        {
            type: 'Input',
            label: '公司名称',
            name: 'name',
            rules: [{ required: true, message: '请输入你的公司名称' }],
        },
        {
            type: 'Cascader',
            label: '公司行业',
            name: 'industry',
            childrenParam: {
                options: industryCascade,
                loadData: loadIndustryData,
                changeOnSelect: true,
            },
            rules: [{ validator: secondLevelValidator }],
        },
        {
            type: 'RangePicker',
            label: '起止时间',
            name: 'startEnd',
            rules: [{ required: true, message: '请选择起止时间' }],
        },
        {
            type: 'Cascader',
            label: '担任职位',
            childrenParam: {
                options: capacityTree,
                loadData: loadCapacityData,
                changeOnSelect: true,
            },
            name: 'capacity',
            rules: [
                { required: true, message: '请输入你的担任职位' },
                { validator: thirdLevelValidator },
            ],
        },
        {
            type: 'TextArea',
            label: '工作内容',
            name: 'description',
            span: 24,
            rules: [{ required: true, message: '请填写工作内容' }],
            childrenParam: {
                maxLength: 500,
            },
            ai: {
                maxLength: 500,
                ws,
                recall,
                getAIChat,
                prev: '',
                next: '的工作内容要求',
                master: 'capacity',
                remoteFunc,
                moduleName: 'work',
                warn: '请先选择你担任的职位',
            },
        },
        {
            type: 'TextArea',
            label: '工作业绩',
            name: 'performance',
            span: 24,
            ai: {
                ws,
                recall,
                getAIChat,
                remoteFunc,
                prev: '',
                next: '的工作业绩要求',
                master: 'capacity',
                moduleName: 'work',
                warn: '请先选择你担任的职位',
            },
        },
    ]
}

export default internExperienceConfig
