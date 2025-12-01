import styles from './index.modules.less'

//报名渠道  1站点门户 2机构门户 3报名链接 4推广二维码 5推广海报
export enum ENROLL_CHANNEL {
    SITE = 1,
    ORGANIZATION = 2,
    LINK = 3,
    QRCODE = 4,
    POSTER = 5,
}

export const ENROLL_CHANNEL_ENUM = {
    [ENROLL_CHANNEL.SITE]: 'site',
    [ENROLL_CHANNEL.ORGANIZATION]: 'organization',
    [ENROLL_CHANNEL.LINK]: 'link',
    [ENROLL_CHANNEL.QRCODE]: 'qrcode',
    [ENROLL_CHANNEL.POSTER]: 'poster',
}

export const ENROLL_CHANNEL_TEXT: Record<string, number> = {
    site: 1,
    organization: 2,
    link: 3,
    qrcode: 4,
    poster: 5,
}

export enum COLOR_ENUM {
    BLUE = '#1890FF',
    RED = '#D23E31',
    PURPLE = '#45459F',
    ORANGE = '#F7821B',
}

export const colorList = ['#1890FF', '#D23E31', '#45459F', '#F7821B']

//主题色
export const COLOR_ARR = [
    {
        scr: 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/saas%201.0/icon%EF%BC%8Ficon_blue.png',
        which: COLOR_ENUM.BLUE,
    },
    {
        scr: 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/saas%201.0/icon%EF%BC%8Ficon_red.png',
        which: COLOR_ENUM.RED,
    },
    {
        scr: 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/saas%201.0/icon%EF%BC%8Ficon_purple.png',
        which: COLOR_ENUM.PURPLE,
    },
    {
        scr: 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/saas%201.0/icon%EF%BC%8Ficon_orange.png',
        which: COLOR_ENUM.ORANGE,
    },
]

export const imageBackground = {
    [COLOR_ENUM.BLUE]: 'https://static.zpimg.cn/public/enroll/png_bg.png',
    [COLOR_ENUM.RED]: 'https://static.zpimg.cn/public/enroll/png_bg(1).png',
    [COLOR_ENUM.PURPLE]: 'https://static.zpimg.cn/public/enroll/png_bg(3).png',
    [COLOR_ENUM.ORANGE]: 'https://static.zpimg.cn/public/enroll/png_bg(2).png',
}

export const getClassNames = {
    [COLOR_ENUM.BLUE]: styles.activity_title_one,
    [COLOR_ENUM.RED]: styles.activity_title_two,
    [COLOR_ENUM.PURPLE]: styles.activity_title_three,
    [COLOR_ENUM.ORANGE]: styles.activity_title_four,
}

export const getClassNames_scan = {
    [COLOR_ENUM.BLUE]: styles.scan_code_one,
    [COLOR_ENUM.RED]: styles.scan_code_two,
    [COLOR_ENUM.PURPLE]: styles.scan_code_three,
    [COLOR_ENUM.ORANGE]: styles.scan_code_four,
}

export const scan_enroll_bgc = {
    [COLOR_ENUM.BLUE]: '#1678FF',
    [COLOR_ENUM.RED]: '#D23E31',
    [COLOR_ENUM.PURPLE]: '#45459F',
    [COLOR_ENUM.ORANGE]: '#F7821B',
}
export const getClassNames_topBox = {
    [COLOR_ENUM.BLUE]: styles.top_box_one,
    [COLOR_ENUM.RED]: styles.top_box_two,
    [COLOR_ENUM.PURPLE]: styles.top_box_three,
    [COLOR_ENUM.ORANGE]: styles.top_box_four,
}

export const getClassNames_phone = {
    [COLOR_ENUM.BLUE]: '#BAD5FF',
    [COLOR_ENUM.RED]: '#FFD1CC',
    [COLOR_ENUM.PURPLE]: '#CBCBFF',
    [COLOR_ENUM.ORANGE]: '#FFD2AB',
}

export const getClassNames_introduction = {
    [COLOR_ENUM.BLUE]: '#F1F6FE',
    [COLOR_ENUM.RED]: '#FFFFFF',
    [COLOR_ENUM.PURPLE]: '#FAFAFF',
    [COLOR_ENUM.ORANGE]: '#FFFDFC',
}
