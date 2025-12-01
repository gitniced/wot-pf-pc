import styles from './index.modules.less'
import { observer } from 'mobx-react'
import { Role } from './const'
import { useEffect, useState } from 'react'

import Login from './components/Login'
import Serve from './components/Serve'
import ExaminationPortal from './components/ExaminationPortal/inde'
import PortalApplication from './components/PortalApplication'
import Way from './components/Way'
import ExaminationManagement from './components/ExaminationManagement'
import Corporation from './components/Corporation'
import Header from './components/Header'
import Footer from './components/Footer'
import TextualCriticism from './components/TextualCriticism'
import RoleRequirements from './components/RoleRequirements'
import ByTelphote from './components/ByTelephone'

import 'animate.css/source/animate.css'

import { checkAnimatedElements, setAnimatedElements, throttle } from './tool'

const Index: React.FC = () => {
    const [role, setRole] = useState<Role>(Role.Origin) // 登录身份
    const [isModal, setIsModal] = useState<boolean>(false)
    useEffect(() => {
        document.title = '登录-沃土考试评价服务平台'
    }, [])

    useEffect(() => {
        setTimeout(() => {
            window.scroll({ top: 0 })
        })
        setAnimatedElements(document.querySelectorAll('.animated'))
        checkAnimatedElements()
        const func = throttle(checkAnimatedElements, 500)
        window.addEventListener('scroll', func)
        ;() => {
            window.removeEventListener('scroll', func)
        }
    }, [role])

    return (
        <div className={styles.login}>
            <Header />
            <Login role={role} setRole={setRole} />
            {role === Role.User ? (
                <>
                    <TextualCriticism />
                    <RoleRequirements />
                </>
            ) : (
                <>
                    <Serve />
                    <ExaminationPortal />
                    <PortalApplication setIsModal={setIsModal} />
                    <Way />
                    <ExaminationManagement setIsModal={setIsModal} />
                </>
            )}

            <Corporation />
            <Footer />
            <ByTelphote isModal={isModal} setIsModal={setIsModal} />
        </div>
    )
}

const observerIndex = observer(Index)

observerIndex.wrappers = ['@/wrappers/user']

export default observerIndex
