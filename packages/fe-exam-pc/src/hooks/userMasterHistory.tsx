import getMasterProps from '@/stores/masterStore'
import { history } from 'umi'

const useMasterHistory = () => {
    const { masterHistory } = getMasterProps()

    return masterHistory
}

export default useMasterHistory
