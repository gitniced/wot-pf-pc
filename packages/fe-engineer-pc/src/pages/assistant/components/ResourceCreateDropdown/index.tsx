import { useCallback } from 'react'
import type { MenuProps } from 'antd'
import { Dropdown, Button } from 'antd'
import { history } from 'umi'
import { RESOURCE_FORMAT, RESOURCE_TYPE } from '@/modules/resource/const'
import { updateResourceFileAndCreateResource } from './utils'
import { resourceCreateMenuItems } from './const'
import { getCookie } from '@/storage'
import http from '@/servers/http'
import customOpen from '@/utils/customOpen'

interface IResourceCreateDropdownProps {
    onRefresh: () => void
    majorCode: string
    majorList?: Record<string, any>[]
}

const ResourceCreateDropdown: React.FC<IResourceCreateDropdownProps> = ({
    onRefresh,
    majorCode,
    majorList,
}) => {
    const onMenuClick: MenuProps['onClick'] = useCallback(
        e => {
            if (majorList && majorList.length > 1) {
                history.push('/assistant/resource')
                return
            }

            if (e.key === RESOURCE_FORMAT.word) {
                customOpen(`/office/word?majorCode=${majorCode}`, '_blank')
            } else if (e.key === RESOURCE_FORMAT.excel) {
                customOpen(`/office/excel?majorCode=${majorCode}`, '_blank')
            } else if (e.key === RESOURCE_FORMAT.mind) {
                customOpen(`/office/mind?majorCode=${majorCode}`, '_blank')
            } else if (e.key === RESOURCE_FORMAT.drawing) {
                updateResourceFileAndCreateResource({
                    format: RESOURCE_FORMAT.drawing,
                    type: RESOURCE_TYPE.personal,
                    majorCode: majorCode,
                    onSuccess: onRefresh,
                })
            } else if (e.key === RESOURCE_FORMAT.attachment) {
                updateResourceFileAndCreateResource({
                    format: RESOURCE_FORMAT.attachment,
                    type: RESOURCE_TYPE.personal,
                    majorCode: majorCode,
                    onSuccess: onRefresh,
                })
            } else if (e.key === RESOURCE_FORMAT.demand) {
                http('/wil/resource_library/create', 'post', {
                    format: RESOURCE_FORMAT.demand,
                    type: RESOURCE_TYPE.personal,
                    majorCode: majorCode,
                    name: '点播课',
                }).then(res => {
                    if (getCookie('SELECT_USER_TYPE') === 'org') {
                        window.open(
                            `/engineer/train-center/mine/company/privatecourse/create?code=${res}`,
                            '_self'
                        )
                    } else {
                        window.open(
                            `/engineer/train-center/mine/student/privatecourse/create?code=${res}`,
                            '_self'
                        )
                    }
                })
            }
        },
        [onRefresh]
    )

    return (
        <Dropdown menu={{ onClick: onMenuClick, items: resourceCreateMenuItems }}>
            <Button type="primary">
                <span>新建</span>
                <svg className="icon" aria-hidden="true" style={{ marginLeft: 10 }}>
                    <use xlinkHref="#Down" />
                </svg>
            </Button>
        </Dropdown>
    )
}

export default ResourceCreateDropdown
