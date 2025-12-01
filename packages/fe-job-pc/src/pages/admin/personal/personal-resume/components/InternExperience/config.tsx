const internExperienceConfig = ({
    industryCascade,
    loadIndustryData,
    ws,
    recall,
    getAIChat,
    capacityTree,
    loadCapacityData,
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
            name: 'capacityId',
            childrenParam: {
                options: capacityTree,
                loadData: loadCapacityData,
                changeOnSelect: true,
            },
            label: '担任职位',
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
            rules: [{ required: true, message: '请输入你的工作内容' }],
            ai: {
                ws,
                getAIChat,
                prev: '实习',
                next: '的工作内容描述',
                master: 'capacityId',
                remoteFunc,
                recall,
                moduleName: 'intern',
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
                getAIChat,
                prev: '实习',
                next: '的工作业绩描述',
                master: 'capacityId',
                remoteFunc,
                recall,
                moduleName: 'intern',
                warn: '请先选择你担任的职位',
            },
        },
    ]
}

export default internExperienceConfig
