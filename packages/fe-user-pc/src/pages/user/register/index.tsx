import React from 'react'
import { observer } from 'mobx-react'
import { useLocation } from 'umi'
import OrgJoinRegister from '../components/OrgJoinRegister'
import GeneralRegister from '../components/GeneralRegister'
import type { RegisterQueryType } from '../components/GeneralRegister/interface'

const Register = () => {


    const { query }: { query: RegisterQueryType } = useLocation() || {}

    const { sourceType } = query || {}

    return (<>
        {
            // 没有来源身份，使用通用注册，有来源身份，使用入驻机构注册
            sourceType ? <OrgJoinRegister /> : <GeneralRegister />
        }
    </>)


}

export default observer(Register)
