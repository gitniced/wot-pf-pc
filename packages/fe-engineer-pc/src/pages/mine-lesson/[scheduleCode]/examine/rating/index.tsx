import type { PageProps } from '@/types'
import { useSaasTitle } from '@wotu/wotu-components'
import Empty from '@/components/Empty'

const Index: React.FC<PageProps> = () => {
    useSaasTitle('考核-考核评分')

    return <Empty type={'component'} />
}

export default Index
