import { useEffect } from 'react'
import styles from './index.module.less'

/** 腾讯地图 */
const Plat: React.FC<{ latitude: number; longitude: number; address: string }> = ({
    latitude,
    longitude,
    address,
}) => {
    const initMap = () => {
        if (latitude > 0 && longitude > 0) {
            const map = new window.TMap.Map('plat', {
                // draggable: false,  // 不允许拖拽地图
                zoom: 14, // 设置默认地图比例
                mapZoomType: window.TMap.constants.MAP_ZOOM_TYPE.CENTER, // 地图缩放焦点控制
            })
            map.removeControl(window.TMap.constants.DEFAULT_CONTROL_ID.SCALE) // 隐藏比例尺控件
            map.removeControl(window.TMap.constants.DEFAULT_CONTROL_ID.ROTATION) // 隐藏旋转控件
            //初始化marker
            let _marker = new window.TMap.MultiMarker({
                id: 'plat', //图层id
                map: map,
                geometries: [
                    {
                        //点标注数据数组
                        id: 'demo',
                        position: new window.TMap.LatLng(latitude, longitude),
                        properties: {
                            title: 'marker',
                        },
                    },
                ],
            })

            map.setCenter(new window.TMap.LatLng(Number(latitude), Number(longitude)))
        }
    }

    useEffect(initMap, [longitude, latitude])

    return (
        <div className={styles.plat}>
            <div className={styles.header}>
                <svg className={`icon ${styles.icon}`}>
                    <use xlinkHref={'#ic_dizhidingwei1'} />
                </svg>
                <div className={styles.address}>{address}</div>
            </div>
            {latitude > 0 && longitude > 0 && (
                <div
                    id="plat"
                    style={{
                        width: '100%',
                        height: '227px',
                    }}
                />
            )}
        </div>
    )
}

export default Plat
