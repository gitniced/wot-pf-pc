/* eslint-disable no-undef */

const getData = async pcDomain => {
    const origin = BUILD_ENV === 'pro' ? 'https://api.busionline.com' : 'https://api-test.busionline.com'
    const getWebsiteApi = () =>
        fetch(`${origin}/o/v1/systems/info`, {
            method: 'get',
            headers: {
                'x-site-domain': pcDomain,
            },
        })
            .then(res => res.json())
            .then(res => res.data)

    const getCustomerServiceApi = () =>
        fetch(`${origin}/o/v1/systems/platform-voice-set`, {
            method: 'get',
            headers: {
                'x-site-domain': pcDomain,
            },
        })
            .then(res => res.json())
            .then(res => res.data)

    return Promise.all([getWebsiteApi(), getCustomerServiceApi()])
}

export const getSiteInfoQZ = async pcDomain => {
    try {
        const [websiteData, customerServiceData] = await getData(pcDomain)

        return {
            header: {
                title: websiteData.website + websiteData.website_subtitle,
                logo: websiteData.logo,
                menu: websiteData.menu,
                region: websiteData.website_region,
            },
            rightSide: {
                customerService: {
                    is_enable: customerServiceData.is_enable,
                    // getLink: () => openQiyuService(customerServiceData),
                },
                serviceHotline: {
                    policyConsultation: '政策咨询：12333',
                    technicalConsultation: '技术咨询：0571-88885888',
                    businessConsultation: '商务咨询：15858137880',
                },
                miniApp: {
                    title: websiteData.wechat_mini_program_title,
                    qrcode: websiteData.wechat_mini_program,
                },
            },
            footer: {
                organizer: '主办单位：' + websiteData.organizer,
                technology: '技术支持：' + websiteData.technology,
                siteRecordNumber: '浙ICP备11052366号-8',
                licence: '广播电视节目制作经营许可证（浙）字第06609号',
                beian: '浙公网 33010602002490号',
            },
            websiteData,
        }
    } catch (err) {
        /* empty */
    }
}
