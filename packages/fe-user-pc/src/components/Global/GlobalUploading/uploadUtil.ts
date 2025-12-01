import { message } from 'antd'

export const accetpMap: Record<string, string> = {
    zip: 'application/zip,application/x-zip,application/x-zip-compressed',
    pdf: 'application/pdf',
    excel: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    image: 'image/jpeg,image/bmp,image/png,image/gif,image/svg',
    word: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    csv: '.csv',
    normal: 'image/jpeg,image/png',
    normalAndSvg: 'image/jpeg,image/png,image/svg+xml',
}

const getAccepts = (acpt: any) =>
    acpt && (Array.isArray(acpt) ? acpt : [acpt]).map(item => accetpMap[item]).join(',')

// 数量限制
const checkLimit = (fileList: string | any[], amount?: number, length?: number) => {
    return new Promise((resolve, reject) => {
        const isLen = (length ?? 0) + fileList.length
        amount && isLen > amount ? reject(Error('')) : resolve(undefined)
    }).then(
        () => {
            return true
        },
        () => {
            message.error(`超过最大上传数量${amount}个，请重新选择！`)
            return Promise.reject(Error('超过最大上传数量'))
        },
    )
}

// 大小限制
const checkSize = (file: { size: number }, size?: number) => {
    return new Promise((resolve, reject) => {
        size && file.size > Math.pow(1024, 2) * size ? reject(Error('')) : resolve(undefined)
    }).then(
        () => {
            return true
        },
        () => {
            message.error(`超过大小限制${size}M，请重新选择！`)
            return Promise.reject(Error('超过大小限制'))
        },
    )
}

// 格式限制
const checkAccpt = (file: { type: string }, accept?: string | string[]) => {
    return new Promise((resolve, reject) => {
        if (accept && file?.type && getAccepts(accept).indexOf(file?.type) === -1) {
            message.error(`文件格式不正确，请重新选择！`)
            reject(Error('文件格式不正确，请重新选择！'))
        } else {
            resolve(undefined)
        }
    }).then(
        () => {
            return true
        },
        () => {
            message.error(`文件格式不正确，请重新选择！`)
            return Promise.reject(Error('文件格式不正确，请重新选择！'))
        },
    )
}

const getPromise = filds => {
    if (typeof filds === 'function') {
        return filds
    }
    return () => Promise.resolve()
}

export { checkAccpt, checkSize, checkLimit, getAccepts, getPromise }
