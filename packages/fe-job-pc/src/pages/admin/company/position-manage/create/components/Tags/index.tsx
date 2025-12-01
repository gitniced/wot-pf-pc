/* eslint-disable */
import { Button, Modal, Tag, Select, Divider, Space, message } from 'antd'
import type { SyntheticEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { cloneDeep } from 'lodash'
import { useDebounceFn } from 'ahooks'

interface Itag {
    code: string
    professionTypeId: number
    tagName: string
    tagType: number
}

const Index = ({
    value = [],
    onChange,
    store,
    professionTypeId,
}: {
    value?: Itag[]
    onChange?: (params: object) => void
    store: any
    professionTypeId: number
    tagNames: any[]
}) => {
    // 控制下拉菜单展示
    const [_open, _setOpen] = useState(false)

    const selRef = useRef(null)

    // 展示添加tag的modal窗
    const [professionTagShow, setProfessionTagShow] = useState<boolean>(false)

    // 已选中的tag
    const [tags, setTags] = useState<Itag[]>([])

    // 搜索字符串
    const [searchStr, setSearchStr] = useState<string>('')

    // 远程数据加载请求
    const [options, setOptions] = useState<any[]>([])

    // tags去重复
    const [uniqueTag, setUniqueTag] = useState([])

    // 父级提供的tag
    const valueStr = JSON.stringify(value)

    useEffect(() => {
        setTags(value)
    }, [valueStr])

    useEffect(() => {
        const uniqueObj = store.professionTags.reduce(
            // @ts-ignore
            (acc, cur) => ({
                ...acc,
                [cur.tagName]: cur,
            }),
            {},
        )

        const enhanceResp: any = Object.values(uniqueObj)
        setUniqueTag(enhanceResp)
    }, [JSON.stringify(store.professionTags)])

    useEffect(() => {
        store.queryTagName()
    }, [])

    useEffect(() => {
        if (professionTypeId) {
            store.professTypeTag(professionTypeId)
            getOptionsHandler({ searchStr }).then(res => {
                setOptions(res)
            })
        }
    }, [professionTypeId])

    const addTags = () => {
        if (!professionTypeId) {
            message.info('请先选择职位类型')
            return
        }
        setProfessionTagShow(true)
    }

    const onCancel = () => {
        setProfessionTagShow(false)
    }

    const onOk = () => {
        onChange?.(tags)
        onCancel()
    }

    const handleClose = (code: string) => {
        setTags(tags.filter((item: { code: string }) => item.code !== code))
    }

    const handleClick = (tag: Itag) => {
        if (tags.some((item: { code: string }) => item?.code === tag?.code)) {
            setTags(tags.filter((item: { code: string }) => item.code !== tag.code))
            return
        }
        if (tags.length > 9) return message.info('最多添加10个标签')
        if (tags.some((item: Itag) => item?.tagName === tag?.tagName))
            return message.info('标签已存在')
        if (tags.some((item: Itag) => item.code === tag.code)) return

        setTags([...tags, tag])
    }

    const addItem = async (val: string) => {
        const regex = /\s+/g
        if (tags.length > 9) return message.info('最多添加10个标签')
        if (val?.replace(regex, '')?.length === 0) return

        // 检查标签是否已经存在
        const isExist = uniqueTag.some(
            (item: { tagName: string }) => item.tagName === val.replace(regex, ''),
        )
        if (isExist) {
            const tagObj = uniqueTag.find(
                (item: { tagName: string }) => item.tagName === val.replace(regex, ''),
            ) as unknown as Itag

            setTags([...tags, tagObj])
        } else {
            const params = {
                professionTypeId,
                tagName: val.replace(regex, ''),
                tagType: 0,
            }
            const code = await store.tagAdd(params)
            await store.professTypeTag(professionTypeId)
            // @ts-ignore
            setTags([...tags, { code, tagName: val }])
        }
    }

    /** select的option渲染 */
    const optionRender = (params: any) => {
        const { searchStr = '', label = '' } = params || {}
        if (Object.prototype.toString.call(label) !== '[object String]') {
            return label
        } else {
            if (searchStr) {
                const beforeIndex = label.indexOf(searchStr)
                const afterIndex = label.indexOf(searchStr) + searchStr.length
                const beforeStr = label.substr(0, beforeIndex) || ''
                const afterStr = label.substr(afterIndex, label.length) || ''
                if (beforeIndex === -1) {
                    return label
                } else {
                    return (
                        <>
                            {beforeStr}
                            <span style={{ color: 'var(--primary-color)' }}>{searchStr}</span>
                            {afterStr}
                        </>
                    )
                }
            } else {
                return label
            }
        }
    }

    /** option底部的自定义组件 */
    const optionListBottomRender = (params: any) => {
        const { searchStr } = params || {}
        return searchStr ? (
            <>
                <Divider style={{ margin: '4px 0' }} />
                <div className={styles.custom_add_btn}>
                    <Button
                        icon={<PlusOutlined />}
                        type={'text'}
                        onClick={(e: SyntheticEvent) => {
                            e.stopPropagation()
                            onCreateTag(searchStr)
                        }}
                    >
                        新建标签
                        <span
                            style={{
                                color: 'var(--primary-color)',
                            }}
                        >
                            [{searchStr}]
                        </span>
                    </Button>
                </div>
            </>
        ) : null
    }

    /** select的option渲染 */
    const getOptionsHandler = async (params: any) => {
        const { searchStr } = params || {}
        const optionList = await store.queryCustomTagName({
            tagName: searchStr,
            professionTypeId,
        })
        optionList.map((item: any) => {
            item.value = item.code
            item.label = item.tagName
            item.pureLabel = item.tagName
        })
        setOptions(optionList)
        return optionList
    }

    /** option选中回调 */
    const onSelectChange = (list: any) => {
        const tempValue = list?.[0] || ''
        if (tags.length > 9) return message.info('最多添加10个标签')
        if (tags.some((item: Itag) => item.code === tempValue)) return
        const target = options.find(item => item.value === tempValue) || {}
        let tempTags = cloneDeep(tags)
        // @ts-ignore
        tempTags = tempTags.concat([{ code: target.value, tagName: target.pureLabel }])
        setTags(tempTags)
    }

    /** 处理option 并渲染*/
    const getOptionRender = () => {
        // 不展示已选中的option
        let tempList = options?.filter(
            (listItem: any) =>
                !tags.some((valueItem: any) => {
                    return valueItem.code === listItem.code
                }),
        ) as any[]

        // 判断是否有option自定义渲染方法
        if (optionRender) {
            const optionTempList = tempList.map((item: any) => {
                item.label = optionRender({ searchStr, label: item.label })
                return item
            }) as any[]
            tempList = optionTempList
        }

        return tempList || []
    }

    /** 执行搜索请求选项数据*/
    const doSearch = async (str: string) => {
        setSearchStr(str)
        const optionList = (await getOptionsHandler({ searchStr: str })) || []
        setOptions(optionList)
    }

    /** 多次执行请求防抖 */
    const { run: onSearch } = useDebounceFn(doSearch, { wait: 800 })

    /** 新建标签触发 */
    const onCreateTag = (str: string) => {
        if (tags.every((item: Itag) => item.tagName !== str?.trim())) {
            str?.trim()?.length > 0 && addItem(str)
            setShowPop(false)
            doSearch('')
        }
    }

    /** 是否展示选择框 */
    const [showPop, setShowPop] = useState(false)

    return (
        <>
            <Modal
                width={800}
                className={styles.profession_tag_modal}
                title={
                    <Space>
                        <span>请选择职位标签</span>
                        <Select
                            ref={selRef}
                            style={{ width: 300 }}
                            placeholder={'搜索标签'}
                            value={[]}
                            // disabled={getDisabled()}
                            open={showPop}
                            onDropdownVisibleChange={visible => setShowPop(visible)}
                            mode={'multiple'}
                            filterOption={() => {
                                return true
                            }}
                            dropdownRender={optionList => (
                                <>
                                    {optionList}
                                    {optionListBottomRender({ searchStr })}
                                </>
                            )}
                            getPopupContainer={triggerNode => triggerNode.parentNode}
                            options={getOptionRender()}
                            onSearch={onSearch}
                            onChange={onSelectChange}
                        />
                    </Space>
                }
                open={professionTagShow}
                onOk={onOk}
                onCancel={onCancel}
            >
                <div />
                <div className={styles.tag_title}>
                    已选(
                    <span style={{ color: tags.length > 0 ? 'var(--primary-color)' : '' }}>
                        {tags.length}
                    </span>
                    /10)
                </div>

                <div className={styles.choosed_tag}>
                    <Space size={[8, 16]} wrap>
                        {tags.map((item: Itag) => (
                            <Tag
                                style={{ cursor: 'pointer' }}
                                closable
                                key={item.code}
                                onClose={() => handleClose(item.code)}
                            >
                                {item.tagName}
                            </Tag>
                        ))}
                    </Space>
                </div>

                <Divider />
                <div className={styles.choose_content}>
                    {uniqueTag?.filter((item: Itag) => item.tagType === 1)?.length > 0 && (
                        <>
                            <div className={styles.tag_title}>推荐标签</div>
                            <div className={styles.recommend_tag}>
                                <Space size={[8, 16]} wrap>
                                    {uniqueTag
                                        ?.filter((item: Itag) => item.tagType === 1)
                                        ?.map((item1: Itag) => (
                                            <Tag
                                                style={{ cursor: 'pointer' }}
                                                className={
                                                    tags.some(item => item?.code === item1.code)
                                                        ? styles.tag_active
                                                        : ''
                                                }
                                                key={item1.code}
                                                onClick={() => handleClick(item1)}
                                            >
                                                {item1.tagName}
                                            </Tag>
                                        ))}
                                </Space>
                            </div>
                        </>
                    )}
                    <div style={{ marginTop: 16 }} className={styles.tag_title}>
                        自定义标签
                    </div>
                    <div className={styles.custom_tag}>
                        {' '}
                        <Space size={[8, 16]} wrap>
                            {uniqueTag
                                .filter((item: Itag) => item.tagType === 0)
                                .map((item1: Itag) => (
                                    <Tag
                                        style={{ cursor: 'pointer' }}
                                        key={item1.code}
                                        className={
                                            tags.some(item => item?.code === item1.code)
                                                ? styles.tag_active
                                                : ''
                                        }
                                        onClick={() => handleClick(item1)}
                                    >
                                        {item1.tagName}
                                    </Tag>
                                ))}
                        </Space>
                    </div>
                </div>
            </Modal>

            <div
                style={value?.length > 0 ? { marginTop: 4, marginBottom: 16 } : {}}
                className={styles.profession_tag_container}
            >
                <Space size={[8, 16]} wrap>
                    {value?.map((item: Itag) => (
                        <Tag style={{ cursor: 'pointer' }} key={item.code}>
                            {item.tagName}
                        </Tag>
                    ))}
                </Space>
            </div>
            <Button type="dashed" onClick={addTags} block icon={<PlusOutlined />}>
                添加
            </Button>
        </>
    )
}

export default Index
