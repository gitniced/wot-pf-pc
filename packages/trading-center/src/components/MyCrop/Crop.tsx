import { Slider } from 'antd'
import { useRef, useState } from 'react'
// import type { Crop } from 'react-image-crop'
import type { Crop, PixelCrop } from 'react-image-crop'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import styles from './index.module.less'

import { INIT_ZOOM, ZOOM_STEP, INIT_ROTATE, ROTATE_STEP, MIN_ROTATE, MAX_ROTATE } from './constants'

type CropProps = { imageSrc: string; onComplete: (e: PixelCrop) => void }

const CropContent = ({ imageSrc, onComplete }: CropProps) => {
    const imgRef = useRef<HTMLImageElement>(null)

    const [crop, setCrop] = useState<Crop>()
    const [scale, setScale] = useState<number>(INIT_ZOOM)
    const [rotate, setRotate] = useState<number>(INIT_ROTATE)

    function getCenterCrop(mediaWidth: number, mediaHeight: number): Crop {
        return {
            unit: '%', // 可以是 'px' 或 '%'
            x: mediaWidth / 2,
            y: mediaHeight / 2,
            width: mediaWidth / 3,
            height: mediaWidth / 3,
        }
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget
        setCrop(getCenterCrop(width, height))
    }

    return (
        <>
            <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={onComplete}
                aspect={1}
            >
                <img
                    ref={imgRef}
                    src={imageSrc}
                    style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                    onLoad={onImageLoad}
                />
            </ReactCrop>

            <section className={[styles.crop_control, styles.crop_control_zoom].join(' ')}>
                <button
                    onClick={() => setScale(scale - ZOOM_STEP)}
                    disabled={scale - ZOOM_STEP < 0.1}
                >
                    －
                </button>
                <Slider min={0.1} max={5} step={ZOOM_STEP} value={scale} onChange={setScale} />
                <button onClick={() => setScale(scale + ZOOM_STEP)} disabled={0.1 + ZOOM_STEP > 5}>
                    ＋
                </button>
            </section>

            <section className={[styles.crop_control, styles.crop_control_rotate].join(' ')}>
                <button
                    onClick={() => setRotate(rotate - ROTATE_STEP)}
                    disabled={rotate === MIN_ROTATE}
                >
                    ↺
                </button>
                <Slider
                    min={MIN_ROTATE}
                    max={MAX_ROTATE}
                    step={ROTATE_STEP}
                    value={rotate}
                    onChange={setRotate}
                />
                <button
                    onClick={() => setRotate(rotate + ROTATE_STEP)}
                    disabled={rotate === MAX_ROTATE}
                >
                    ↻
                </button>
            </section>
        </>
    )
}

export default CropContent
