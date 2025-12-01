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
