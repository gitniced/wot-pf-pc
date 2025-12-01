/* eslint-disable @typescript-eslint/no-unused-vars */

const dealFontSize = () => {
    let size1, size2, size3
    const width = window.innerWidth
    // if (width > 1600) {
    //     size1 = '0.1rem'
    //     size2 = '0.13rem'
    //     size3 = '0.15rem'
    // } else {
    //     size1 = '16px'
    //     size2 = '20px'
    //     size3 = '24px'
    // }
    size1 = '16px'
    size2 = '20px'
    size3 = '24px'
    document.documentElement.style.setProperty(`--size-1`, size1)
    document.documentElement.style.setProperty(`--size-2`, size2)
    document.documentElement.style.setProperty(`--size-3`, size3)
}

/**
 * 根据屏幕宽度设置fontsize变量
 * */
const initFontSize = (): void => {
    dealFontSize()
    window.addEventListener('resize', dealFontSize)
}

export default initFontSize
