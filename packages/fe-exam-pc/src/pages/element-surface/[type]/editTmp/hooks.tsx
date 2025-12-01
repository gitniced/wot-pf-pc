import { useState, useEffect } from 'react'
import { IMPORT_TEMPLATE, TEMPLATE_DESCRIPTION, TEMPLATE_TITLE } from './constants'
import type { AuthenticateDetail } from './interface'
import { batchImportApi, getAuthenticasDetailApi } from './api'
import { getUUID } from '@/utils/tool'

export default (recordId: string) => {
    // const [visible, setVisible] = useState<boolean>(false)
    const [addVisible, setAddVisible] = useState<boolean>(false) //新增
    const [editVisible, setEditVisible] = useState<boolean>(false) //编辑
    const [tipsVisible, setTipsVisible] = useState<boolean>(false) //tip
    const [editNameVisible, setEditNameVisible] = useState<boolean>(false) // 要素细目表名称
    const [statisticsVisible, setStatisticsVisible] = useState<boolean>(false) // 考评点指南
    const [tipsData, setTipsData] = useState<any[]>([])
    const [detail, setDetail] = useState<AuthenticateDetail>()
    const [dataSource, setDataSource] = useState<any[]>([])
    const [type, setType] = useState<string>('')
    const [radioValue, setRadioValue] = useState<string | undefined>()
    const [uploadType] = useState<string>('upload')

    // 模板导入类型，默认系统标准啊
    const [templateType, setTemplateType] = useState<string>('default')
    const [visibleImportModal, setVisibleImportModal] = useState<boolean>(false)

    /**
     * 根据一，二级是否有考评点，处理数据
     */
    const dealPoint = (data: { children?: any[]; point: any }[], curIdx: number) => {
        let newData: any = [...(data || [])]?.map((item: any) => {
            item.children = dealPoint(item.children, curIdx + 1) || []
            if (item?.point.length || item.info?.length) {
                let children = item.children
                // 当处于第4层即考评点时，需要将 point 赋值给 children
                if (3 - curIdx === 0) {
                    // 没有设置point的info
                    const fakerPoint = item.info.filter(({ name }: any) => {
                        return item.point.filter((p: any) => p.info === name)?.length === 0
                    }).map(({ name, code }: any) => ({ name: '-', code, info: name, noPoint: true })) || []
                    item.point = [...(item.point.splice(0)), ...fakerPoint]
                    item.children = item.point
                    // 根据 point 里的 info 是否相同，重新生成 info: [{name: 'xxx', point: [...]}, ...] 的数据格式
                    if (Array.isArray(item.point) && item.point.length > 0) {
                        // 按 info 分组，保持原始顺序
                        const infoMap: any = {}
                        const infoOrder: string[] = [] // 用于保持顺序的数组
                        item.point.forEach((pt: any, index: number) => {
                            const infoKey = pt.info || `blank_${index}`
                            if (!infoMap[infoKey]) {
                                infoMap[infoKey] = []
                                infoOrder.push(infoKey) // 记录首次出现的顺序
                            }
                            infoMap[infoKey].push(pt)
                        })
                        // 按照原始顺序生成 info 数组
                        item.info = infoOrder.map(infoKey => ({
                            name: infoKey,
                            children: infoMap[infoKey]
                        }))
                    } else {
                        item.info = []
                    }
                    return item
                }
                // 补充层级满足4层结构
                new Array(3 - curIdx).fill(1).forEach((_: any, i: number) => {
                    children.push({
                        name: '-',
                        important: '-',
                        rate: '-',
                        children: i === 2 - curIdx ? item.point : [],
                        info: [{ name: 'blank_' }]
                    })
                    children = children[children.length - 1].children
                })
                item.info = item.info?.length ? item.info : [{ name: 'blank_' }]
            } else {
                // 如果没有point，补充层级满足4层结构
                let children = item.children
                // 计算还差几层
                new Array(4 - curIdx).fill(1).forEach(() => {
                    if (!children.length) {
                        children.push({
                            name: '-',
                            important: '-',
                            rate: '-',
                            codeMark: '-',
                            children: [],
                            info: [{ name: 'blank_' }]
                        })
                    }
                    children = children[children.length - 1].children
                })
                item.info = item.info?.length ? item.info : [{ name: 'blank_' }]
            }
            return item
        })
        return newData
    }

    const getDetail = () => {
        // @ts-ignore
        getAuthenticasDetailApi(recordId).then((res: AuthenticateDetail) => {
            const newData = (res.range && JSON.parse(JSON.stringify(res.range))) || []
            const temp = dealPoint(newData, 1)
            setDataSource(temp)
            setDetail(res)
        })
    }

    useEffect(() => {
        if (recordId) {
            getDetail()
        }
    }, [])

    const importData = {
        templateType,
        title: TEMPLATE_TITLE[templateType], // 标题
        authenticateCode: recordId,
        description: TEMPLATE_DESCRIPTION[templateType],
        importApi: batchImportApi, //开始导入
        importTemplate: `${IMPORT_TEMPLATE[templateType]}?v=${getUUID()}`, //下载模板
        onCancel: () => {
            setVisibleImportModal(!visibleImportModal)
        }, //关闭弹窗
        onOk: () => {
            getDetail()
        },
    }

    const add = () => {
        setAddVisible(true)
    }

    const addHandleCancel = () => {
        setAddVisible(false)
    }

    const tipsHandleCancel = () => {
        setRadioValue(undefined)
        setTipsVisible(false)
    }

    const onRadioChange = (e: any) => {
        setRadioValue(e.target.value)
    }

    const editHandleCancel = () => {
        setEditVisible(false)
        setRadioValue('')
    }

    return {
        addHandleCancel,
        add,
        editVisible,
        setEditVisible,
        tipsVisible,
        setTipsVisible,
        addVisible,
        importData,
        // visible,
        tipsData,
        setTipsData,
        type,
        setType,
        tipsHandleCancel,
        radioValue,
        setRadioValue,
        onRadioChange,
        editHandleCancel,
        detail,
        setDetail,
        dataSource,
        getDetail,
        setAddVisible,
        uploadType,
        editNameVisible,
        setEditNameVisible,
        statisticsVisible,
        setStatisticsVisible,
        templateType,
        setTemplateType,
        visibleImportModal,
        setVisibleImportModal,
    }
}
