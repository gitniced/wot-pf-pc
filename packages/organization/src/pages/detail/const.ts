import validateRule from '@/components/ValidateRule'

export const formDate = [
    {
        label: '姓名',
        name: 'contactName',
        maxLength: 25,
    },
    {
        label: '职务',
        name: 'contactJob',
        maxLength: 25,
    },
    {
        label: '手机号',
        name: 'contactMobile',
        rules: [
            validateRule({
                rule: 'MOBILE',
                message: '手机号格式错误',
                noEmpty: false,
            }),
        ],
    },
    {
        label: '邮箱',
        name: 'contactEmail',
        rules: [
            {
                type: 'email',
                message: '邮箱地址格式错误',
            },
        ],
    },
]
