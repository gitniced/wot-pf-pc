import { getCookie } from '@/storage'
import { history } from 'umi'

const headerHooks = () => {
    const backToHome = (title: string) => {
        if (getCookie('TOKEN') && history.location.pathname !== '/account') {
            const maping: Record<string, string> = {
                transaction: '/order',
            }
            history.push(maping[title] || '/account')
        }
    }

    return {
        backToHome,
    }
}

export default headerHooks
