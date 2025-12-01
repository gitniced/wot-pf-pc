import React, { useEffect, useRef, useState } from 'react'
import { Modal, Select } from 'antd'
import wrapper from '@/utils/wrapper'
import styles from './index.module.less'
import _ from 'lodash'

interface AMapModalProps {
    visible: boolean
    closeDialog: () => void
    value?: any
    submit?: (value?: object) => void
}

const AMapModal: React.FC<AMapModalProps> = props => {
    const { visible, closeDialog, value, submit } = props
    const mapData = useRef<null | object>(null)
    const mapRef = useRef<any>(null)
    const markerLayer = useRef<any>(null)
    const [suggestions, setSuggestions] = useState([])

    /**  搜索  */
    const handleSearchByKeyword = _.throttle((keyword: string) => {
        // 使用者在搜索框中输入文字时触发
        if (keyword) {
            // @ts-ignore 新建一个关键字输入提示类
            const suggest = new window.TMap.service.Suggestion({
                pageSize: 10,
            })
            suggest
                .getSuggestions({ keyword: keyword, location: mapRef.current?.getCenter() })
                .then((result: any) => {
                    const list = result?.data.map((item: any) => ({
                        label: item.title,
                        value: `${item.location.lng},${item.location.lat}`,
                    }))
                    setSuggestions(list)
                })
                .catch((error: any) => {
                    console.error(error)
                })
        }
    }, 500)

    /**  获取地址信息  // 将给定的坐标位置转换为地址 */
    const getLocationInfo = async (values: any) => {
        // @ts-ignore
        const location = new window.TMap.LatLng(values.lat, values.lng)
        // @ts-ignore
        const geocoder = new window.TMap.service.Geocoder()
        const { result } = await geocoder.getAddress({ location }) // 将给定的坐标位置转换为地址
        const regex = /^156/

        const params = {
            addressInfo: result.address,
            city: result.ad_info.city,
            cityCode: result.ad_info.city_code.replace(regex, ''),
            companyAddress: result.address,
            latitude: values.lat,
            longitude: values.lng,
            province: result.ad_info.province,
            provinceCode: result.ad_info.adcode.slice(0, 2) + '0000',
            region: result.ad_info.district,
            regionCode: result.ad_info.adcode,
            // label: values?.title || result.address,
            label: result?.formatted_addresses?.standard_address || values?.title,

            value: values.lng + ',' + values.lat,
        }

        mapData.current = params
    }

    /**   将选中的地址放在地图中心  添加地图标记点markerLayer  */
    const handleGetSuggestions = (item: any) => {
        if (!item) return
        const lngLat = item?.value.split(',')
        // @ts-ignore
        const centerLngLat = new window.TMap.LatLng(lngLat[1], lngLat[0])
        mapRef.current?.setCenter(centerLngLat)
        markerLayer.current?.updateGeometries([{ id: '1', position: centerLngLat }])
        const [lng, lat] = item?.value.split(',') || []
        getLocationInfo({ lng, lat, title: item?.label })
    }
    /**  地图点击事件  */
    const handleMapClick = (evt: any) => {
        const { latLng } = evt
        // @ts-ignore
        const centerLngLat = new window.TMap.LatLng(latLng?.lat, latLng?.lng)
        mapRef.current?.setCenter(centerLngLat)
        markerLayer.current?.updateGeometries([{ id: '1', position: centerLngLat }])
        getLocationInfo({ lng: latLng?.lng, lat: latLng?.lat })
    }

    const initMap = () => {
        // @ts-ignore 初始化地图
        const map = new window.TMap.Map('container', {
            zoom: 15, // 设置默认地图比例
            // @ts-ignore
            mapZoomType: window.TMap.constants.MAP_ZOOM_TYPE.CENTER, // 地图缩放焦点控制
        })
        mapRef.current = map
        // @ts-ignore
        markerLayer.current = new window.TMap.MultiMarker({
            map: map, //指定地图容器
        })

        // 绑定地图点击事件
        mapRef.current.on('click', handleMapClick)
    }

    useEffect(() => {
        setTimeout(() => {
            initMap()
        }, 50)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (value) {
                handleGetSuggestions(value)
            }
        }, 100)
    }, [value])

    return (
        <Modal
            open={visible}
            centered
            width={1200}
            title={'添加活动地点'}
            onCancel={closeDialog}
            onOk={() => {
                console.log('🍊 mapData:', mapData)
                submit?.(mapData)
                closeDialog()
            }}
        >
            <div className={styles.page_modal}>
                <div id="myPageTop" className={styles.page_modal_top}>
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="请输入地址"
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={handleSearchByKeyword}
                        onChange={handleGetSuggestions}
                        notFoundContent={null}
                        options={suggestions}
                        labelInValue
                    />
                </div>
                <div id="container" style={{ width: '100%', height: '400px' }} />
            </div>
        </Modal>
    )
}

export default wrapper(AMapModal)
