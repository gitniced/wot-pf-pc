import { filterNum } from '@/utils/numberTransform'
import { subtractingTwoNumbers } from '@/utils/sumTwoNumbers'

/**
 * 根据订单状态计算可开票金额
 * @param status 订单状态
 * @param payAmount 订单金额
 * @param paidAmount 已付金额
 * @returns 可开票金额
 */
export const calculateInvoiceAmount = (
    status: number,
    payAmount: number = 0,
    paidAmount: number = 0,
): number => {
    let amount = 0

    // 确保数据类型转换为数字
    const numPayAmount = Number(payAmount) || 0
    const numPaidAmount = Number(paidAmount) || 0

    // 根据订单状态计算可开票金额
    if (status === 3 || status === 4) {
        // paid, completed - 取已付金额
        amount = numPaidAmount
    } else if (status === 1 || status === 2) {
        // unpaid, payConfirm - 取订单金额
        amount = numPayAmount
    } else if (status === 6) {
        // partialPayment - 取订单金额减去已付金额
        amount = Number(subtractingTwoNumbers(numPayAmount, numPaidAmount))
    }

    return Number(amount)
}

/**
 * 计算选中订单的总可开票金额
 * @param selectedRows 选中的订单列表
 * @returns 总可开票金额
 */
export const calculateTotalInvoiceAmount = (selectedRows: any[] = []): string => {
    const totalAmount = selectedRows.reduce((total, order) => {
        const amount = calculateInvoiceAmount(order?.status, order?.payAmount, order?.paidAmount)
        return Number(total) + Number(amount)
    }, 0)

    return filterNum(totalAmount)
}

const getRowSelections = (store: any) => {
    return {
        selectedRowKeys: store.selectedRows.map((item: any) => item.code),
        checkStrictly: false,
        onSelect: (record: any, selected: boolean) => {
            if (selected) {
                store.addSelectRow(record)
            } else {
                store.delSelectRow(record.code!)
            }
        },
        onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
            if (selected) {
                store.addSelectRow(changeRows)
            } else {
                changeRows.forEach((item: any) => {
                    store.delSelectRow(item.code!)
                })
            }
        },
    }
}

export default getRowSelections
