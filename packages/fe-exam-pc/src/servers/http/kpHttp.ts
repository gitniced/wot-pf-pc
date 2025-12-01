import { getCookie } from "@wotu/wotu-components"

const kingUrl: Record<string, string> = {
    local: 'https://eapif.wozp.cn',
    dev: 'https://eapif.wozp.cn',
    test: 'https://eapif.wozp.cn',
    pre: 'https://reapif.wozp.cn',
    pro: 'https://eapif.wozhipei.com',
}

export const kpHttp = async (url: any, method: string, params: any) => {
    try {
        const origin = kingUrl[BUILD_ENV]
        
        if (!origin) {
            throw new Error(`未找到环境 ${BUILD_ENV} 对应的API地址`)
        }

        let requestUrl = `${origin}${url}`
        let requestOptions: RequestInit = {
            method,
            headers: {
                'x-organization-code': getCookie('SELECT_ORG_CODE'),
                'Authorization': getCookie('TOKEN') ? `Bearer ${getCookie('TOKEN')}` : '',
                // 'authorization-platform': getCookie('TOKEN')
            }
        }

        if (method.toLowerCase() === 'get') {
            // GET请求将参数添加到URL查询字符串
            if (params && Object.keys(params).length > 0) {
                const searchParams = new URLSearchParams()
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        searchParams.append(key, String(value))
                    }
                })
                requestUrl += `?${searchParams.toString()}`
            }
        } else {
            // 非GET请求将参数放在请求体中
            if (params) {
                requestOptions.body = JSON.stringify(params)
                requestOptions.headers = {
                    ...requestOptions.headers,
                    'Content-Type': 'application/json'
                }
            }
        }

        const response = await fetch(requestUrl, requestOptions)

        if (!response.ok) {
            throw new Error(`HTTP错误: ${response.status} ${response.statusText}`)
        }
        
        const result = await response.json()
        
        if (!result) {
            throw new Error('响应数据为空')
        }

        return result
    } catch (error) {
        console.error('kpHttp请求失败:', error)
        throw error
    }
}
