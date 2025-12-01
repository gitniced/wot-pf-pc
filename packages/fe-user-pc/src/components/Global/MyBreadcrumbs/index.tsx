import { NavLink } from 'umi'
import withBreadcrumbs from 'react-router-breadcrumbs-hoc'
import styles from './index.module.less'

const routes = (window && window.appRouter) || []

export default withBreadcrumbs(routes)(({ breadcrumbs }) => {
    breadcrumbs.shift()
    return (
        <div className={styles.content}>
            {breadcrumbs.map((item, index) => {
                const { breadcrumb } = item
                return (
                    <span key={breadcrumb.key}>
                        <NavLink
                            style={{ color: index < breadcrumbs.length - 1 ? '#7b7b7b' : '#333' }}
                            to={breadcrumb.key}
                        >
                            {breadcrumb}
                        </NavLink>
                        {index < breadcrumbs.length - 1 && (
                            <svg className={[styles.icon, 'icon'].join(' ')} aria-hidden="true">
                                <use xlinkHref={`#icon_shouqi`} />
                            </svg>
                        )}
                    </span>
                )
            })}
        </div>
    )
})
