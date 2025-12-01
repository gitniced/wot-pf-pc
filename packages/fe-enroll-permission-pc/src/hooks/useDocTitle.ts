import { getLocalStorage, getSessionStorage } from '@/storage'
import { findSiteData } from '@wotu/wotu-components'
import { useModel } from 'umi'

export function useDocTitle(title?: string) {
    const { masterStore, gatewayUserStore } = useModel('@@qiankunStateFromMaster')
    const platform = getSessionStorage('PLATFORM')
    const siteStore = getLocalStorage('SITE_STORE')
    const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' })
    let selectedOrganizationDetail: any = {}
    platform === 'workbench'
        ? (selectedOrganizationDetail = masterStore?.userStore?.selectedOrganizationDetail || '')
        : ''
    platform === 'portal'
        ? (selectedOrganizationDetail = gatewayUserStore?.selectedOrganizationDetail || '')
        : ''
    platform === 'middle' ? (selectedOrganizationDetail = siteName ? { name: siteName } : '') : ''

    const { name: organizationName } = selectedOrganizationDetail || {}
    setTimeout(() => {
        document.title = organizationName ? `${title}-${organizationName}` : `${title}`
    }, 100)
}
