// 就业：院校 企业专题登录页
import React from 'react'
import { CURRENT_LOGIN_URL_TYPE_ENUM } from '@/types'
import { history } from 'umi'
import { getCurrentTypeUrl } from './const'
import JobLogin from '@/components/JobLogin'

const Login = () => {
    let currentSourceType = getCurrentTypeUrl() || ''

    switch (currentSourceType) {
        // 院校登录
        case CURRENT_LOGIN_URL_TYPE_ENUM.SCHOOL:
            return <JobLogin sourceType={currentSourceType} />
        // 非法的专题页登录，前往普通登录页
        default:
            history.replace('/user/login')
            break
    }
}

export default Login
