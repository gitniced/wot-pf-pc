const config = () => {
    return [{
        type: 'Input',
        label: '获奖名称',
        name: 'name',
        rules: [{ required: true, message: '请输入获奖名次' }],
    },
    {
        type: 'RangePicker',
        label: '时间段',
        name: 'startEnd',
        rules: [{ required: true, message: '请选择起止时间' }],
    },]
}

export default config