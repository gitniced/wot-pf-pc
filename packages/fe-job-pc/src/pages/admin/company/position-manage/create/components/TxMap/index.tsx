import { Modal, Divider, Space, Button, Select, Input, Form } from 'antd'
import { useEffect, useState, useRef } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import _ from 'lodash'
import styles from './index.module.less'
import { observer } from 'mobx-react'

const Index = ({
    value,
    onChange,
    store,
}: {
    store: any
    value?: string
    onChange?: (params: object) => void
}) => {
    const { organizationAddress } = store
    const [form] = Form.useForm()
    const mapData = useRef<null | object>(null)
    const nameValue = Form.useWatch('companyAddress', form)

    const mapRef = useRef<any>(null)
    const markerLayer = useRef<any>(null)

    // 展示地图地址选择
    const [addressChooseShow, setAddressChooseShow] = useState(false)

    const [suggestions, setSuggestions] = useState([])

    /**
     * @description 地址选择modal关闭的回调
     * @author kaijiewang
     * @date 2023-09-19
     */
    const handleChooseAddressCancel = () => {
        setAddressChooseShow(false)
    }

    const initMap = () => {
        //初始化地图
        const map = new window.TMap.Map('container', {
            // draggable: false,  // 不允许拖拽地图
            //center: centerLngLat, // 设置中心点经纬度
            zoom: 14, // 设置默认地图比例
            mapZoomType: window.TMap.constants.MAP_ZOOM_TYPE.CENTER, // 地图缩放焦点控制
        })
        // map.removeControl(window.TMap.constants.DEFAULT_CONTROL_ID.SCALE); // 隐藏比例尺控件
        // map.removeControl(window.TMap.constants.DEFAULT_CONTROL_ID.ROTATION); // 隐藏旋转控件
        mapRef.current = map

        markerLayer.current = new window.TMap.MultiMarker({
            map: map, //指定地图容器
        })
    }

    /**
     * @description 打开地图modal
     * @author kaijiewang
     * @date 2023-09-19
     */
    function addNewAddress() {
        setAddressChooseShow(true)
        form.resetFields()
        if (!mapRef.current) {
            setTimeout(() => {
                initMap()
            }, 50)
        }
    }

    useEffect(() => {
        store.queryBusinessArea()
    }, [])

    const getLocationInfo = async (value: any) => {
        const location = new window.TMap.LatLng(value.lat, value.lng)
        const geocoder = new window.TMap.service.Geocoder()
        const { result } = await geocoder.getAddress({ location }) // 将给定的坐标位置转换为地址
        form.setFieldValue('cityName', result.ad_info.city)
        const regex = /^156/

        const params = {
            addressInfo: result.address,
            // businessArea: result.address_reference.business_area.id,
            city: result.ad_info.city,
            cityCode: result.ad_info.city_code.replace(regex, ''),
            companyAddress: result.address,
            latitude: value.lat,
            longitude: value.lng,
            province: result.ad_info.province,
            provinceCode: result.ad_info.adcode.slice(0, 2) + '0000',
            region: result.ad_info.district,
            regionCode: result.ad_info.adcode,
        }

        mapData.current = params
    }

    /**
     * @description 成功选择地址的回调
     * @author kaijiewang
     * @date 2023-09-19
     */
    const handleChooseAddress = async () => {
        const formData = await form.validateFields()
        const target: any = suggestions.find((item: any) => item.value === formData.companyAddress)
        const params = {
            ...mapData.current,
            ...formData,

            companyAddress: target.label,
        }
        const code = await store.addWorkAddress(params)
        await store.queryOrganizationAddress()
        onChange?.(code)
        setAddressChooseShow(false)
    }

    const handleSearchByKeyword = _.throttle((keyword: string) => {
        // 使用者在搜索框中输入文字时触发
        if (keyword) {
            const suggest = new window.TMap.service.Suggestion({
                // 新建一个关键字输入提示类
                pageSize: 10, // 返回结果每页条目数
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

    // 将选中的地址放在地图中心
    const handleGetSuggestions = (value: any) => {
        if (!value) return
        const lngLat = value.split(',')
        const centerLngLat = new window.TMap.LatLng(lngLat[1], lngLat[0])
        mapRef.current?.setCenter(centerLngLat)
        markerLayer.current?.add([{ id: '1', position: centerLngLat }])
        const [lng, lat] = value.split(',')
        getLocationInfo({ lng, lat })
    }

    // 地址选择
    const addressChange = (e: any) => {
        onChange?.(e)
    }

    return (
        <>
            <Modal
                title="选择地址"
                width={800}
                open={addressChooseShow}
                onOk={handleChooseAddress}
                onCancel={handleChooseAddressCancel}
            >
                <div className={styles.choose_map}>
                    <Form
                        form={form}
                        style={{ width: '400px' }}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        name="control-hooks"
                    >
                        {nameValue && (
                            <Form.Item
                                label="工作城市"
                                name="cityName"
                                rules={[{ required: true, message: '请选择城市' }]}
                            >
                                <Input disabled />
                            </Form.Item>
                        )}
                        <Form.Item
                            label="工作地点"
                            name="companyAddress"
                            rules={[{ required: true, message: '请选择工作地点' }]}
                        >
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
                            />
                        </Form.Item>
                        <Form.Item
                            label="详细地址"
                            name="addressInfo"
                            rules={[{ required: true, message: '请输入详细地址' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="商圈"
                            name="businessArea"
                            rules={[{ required: true, message: '请选择商圈' }]}
                        >
                            <Select>
                                {store.businessArea?.map((item: any) => (
                                    // @ts-expect-error
                                    <Option key={item.key} value={item.key}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                    <div
                        id="container"
                        style={{
                            width: '300px',
                            height: '300px',
                        }}
                    />
                </div>
            </Modal>
            {organizationAddress.length === 0 ? (
                <Button
                    type={'dashed'}
                    style={{ width: '100%' }}
                    icon={<PlusOutlined />}
                    onClick={addNewAddress}
                >
                    新增地址
                </Button>
            ) : (
                <Select
                    style={{ width: '100%' }}
                    placeholder="请选择地址"
                    value={value}
                    notFoundContent={null}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    onChange={addressChange}
                    dropdownRender={menu => (
                        <>
                            {menu}
                            <Divider style={{ margin: '8px 0' }} />
                            <Space style={{ padding: '0 8px 4px' }}>
                                <Button type="text" icon={<PlusOutlined />} onClick={addNewAddress}>
                                    新增地址
                                </Button>
                            </Space>
                        </>
                    )}
                    options={organizationAddress.map(
                        (item: { companyAddress: any; addressInfo: any; code: any }) => ({
                            label: item.companyAddress + item.addressInfo,
                            value: item.code,
                        }),
                    )}
                />
            )}
        </>
    )
}

export default observer(Index)
