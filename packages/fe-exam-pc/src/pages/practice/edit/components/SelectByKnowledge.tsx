// 按知识点分类选择题目
/* eslint-disable */
import { Button, Modal, Space, Spin, Tree, Typography, message } from 'antd'
import { observer, useLocalObservable } from 'mobx-react'
import type { CustomDataNode, KnowledgeItem, SelectByKnowledgeModal } from './interface'
import React, { useEffect, useMemo, useState } from 'react'
import { getLocalStorage } from '@/storage'

import { useRequest } from 'ahooks'
import PracticeStore from '../../store'

import { getKnowledgeList } from '../api'
import styles from './index.module.less'
import type { SelectQuestionDto } from '../../interface'
import {
    BELONG_TYPE_ENUM,
    SKILL_TYPE_ENUM,
    SUBJECT_TYPE_ENUM,
} from '@/pages/question/[type]/constants'
import {
    generatorTreeData,
    getChildrenList,
    getExpendKeys,
    initTreeData,
    updateTotalCount,
    updateTreeData,
} from '../utils'
import { uniq } from 'lodash'
import useUserStore from '@/hooks/useUserStore'

const SelectByKnowledge: React.FC<SelectByKnowledgeModal> = ({
    open,
    onCancel,
    onOk,
    knowledgePointInfoList,
}) => {
    const userStore = useUserStore()

    const practiceStore = useLocalObservable(() => PracticeStore)
    const { practiceDetail } = practiceStore

    const [treeData, setTreeData] = useState<CustomDataNode[]>([])
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])

    const [selectedKnowledgeList, setSelectedKnowledgeList] = useState<CustomDataNode[]>([])
    const [totalQuestion, setTotalQuestion] = useState<number>(0)

    const query = {
        sid: getLocalStorage('SID'),
        belongType: BELONG_TYPE_ENUM.ORGANIZE,
        skill: SKILL_TYPE_ENUM.THEORY,
        subject: SUBJECT_TYPE_ENUM.SIMULATION,
        organizationCode: userStore?.selectedOrganization,
    }

    // 初始化加载数据
    const { loading, run: runList } = useRequest(getKnowledgeList, {
        ready: open,
        defaultParams: [query],
        onSuccess: (res: any) => {
            const newTreeData = generatorTreeData(res as unknown as KnowledgeItem[])
            setTreeData(newTreeData)
            setExpandedKeys(getExpendKeys(newTreeData, []))

            const newTotalCount = updateTotalCount(newTreeData, selectedKnowledgeList, [])
            setTotalQuestion(newTotalCount)
        },
    })

    useEffect(() => {
        setSelectedKnowledgeList(
            knowledgePointInfoList?.map(item => ({
                key: item.knowledgePointCode,
                title: item.knowledgePointName,
                levelCode: item.knowledgePointLevelCode,
            })) ?? [],
        )

        const newTreeData = initTreeData(treeData, knowledgePointInfoList!)
        setTreeData(newTreeData)
    }, [knowledgePointInfoList])

    useEffect(() => {
        if (knowledgePointInfoList?.length) {
            setTotalQuestion(practiceDetail.selectQuestionDto?.totalCount ?? 0)
        }
    }, [practiceDetail.selectQuestionDto?.totalCount])

    const checkedKeys = useMemo(() => {
        return selectedKnowledgeList?.map(item => item.key) ?? []
    }, [selectedKnowledgeList])

    // 选择节点
    const handleCheck = (_: any, info: any) => {
        const { checkedNodes = [] } = info
        setSelectedKnowledgeList(checkedNodes)
        // 更新选择的总题数
        setTotalQuestion(
            checkedNodes.reduce(
                (prev: number, cur: CustomDataNode) => prev + cur.totalQuestion!,
                0,
            ),
        )
    }

    const handleOk = () => {
        if (!selectedKnowledgeList.length) {
            return message.error('请选择分类')
        }

        const { selectQuestionDto } = practiceDetail

        const _selectQuestionDto: SelectQuestionDto = {
            ...selectQuestionDto,
            knowledgePointInfoList: selectedKnowledgeList.map(item => ({
                knowledgePointCode: item.key as string,
                knowledgePointLevelCode: item.levelCode,
                knowledgePointName: item.title,
            })),
        }

        practiceStore.updatePractice({
            selectQuestionDto: _selectQuestionDto,
        })

        // 根据自定义字段请求题目
        PracticeStore.getPracticeQuestion(userStore?.selectedOrganization).then(() => {
            message.success('操作成功')
            onOk(_selectQuestionDto)
        })
    }

    const handleCancel = () => {
        onCancel()
    }

    const handleSelectAll = (e: React.SyntheticEvent, node: CustomDataNode) => {
        e.stopPropagation()
        const allChildList = getChildrenList(node.children!, [])
        const allSelectKnowledge = uniq(
            [...selectedKnowledgeList, node, ...allChildList].filter(
                item => item.totalQuestion !== undefined,
            ),
        )

        // 需要去重，避免重复2次加入同一个分类
        setSelectedKnowledgeList(allSelectKnowledge)
        // 更新选择的总题数
        setTotalQuestion(
            allSelectKnowledge.reduce(
                (prev: number, cur: CustomDataNode) => prev + cur.totalQuestion!,
                0,
            ),
        )
        // 更新知识点渲染树（已经全选的显示取消全选）
        const newTreeData = updateTreeData(treeData, node, true)
        setTreeData(newTreeData)
    }

    // 渲染Title
    const titleRender = (node: CustomDataNode) => {
        return (
            <Space align="start">
                <Typography.Text>{node.title}</Typography.Text>
                {/* 不是叶子结点，有下级 */}
                {!node.isLeaf && (
                    <Typography.Link
                        className={styles.select_all}
                        onClick={e => handleSelectAll(e, node)}
                    >
                        全选下级
                    </Typography.Link>
                )}
            </Space>
        )
    }

    // 刷新
    const handleRefresh = () => {
        runList(query)
    }

    // 渲染底部
    const renderFooter = () => {
        return (
            <div className={styles.footer_wrapper}>
                {/* TODO 后面有需求再加上 */}
                {/* <Space size={12}>
                    <Typography>
                        <Typography.Text>当前已选：</Typography.Text>
                        <Typography.Link>{totalQuestion}</Typography.Link>
                        <Typography.Text>题</Typography.Text>
                    </Typography>

                    <SyncOutlined rev={undefined} onClick={() => handleRefresh()} />
                </Space> */}

                <Space size={8}>
                    <Button onClick={handleCancel}>取消</Button>
                    <Button type="primary" onClick={handleOk}>
                        确认
                    </Button>
                </Space>
            </div>
        )
    }

    return (
        <Modal
            centered
            width={480}
            title="按分类（知识点）选题"
            open={open}
            onCancel={handleCancel}
            onOk={handleOk}
            footer={renderFooter()}
            className={styles.select_by_knowledge_modal}
        >
            <Spin spinning={loading}>
                <Tree
                    multiple
                    checkable
                    blockNode
                    defaultExpandAll
                    checkStrictly
                    selectable={false}
                    expandedKeys={expandedKeys}
                    checkedKeys={checkedKeys}
                    autoExpandParent={true}
                    treeData={treeData}
                    titleRender={titleRender}
                    onCheck={handleCheck}
                />
            </Spin>
        </Modal>
    )
}

export default observer(SelectByKnowledge)
