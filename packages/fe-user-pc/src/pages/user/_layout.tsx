import type { IRoute } from 'umi'

const UserLayout = (props: IRoute) => {
    return <>{props.children}</>
}

UserLayout.wrappers = ['@/wrappers/user']

export default UserLayout
