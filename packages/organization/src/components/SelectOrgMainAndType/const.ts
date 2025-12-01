export const SUBJECT_DATA = [
    {
        id: 0,
        title: '企业',
        dec: '有营业执照的企业或机构',
    },
    {
        id: 1,
        title: '政府/事业单位',
        dec: '有组织机构代码证/统一社会信用代码证书/事业单位法人证书的各级、各类政府机构、事业单位',
    },
    {
        id: 2,
        title: '教育机构',
        dec: '有组织机构代码证/统一社会信用代码证书/事业单位法人证书的各级、各类教育机构',
    },
    {
        id: 3,
        title: '其他组织',
        dec: '有组织机构代码证/营业执照/社会团体法人登记证书，但不属于企业、政府/事业单位、教育机构的组织',
    },
]

export const CERTIFICATE_DATA = [
    {
        id: 0,
        list: [
            {
                id: 0,
                title: '多合一证书',
                dec: '证件上有【统一社会信用代码】字样，表示形式为18位，由阿拉伯数字或大写英文字母组成',
                url: 'https://static.zpimg.cn/public/fe_user_pc/images/sub1.jpg',
            },
            {
                id: 1,
                title: '普通营业执照',
                dec: '未升级新版营业执照的企业，证件号码显示【注册号】，为12-15位阿拉伯数字',
                url: 'https://static.zpimg.cn/public/fe_user_pc/images/sub2.jpg',
            },
        ],
    },
    {
        id: 1,
        list: [
            {
                id: 2,
                title: '事业单位法人证书或统一信用代码证书',
                dec: '证件上有【统一社会信用代码】字样，表示形式为18位，由阿拉伯数字或大写英文字母组成',
                url: 'https://static.zpimg.cn/public/fe_user_pc/images/sub3.jpg',
            },
            {
                id: 3,
                title: '普通组织机构代码证',
                dec: '未办理“多证合一”，证书上没有18位“统一社会信用代码”',
                url: 'https://static.zpimg.cn/public/fe_user_pc/images/sub4.jpg',
            },
        ],
    },
    {
        id: 2,
        list: [
            {
                id: 2,
                title: '事业单位法人证书或统一信用代码证书',
                dec: '证件上有【统一社会信用代码】字样，表示形式为18位，由阿拉伯数字或大写英文字母组成',
                url: 'https://static.zpimg.cn/public/fe_user_pc/images/sub3.jpg',
            },
            {
                id: 3,
                title: '普通组织机构代码证',
                dec: '未办理“多证合一”，证书上没有18位“统一社会信用代码”',
                url: 'https://static.zpimg.cn/public/fe_user_pc/images/sub4.jpg',
            },
        ],
    },
    {
        id: 3,
        list: [
            {
                id: 0,
                title: '多合一证书',
                dec: '证件上有【统一社会信用代码】字样，表示形式为18位，由阿拉伯数字或大写英文字母组成',
                url: 'https://static.zpimg.cn/public/fe_user_pc/images/sub1.jpg',
            },
            {
                id: 3,
                title: '普通组织机构代码证',
                dec: '未办理“多证合一”，证书上没有18位“统一社会信用代码”',
                url: 'https://static.zpimg.cn/public/fe_user_pc/images/sub4.jpg',
            },
            {
                id: 4,
                title: '其他证件类型',
                dec: '其他各类主体资质证件类型',
                url: '',
            },
        ],
    },
]

export enum DOCUMENT_TYPE {
    /**   多合一证书 */
    CERTIFICATE = 0,
    /**  普通营业执照  */
    LICENSE,
    /**  事业单位法人证书或统一信用代码证书  */
    CREDIT_CERTIFICATE,
    /**  普通组织机构代码证  */
    CODE_CERTIFICATE,
    /**  其他证件类型  */
    OTHER_CERTIFICATE,
}
