import React from 'react'
import type PcPageStore from './../../../store'
import type { PreviewItem } from '../../../../../components/utils/interface'
import { LAYOUT_STYLE } from '../../../../../components/utils/interface.d'
import { Modal } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { RADIO_VALUE_ENUM } from '@/pages/gateway/web/create/components/ActionBar/ArticleContent/const'

export function articleContFc(
    setCurrentClick: React.Dispatch<React.SetStateAction<boolean>>,
    selectKey: string[],
    setValue: React.Dispatch<React.SetStateAction<string>>,
    getImageTextData: (flag?: boolean) => Promise<void>,
    stores: PcPageStore,
    data: PreviewItem,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectionType: React.Dispatch<React.SetStateAction<'checkbox' | 'radio'>>,
    setSelectKey: React.Dispatch<React.SetStateAction<string[]>>,
) {
    const onChange = (e: RadioChangeEvent) => {
        setCurrentClick(true)
        if (e.target.value === RADIO_VALUE_ENUM.DEFAULT && selectKey.length !== 0) {
            Modal.confirm({
                title: '切换为默认规则将清空您已选择的图文,确定要继续吗?',
                icon: <ExclamationCircleOutlined />,
                centered: true,
                okText: '继续',
                cancelText: '取消',
                onOk: () => {
                    setValue(e.target.value)
                    getImageTextData(true)
                },
            })
        } else if (e.target.value === RADIO_VALUE_ENUM.DEFAULT) {
            setValue(e.target.value)
            getImageTextData(true)
        } else if (e.target.value === RADIO_VALUE_ENUM.MANUAL) {
            setValue(e.target.value)
            stores.fixPreviewList({
                ...data,
                codes: [],
                rule: 'custom',
                selectCategory: [],
                showLine: 1,
            })
        } else if (e.target.value === RADIO_VALUE_ENUM.CATEGORY) {
            setValue(e.target.value)
            stores.fixPreviewList({
                ...data,
                codes: [],
                rule: 'by_category',
                showLine: 2,
            })
        }
    }
    //添加内容的选择
    const getContentTitle = (val: string, layoutStyle?: any) => {
        switch (val) {
            case '1':
                return (
                    <>
                        默认展示{layoutStyle === LAYOUT_STYLE.IMAGE_LEFT_TITLE_RIGHT ? '5条' : ''}
                        最新发布的图文
                    </>
                )
            case '2':
                return (
                    <>
                        添加图文内容，最多
                        {layoutStyle === LAYOUT_STYLE.IMAGE_LEFT_TITLE_RIGHT ? 5 : 10}条
                    </>
                )
            case '3':
                return (
                    <>
                        默认展示{layoutStyle === LAYOUT_STYLE.IMAGE_LEFT_TITLE_RIGHT ? '5条' : ''}
                        所选分类下最新发布的图文
                    </>
                )
            default:
        }
    }
    //默认的时候禁止添加导航
    const addImageText = (val: string) => {
        if (val === RADIO_VALUE_ENUM.DEFAULT) return false
        setVisible(true)
        setSelectionType('checkbox')
    }
    //modal的确认按钮
    const onSubmit = (val: any) => {
        const json = JSON.parse(JSON.stringify(val))
        setCurrentClick(false)
        setVisible(false)

        /**
         * 一行几个
         */
        let how_many_in_a_row = data?.layoutStyle === 1 ? json?.length : Math.ceil(json?.length / 2)

        stores.fixPreviewList({
            ...data,
            codes: json,
            showLine: how_many_in_a_row,
        })
    }

    // 删除
    const clickDelete = (key: string) => {
        const _arr = data?.codes || data?.content
        const arr = _arr?.filter(item => {
            return item?.code !== key
        })
        stores.fixPreviewList({
            ...data,
            codes: arr,
        })

        const res = selectKey.filter((i: string) => {
            return i !== key
        })
        setSelectKey(res)
    }

    // 元素排序
    const sortChange = (codes: any[]) => {
        stores.fixPreviewList({
            ...data,
            codes,
        })
    }
    return { addImageText, sortChange, clickDelete, onChange, getContentTitle, onSubmit }
}
