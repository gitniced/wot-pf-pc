import type { TakePhoto, DataURLtoBlob } from "./interface";

/** 生成canvas图片 */
export const takePhoto: TakePhoto = () => {
    const video = document.getElementById('video') as HTMLVideoElement | undefined
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | undefined
    const hideCanvas = document.getElementById('hideCanvas') as HTMLCanvasElement | undefined
    const { width = 0, height = 0 } = video?.getBoundingClientRect() ?? {}
    if (canvas && video && hideCanvas) {

        canvas.width = width
        canvas.height = height
        canvas.style.width = canvas.width + 'px'
        canvas.style.height = canvas.height + 'px'

        hideCanvas.width = 720
        hideCanvas.height = 720
        hideCanvas.style.width = 720 + 'px'
        hideCanvas.style.height = 720 + 'px'

        let context = canvas.getContext('2d')
        let hideContext = hideCanvas.getContext('2d')

        //将video对象内指定的区域捕捉绘制到画布上指定的区域，可进行不等大不等位的绘制
        context?.drawImage(video, 0, 0, width, height)
        const hideX = (width - 720) / 2
        const hideY = (height - 720) / 2
        const imageData = context?.getImageData(hideX, hideY, 720, 720)
        imageData && hideContext?.putImageData(imageData, 0, 0)

        const imgStr = canvas.toDataURL('image/jpeg', 0.5)
        const hideImgStr = hideCanvas.toDataURL('image/jpeg', 0.5)

        return {
            imgStr,
            hideImgStr
        }
    } else {
        return {}
    }
}

/**
 * base64转file
 * @param dataUrl base64地址
 * @param name 名字
 * @returns file
 */
export const dataURLtoBlob: DataURLtoBlob = (dataUrl, name) => {
    // 将base64按照 , 进行分割 将前缀  与后续内容分隔开
    let data = dataUrl.split(',');
    // 利用正则表达式 从前缀中获取图片的类型信息（image/png、image/jpeg、image/webp等）
    let type = data[0].match(/:(.*?);/)[1];
    // 从图片的类型信息中 获取具体的文件格式后缀（png、jpeg、webp）
    let suffix = type.split('/')[1];
    // 使用atob()对base64数据进行解码  结果是一个文件数据流 以字符串的格式输出
    const bstr = window.atob(data[1]);
    // 获取解码结果字符串的长度
    let n = bstr.length
    // 根据解码结果字符串的长度创建一个等长的整形数字数组
    // 但在创建时 所有元素初始值都为 0
    const u8arr = new Uint8Array(n)
    // 将整形数组的每个元素填充为解码结果字符串对应位置字符的UTF-16 编码单元
    while (n--) {
        // charCodeAt()：获取给定索引处字符对应的 UTF-16 代码单元
        u8arr[n] = bstr.charCodeAt(n)
    }
    // 利用构造函数创建File文件对象
    // new File(bits, name, options)
    const file = new File([u8arr], `${name}.${suffix}`, {
        type: type
    })
    // 将File文件对象返回给方法的调用者
    return file;
}