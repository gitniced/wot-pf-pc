import React from 'react'
import 'antd/dist/antd.less'
import { SuperCascader } from '@wotu/kp-components'

/**
 * title: 我是标题
 * description: 我是简介，我可以用 `Markdown` 来编写
 */
function Demo() {
    const componentGetCateList = async () => {
        return {
            data: [
                {
                    label: '1',
                    value: '1',
                    children: [
                        {
                            label: '1-1',
                            value: '1-1',
                        },
                    ],
                },
                {
                    label: '2',
                    value: '2',
                },
            ],
            nextPage: 1,
            isNext: false,
        }
    }
    return (
        <div>
            <p>这是一个简单的例子，使用内置的调接口行为</p>
            <SuperCascader
                changeOnSelect={false}
                colSetting={[
                    {
                        onEventChange: componentGetCateList,
                        inputProps: {
                            placeholder: '请输入职业',
                        },
                    },
                    {
                        inputProps: {
                            placeholder: '请输入工种',
                        },
                    },
                    {
                        inputProps: {
                            placeholder: '请输入等级',
                        },
                    },
                ]}
                style={{ width: '260px' }}
            />
        </div>
    )
}

export default Demo
