import Breadcrumbs from '@/components/Breadcrumbs'
import styles from './index.module.less'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Space } from 'antd'

import Hooks from './hooks'
import { history } from 'umi'
import AddModal from './AddModal'
import BatchImport from '@/components/BatchImport'
import Template from './Template'
import EditModal from './EditModal'
import TipsModal from './TipsModal'
import type { RouteQuery } from './interface'
import BasicInfo from './BasicInfo'
import Statistics from './Statistics'
import EditNameModal from './EditNameModal'
import { useContext } from 'react'
import { ElementTmpWrapperContext } from './context'
import useCommonParams from '@/hooks/useCommonParams'
import { DownOutlined } from '@ant-design/icons'
import { getLocalStorage } from '@/storage'

const ElementTmp = () => {
    const { recordId, jobLevelCode } = history.location.query as unknown as RouteQuery
    const hooks = Hooks(recordId)
    const {
        importData,
        add,
        addVisible,
        addHandleCancel,
        editVisible,
        setEditVisible,
        tipsVisible,
        setTipsVisible,
        tipsData,
        setTipsData,
        type,
        setType,
        tipsHandleCancel,
        radioValue,
        onRadioChange,
        editHandleCancel,
        getDetail,
        detail,
        dataSource,
        setAddVisible,
        editNameVisible,
        setEditNameVisible,
        statisticsVisible,
        setStatisticsVisible,
        templateType,
        setTemplateType,
        visibleImportModal,
        setVisibleImportModal,
    } = hooks || {}

    const { isDetail } = useContext(ElementTmpWrapperContext)

    const commonParams = useCommonParams()

    // 批量导入下拉菜单（上海站点定制）
    const items: MenuProps['items'] = [
        {
            label: '系统标准模板（Excel）',
            key: 'default',
            onClick: () => {
                setVisibleImportModal(!visibleImportModal)
                setTemplateType('default')
            },
        },
        {
            label: '鉴定中心指定模板（Excel）',
            key: 'authenticates',
            onClick: () => {
                setVisibleImportModal(!visibleImportModal)
                setTemplateType('authenticates')
            },
        },
    ]

    return (
        <div className={styles.element_surface_edit}>
            <div className={styles.content}>
                <Breadcrumbs
                    crumbData={[
                        {
                            link:
                                getLocalStorage('SID').toString() === '1'
                                    ? '/exam-seller/element-manage/theory'
                                    : `./list?jobName=${detail?.jobName}&jobType=${detail?.workName}&jobLevel=${detail?.levelName}&jobLevelCode=${jobLevelCode}`,
                            name: '理论知识要素细目表',
                            type: getLocalStorage('SID').toString() === '1' ? 'son' : 'father',
                        },
                        {
                            name: isDetail ? '查看' : '编辑',
                        },
                    ]}
                />

                {/* 基础信息 */}
                <BasicInfo
                    setEditNameVisible={setEditNameVisible}
                    editNameVisible={editNameVisible}
                    isDetail={isDetail}
                    detail={detail}
                />

                {/* 统计信息 */}
                <Statistics
                    setStatisticsVisible={setStatisticsVisible}
                    statisticsVisible={statisticsVisible}
                    detail={detail}
                />

                {!isDetail && (
                    <Space className={styles.button_box}>
                        <Dropdown menu={{ items }}>
                            <Button type="primary">
                                <Space size={0}>
                                    模板导入 <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                        <Button type="primary" onClick={add}>
                            新增
                        </Button>
                    </Space>
                )}

                {/* 鉴定点模板 */}
                <Template
                    setTipsVisible={setTipsVisible}
                    setEditVisible={setEditVisible}
                    setTipsData={setTipsData}
                    setType={setType}
                    dataSource={dataSource}
                    isDetail={isDetail}
                />
                {visibleImportModal && (
                    <BatchImport {...importData} {...commonParams} open={visibleImportModal} />
                )}

                {addVisible && (
                    <AddModal
                        visible={addVisible}
                        setAddVisible={setAddVisible}
                        handleCancel={addHandleCancel}
                        treeData={detail}
                        recordId={recordId}
                        getDetail={getDetail}
                    />
                )}
                {editVisible && (
                    <EditModal
                        visible={editVisible}
                        handleCancel={editHandleCancel}
                        editData={tipsData.find(ele => {
                            return ele.code === radioValue
                        })}
                        getDetail={getDetail}
                    />
                )}
                {tipsVisible && (
                    <TipsModal
                        visible={tipsVisible}
                        tipsData={tipsData}
                        type={type}
                        getDetail={getDetail}
                        handleCancel={tipsHandleCancel}
                        radioValue={radioValue}
                        setTipsVisible={setTipsVisible}
                        setEditVisible={setEditVisible}
                        recordId={recordId}
                        onRadioChange={onRadioChange}
                    />
                )}
                {/* 修改要素细目表名称 */}
                <EditNameModal
                    open={editNameVisible}
                    onCancel={() => setEditNameVisible(false)}
                    onOk={() => {
                        getDetail()
                        setEditNameVisible(false)
                    }}
                    name={detail?.name}
                    detail={detail}
                />
            </div>
        </div>
    )
}

export default ElementTmp
