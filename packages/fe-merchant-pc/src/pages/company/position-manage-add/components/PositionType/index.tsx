import { Input, Modal, Space } from 'antd'
import { useState, useEffect } from 'react'
import styles from './index.modules.less'

const Index = ({
    value,
    onChange,
    store,
    disabled = false,
}: {
    value?: []
    onChange?: (params: number) => void
    store: any
    disabled: boolean
}) => {
    const [professionModal, setProfessionModal] = useState(false)
    const [tags, setTags] = useState([])
    const [postName, setPostName] = useState('')
    const [active, setActive] = useState(0)
    const firstLevelJobStr = JSON.stringify(store.firstLevelJob)

    const tabsChange = (e: any, i: number) => {
        store.getTree(e).then((resp: any) => {
            setTags(resp)
            setActive(i)
        })
    }

    useEffect(() => {
        if (firstLevelJobStr && firstLevelJobStr.length > 0) {
            const { id } = store.firstLevelJob?.[0] || {}
            if (!id) return
            store.getTree(id).then((resp: any) => {
                setTags(resp)
            })
        }
    }, [firstLevelJobStr])

    useEffect(() => {
        if (!value) return
        store.capacityList([value]).then((resp: any) => {
            if (resp.length > 0) {
                setPostName(resp[0].name)
            }
        })
    }, [value])

    const addProfession = () => {
        if (disabled) return
        setProfessionModal(true)
    }

    const handleProfessionCancel = () => {
        setProfessionModal(false)
    }

    const tagsChange = (id: number) => {
        onChange?.(id)
        handleProfessionCancel()
    }

    /**
     * @description
     * @author kaijiewang
     * @date 2023-09-19
     */
    const handleProfession = () => {}

    return (
        <>
            <Modal
                title="请选择职位类型"
                footer={null}
                width={800}
                bodyStyle={{ padding: '0px' }}
                open={professionModal}
                onOk={handleProfession}
                onCancel={handleProfessionCancel}
            >
                <div className={styles.profession_tags}>
                    <div className={styles.first_level_type}>
                        {store.firstLevelJob?.map((item: any, i: number) => {
                            return (
                                <div
                                    onClick={() => tabsChange(item.id, i)}
                                    className={
                                        i === active
                                            ? styles.job_item_active_styles
                                            : styles.job_item_styles
                                    }
                                    key={item.id}
                                >
                                    {item.name}
                                </div>
                            )
                        })}
                    </div>

                    <div className={styles.content}>
                        {tags.map((item: any) => (
                            <>
                                <div className={styles.title}>{item.name}</div>
                                <div className={styles.tag_group}>
                                    <Space size={[24, 16]} wrap>
                                        {item.childList.map((item1: any) => (
                                            <div
                                                className={styles.tag_wrap}
                                                key={item1.id}
                                                onClick={() => tagsChange(item1.id)}
                                            >
                                                {item1.name}
                                            </div>
                                        ))}
                                    </Space>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </Modal>
            <Input
                disabled={disabled}
                readOnly
                placeholder="请选择"
                value={postName}
                onClick={addProfession}
            />
        </>
    )
}

export default Index
