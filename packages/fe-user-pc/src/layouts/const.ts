

export enum THEME_ENUM {
    GRAY = 1,
    BLUE = 2,
    RED = 3,
    OTHER = 4,
}

export const THEME_IMG_MAP = {
    [THEME_ENUM.GRAY]: {
        bg: 'https://static.zpimg.cn/public/fe_user_pc/theme/prev_gray_bg.png',
        img: '',
    },
    [THEME_ENUM.BLUE]: {
        bg: 'https://static.zpimg.cn/public/fe_user_pc/theme/theme_blue_bg.png',
        img: 'https://static.zpimg.cn/public/fe_user_pc/theme/theme_blue_img.png',
    },
    [THEME_ENUM.RED]: {
        bg: 'https://static.zpimg.cn/public/fe_user_pc/theme/theme_red_bg.png',
        img: 'https://static.zpimg.cn/public/fe_user_pc/theme/theme_red_img.png',
    },
}
export const THEME_MAP = {
    [THEME_ENUM.GRAY]: {
        bg: 'https://static.zpimg.cn/public/fe_user_pc/theme/prev_gray_bg.png',
        center: true,
    },
    [THEME_ENUM.BLUE]: {
        bg: 'https://static.zpimg.cn/public/fe_user_pc/theme/prev_blue_bg.png',
        center: false,
    },
    [THEME_ENUM.RED]: {
        bg: 'https://static.zpimg.cn/public/fe_user_pc/theme/prev_red_bg.png',
        center: false,
    },
}
