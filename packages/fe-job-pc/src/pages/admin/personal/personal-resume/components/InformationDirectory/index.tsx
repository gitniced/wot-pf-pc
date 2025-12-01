import Item from './components/Item'

import { Divider } from 'antd'
import styles from './index.module.less'
import { Form } from 'antd'
import { useEffect } from 'react'
import type { UserConfigItem } from '../../interface'

const Index = ({
    menuActive,
    userMenuConfig,
    saveMenuConfig,
    onScroll,
}: {
    menuActive: any
    userMenuConfig: UserConfigItem[]
    saveMenuConfig: (menuConfig: any) => void
    onScroll: (key: string) => void
}) => {
    const [form] = Form.useForm()

    const userMenuConfigStr = JSON.stringify(userMenuConfig)

    const onValuesChange = (_: any, allValues: any) => {
        console.log(_, allValues)
        const list = userMenuConfig.map((item: any) =>
            Reflect.has(allValues, item.key)
                ? { ...item, open: allValues[item.key] ? 1 : 0 }
                : item,
        )
        saveMenuConfig({ list })
    }

    useEffect(() => {
        if (!userMenuConfigStr) return

        const formData = userMenuConfig.reduce(
            (acc: any, cur: any) => ({
                ...acc,
                [cur.key]: cur.open === 1,
            }),
            {},
        )

        form.setFieldsValue(formData)
    }, [userMenuConfigStr])

    return (
        <div className={styles.content_left}>
            <div className={styles.header}>信息目录</div>
            <div className={styles.content}>
                <Form onValuesChange={onValuesChange} form={form}>
                    {userMenuConfig
                        .filter(item => item.base)
                        .map((item: any) => (
                            <Item
                                active={menuActive[item.key]}
                                label={item.title}
                                key={item.key}
                                required={true}
                                // @ts-ignore
                                id={item.key}
                                onPosition={() => onScroll(item.key)}
                            />
                        ))}
                    <Divider className={styles.divider_style} />

                    {/* @ts-ignore */}
                    {userMenuConfig
                        .filter(item => !item.base)
                        .filter(item => item.key !== 'selfDefine')
                        .map(item => (
                            <Form.Item noStyle key={item.key} name={item.key}>
                                <Item
                                    active={menuActive[item.key]}
                                    label={item.title}
                                    id={item.key}
                                />
                            </Form.Item>
                        ))}
                    <Divider className={styles.divider_style} />
                    {userMenuConfig
                        .filter(item => item.key === 'selfDefine')
                        .map(item => (
                            <Form.Item noStyle key={item.key} name={item.key}>
                                <Item
                                    active={menuActive[item.key]}
                                    label={item.title}
                                    id={item.key}
                                />
                            </Form.Item>
                        ))}
                </Form>
            </div>
        </div>
    )
}

export default Index
