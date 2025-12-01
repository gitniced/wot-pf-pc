function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()

    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 200
    )
}

let animatedElements = document.querySelectorAll('.animated')

export function setAnimatedElements(nodeList) {
    animatedElements = nodeList
    animatedElements.forEach(item => {
        item.style.visibility = 'hidden'
    })
}

export function checkAnimatedElements() {
    for (let i = 0; i < animatedElements.length; i++) {
        const element = animatedElements[i]
        if (isElementInViewport(element)) {
            element.style.visibility = 'inherit'
            element.classList.add('fadeIn')

            if (element.className.includes('left')) {
                element.classList.add('fadeInLeft')
            } else if (element.className.includes('right')) {
                element.classList.add('fadeInRight')
            } else if (element.className.includes('down')) {
                element.classList.add('fadeInDown')
            } else {
                element.classList.add('fadeInUp')
            }
        }
    }
}

/**
 * 节流： 不管事件触发频率有多高，只在单位时间内执行一次,第一次事件和最后一次事件都触发
 * @param {function} fn  被调用的函数
 * @param {number} [wait = 300] 定时器时间
 * @return {function}
 * @example js使用方法
 * window.addEventListener('resize', throttle(function() {}, 200));
 * @example vue使用方法 method是v-on绑定的方法
 * methods: { method: throttle(function() {}, 200)}
 */
export function throttle(fn: () => void, wait: number = 300): () => void {
    let timer: undefined | number = undefined // 定时器标记

    // 记录上一次执行的时间戳
    let previous = 0

    return (...arg) => {
        // 当前的时间戳，然后减去之前的时间戳，大于设置的时间间隔
        if (Date.now() - previous > wait) {
            clearTimeout(timer)
            timer = undefined

            // 更新上一次的时间戳为当前时间戳
            previous = Date.now()

            // eslint-disable-next-line @typescript-eslint/no-invalid-this
            fn.apply(this, arg)
        } else if (!timer) {
            // 设置下一个定时器
            timer = setTimeout(() => {
                timer = undefined
                // eslint-disable-next-line @typescript-eslint/no-invalid-this
                fn.apply(this, arg)
            }, wait)
        }
    }
}
