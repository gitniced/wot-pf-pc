// 普通项目域名匹配
const PROJECT_MAP = {
    'fe-user-pc': 'pcDomain',
    'fe-business-pc': 'orgDomain',
    'fe-organization-pc': 'burl',
    'fe-user-h5': 'wapLoginUrl',
    'fe-cloud-h5': 'midMobileDomain',
    'fe-business-h5': 'portalH5Url',
}

// 资源方项目域名匹配
const SPECIAL_PROJECT_MAP = {
    'fe-user-pc': 'merchantUserDomain',
    'fe-business-pc': 'merchantDomain',
}
// 当前的基座标志
let currentTag: string = ''

const isMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    // 对于iPhone和iPad的浏览器，用户代理字符串包含 "Mobile" 或 "Safari"，所以我们需要首先排除这些情况
    if (/mobile|tablet|ip(hone|od)|android/i.test(userAgent)) {
        return true
    }
    // 对于非移动设备的浏览器，返回false
    return false
}

const getCurrentDomain = (domainJson: any, packageName: string) => {
    if (window.location.hostname === 'localhost') {
        currentTag = sessionStorage.getItem('tag') || ''
        const isPc = !isMobile()
        const SPECIAL_USER = Number(domainJson.SPECIAL_USER || 0)
        // 特殊身份时特殊返回(资源方)
        if (SPECIAL_USER === 1) {
            switch (currentTag) {
                case 'workbench':
                    if (isPc) {
                        return domainJson.merchantDomain
                    } else {
                        return domainJson.merchantDomain
                    }
                default:
                    if (domainJson[SPECIAL_PROJECT_MAP[packageName]] !== '') {
                        return domainJson[SPECIAL_PROJECT_MAP[packageName]]
                    } else {
                        return domainJson.merchantUserDomain
                    }
            }
        } else {
            /**
             * 普通域名匹配规则
             * 1、当存在于门户中时，返回门户域名
             * 2、非门户时，根据项目名返回对应域名
             * */
            switch (currentTag) {
                case 'portal':
                    if (isPc) {
                        return domainJson.burl
                    } else {
                        return domainJson.portalH5Url
                    }
                default:
                    if (domainJson[PROJECT_MAP[packageName]] !== '') {
                        return domainJson[PROJECT_MAP[packageName]]
                    } else {
                        return domainJson.loginUrl
                    }
            }
        }
    } else {
        return window.location.origin
    }
}

export default getCurrentDomain
