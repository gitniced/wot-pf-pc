import getMasterProps from '@/stores/masterStore'

const useMasterHistory = () => {
    const { masterHistory } = getMasterProps()

    return masterHistory
}

export default useMasterHistory
