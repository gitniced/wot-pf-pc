import { Modal } from 'antd'
import Crop from './Crop'
import type { PixelCrop } from 'react-image-crop'

type MyCorpProps = {
    title: string
    visible: boolean
    imageSrc: string
    onOk: (e: PixelCrop) => void
    onCancel: () => void
}

const MyCorp = ({ title, visible, imageSrc, onOk, onCancel }: MyCorpProps) => {
    let finalImage: PixelCrop

    const cropComplete = (image: PixelCrop) => {
        finalImage = image
    }

    return (
        <Modal
            title={title}
            visible={visible}
            onOk={() => {
                onOk(finalImage)
            }}
            onCancel={onCancel}
            okText="确认"
            cancelText="取消"
        >
            <Crop imageSrc={imageSrc} onComplete={cropComplete} />
        </Modal>
    )
}

export default MyCorp
