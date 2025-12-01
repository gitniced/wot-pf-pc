import { getCookie } from '@/storage'
import { history } from 'umi'

const headerHooks = () => {
    const backToHome = () => {
        if (getCookie('TOKEN') && history.location.pathname !== '/order') {
            history.push('/order')
        }
    }

    return {
        backToHome,
    }
}

export default headerHooks
