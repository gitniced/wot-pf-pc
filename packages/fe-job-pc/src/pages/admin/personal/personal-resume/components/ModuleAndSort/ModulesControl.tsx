import Item from './components/Item'
import { Button } from 'antd'
import styles from './index.module.less'
import { Form } from 'antd'
import { useEffect } from 'react'

const Index = ({ menuActive, userMenuConfig, saveMenuConfig }: any) => {
    const [form] = Form.useForm()

    const userMenuConfigStr = JSON.stringify(userMenuConfig)

    const onValuesChange = (_: any, allValues: any) => {
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
        <>
            <div className={styles.modules_control_container}>
                <div className={styles.tips}>点击开关增减模块</div>
                <Form onValuesChange={onValuesChange} form={form}>
                    {userMenuConfig.slice(0, 5).map((item: any) => (
                        <Item
                            active={menuActive[item.key]}
                            label={item.title}
                            key={item.key}
                            required={true}
                            // @ts-ignore
                            id={item.key}
                        />
                    ))}
                    {userMenuConfig.slice(5).map((item: any) => (
                        <>
                            <Form.Item noStyle key={item.key} name={item.key}>
                                <Item
                                    active={menuActive[item.key]}
                                    label={item.title}
                                    // @ts-ignore
                                    id={item.key}
                                />
                            </Form.Item>
                        </>
                    ))}
                </Form>
            </div>
            <div className={styles.apply_right_btn}>
                <Button type="primary" size={'small'}>
                    应用
                </Button>
            </div>
        </>
    )
}

export default Index
