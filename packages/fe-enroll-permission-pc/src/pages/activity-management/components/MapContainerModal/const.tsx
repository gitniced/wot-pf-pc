// import React, { useEffect, useState } from 'react'
// import { Modal } from 'antd'
// import wrapper from '@/utils/wrapper'
// import styles from './index.module.less'
// import AMapLoader from '@amap/amap-jsapi-loader'
// import { Input, message } from 'antd'
// const { Search } = Input

// interface AMapModalProps {
//     visible: boolean
//     closeDialog: () => void
//     value?: string
//     submit?: (value?: string) => void
// }
// /**  地图实例  */
// let map: any = null
// /**  标记  */
// let marker: any = null
// /**  比例尺  */
// let scale: any = null
// /**  工具条  */
// let toolBar: any = null
// /**  搜索  */
// let placeSearch: any = null
// let auto: any = null
// /**  点击事件  */
// let geocoder: any = null
// //输入提示
// let autoOptions = {
//     input: 'tipinput',
// }

// const AMapModal: React.FC<AMapModalProps> = props => {
//     const { visible, closeDialog, value, submit } = props
//     const [searchValue, setSearchValue] = useState('')

//     const onSearch = (v: string) => {
//         setSearchValue(v) // 更新搜索框输入的值
//         placeSearch?.search(searchValue)
//     }
//     /**  选择事件  */
//     function select(e: any) {
//         placeSearch.setCity(e?.poi?.adcode)
//         placeSearch.search(e?.poi?.name) //关键字查询查询
//         marker.setPosition(e?.poi?.location)
//     }
//     /**  点击事件  */
//     function showInfoClick(e: any) {
//         marker.setPosition(e?.lnglat)
//         // 逆地理编码获取地点信息
//         geocoder?.getAddress(e?.lnglat, function (status: any, result: any) {
//             if (status === 'complete' && result?.info === 'OK') {
//                 if (result.regeocode && result.regeocode.formattedAddress) {
//                     let address = result?.regeocode?.formattedAddress
//                     setSearchValue(address)
//                 }
//             } else {
//                 message.error('逆地理编码失败')
//             }
//         })
//     }

//     useEffect(() => {
//         if (value) {
//             onSearch(value)
//         }
//     }, [value])

//     useEffect(() => {
//         // @ts-ignore
//         window._AMapSecurityConfig = {
//             securityJsCode: '75204b4ecec46a97e9906a83b0cc8b5d',
//         }
//         AMapLoader.load({
//             key: '1ae45beffb6052b82267651855e0bcc7', // 申请好的Web端开发者Key，首次调用 load 时必填
//             version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
//             plugins: [
//                 'AMap.Scale', //比例尺
//                 'AMap.ToolBar', // 工具条
//                 'marker', //标记
//                 'AMap.Geolocation', // 大致定位
//                 'AMap.PlaceSearch', //搜索
//                 'AMap.AutoComplete', //搜索
//                 'AMap.Geocoder', // 逆地理编码（坐标 -> 地址）
//             ], //需要使用的的插件列表，
//         })
//             .then(AMap => {
//                 map = new AMap.Map('mapContainer', {
//                     zoom: 15, //初始化地图层级
//                     resizeEnable: true,
//                 })
//                 // 标记
//                 marker = new AMap.Marker({})
//                 /**  比例尺  */
//                 scale = new AMap.Scale({
//                     visible: true,
//                 })
//                 /**  工具条  */
//                 toolBar = new AMap.ToolBar({
//                     visible: true,
//                     position: {
//                         top: '110px',
//                         right: '40px',
//                     },
//                 })
//                 auto = new AMap.AutoComplete(autoOptions)
//                 placeSearch = new AMap.PlaceSearch({
//                     map: map,
//                 })
//                 placeSearch?.search(value)
//                 AMap.plugin(['AMap.PlaceSearch', 'AMap.AutoComplete'], function () {
//                     auto.on('select', select) //注册监听，当选中某条记录时会触发
//                 })
//                 geocoder = new AMap.Geocoder({
//                     city: '010', //城市设为北京，默认：“全国”
//                     radius: 1000, //范围，默认：500
//                 })

//                 map.add(marker)
//                 map.addControl(scale)
//                 map.addControl(toolBar)
//                 map.on('click', showInfoClick)
//             })
//             .catch(e => {
//                 console.log(e)
//             })
//         return () => {
//             map?.destroy()
//         }
//     }, [])

//     return (
//         <Modal
//             open={visible}
//             centered
//             width={1200}
//             title={'添加活动地点'}
//             onCancel={closeDialog}
//             onOk={() => {
//                 submit?.(searchValue)
//                 closeDialog()
//             }}
//         >
//             <div className={styles.page_modal}>
//                 <div id="myPageTop" className={styles.page_modal_top}>
//                     <Search
//                         id="tipinput"
//                         placeholder="输入考勤地点"
//                         enterButton="搜索"
//                         size="large"
//                         onSearch={onSearch}
//                         value={searchValue}
//                         onChange={(e: any) => {
//                             setSearchValue(e.target.value)
//                         }}
//                     />
//                 </div>
//                 <div id="mapContainer" style={{ width: '100%', height: '400px' }} />
//             </div>
//         </Modal>
//     )
// }

// export default wrapper(AMapModal)
