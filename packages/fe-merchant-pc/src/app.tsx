import { BaiduAnalytics } from "@wotu/wotu-components";
import { getLocalStorage } from "./storage";

export function render(oldRender: () => void) {
    const siteStore = getLocalStorage('WORK_SITE_STORE') || {}
    const siteData = siteStore?.siteData?.data || {}
    if(siteData?.sid){
        const baiduAnalytics = BaiduAnalytics.getInstance(siteData);
        baiduAnalytics.init();
    }
    oldRender();
}

export function onRouteChange({ location }: any) {
    const siteStore = getLocalStorage('WORK_SITE_STORE') || {}
    const siteData = siteStore?.siteData?.data || {}
    if(siteData?.sid){
        const baiduAnalytics = BaiduAnalytics.getInstance(siteData);
        baiduAnalytics.trackPageview(location.pathname);
    }
}