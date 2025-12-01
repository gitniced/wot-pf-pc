// @ts-ignore
import { cloneDeep } from 'lodash'
import type { COMPONENT_TYPE } from '../const'
import { MOBILE_COMPONENT_TYPE_DEFAULT, PC_COMPONENT_TYPE_DEFAULT } from '../const'
import { COMPONENT_TYPE_DEFAULT } from '../const'
import type { PreviewItem } from '../utils/interface'
import { getComponentsDefaultStyle } from '@wotu/pt-components'

/**
 * h5创建组件的默认配置
 * @param type
 * @returns
 */
const CreateDefault = (type: COMPONENT_TYPE): PreviewItem => {
    const tempPreviewItem: PreviewItem = cloneDeep({
        ...COMPONENT_TYPE_DEFAULT[type],
        ...MOBILE_COMPONENT_TYPE_DEFAULT[type],
        // 获取移动端组件的默认样式：间距和背景
        ...getComponentsDefaultStyle(type, 'mobile'),
    })
    return tempPreviewItem
}

/**
 * pc创建组件的默认配置
 *  @param type
 */
export const PcCreateDefault = (type: COMPONENT_TYPE): PreviewItem => {
    const tempPreviewItem: PreviewItem = cloneDeep({
        ...COMPONENT_TYPE_DEFAULT[type],
        ...PC_COMPONENT_TYPE_DEFAULT[type],
        // 获取pc组件的默认样式：间距和背景
        ...getComponentsDefaultStyle(type, 'pc'),
    })
    return tempPreviewItem
}

export default CreateDefault
