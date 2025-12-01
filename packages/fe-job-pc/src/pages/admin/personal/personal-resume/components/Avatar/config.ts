const avatarConfig = ({
    experienceOption,
    politicalOption,
    cityCascade,
    onCascaderChange,
    loadCityData,
}: any) => {
    return [
        {
            type: 'Input',
            label: '姓名',
            name: 'name',
            rules: [{ required: true, message: '请输入你的姓名' }],
        },
        {
            type: 'Cascader',
            label: '籍贯',
            name: 'city',
            childrenParam: {
                options: cityCascade,
                onChange: onCascaderChange,
                loadData: loadCityData,
                changeOnSelect: true,
            },
        },
        {
            type: 'Select',
            label: '性别',
            name: 'gender',
            rules: [{ required: true, message: '请选择你的性别' }],
            childrenParam: {
                options: [
                    { label: '男', value: 1 },
                    { label: '女', value: 2 },
                ],
            },
        },
        {
            type: 'Select',
            label: '政治面貌',
            name: 'political',
            childrenParam: {
                options: politicalOption,
            },
        },
        {
            type: 'Select',
            label: '年龄',
            name: 'age',
            rules: [{ required: true, message: '请选择你的年龄' }],
            childrenParam: {
                options: new Array(50).fill(16).map((item, i) => ({
                    label: item + i + '岁',
                    value: item + i,
                })),
            },
        },
        {
            type: 'Select',
            label: '工作经验',
            rules: [{ required: true, message: '请选择工作经验' }],
            name: 'workExperience',
            childrenParam: { options: experienceOption },
        },
        {
            type: 'Input',
            label: '电话',
            name: 'mobile',
            rules: [
                { required: true, message: '请输入你的手机号' },
                { message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ },
            ],
        },
        {
            type: 'Input',
            label: '邮箱',
            name: 'email',
            rules: [
                {
                    message: '请输入正确的邮箱格式',
                    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                },
            ],
        },
    ]
}

export default avatarConfig
