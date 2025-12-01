import React from 'react'

// 我的服务
export const MyServiceContext = React.createContext<{
    isRecord?: boolean
}>({ isRecord: false })
