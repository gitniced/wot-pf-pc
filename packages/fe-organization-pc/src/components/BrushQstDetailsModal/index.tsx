import { Button, Modal } from 'antd'
import BrushQstDetails from './BrushQstDetails'
import type SiteStore from '@/stores/siteStore'
import { findSiteData } from '@wotu/wotu-components'

interface IBrushQstDetailsModalProps {
    visible: boolean
    onCancel: () => void
    /**  练习code  */
    practiceCode: string
    siteStore: SiteStore
}

/**   刷题详情modal  */
const BrushQstDetailsModal: React.FC<IBrushQstDetailsModalProps> = ({
    visible,
    onCancel,
    practiceCode,
    siteStore,
}) => {
    const { siteData = {} } = siteStore || {}
    const midMobileDomain = findSiteData(siteData, 'midMobileDomain', { findKey: 'baseInfo' }) || ''

    return (
        <Modal
            width={650}
            title="请至移动端进行练习"
            open={visible}
            onCancel={onCancel}
            footer={
                <Button type="primary" onClick={onCancel}>
                    关闭
                </Button>
            }
        >
            <BrushQstDetails practiceCode={practiceCode} midMobileDomain={midMobileDomain} />
        </Modal>
    )
}

export default BrushQstDetailsModal
