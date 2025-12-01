// 求职类型
export enum JOB_SEARCHING_STATUS {
    UNKNOWN,
    LOOKING, // 看看机会
    ANY_TIME, // 随时高岗
    THIS_WEEK, // 本周到岗
    THIS_MONTH, // 本月到岗
    NEXT_MONTH, // 下月到岗
}
export const JOB_SEARCHING_STATUS_TEXT: Record<number, string> = {
    [JOB_SEARCHING_STATUS.UNKNOWN]: '未知',
    [JOB_SEARCHING_STATUS.LOOKING]: '看看机会',
    [JOB_SEARCHING_STATUS.ANY_TIME]: '随时到岗',
    [JOB_SEARCHING_STATUS.THIS_WEEK]: '本周到岗',
    [JOB_SEARCHING_STATUS.THIS_MONTH]: '本月到岗',
    [JOB_SEARCHING_STATUS.NEXT_MONTH]: '下月到岗',
}
// 求职类型列表
// @ts-ignore
export const JOB_SEARCHING_STATUS_OPTIONS: LabelValue[] = [
    {
        label: JOB_SEARCHING_STATUS_TEXT[JOB_SEARCHING_STATUS.LOOKING],
        value: JOB_SEARCHING_STATUS.LOOKING,
    },
    {
        label: JOB_SEARCHING_STATUS_TEXT[JOB_SEARCHING_STATUS.ANY_TIME],
        value: JOB_SEARCHING_STATUS.ANY_TIME,
    },
    {
        label: JOB_SEARCHING_STATUS_TEXT[JOB_SEARCHING_STATUS.THIS_WEEK],
        value: JOB_SEARCHING_STATUS.THIS_WEEK,
    },
    {
        label: JOB_SEARCHING_STATUS_TEXT[JOB_SEARCHING_STATUS.THIS_MONTH],
        value: JOB_SEARCHING_STATUS.THIS_MONTH,
    },
    {
        label: JOB_SEARCHING_STATUS_TEXT[JOB_SEARCHING_STATUS.NEXT_MONTH],
        value: JOB_SEARCHING_STATUS.NEXT_MONTH,
    },
]

export const config = ({
    capacityTree,
    loadCapacityData,
    cityCascade,
    loadCityData,
    industryCascade,
    loadIndustryData,
    minSalaryOptions = [],
    maxSalaryOptions = [],
    _workArea = [],
    isPartTime = false,
}: any) => {
    // @ts-ignore
    const secondLevelValidator = (rule, selectedValue, callback) => {
        if (Array.isArray(selectedValue) && selectedValue.length !== 2) {
            callback('请选择到最后一级')
        } else {
            callback()
        }
    }

    // @ts-ignore
    const thirdLevelValidator = (rule, selectedValue, callback) => {
        if (Array.isArray(selectedValue) && selectedValue.length !== 3) {
            callback('请选择到最后一级')
        } else {
            callback()
        }
    }

    return [
        {
            type: 'Select',
            name: 'type',
            label: '求职类型',
            extraParam: {
                labelCol: { span: 4 },
            },
            childrenParam: {
                options: [
                    {
                        label: '全职',
                        value: 1,
                    },
                    {
                        label: '兼职',
                        value: 2,
                    },
                    {
                        label: '实习',
                        value: 3,
                    },
                    {
                        label: '校招',
                        value: 4,
                    },
                ],
            },
            rules: [{ required: true, message: '请选择求职类型' }],
        },
        {
            type: 'Cascader',
            name: 'industry',
            label: '期望行业',
            extraParam: {
                labelCol: { span: 4 },
            },
            childrenParam: {
                options: industryCascade,
                loadData: loadIndustryData,
                changeOnSelect: true,
            },
            rules: [
                { required: true, message: '请选择期望行业' },
                { validator: secondLevelValidator },
            ],
        },
        {
            type: 'Cascader',
            name: 'capacityId',
            label: '期望职位',
            extraParam: {
                labelCol: { span: 4 },
            },
            childrenParam: {
                options: capacityTree,
                loadData: loadCapacityData,
                changeOnSelect: true,
            },
            rules: [
                { required: true, message: '请选择期望职位' },
                { validator: thirdLevelValidator },
            ],
        },
        {
            type: 'Cascader',
            name: 'city',
            label: '期望城市',
            extraParam: {
                labelCol: { span: 4 },
            },
            childrenParam: {
                options: cityCascade,
                loadData: loadCityData,
                changeOnSelect: true,
            },
            rules: [
                { required: true, message: '请选择期望城市' },
                { validator: secondLevelValidator },
            ],
        },
        isPartTime
            ? null
            : {
                  type: 'inline',
                  label: '期望薪资',
                  span: 24,
                  inlineParam: [
                      {
                          name: 'minSalary',
                          type: 'Select',
                          childrenParam: { options: minSalaryOptions },
                          rules: [{ required: true, message: '请选择期望薪资的范围' }],
                      },
                      {
                          name: 'maxSalary',
                          type: 'Select',
                          childrenParam: { options: maxSalaryOptions },
                          rules: [{ required: true, message: '请选择期望薪资的范围' }],
                      },
                  ],
              },
    ].filter(Boolean)
}

export const config2 = ({ workArea = [], form }: any) => {
    return [
        {
            type: 'Select',
            label: '工作区域',
            name: 'workArea',
            childrenParam: {
                options: workArea,
            },
            extraParam: {
                labelCol: { span: 4 },
            },
        },
        {
            type: 'TextArea',
            label: ' ',
            name: 'detailedWorkArea',
            childrenParam: {
                placeholder: '详细工作区域',
                maxLength: 255,
            },
            extraParam: {
                style: { marginTop: '-10px' },
                shouldUpdate: true,
                colon: false,
                labelCol: { span: 4 },
            },
        },
        {
            type: 'Select',
            name: 'workTime',
            label: '工作班时',
            extraParam: {
                labelCol: { span: 4 },
            },
            childrenParam: {
                onChange: () => {
                    form.current.form.setFieldsValue({ workTimeDes: '' })
                },
                options: [
                    {
                        label: '做五休二（周末双休）',
                        value: 1,
                    },
                    {
                        label: '做五休二（非周末双休）',
                        value: 2,
                    },
                    {
                        label: '做一休一',
                        value: 3,
                    },
                    {
                        label: '两班制（翻班）',
                        value: 4,
                    },
                    {
                        label: '三班制（翻班）',
                        value: 5,
                    },
                    {
                        label: '其他',
                        value: 6,
                    },
                ],
            },
        },
        {
            type: 'TextArea',
            label: '班时描述',
            name: 'workTimeDes',
            childrenParam: {
                maxLength: 255,
            },
            extraParam: {
                labelCol: { span: 4 },
            },
            renderChildren: (dom: Element, { getFieldValue }: any) => {
                return getFieldValue('workTime') === 6 ? dom : null
            },
        },
        {
            type: 'TextArea',
            label: '其他偏好',
            name: 'otherPreference',
            childrenParam: {
                maxLength: 255,
            },
            extraParam: {
                labelCol: { span: 4 },
            },
        },
    ].filter(Boolean)
}
