/**
 * 简单的HTML清理函数，移除潜在的危险标签和属性
 * 注意：这是一个基础的清理函数，对于更复杂的HTML内容，建议使用专业的库如DOMPurify
 */
export const sanitizeHTML = (html: string): string => {
    // 基本的清理：移除script、style等危险标签
    const cleanHTML = html
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/<style[^>]*>.*?<\/style>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/^[\s\n\r]+|[\s\n\r]+$/g, '') // 去掉前后的换行和空格

    if (cleanHTML === '<p><br></p>') {
        return ''
    }

    if (cleanHTML === '<br>') {
        return ''
    }

    return cleanHTML
}

/**
 * 纯文本模式处理函数，去除所有HTML标签，只保留纯文本
 */
export const stripHTMLTags = (html: string): string => {
    // 创建临时DOM元素来解析HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html

    // 获取纯文本内容
    const plainText = tempDiv.textContent || tempDiv.innerText || ''

    // 清理多余的空白字符
    return plainText.replace(/\s+/g, ' ').trim()
}
