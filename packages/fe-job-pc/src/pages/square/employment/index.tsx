import type { IRoute } from 'umi'
import { history } from 'umi'
import styles from './index.module.less'
import SelectedJob from './components/SelectedJob'
import JobClass from './components/jobClass'
import Internship from './components/Internship'
import Recommend from './components/Recommend'
import Activity from './components/Activity'
import People from './components/People'
import { useEffect } from 'react'
import { setDocTitle } from '@/utils/setDocTitle'

const Index: React.FC = () => {
    useEffect(() => {
        setDocTitle('就业服务')
    })
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <JobClass onSearch={e => history.push(`/square/job-list?professionName=${e}`)} />
                <SelectedJob />
                <Internship />
                <Recommend />
                <Activity />
                <People />
            </div>
        </div>
    )
}

const Page: IRoute = Index
export default Page
