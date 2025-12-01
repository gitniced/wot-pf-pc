import React, { useRef, useState } from 'react'
import { Modal, Button } from 'antd'
import { useSaasTitle } from '@wotu/wotu-components'
import BusinessTable from '@/components/BusinessTable'
import CustomTitle from '@/components/CustomTitle'
import styles from './index.module.less'
import type { IResource, IResourcePageQuery } from './types'
import { getResourceList } from './service'
import { getResourceTableColumns } from './column'

const Index: React.FC = () => {
    useSaasTitle('资源库')
    const actionRef = useRef({
        reload: () => {},
    })

    const [detailModalVisible, setDetailModalVisible] = useState(false)
    const [selectedResource, setSelectedResource] = useState<IResource | null>(null)
    const [detailLoading] = useState(false)

    const handleGetResourceList = async (params: IResourcePageQuery) => {
        try {
            const res = await getResourceList(params)

            return {
                data: res.data || [],
                totalCount: res.totalCount || 0,
                success: true,
            }
        } catch (error) {
            return {
                data: [],
                totalCount: 0,
                success: false,
            }
        }
    }

    // 关闭详情弹窗
    const handleCloseDetail = () => {
        setDetailModalVisible(false)
        setSelectedResource(null)
    }

    // 表格列定义
    const columns = getResourceTableColumns()

    return (
        <div className={styles.page}>
            <CustomTitle title="资源库" marginBottom={32} />

            <div className={styles.content}>
                <BusinessTable
                    actionRef={actionRef}
                    search={{}}
                    scroll={{ x: 1200 }}
                    desensitizationList={[
                        { key: 'createdBy', type: '1', sign: true }, // 创建者脱敏
                        { key: 'updatedBy', type: '1', sign: true }, // 更新者脱敏
                    ]}
                    columns={columns}
                    request={handleGetResourceList as any}
                    rowKey="code"
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: (total: number) => `共 ${total} 个资源`,
                    }}
                />

                {/* 资源详情弹窗 */}
                <Modal
                    title="资源详情"
                    open={detailModalVisible}
                    onCancel={handleCloseDetail}
                    footer={[
                        <Button key="close" onClick={handleCloseDetail}>
                            关闭
                        </Button>,
                    ]}
                    width={600}
                    destroyOnClose
                >
                    {detailLoading ? (
                        <div style={{ textAlign: 'center', padding: '40px' }}>加载中...</div>
                    ) : selectedResource ? (
                        <div style={{ marginTop: 24 }}>
                            <div style={{ marginBottom: 16 }}>
                                <strong>资源名称：</strong>
                                {selectedResource.name}
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <strong>格式：</strong>
                                {selectedResource.format}
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <strong>类型：</strong>
                                {selectedResource.type}
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <strong>专业：</strong>
                                {selectedResource.majorName || '-'}
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <strong>关联课程数量：</strong>
                                {selectedResource.courseCount || 0}
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <strong>创建时间：</strong>
                                {selectedResource.createdAt
                                    ? new Date(selectedResource.createdAt).toLocaleString()
                                    : '-'}
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <strong>创建者：</strong>
                                {selectedResource.createdBy || '-'}
                            </div>
                            {selectedResource.updatedAt && (
                                <>
                                    <div style={{ marginBottom: 16 }}>
                                        <strong>更新时间：</strong>
                                        {new Date(selectedResource.updatedAt).toLocaleString()}
                                    </div>
                                    <div style={{ marginBottom: 16 }}>
                                        <strong>更新者：</strong>
                                        {selectedResource.updatedBy || '-'}
                                    </div>
                                </>
                            )}
                        </div>
                    ) : null}
                </Modal>
            </div>
        </div>
    )
}

export default React.memo(Index)
