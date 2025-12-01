export enum headingTypeEnum {
    ENTERPRISE = 1,
    PERSONAL = 2,
}

export const HEADING_TYPE: Record<number, string> = {
    [headingTypeEnum.ENTERPRISE]: '企业',
    [headingTypeEnum.PERSONAL]: '个人',
}

//抬头管理类型的按钮
export const headingType = [
    { name: 1, value: '企业' },
    { name: 2, value: '个人' },
]
