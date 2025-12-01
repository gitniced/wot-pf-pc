import type { IRoute } from 'umi'
import { history } from 'umi'
import styles from './index.module.less'
import Search from './components/Search'
import QuickEntry from './components/QuickEntry'
import SelectedJob from './components/SelectedJob'
import HotJob from './components/HotJob'
import HotCompany from './components/HotCompany'
import JobClass from './components/jobClass'

const Index: React.FC = () => {
    return (
        <div className={styles.page}>
            <Search onSearch={e => history.push(`/square/job-list?professionName=${e}`)} />
            <div className={styles.container}>
                {/* @ts-ignore */}
                <QuickEntry />
                <JobClass />
                <SelectedJob />
                <HotJob />
                <HotCompany />
            </div>
        </div>
    )
}

const Page: IRoute = Index
Page.title = '职位广场-四川就业平台'
export default Page
