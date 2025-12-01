export interface dataType {
    address?: string
    bankAccount?: string
    openningBank?: string
    phone?: string
    taxNum?: string
    titleName?: string
    type?: number
    code?: string
    idCard?: string
    name?: string
}

export interface IProps {
    visible: boolean //显示隐藏
    radioVal: number //单选按钮的值
    onCancel: () => void //取消
    onSubmit: (data: dataType, callback: () => void) => void //确认按钮事件
    records: Partial<dataType> | undefined //获取编辑数据
}
