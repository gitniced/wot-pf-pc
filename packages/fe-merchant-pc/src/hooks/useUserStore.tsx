// 获取机构code
import getMasterProps from '@/stores/masterStore'

const useUserStore = () => {
    const { masterStore } = getMasterProps()

    const { userStore } = masterStore

    return userStore
}

export default useUserStore
