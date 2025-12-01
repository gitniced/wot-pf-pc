export const calcHrefUrl = (url: string) => {
    const prefixStr = '/engineer-center'
    let finalUrl = url
    if (!/^http/.test(url) && !/^https/.test(url)) {
        finalUrl = prefixStr + url
    }
    return finalUrl
}
