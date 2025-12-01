import { getCookie } from '@/storage'
import { history } from 'umi'

const headerHooks = () => {
    const backToHome = () => {
        if (getCookie('TOKEN') && history.location.pathname !== '/account') {
            history.push('/account')
        }
    }

    return {
        backToHome,
    }
}

export default headerHooks
