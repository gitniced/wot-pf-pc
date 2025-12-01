const customOpen = (url: string, target: '_blank' | '_self' | '_parent' | '_top' = '_self') => {
    const prefixStr = '/engineer-center'
    let finalUrl = url
    if (!/^http/.test(url) && !/^https/.test(url)) {
        finalUrl = prefixStr + url
    }
    console.log('finalUrl', finalUrl, target)
    window.open(finalUrl, target)
}

export default customOpen
