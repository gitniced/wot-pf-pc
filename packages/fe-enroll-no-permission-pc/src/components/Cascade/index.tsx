import store from './store'
import SuperCascader from '../SuperCascader'
import type { OptionProps } from 'antd/lib/select'
import type { Timeout } from 'ahooks/lib/useRequest/src/types'
import { useEffect } from 'react'
import { observer } from 'mobx-react'
import styles from './index.modules.less'
import { useDeepCompareEffect } from 'ahooks'

interface PropsType {
    onChange?: (values: any) => void
    value?: OptionProps[]
    changeOnSelect?: boolean
    multiple?: boolean
}
const Cascade = ({ onChange, value, changeOnSelect = true, multiple = false }: PropsType) => {
    let inputEvent: Timeout[] = []

    useEffect(() => {
        return () => {
            inputEvent.map((i: Timeout) => {
                clearTimeout(i)
                inputEvent = []
            })
        }
    }, [])
    useDeepCompareEffect(() => {
        // 获取额外的数据（例：之前创建的数据在第三页，初始化只获取第一页，导致渲染不对，手动获取第三页的数据，拼在options的最上面）
        if (value?.[0]) {
            store.getExtraCommonJobList([value[0].value])
        }
    }, [value?.[0]])

    // 搜索职业工种等级
    const handleSearchCommonJob = async ({ input, page }: { input: string; page: number }) => {
        return new Promise(resolve => {
            inputEvent.map((i: Timeout) => {
                clearTimeout(i)
                inputEvent = []
            })
            const t = setTimeout(() => {
                inputEvent.map((i: Timeout) => {
                    clearTimeout(i)
                    inputEvent = []
                })
                store.getCommonJobList({ name: input, pageNo: page }).then(res => {
                    resolve(res)
                })
            }, 500)

            inputEvent.push(t)
        })
    }

    return (
        // @ts-ignore
        <SuperCascader
            value={
                !multiple
                    ? value?.map(item => item.value)
                    : value?.map(item => item.map((_item: any) => _item.value))
            }
            multiple={multiple}
            placeholder="分类"
            colSetting={[
                {
                    // @ts-ignore
                    onEventChange: handleSearchCommonJob,
                },
            ]}
            extraOptions={store.commonJobList}
            // @ts-ignore
            onChange={(_: number[], selectedOptions: OptionProps[]) => {
                console.log(_, selectedOptions)
                onChange?.(selectedOptions)
            }}
            changeOnSelect={changeOnSelect}
            displayRender={(label: any) => label.join('/')}
            className={`${styles.cascader} ${value ? styles.actived : ''}`}
        />
    )
}

export default observer(Cascade)
