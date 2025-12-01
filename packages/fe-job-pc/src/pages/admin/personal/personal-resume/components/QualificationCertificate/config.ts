const CertificateConifg = (options: any) => {
    return [
        {
            type: 'TagSelect',
            label: '资格证书',
            name: 'list',
            childrenParam: {
                mode: 'tags',
                maxTagTextLength: 20,
                optionFilterProp: 'label',
                style: { width: '100%' },
                options: options,
            },
            span: 24,
        },
    ]
}

export default CertificateConifg
